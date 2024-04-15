const path = props.path;
const blockHeight = props.blockHeight;

const { href } = VM.require("buildhub.near/widget/lib.url") || {
  href: () => {},
};

const VideoCard = styled.div`
  border: 1px solid #e2e2e2;
  border-radius: 1rem;
  padding: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  background-color: #fff;
  flex-shrink: 0;

  transition: all 300ms;
  &:hover {
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

    transform: scale(1.01);
  }
`;

const VideoTitle = styled.h3`
  color: #0d0d0e;

  font-size: 14px;
  font-weight: 500;
  line-height: 140%; /* 19.6px */
  letter-spacing: -0.14px;
  margin: 0;
`;

const VideoInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
  color: #888;
`;

const VideoThumbnail = styled.img`
  object-fit: cover;
  border-radius: 0.5rem;
  aspect-ratio: 16 / 9;
`;

function handleExpandVideo() {
  if (props.handleExpandVideo) {
    props.handleExpandVideo(path, blockHeight);
  }
}

const videoThing = Social.getr(path, blockHeight);

if (!videoThing) return <p>Loading...</p>;

const userId = path.split("/")[0];
const userProfile = Social.getr(`${userId}/profile`);

const data = JSON.parse(videoThing[""] || "null");
data = {
  ...data,
  poster:
    data.poster === "https://ipfs.near.social/ipfs/undefined"
      ? "https://placehold.co/450x300/000000/000000/png"
      : data.poster,
};

const VideoDescription = styled.p`
  color: #6f6f6f;
  font-size: 12px;
  line-height: 140%; /* 16.8px */
  letter-spacing: -0.12px;
  margin: 0;

  display: flex;
  align-items: center;
  gap: 0.25rem;

  svg {
    height: 16px;
    width: 16px;
  }
`;

function secondsToHoursMinutes(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  if (!hours) {
    return minutes + ":" + remainingSeconds;
  }

  return hours + ":" + minutes + ":" + remainingSeconds;
}

return (
  <Link
    style={{ textDecoration: "none" }}
    to={href({
      widgetSrc: "video.every.near/widget/app",
      params: {
        page: "view",
        path: path,
        blockHeight: blockHeight,
      },
    })}
  >
    <VideoCard>
      <div className="position-relative">
        <VideoThumbnail
          src={data.poster || "https://placehold.co/450x300/000000/000000/png"}
          alt={videoThing.metadata.name}
        />
        <div
          className="position-absolute text-white"
          style={{
            bottom: 8,
            right: 8,
            background: "black",
            padding: "4px 8px",
            borderRadius: "2rem",
            fontSize: "10px",
          }}
        >
          {data?.videoSpec?.duration
            ? secondsToHoursMinutes(data?.videoSpec?.duration)
            : ""}
        </div>
      </div>

      <div className="p-2 d-flex flex-column gap-1">
        <VideoTitle className="text-truncate">
          {videoThing.metadata.name}
        </VideoTitle>
        <VideoDescription>
          {userProfile.name}{" "}
          <Widget
            loading={""}
            src="mob.near/widget/Checkmark"
            props={{ isPremium, accountId: userId }}
          />
        </VideoDescription>
        <VideoDescription>
          <Widget
            loading=""
            src="mob.near/widget/TimeAgo"
            props={{ blockHeight }}
          />
        </VideoDescription>
      </div>
    </VideoCard>
  </Link>
);
