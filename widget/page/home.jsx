const Dropdown = styled.select`
  ping: 10px;
  margin: 20px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const OptionComponent = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
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

const Option1Broadcast = ({ pId }) => {
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
      <Markdown text={broadcastApiKeyCode} />
      <Broadcast.GenerateStream url={url} />
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
  <div className="container">
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
                <input
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
                <input
                  type="text"
                  onChange={(event) => setUrl(event.target.value)}
                  value={url}
                />
                <button onClick={() => setInputSet(true)}>Set url</button>
                Provide a playbackId if you wanna watch a stream:
                <input
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
      </>
    )}
  </div>
);
