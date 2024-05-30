const { Feed } = VM.require("${alias_devs}/widget/Feed") ?? {
  Feed: () => <></>,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: #dde4e1;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 175px);
`;

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  color: #a5a5a5;
  background-color: "#23242b";
`;

return (
  <Container>
    <Feed
      showCompose={true}
      index={[
        {
          action: "hashtag",
          key: "livepeer",
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
  </Container>
);
