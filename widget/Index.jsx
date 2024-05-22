const config = {
  theme: {},
  layout: {
    src: "${alias_devs}/widget/Layout",
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
            <div>
              <Link to="/${config_account}/widget/index?page=social">
                <button className="button">Social</button>
              </Link>
              <Link to="/${config_account}/widget/index?page=sandbox">
                <button className="button">Sandbox</button>
              </Link>
              <Link to="/${config_account}/widget/index?page=library">
                <button className="button">Library</button>
              </Link>
            </div>
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
        path: "${config_account}/widget/page.home", // edit this locally
        blockHeight: "final",
        init: {
          name: "Home",
        },
        default: true,
      },
      sandbox: {
        path: "${config_account}/widget/page.sandbox",
        blockHeight: "final",
        init: {
          name: "Sandbox",
        },
      },
      library: {
        path: "${config_account}/widget/Library.index",
        blockHeight: "final",
        init: {
          name: "Library",
          ...props
        },
      },
      social: {
        path: "${config_account}/widget/page.social",
        blockHeight: "final",
        init: {
          name: "Social",
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
    <Widget src="${alias_every}/widget/app.view" props={{ config, ...props }} />
  </CSS>
);
