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

const Option1 = () => (
  <OptionComponent>
    Api key
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
      <Player.FileUploader url={url} />
      <Player.Display />
    </OptionComponent>
  );
};

const UploadVideoRemoteCode = `
\`\`\`js
<Player.FileUploader
	url={"https://livepeer-webserver-613b208ef083.herokuapp.com"}
/>
<Player.Display />
\`\`\`
`;

const DisplayVideoRemoteCode = `
\`\`\`js
<Player.Display
	url={"https://livepeer-webserver-613b208ef083.herokuapp.com"}
	playbackId={"62fa7rxnbjzmoj2a"}
/>
\`\`\`
`;

const Option3 = ({ showVideo, handleClick }) => {
  return (
    <OptionComponent>
      <div>
        How to upload a video:
        <Markdown text={UploadVideoRemoteCode} />
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
        <Markdown text={DisplayVideoRemoteCode} />
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

const [selectedOption, setSelectedOption] = useState("apiKey");
const [displayVideo, setDisplayVideo] = useState(false);
const [url, setUrl] = useState("");
const [inputSet, setInputSet] = useState(false);
const [showVideo, setShowVideo] = useState(false);

function handleClick() {
  setShowVideo(!showVideo);
}

const handleSelectOption = (event) => {
  setSelectedOption(event.target.value);
};

function resetUrl() {
  setUrl("");
  setInputSet(false);
}

return (
  <div className="container">
    Select how you want to initialise the components:
    <Dropdown value={selectedOption} onChange={handleSelectOption}>
      <option value="apiKey">Provide api key</option>
      <option value="localServer">Use your local server</option>
      <option value="remoteServer">Use a remote server</option>
    </Dropdown>
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
  </div>
);
