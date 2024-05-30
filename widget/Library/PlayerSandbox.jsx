const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  color: #a5a5a5;

  h4 {
    font-size: 18px;
    font-weight: 700;
    margin-top: 16px;
  }

  .player-component {
    margin-bottom: 16px;
  }
`;

return (
  <ContentContainer>
    <h4>1. Set up API key:</h4>
    <div className="player-component">
      <Player.ApiKey />
    </div>
    <h4>2. Create an asset object:</h4>
    <div className="player-component">
      <Player.GetUploadUrl />
    </div>
    <h4>3. Upload the asset directly:</h4>
    <div className="player-component">
      <Player.DirectUploadAsset />
    </div>
    <h4>3a. Or with resumable upload (more reliable):</h4>
    <div className="player-component">
      <Player.ResumableUploadAsset />
    </div>
    <h4>4. Get the `src` object</h4>
    <div className="player-component">
      <Player.GetSrc />
    </div>
    <h4>5. Display the asset</h4>
    <div className="player-component">
      <Player.Display value={props.key} props={props.playerProps} />
    </div>
    <div className="player-component">
      <Player.Debug />
    </div>
  </ContentContainer>
);
