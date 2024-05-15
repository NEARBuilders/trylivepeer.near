const { HeroBanner } = VM.require(
  "video.every.near/widget/Components.hero-banner"
) || {
  HeroBanner: () => <></>,
};

const { Button } = VM.require("UI.near/widget/atoms.Button") || {
  Button: () => <></>,
};

const { href } = VM.require("buildhub.near/widget/lib.url") || {
  href: () => {},
};

// TODO: React objects shouldn't be dereferenced
// const { Draggable } = VM.require(
//   "video.every.near/widget/Library.Draggable"
// ) || {
//   href: () => <p>Draggable not present</p>,
// };

// TODO: why this is not working?

//const { Debugger } = VM.require("video.every.near/widget/Player.Debug") || {
//  href: () => <span>Debugger not present</span>,
//};

const { tab } = props;

const tabs = {
  library: [
    { label: "overview", widget: "video.every.near/widget/Library.Overview" },
  ],
  // livepeer: [
  // subaccounts video -> every -> near
  // / widget namespace
  // / name of the widget
  // . designated file structure

  //   { label: "player", widget: "video.every.near/widget/Library.Player" },
  //   { label: "creator", widget: "video.every.near/widget/Library.Creator" },
  // ],
  player: [
    { label: "Player", widget: "video.every.near/widget/Library.Player" },
    {
      label: "GetUploadUrl",
      widget: "video.every.near/widget/Library.GetUploadUrl",
    },
    {
      label: "DirectUpload",
      widget: "video.every.near/widget/Library.DirectUploadAsset",
    },
    {
      label: "ResumableUpload",
      widget: "video.every.near/widget/Library.ResumableUploadAsset",
    },
    {
      label: "GetSrc",
      widget: "video.every.near/widget/Library.GetSrc",
    },
    {
      label: "PlayerApiKey",
      widget: "video.every.near/widget/Library.PlayerApiKey",
    },
    {
      label: "Player Sandbox",
      widget: "video.every.near/widget/Library.PlayerSandbox",
    },
    {
      label: "Backend Integration",
      widget: "video.every.near/widget/Library.GetAssets",
    },
    {
      label: "Backend Uploader",
      widget: "video.every.near/widget/Library.FileUploader",
    },
  ],
  broadcast: [
    {
      label: "Broadcast",
      widget: "video.every.near/widget/Library.Broadcast",
    },
    {
      label: "GenerateStream",
      widget: "video.every.near/widget/Library.GenerateStream",
    },
    {
      label: "Broadcast ApiKey",
      widget: "video.every.near/widget/Library.BroadcastApiKey",
    },
    {
      label: "Watch Stream",
      widget: "video.every.near/widget/Library.WatchStream",
    },
    {
      label: "Broadcast Sandbox",
      widget: "video.every.near/widget/Library.BroadcastSandbox",
    },
  ],
};

const LibraryWrapper = styled.div`
  padding: 32px 40px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100%;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 1rem;
  @media (max-width: 920px) {
    display: flex;
    flex-direction: column;
  }
`;

const SideBar = styled.div`
  grid-column: span 3 / span 3;
  height: 100%;

  display: flex;
  padding: 24px 12px;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  border-radius: 24px;
  border: 1px solid #c7c7c7;

  .title {
    width: 100%;
  }

  p {
    height: 40px;
    padding: 10px 12px;
    text-transform: capitalize;
    margin-bottom: 14px;
  }

  @media (max-width: 1010px) {
    grid-column: span 2 / span 2;
  }

  @media screen and (max-width: 768px) {
    border: 0px;
    flex-direction: row;
    overflow-x: auto;
    min-height: auto;
    flex-wrap: nowrap;
    flex-shrink: 0;

    .title {
      width: auto;
    }
  }
`;

const Content = styled.div`
  grid-column: span 9 / span 9;
  border-radius: 24px;
  border: 1px solid #c7c7c7;
  padding: 4rem;
  word-break: normal;
  @media (max-width: 1010px) {
    grid-column: span 10 / span 10;
  }

  @media screen and (max-width: 768px) {
    padding: 1rem;
  }
`;

// const RightBar = styled.div`
//   grid-column: span 3 / span 3;
//   height: 100%;
//   display: flex;
//   padding: 24px 12px;
//   flex-direction: column;
//   align-items: flex-start;
//   gap: 14px;
//   border-radius: 24px;
//   border: 1px solid #c7c7c7;
// `;

const labelToFind = props.tab;
const activeTab =
  Object.values(tabs)
    .flatMap((array) => array)
    .find((obj) => obj.label === labelToFind) ||
  Object.values(tabs).flatMap((array) => array)[0];

const StyledLink = styled.div`
  a {
    text-decoration: none;
    width: 100%;

    button {
      width: 100%;
    }
  }
`;

const [activateDebug, setActivateDebug] = useState(false);

return (
  <LibraryWrapper>
    <HeroBanner />
    <GridContainer>
      <SideBar>
        {Object.keys(tabs).map((tab) => {
          return (
            <div className="title">
              {tab === "player" && (
                <>
                  {/* <label>
                    Show debug component:
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => setActivateDebug(!activateDebug)}
                    />
                  </label> */}
                </>
              )}
              <p>{tab}</p>
              <div
                className="d-flex flex-md-column"
                style={{
                  gap: "14px",
                }}
              >
                {tabs[tab].map((item) => {
                  return (
                    <StyledLink>
                      <Link
                        to={href({
                          widgetSrc: "video.every.near/widget/app",
                          params: {
                            page: "library",
                            tab: item.label,
                          },
                        })}
                      >
                        <Button
                          variant={
                            activeTab.label === item.label ? "primary" : ""
                          }
                        >
                          {item.label}
                        </Button>
                      </Link>
                    </StyledLink>
                  );
                })}
              </div>
            </div>
          );
        })}
      </SideBar>
      <Content>
        <Widget src={activeTab.widget} loading="" />
      </Content>
      {/* <RightBar>
        <Widget src={"video.every.near/widget/Player.Debug"} loading="" />
      </RightBar> */}
    </GridContainer>
  </LibraryWrapper>
);
