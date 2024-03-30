const playerData = {
  key: "value",
	playerProps: {
		playbackId: "8b3bdqjtdj4jsjwa",
	}
};

const broadcastData = {}

const { Tailwind } = VM.require("klngrs.near/widget/Tailwind") || {
  TailwindWrapper: () => <></>,
};

return (
  <>
    <div className="row">
      <div className="col">
        <div>
          <h1>Player</h1>
					<Tailwind>
          	<Widget src="trylivepeer.near/widget/Player" props={playerData} />
					</Tailwind>
        </div>
      </div>
      <div className="col">
        <div>
          <h1>Broadcast</h1>
					<Tailwind>
          	<Widget src="trylivepeer.near/widget/Broadcast" props={broadcastData} />
					</Tailwind>
        </div>
      </div>
    </div>
    <Widget src="trylivepeer.near/widget/Library" />
  </>
);
