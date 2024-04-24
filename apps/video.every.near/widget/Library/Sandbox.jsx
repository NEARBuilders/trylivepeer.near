return (
  <>
    <h4>1. create an asset object:</h4>
    <Player.GetUploadUrl />
    <h4>2. upload the asset directly:</h4>
    <Player.DirectUploadAsset />
    <h4>2. or with resumable upload (more reliable):</h4>
    <Player.ResumableUploadAsset />
    <h4>3. get the `src` object</h4>
    <Player.GetSrc />
    <h4>4. Display the asset</h4>
    <Player.Display value={props.key} props={props.playerProps} />
    <Player.Debug />
  </>
);
