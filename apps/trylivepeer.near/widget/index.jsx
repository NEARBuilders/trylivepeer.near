const config = {
  theme: {},
  layout: {
    src: "devs.near/widget/Layout",
    props: {
      variant: "standard",
    },
  },
  blocks: {
    // customize the header
    Header: () => (
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center border p-3">
            <h1>trylivepeer</h1>
            <button className="button">Connect</button>
          </div>
        </div>
      </div>
    ),
    // customize the footer
    Footer: () => <>powered by livepeer, built on near, a part of everything</>,
  },
  router: {
    param: "page",
    routes: {
      index: {
        path: "trylivepeer.near/widget/page.home", // edit this locally
        blockHeight: "final",
        init: {
          name: "Home",
        },
        default: true,
      },
      sandbox: {
        path: "trylivepeer.near/widget/page.sandbox",
        blockHeight: "final",
        init: {
          name: "Sandbox",
        },
      },
      // or add more routes
    },
  },
};

const CSS = styled.div`
  .button {
  }

  height: 100vh;
`;

return (
  <CSS>
    <Widget src="every.near/widget/app.view" props={{ config, ...props }} />
  </CSS>
);
