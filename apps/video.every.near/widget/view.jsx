const { Feed } = VM.require("devs.near/widget/Feed") || {
  Feed: () => <></>,
};

const path = props.path;
const blockHeight = props.blockHeight;

const item = {
  path,
  type: "every.near/type/video",
};

const ModalBox = styled.div`
  background-color: white;
  min-width: 400px;
  max-width: 600px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 1003;
`;

const VideoCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const VideoTitle = styled.h3`
  margin: 0;
  padding: 0;
  font-size: 1.2em;
`;

const VideoDescription = styled.p`
  font-size: 0.9em;
  color: #666;
`;

const VideoInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
  color: #888;
`;

const VideoThumbnail = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 12px;
`;

function handleExpandVideo() {
  console.log("hey");
  if (props.handleExpandVideo) {
    props.handleExpandVideo(path, blockHeight);
  }
}

const videoThing = Social.getr(path, blockHeight);

if (!videoThing) return <p>Loading...</p>;

const data = JSON.parse(videoThing[""] || "null");

const Button = styled.button``;

const { href } = VM.require("buildhub.near/widget/lib.url") || {
  href: () => {},
};

return (
  <div className="container">
    <VideoCard>
      <Link
        to={href({
          widgetSrc: "video.every.near/widget/app",
          params: {
            page: "home",
          },
        })}
      >
        <Button>back</Button>
      </Link>
      <Widget
        src="efiz.near/widget/Livepeer.Player"
        props={{
          playbackId: data.storage.ipfs.cid,
          title: videoThing.metadata.name,
          PostImage: data?.poster && (
            <img
              src={
                data?.poster || "https://placehold.co/450x300/000000/FFFFFF/png"
              }
              alt={videoThing.metadata.name}
            />
          ),
        }}
      />
      <VideoTitle>{videoThing.metadata.name}</VideoTitle>
      <VideoDescription>{videoThing.metadata.description}</VideoDescription>
      <Widget src="mob.near/widget/LikeButton" props={{ item }} />
      <Widget
        src="nui.sking.near/widget/Layout.Modal"
        props={{
          open: state.postModalOpen,
          onOpenChange: (open) => {
            State.update({
              ...state,
              postModalOpen: open,
            });
          },
          toggle: (
            <Button className="classic" disabled={!path}>
              <>
                <i className={"bi bi-send"} />
                share
              </>
            </Button>
          ),
          content: (
            <div className="w-100">
              <ModalBox>
                <Widget
                  src={"devs.near/widget/modal.post"}
                  props={{
                    creatorId: context.accountId,
                    path: `video.every.near/widget/app?path=${path}`,
                    type: "every.near/type/video",
                    closeModal: () => {
                      State.update({
                        ...state,
                        postModalOpen: false,
                      });
                    },
                  }}
                />
              </ModalBox>
            </div>
          ),
        }}
      />
      <VideoInfo>
        <span>
          Duration:{" "}
          {data?.videoSpec?.duration ? `${data?.videoSpec.duration}s` : "N/A"}
        </span>
        <span>Format: {data?.videoSpec?.format || "N/A"}</span>
      </VideoInfo>
      <a href={data?.downloadUrl} target="_blank" rel="noopener noreferrer">
        Download Video
      </a>
    </VideoCard>
    <VideoCard>
      <VideoTitle>Comments</VideoTitle>
      <hr />
      <Feed
        index={{
          action: "post",
          key: item,
        }}
        showCompose={true}
        Item={(p) => {
          return (
            <Widget
              src="mob.near/widget/MainPage.N.Post"
              loading={<div style={{ height: "200px" }} />}
              props={{ accountId: p.accountId, blockHeight: p.blockHeight }}
            />
          );
        }}
      />
    </VideoCard>
  </div>
);
