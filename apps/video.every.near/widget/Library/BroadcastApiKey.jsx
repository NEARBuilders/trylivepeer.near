const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  h1 {
    color: #292c2a;
    font-family: Poppins;
    font-size: 24px;
    font-weight: 500;
    line-height: 130%; /* 31.2px */
    letter-spacing: -0.48px;
    margin: 0;
  }
`;

const Heading = styled.h3`
  color: #292c2a;
  font-family: Poppins;
  font-size: 18px;
  font-weight: 500;
  line-height: 150%; /* 27px */
  letter-spacing: -0.18px;
  margin-bottom: 8px;
`;

const PreviewContent = styled.div`
  grid-column: span 9 / span 9;
  border-radius: 24px;
  border: 1px solid #c7c7c7;
  padding: 4rem;
  word-break: normal;
`;

const WidgetCode = `
\`\`\`js
<Widget
src={"efiz.near/widget/Broadcast.ApiKey"}
props={{
  automated: true,
  apiKey: "8b3bdqjtdj4jsjwa",
}}
/>
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
  gap: 4px;

  color: #a5a5a5 !important;

  font-family: Poppins;
  font-size: 12px !important;
  line-height: 140% !important; /* 16.8px */
  font-weight: 400 !important;
  letter-spacing: -0.12px !important;
  margin-bottom: 8px !important;

  img {
    height: 12px;
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
        BroadcastApiKey
      </h1>
    </div>
    <div>
      <Heading> Preview </Heading>
      <PreviewContent>
        <Widget src="video.every.near/widget/Broadcast.ApiKey" />
      </PreviewContent>
    </div>
    <div>
      <Heading>Description</Heading>
      <p>This component allow you to set the Livepeer Studio api key.</p>
    </div>
    <UsageContent>
      <Heading>Usage</Heading>
      <Markdown text={WidgetCode} />
    </UsageContent>
    <UsageContent>
      <table class="table table-striped">
        <thead>
          <tr>
            <th
              style={{
                fontWeight: 600,
              }}
            >
              Property
            </th>
            <th
              style={{
                fontWeight: 600,
              }}
            >
              Type
            </th>
            <th
              style={{
                fontWeight: 600,
              }}
            >
              Default value
            </th>
            <th
              style={{
                fontWeight: 600,
              }}
            >
              This component enables the configuration of the Livepeer Studio
              API key.
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              style={{
                fontFamily: "monospace",
              }}
            >
              automated
            </td>
            <td>boolean</td>
            <td>false</td>
            <td>
              When automated, this component operates without a user interface
              and automatically configures the
              <MonospaceText>apiKey</MonospaceText> in the
              <MonospaceText>Broadcast.Player</MonospaceText>
              component using the specified{" "}
              <MonospaceText>apiKey</MonospaceText> property.
            </td>
          </tr>
          <tr>
            <td
              style={{
                fontFamily: "monospace",
              }}
            >
              apiKey
            </td>
            <td>string</td>
            <td>""</td>
            <td>
              Value of the <MonospaceText>apiKey</MonospaceText> as configured
              by the component.
            </td>
          </tr>
        </tbody>
      </table>
    </UsageContent>
  </Container>
);
