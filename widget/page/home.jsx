const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  justify-content: center;
  align-items: center;
`;

const StlyedInput = styled.input`
  color: black;
  padding: 4px;
`;

const Dropdown = styled.select`
  ping: 10px;
  margin: 20px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: black;
`;

const OptionComponent = styled.div`
  padding: 20px;
  border-radius: 4px;
  width: 80%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const apiKeyCode = `
\`\`\`js
<Player.ApiKey />
<Player.GetUploadUrl />
<Player.ResumableUploadAsset />
<Player.GetSrc />
<Player.Display />
\`\`\`
`;

const localServerCode = `
\`\`\`js
<Player.FileUploader url={url} />
<Player.Display />
\`\`\`
`;

const uploadVideoRemoteCode = `
\`\`\`js
<Player.FileUploader
	url={"https://livepeer-webserver-613b208ef083.herokuapp.com"}
/>
<Player.Display />
\`\`\`
`;

const displayVideoRemoteCode = `
\`\`\`js
<Player.Display
	url={"https://livepeer-webserver-613b208ef083.herokuapp.com"}
	playbackId={"62fa7rxnbjzmoj2a"}
/>
\`\`\`
`;

const broadcastApiKeyCode = `
\`\`\`js
<Broadcast.ApiKey />
<Broadcast.GenerateStream />
<Broadcast.Player />
\`\`\`
`;

const broadcastLocalCode = `
\`\`\`js
<Broadcast.GenerateStream url={url} />
<Broadcast.Player />
<Broadcast.WatchStream pId={pId} />
\`\`\`
`;

const broadcastRemoteCode = `
\`\`\`js
<Broadcast.GenerateStream
url={"https://livepeer-webserver-613b208ef083.herokuapp.com"}
/>
<Broadcast.Player />
<Broadcast.WatchStream pId={pId} />
\`\`\`
`;

const Option1 = () => (
  <OptionComponent>
    Api key
    <Markdown text={apiKeyCode} />
    <Player.ApiKey />
    <Player.GetUploadUrl />
    <Player.ResumableUploadAsset />
    <Player.GetSrc />
    <Player.Display />
  </OptionComponent>
);

const Option2 = ({ url }) => {
  return (
    <OptionComponent>
      <Markdown text={localServerCode} />
      <Player.FileUploader url={url} />
      <Player.Display />
    </OptionComponent>
  );
};

const Option3 = ({ showVideo, handleClick }) => {
  return (
    <OptionComponent>
      <div>
        How to upload a video:
        <Markdown text={uploadVideoRemoteCode} />
        <Player.FileUploader
          url={"https://livepeer-webserver-613b208ef083.herokuapp.com"}
        />
        <Player.Display />
      </div>
      <div>
        <button type="button" onClick={() => handleClick()}>
          Click me
        </button>
        how to display a video already uploaded starting from the playback id:
        <Markdown text={displayVideoRemoteCode} />
        {showVideo && (
          <Player.Display
            url={"https://livepeer-webserver-613b208ef083.herokuapp.com"}
            playbackId={"62fa7rxnbjzmoj2a"}
          />
        )}
      </div>
    </OptionComponent>
  );
};

const Option1Broadcast = () => {
  return (
    <>
      Set api key and start a stream!
      <Markdown text={broadcastApiKeyCode} />
      <Broadcast.ApiKey />
      <Broadcast.GenerateStream />
      <Broadcast.Player />
    </>
  );
};

const Option2Broadcast = ({ url, pId }) => {
  return (
    <>
      Set api key and start a stream!
      <Markdown text={broadcastLocalCode} />
      <Broadcast.GenerateStream url={url} />
      <Broadcast.Player />
      Or you can insert a playbackId and watch a stream:
      <Broadcast.WatchStream pId={pId} />
    </>
  );
};

const Option3Broadcast = ({ pId }) => {
  return (
    <>
      Set api key and start a stream!
      <Markdown text={broadcastRemoteCode} />
      <Broadcast.GenerateStream
        url={"https://livepeer-webserver-613b208ef083.herokuapp.com"}
      />
      <Broadcast.Player />
      Or you can insert a playbackId and watch a stream:
      <Broadcast.WatchStream pId={pId} />
    </>
  );
};

const [selectedOption, setSelectedOption] = useState("apiKey");
const [selectedComponent, setSelectedComponent] = useState("player");
const [displayVideo, setDisplayVideo] = useState(false);
const [url, setUrl] = useState("");
const [pId, setPid] = useState("");
const [inputSet, setInputSet] = useState(false);
const [showVideo, setShowVideo] = useState(false);

function handleClick() {
  setShowVideo(!showVideo);
}

function resetUrl() {
  setUrl("");
  setInputSet(false);
}

return (
  <Container>
    Select which component you want to check:
    <Dropdown
      value={selectedComponent}
      onChange={(event) => setSelectedComponent(event.target.value)}
    >
      <option value="player">Player</option>
      <option value="broadcast">Broadcast</option>
    </Dropdown>
    Select how you want to initialise the components:
    <Dropdown
      value={selectedOption}
      onChange={(event) => setSelectedOption(event.target.value)}
    >
      <option value="apiKey">Provide api key</option>
      <option value="localServer">Use your local server</option>
      <option value="remoteServer">Use a remote server</option>
    </Dropdown>
    {selectedComponent === "player" && (
      <>
        {selectedOption === "apiKey" && <Option1 />}
        {selectedOption === "localServer" && (
          <>
            {!inputSet ? (
              <div>
                <StlyedInput
                  type="text"
                  onChange={(event) => setUrl(event.target.value)}
                  value={url}
                />
                <button onClick={() => setInputSet(true)}>Set url</button>
              </div>
            ) : (
              <>
                <span>using: {url}</span>
                <button onClick={resetUrl}>X</button>
              </>
            )}
            <Option2 url={url} />
          </>
        )}
        {selectedOption === "remoteServer" && (
          <Option3 showVideo={showVideo} handleClick={handleClick} />
        )}
      </>
    )}
    {selectedComponent === "broadcast" && (
      <>
        {selectedOption === "apiKey" && <Option1Broadcast />}
        {selectedOption === "localServer" && (
          <>
            {!inputSet ? (
              <div>
                <StlyedInput
                  type="text"
                  onChange={(event) => setUrl(event.target.value)}
                  value={url}
                />
                <button onClick={() => setInputSet(true)}>Set url</button>
                Provide a playbackId if you wanna watch a stream:
                <StlyedInput
                  type="text"
                  onChange={(event) => setPid(event.target.value)}
                  value={pId}
                />
              </div>
            ) : (
              <>
                <span>using: {url}</span>
                <button onClick={resetUrl}>X</button>
              </>
            )}
            <Option2Broadcast url={url} pId={pId} />
          </>
        )}
        {selectedOption === "remoteServer" && (
          <>
            <div>
              Provide a playbackId if you wanna watch a stream:
              <StlyedInput
                type="text"
                onChange={(event) => setPid(event.target.value)}
                value={pId}
              />
            </div>
            <Option3Broadcast pId={pId} />
          </>
        )}
      </>
    )}
  </Container>
);
