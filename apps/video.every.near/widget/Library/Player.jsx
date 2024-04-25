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
src={"efiz.near/widget/Player.Player"}
props={{
  title: "Original Keyboard Cat!",
  playbackId: "8b3bdqjtdj4jsjwa",
  PosterImage: <img src="https://example.com" alt={"Original Keyboard Cat!"} />
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

return (
  <Container>
    <div>
      <PoweredBy>
        Powered by{" "}
        <img src="https://ipfs.near.social/ipfs/bafkreia4rl6nknogzwwcj5qjladmgytyufxyl56fgr6nfjbwc6l5f6in4y" />
      </PoweredBy>
      <h1
        style={{
          fontSize: "28px",
          fontWeight: "",
        }}
      >
        Player
      </h1>
    </div>
    <div>
      <Heading> Preview </Heading>
      <PreviewContent>
        <Widget src="video.every.near/widget/Player.Player" />
      </PreviewContent>
    </div>
    <UsageContent>
      <div>
        <Heading>Description</Heading>
        <p>
          This component facilitates video display. Users have the option to
          generate a new asset via the component's API for video uploads or
          directly supply the necessary details to display an existing video.
        </p>
      </div>
      <Heading>Usage</Heading>
      <Markdown text={WidgetCode} />
    </UsageContent>
    <div>
      <Heading>Properties</Heading>
      <PropertiesContent>
        <table class="table table-striped">
          <thead>
            <tr>
              <th
                style={{
                  fontWeight: 600,
                }}
              >
                Prop Name
              </th>
              <th
                style={{
                  fontWeight: 600,
                }}
              >
                Type/Values
              </th>
              <th
                style={{
                  fontWeight: 600,
                }}
              >
                Default Value
              </th>
              <th
                style={{
                  fontWeight: 600,
                }}
              >
                Description
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
                title
              </td>
              <td>string</td>
              <td
                style={{
                  fontFamily: "monospace",
                }}
              >
                ""
              </td>
              <td>
                The title for the content. This is highly recommended, since it
                is used for accessibility labels in the Player. If you do not
                want to show the title visually, see{" "}
                <a
                  target="_blank"
                  href="https://docs.livepeer.org/reference/livepeer-js/Player#showtitle"
                >
                  showTitle
                </a>
                .
              </td>
            </tr>
            <tr>
              <td
                style={{
                  fontFamily: "monospace",
                }}
              >
                playbackId
              </td>
              <td>number/string</td>
              <td
                style={{
                  fontFamily: "monospace",
                }}
              >
                ""
              </td>
              <td>
                The{" "}
                <a
                  target="_blank"
                  href="https://docs.livepeer.org/reference/livepeer-js/Player#playbackid-or-src"
                >
                  playbackId
                </a>{" "}
                of the video. Can be a short playbackId for an Asset or Stream,
                a media source URL, or an IPFS CID.
              </td>
            </tr>
            <tr>
              <td
                style={{
                  fontFamily: "monospace",
                }}
              >
                PosterImage
              </td>
              <td>Function/ReactNode</td>
              <td
                style={{
                  fontFamily: "monospace",
                }}
              >
                N/A
              </td>
              <td>
                A custom component to render the poster image while video is not
                playing.
              </td>
            </tr>
            <tr>
              <td
                style={{
                  fontFamily: "monospace",
                }}
              >
                showPipButton
              </td>
              <td>boolean</td>
              <td
                style={{
                  fontFamily: "monospace",
                }}
              >
                true
              </td>
              <td>Whether to show the picture-in-picture button.</td>
            </tr>
            <tr>
              <td
                style={{
                  fontFamily: "monospace",
                }}
              >
                objectFit
              </td>
              <td>string</td>
              <td
                style={{
                  fontFamily: "monospace",
                }}
              >
                "cover"
              </td>
              <td>The object fit for the video.</td>
            </tr>
            <tr>
              <td
                style={{
                  fontFamily: "monospace",
                }}
              >
                priority
              </td>
              <td>boolean</td>
              <td
                style={{
                  fontFamily: "monospace",
                }}
              >
                true
              </td>
              <td>Whether to prioritize the video.</td>
            </tr>
            <tr>
              <td
                style={{
                  fontFamily: "monospace",
                }}
              >
                ...props
              </td>
              <td>any</td>
              <td
                style={{
                  fontFamily: "monospace",
                }}
              >
                N/A
              </td>
              <td>
                Any other props will be passed to the underlying{" "}
                <a
                  target="_blank"
                  href="https://docs.livepeer.org/reference/livepeer-js/Player"
                >
                  Livepeer Video Player
                </a>
                .
              </td>
            </tr>
          </tbody>
        </table>
      </PropertiesContent>
    </div>
  </Container>
);
