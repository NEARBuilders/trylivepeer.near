return (
  <>
    <h4>1. set up api key:</h4>
    <Player.ApiKey />
    <h4>2. create an asset object:</h4>
    <Player.GetUploadUrl />
    <h4>3. upload the asset directly:</h4>
    <Player.DirectUploadAsset />
    <h4>3a. or with resumable upload (more reliable):</h4>
    <Player.ResumableUploadAsset />
    <h4>4. get the `src` object</h4>
    <Player.GetSrc />
    <h4>5. Display the asset</h4>
    <Player.Display value={props.key} props={props.playerProps} />
    <Player.Debug />
  </>
);
