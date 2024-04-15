const { HeroBanner } = VM.require(
  "video.every.near/widget/Components.hero-banner"
) || {
  HeroBanner: () => <></>,
};
const { UploadBanner } = VM.require(
  "video.every.near/widget/Components.upload-banner"
) || {
  UploadBanner: () => <></>,
};
const { BrowseTabs } = VM.require(
  "video.every.near/widget/Components.browse-tabs"
) || {
  BrowseTabs: () => <></>,
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  max-width: 100%;
  gap: 1rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const BrowseContainer = styled.div`
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

return (
  <BrowseContainer>
    <HeroBanner />
    <UploadBanner />
    <BrowseTabs tabs={tabs} />
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
            src="video.every.near/widget/card"
            props={{ ...p, ...props }}
          />
        ),
        Layout: Grid,
        buildPath: (item) => `${item.accountId}/thing/${item.value.id}`,
      }}
    />
  </BrowseContainer>
);
