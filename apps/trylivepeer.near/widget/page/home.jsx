return (
  <div className="container">
    <div className="row my-4">
      <div className="col-12">
        <div className="d-flex flex-wrap justify-content-between">
          {/* Placeholder for the nine circles */}
          {[...Array(9)].map((_, idx) => (
            <div key={idx} className="m-2">
              <div
                className="rounded-circle border"
                style={{ width: "100px", height: "100px" }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="row">
      <div className="col-6">
        <div className="border p-3">
          <p>description</p>
        </div>
      </div>
      <div className="col-3">
        <Link to="/trylivepeer.near/widget/index?page=social">
          <button className="button">Social</button>
        </Link>
      </div>
      <div className="col-3">
        <Link to="/trylivepeer.near/widget/index?page=sandbox">
          <button className="button">Sandbox</button>
        </Link>
      </div>
    </div>
  </div>
);
