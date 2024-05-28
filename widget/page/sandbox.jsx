const playerData = {
  key: "value",
  playerProps: {
    playbackId: "8b3bdqjtdj4jsjwa",
  },
};

const broadcastData = {};

return (
  <>
    <div className="row">
      <div className="col">
        <div>
          <h1>Player</h1>
          <Widget src="${config_account}/widget/Player" props={playerData} />
        </div>
      </div>
      <div className="col">
        <div>
          <h1>Broadcast</h1>
          <Widget
            src="${config_account}/widget/GenerateStream"
            props={broadcastData}
          />
          <Widget
            src="${config_account}/widget/Broadcast"
            props={broadcastData}
          />
        </div>
      </div>
    </div>
    <Widget src="${config_account}/widget/Library" />
  </>
);
