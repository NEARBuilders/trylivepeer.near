const { HeroBanner } = VM.require(
  "video.every.near/widget/Components.hero-banner"
) || {
  HeroBanner: () => <></>,
};

const { BrowseTabs } = VM.require(
  "video.every.near/widget/Components.browse-tabs"
) || {
  BrowseTabs: () => <></>,
};

const { Feed } = VM.require("devs.near/widget/Feed") || {
  Feed: () => <></>,
};

const path = props.path;
const blockHeight = props.blockHeight;
const accountId = path.split("/")[0];

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
  gap: 1rem;
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

const ViewContainer = styled.div`
  padding: 32px 40px;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const tabs = [
  { label: "All" },
  { label: "Near" },
  { label: "Everything" },
  { label: "Build" },
  { label: "User interface design" },
  { label: "Music" },
  { label: "Live" },
];

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`;

const Content = styled.div`
  grid-column: span 9 / span 9;
`;

const SideContent = styled.div`
  grid-column: span 3 / span 3;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

return (
  <ViewContainer>
    <HeroBanner />
    <BrowseTabs tabs={tabs} />
    <GridContainer>
      <Content>
        <div>
          <Widget
            src="trylivepeer.near/widget/Player"
            props={{
              playerProps: {
                playbackId: data.playbackId,
                title: videoThing.metadata.name,
                PostImage: data?.poster && (
                  <img
                    src={
                      data?.poster ||
                      "https://placehold.co/450x300/000000/FFFFFF/png"
                    }
                    alt={videoThing.metadata.name}
                  />
                ),
              },
            }}
          />
          <div className="mt-4">
            <VideoTitle>{videoThing.metadata.name}</VideoTitle>
            <VideoDescription>
              {videoThing.metadata.description}
            </VideoDescription>
            <VideoInfo>
              <Widget
                loading=""
                src="mob.near/widget/TimeAgo"
                props={{ blockHeight }}
              />
              <span>Format: {data?.videoSpec?.format || "N/A"}</span>
            </VideoInfo>
            <div
              className="d-flex align-items-center justify-content-between flex-wrap"
              style={{
                border: "1px solid rgba(0, 0, 0, 0.13)",
                borderLeft: 0,
                borderRight: 0,
                padding: "1rem 0",
                margin: "2rem 0",
              }}
            >
              <div className="d-flex align-items-center gap-3 flex-wrap">
                <Widget
                  src="mob.near/widget/ProfileImage"
                  props={{
                    accountId: accountId,
                  }}
                />
                <div className="d-flex align-items-center gap-1 flex-wrap">
                  {accountId}{" "}
                  <Widget
                    loading={""}
                    src="mob.near/widget/Checkmark"
                    props={{ isPremium, accountId }}
                  />
                </div>
              </div>
              <div className="d-flex align-items-center gap-2">
                <Widget
                  src="video.every.near/widget/Components.like-button"
                  props={{ item }}
                />
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
                      <Button
                        className="d-flex align-items-center gap-1"
                        disabled={!path}
                        style={{ fontWeight: 500 }}
                      >
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M15 5.63L20.66 12L15 18.37V15V14H14C10.04 14 6.86 15 4.25 17.09C6.09 13.02 9.36 10.69 14.14 9.99L15 9.86V9V5.63ZM14 3V9C6.22 10.13 3.11 15.33 2 21C4.78 17.03 8.44 15 14 15V21L22 12L14 3Z"
                              fill="black"
                            />
                          </svg>
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
                <a
                  href={data?.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-flex align-items-center gap-1 text-black"
                  style={{ textDecoration: "none", fontWeight: 500 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M17 18V19H6V18H17ZM16.5 11.4L15.8 10.7L12 14.4V4H11V14.4L7.2 10.6L6.5 11.3L11.5 16.3L16.5 11.4Z"
                      fill="black"
                    />
                  </svg>
                  download
                </a>
              </div>
            </div>
          </div>
        </div>
        <div>
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
        </div>
      </Content>
      <SideContent>
        <h5>Suggested Videos</h5>
        <Widget
          src="devs.near/widget/Feed@100100160"
          props={{
            index: {
              action: "every",
              key: "video",
              options: {
                limit: 10,
                order: "desc",
              },
            },
            Item: (p) => (
              <Widget
                src="video.every.near/widget/Components.suggested-video"
                props={{ ...p }}
              />
            ),
            Layout: List,
            buildPath: (item) => `${item.accountId}/thing/${item.value.id}`,
          }}
        />
      </SideContent>
    </GridContainer>
  </ViewContainer>
);
