const data = {
  key: "value",
};

return (
  <>
    <div className="row">
      <div className="col">
        <div>
          <h1>Player</h1>
          <Widget src="trylivepeer.near/widget/Player" props={data} />
        </div>
      </div>
      <div className="col">
        <div>
          <h1>Broadcast</h1>
          <Widget src="trylivepeer.near/widget/Broadcast" props={data} />
        </div>
      </div>
    </div>
  </>
);
