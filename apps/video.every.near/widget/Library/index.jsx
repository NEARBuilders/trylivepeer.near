const { HeroBanner } = VM.require(
  "video.every.near/widget/Components.hero-banner"
) || {
  HeroBanner: () => <></>,
};

const { Button } = VM.require("video.every.near/widget/Components.button") || {
  Button: () => <></>,
};

const { href } = VM.require("buildhub.near/widget/lib.url") || {
  href: () => {},
};

const { tab } = props;

const tabs = {
  library: [
    { label: "overview", widget: "video.every.near/widget/Library.Overview" },
  ],
  livepeer: [
    { label: "player", widget: "video.every.near/widget/Library.Player" },
    { label: "creator", widget: "video.every.near/widget/Library.Creator" },
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
`;

const Content = styled.div`
  grid-column: span 9 / span 9;
  border-radius: 24px;
  border: 1px solid #c7c7c7;
  padding: 4rem;
  word-break: normal;
`;

const labelToFind = props.tab;
const activeTab =
  Object.values(tabs)
    .flatMap((array) => array)
    .find((obj) => obj.label === labelToFind) ||
  Object.values(tabs).flatMap((array) => array)[0];

return (
  <LibraryWrapper>
    <HeroBanner />
    <GridContainer>
      <SideBar>
        {Object.keys(tabs).map((tab) => {
          return (
            <div className="w-100">
              <p
                style={{
                  width: "232px",
                  height: "40px",
                  padding: "10px 12px",
                  textTransform: "capitalize",
                  marginBottom: "14px",
                }}
              >
                {tab}
              </p>
              <div
                className="d-flex flex-column"
                style={{
                  gap: "14px",
                }}
              >
                {tabs[tab].map((item) => {
                  return (
                    <Link
                      style={{ textDecoration: "none", width: "100%" }}
                      to={href({
                        widgetSrc: "video.every.near/widget/app",
                        params: {
                          page: "library",
                          tab: item.label,
                        },
                      })}
                    >
                      <Button
                        style={{ width: "100%" }}
                        variant={
                          activeTab.label === item.label ? "primary" : ""
                        }
                      >
                        {item.label}
                      </Button>
                    </Link>
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
    </GridContainer>
  </LibraryWrapper>
);
