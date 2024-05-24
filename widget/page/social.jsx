const { Feed } = VM.require("${alias_devs}/widget/Feed") ?? {
  Feed: () => <></>,
};

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  color: #a5a5a5;
  background-color: "#23242b";
`;

return (
  <Feed
    index={[
      {
        action: "post",
        key: "main",
        options: {
          limit: 10,
          order: "desc",
          accountId: props.accounts,
        },
        cacheOptions: {
          ignoreCache: true,
        },
      },
      {
        action: "repost",
        key: "main",
        options: {
          limit: 10,
          order: "desc",
          accountId: props.accounts,
        },
        cacheOptions: {
          ignoreCache: true,
        },
      },
    ]}
    Item={(p) => (
      <Widget
        loading={<div className="w-100" style={{ height: "200px" }} />}
        src="${config_account}/widget/SocialPost.Post"
        props={{ accountId: p.accountId, blockHeight: p.blockHeight }}
      />
    )}
    Layout={Grid}
  />
);
