const { HeroBanner } = VM.require(
  "${config_account}/widget/Components.hero-banner"
) || {
  HeroBanner: () => <></>,
};

const { href } = VM.require("${alias_devs}/widget/lib.url") || {
  href: () => {},
};

// TODO: React objects shouldn't be dereferenced
// const { Draggable } = VM.require(
//   "${config_account}/widget/Library.Draggable"
// ) || {
//   href: () => <p>Draggable not present</p>,
// };

// TODO: why this is not working?

//const { Debugger } = VM.require("${config_account}/widget/Player.Debug") || {
//  href: () => <span>Debugger not present</span>,
//};

const { tab } = props;

const tabs = {
  library: [
    { label: "Overview", widget: "${config_account}/widget/Library.Overview" },
  ],
  // livepeer: [
  // subaccounts video -> every -> near
  // / widget namespace
  // / name of the widget
  // . designated file structure

  //   { label: "player", widget: "${config_account}/widget/Library.Player" },
  //   { label: "creator", widget: "${config_account}/widget/Library.Creator" },
  // ],
  player: [
    { label: "Player", widget: "${config_account}/widget/Library.Player" },
    {
      label: "GetUploadUrl",
      widget: "${config_account}/widget/Library.GetUploadUrl",
    },
    {
      label: "DirectUpload",
      widget: "${config_account}/widget/Library.DirectUploadAsset",
    },
    {
      label: "ResumableUpload",
      widget: "${config_account}/widget/Library.ResumableUploadAsset",
    },
    {
      label: "GetSrc",
      widget: "${config_account}/widget/Library.GetSrc",
    },
    {
      label: "PlayerApiKey",
      widget: "${config_account}/widget/Library.PlayerApiKey",
    },
    {
      label: "Player Sandbox",
      widget: "${config_account}/widget/Library.PlayerSandbox",
    },
    {
      label: "Backend Integration",
      widget: "${config_account}/widget/Library.GetAssets",
    },
    {
      label: "Backend Uploader",
      widget: "${config_account}/widget/Library.FileUploader",
    },
  ],
  broadcast: [
    {
      label: "Broadcast",
      widget: "${config_account}/widget/Library.Broadcast",
    },
    {
      label: "GenerateStream",
      widget: "${config_account}/widget/Library.GenerateStream",
    },
    {
      label: "Broadcast ApiKey",
      widget: "${config_account}/widget/Library.BroadcastApiKey",
    },
    {
      label: "Watch Stream",
      widget: "${config_account}/widget/Library.WatchStream",
    },
    {
      label: "Broadcast Sandbox",
      widget: "${config_account}/widget/Library.BroadcastSandbox",
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
  border: 1px solid #23242b;

  .title {
    width: 100%;
    color: #dde4e1;
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
  border: 1px solid #23242b;
  padding: 4rem;
  background-color: #252525;
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

    .button1 {
      width: 100%;
      background: #000000;
      border: 1px solid #23242b;
      color: #ffffff;
      width: 300px;
      height: 50px;
      padding: 10px 12px 10px 12px;
      gap: 12px;
      border-radius: 8px;
      opacity: 0px;
      transition: opacity 0.7s ease, background-color 0.7s ease;

      &:hover {
        opacity: 1;
        background-color: #555555;
      }
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
                          widgetSrc: "${config_account}/widget/app",
                          params: {
                            page: "library",
                            tab: item.label,
                          },
                        })}
                      >
                        <button className="button1">{item.label}</button>
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
        <Widget src={"${config_account}/widget/Player.Debug"} loading="" />
      </RightBar> */}
    </GridContainer>
  </LibraryWrapper>
);
