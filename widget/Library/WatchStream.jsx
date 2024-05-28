const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  h1 {
    color: #a5a5a5;

    font-size: 24px;
    font-weight: 1000;
    line-height: 130%; /* 31.2px */
    letter-spacing: -0.48px;
    margin: 0;
  }
`;

const Heading = styled.h3`
  color: #a5a5a5;

  font-size: 18px;
  font-weight: 900;
  line-height: 150%; /* 27px */
  letter-spacing: -0.18px;
  margin-bottom: 8px;
`;

const PreviewContent = styled.div`
  grid-column: span 9 / span 9;
  border-radius: 24px;
  background-color: #2d2d2d;
  padding: 4rem;
  word-break: normal;
  color: #a5a5a5;
`;

const WidgetCode = `
\`\`\`js
<Widget src={"efiz.near/widget/Broadcast.WatchStream"} />
\`\`\`
`;

const UsageContent = styled.div`
  pre {
    div {
      padding: 1.5rem !important;
      border-radius: 1.5rem;
    }
  }
`;

const PoweredBy = styled.h3`
  display: flex;
  align-items: center;
  gap: 15px;

  color: #a5a5a5 !important;

  font-size: 40px !important;
  line-height: 140% !important; /* 16.8px */
  font-weight: 400 !important;
  letter-spacing: -0.12px !important;
  margin-bottom: 8px !important;

  img {
    height: 20px;
    width: auto;
    object-fit: cover;
  }
`;

const PropertiesContent = styled.div`
  grid-column: span 9 / span 9;
  border-radius: 24px;
  border: 1px solid #c7c7c7;
  padding: 1rem;
  word-break: normal;
  overflow-x: scroll;

  table {
    border-radius: 24px;
    overflow: hidden;
  }
`;

const MonospaceText = styled.span`
  font-family: monospace;
`;
const DescriptionContent = styled.div`
  color: #a5a5a5;
`;

return (
  <Container>
    <div>
      <PoweredBy>
        Powered by
        <img src="https://ipfs.near.social/ipfs/bafkreia4rl6nknogzwwcj5qjladmgytyufxyl56fgr6nfjbwc6l5f6in4y" />
      </PoweredBy>
      <h1
        style={{
          fontSize: "28px",
          fontWeight: "",
        }}
      >
        Watch stream
      </h1>
    </div>
    <div>
      <Heading> Preview </Heading>
      <PreviewContent>
        <Widget src="${config_account}/widget/Broadcast.Broadcast" />
        <Widget src="${config_account}/widget/Broadcast.WatchStream" />
      </PreviewContent>
    </div>
    <div>
      <Heading>Description</Heading>
      <DescriptionContent>
        This component allow the user to watch the desired stream by providing
        the stream <MonospaceText>playbackId</MonospaceText>.
      </DescriptionContent>
    </div>
    <UsageContent>
      <Heading>Usage</Heading>
      <Markdown text={WidgetCode} />
    </UsageContent>
  </Container>
);
