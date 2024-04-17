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
<// Use Files if you need the user to upload a video asset from file system
<Files
  multiple={false}
  accepts={["video/*"]}
  minFileSize={1}
  clickable
  className="files-button"
  onChange={(files) => {
    if (!files || !files.length) return;
    const [body] = files;
    State.update({ currentUpload: body });    
  }}
  >
  Stage Video
</Files>

<Widget
  src={"efiz.near/widget/Livepeer.Creator"}
  props={{
    video: state.currentUpload,
    metadata: { title, description },
    handleStatus: (status) => { console.log(status) },
    handleProgress: (progress) => { console.log(progress) },
    handleError: (error) => { console.log(assets) },
    handleAssets: (assets) => { console.log(assets) },
    Button: ({ onClick, disabled }) => (
      <button onClick={onClick} disabled={disabled}>
        Upload to Livepeer
      </button>
    ),
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
        }}
      >
        Creator
      </h1>
    </div>
    <div>
      <Heading> Preview </Heading>
      <PreviewContent>
        <Files
          multiple={false}
          accepts={["video/*"]}
          minFileSize={1}
          clickable
          className="files-button"
          onChange={(files) => {
            if (!files || !files.length) return;
            const [body] = files;
            State.update({ currentUpload: body });
          }}
        >
          Stage Video
        </Files>
        <Widget
          src={"efiz.near/widget/Livepeer.Creator"}
          props={{
            video: state.currentUpload,
            metadata: { title, description },
            handleStatus: (status) => {
              console.log(status);
            },
            handleProgress: (progress) => {
              console.log(progress);
            },
            handleError: (error) => {
              console.log(assets);
            },
            handleAssets: (assets) => {
              console.log(assets);
            },
            Button: ({ onClick, disabled }) => (
              <button onClick={onClick} disabled={disabled}>
                Upload to Livepeer
              </button>
            ),
          }}
        />
      </PreviewContent>
    </div>
    <UsageContent>
      <Heading>Usage</Heading>
      <Markdown text={WidgetCode} />
    </UsageContent>

    <div>
      <Heading>Properties</Heading>
      <PropertiesContent>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Prop Name</th>
              <th>Type/Values</th>
              <th>Default Value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{
                  fontFamily: "monospace",
                }}
              >
                video
              </td>
              <td>File</td>
              <td
                style={{
                  fontFamily: "monospace",
                }}
              >
                N/A
              </td>
              <td>The video file to upload.</td>
            </tr>
            <tr>
              <td
                style={{
                  fontFamily: "monospace",
                }}
              >
                metadata
              </td>
              <td>Object</td>
              <td
                style={{
                  fontFamily: "monospace",
                }}
              >
                N/A
              </td>
              <td>The metadata for the video.</td>
            </tr>
            <tr>
              <td
                style={{
                  fontFamily: "monospace",
                }}
              >
                handleStatus
              </td>
              <td>Function</td>
              <td
                style={{
                  fontFamily: "monospace",
                }}
              >
                N/A
              </td>
              <td>A callback function for status updates.</td>
            </tr>
            <tr>
              <td
                style={{
                  fontFamily: "monospace",
                }}
              >
                handleProgress
              </td>
              <td>Function</td>
              <td
                style={{
                  fontFamily: "monospace",
                }}
              >
                N/A
              </td>
              <td>A callback function for progress updates.</td>
            </tr>
            <tr>
              <td
                style={{
                  fontFamily: "monospace",
                }}
              >
                handleError
              </td>
              <td>Function</td>
              <td
                style={{
                  fontFamily: "monospace",
                }}
              >
                N/A
              </td>
              <td>A callback function for error updates.</td>
            </tr>
            <tr>
              <td
                style={{
                  fontFamily: "monospace",
                }}
              >
                handleAssets
              </td>
              <td>Function</td>
              <td
                style={{
                  fontFamily: "monospace",
                }}
              >
                N/A
              </td>
              <td>A callback function for asset updates.</td>
            </tr>
            <tr>
              <td
                style={{
                  fontFamily: "monospace",
                }}
              >
                Button
              </td>
              <td>Function/ReactNode</td>
              <td
                style={{
                  fontFamily: "monospace",
                }}
              >
                N/A
              </td>
              <td>A custom component to render the button for uploading.</td>
            </tr>
            <tr>
              <td
                style={{
                  fontFamily: "monospace",
                }}
              >
                debug
              </td>
              <td>Boolean</td>
              <td
                style={{
                  fontFamily: "monospace",
                }}
              >
                false
              </td>
              <td>Whether to log debug messages or not.</td>
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
                  href="https://docs.livepeer.org/reference/livepeer-js/asset/useCreateAsset"
                >
                  Livepeer Asset Creator
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
