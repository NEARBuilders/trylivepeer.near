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

const Option3 = () => (
  <OptionComponent>
    <Player.FileUploader
      url={"https://livepeer-webserver-613b208ef083.herokuapp.com"}
    />
    <Player.Display />
  </OptionComponent>
);

const [selectedOption, setSelectedOption] = useState("apiKey");
const [url, setUrl] = useState("");

const handleSelectOption = (event) => {
  setSelectedOption(event.target.value);
};

function handleInputChange(event) {
  setUrl(event.target.value);
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
        <input type="text" onChange={handleInputChange} value={url} />
        <Option2 url={url} />
      </>
    )}
    {selectedOption === "remoteServer" && <Option3 />}
  </div>
);
