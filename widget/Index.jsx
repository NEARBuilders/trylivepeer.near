const config = {
  theme: {},
  layout: {
    src: "${alias_devs}/widget/Layout",
    props: {
      variant: "standard",
    },
  },
  blocks: {
    Header: () => (
      <div className="header-container">
        <div></div>
        <div className="header-content">
          <h1 className="header-title">trylivepeer</h1>
          <div className="flex gap-4">
            <Link to={`/${config_account}/widget/index?page=social`}>
              <button className="header-button">Social</button>
            </Link>
            <Link to={`/${config_account}/widget/index?page=sandbox`}>
              <button className="header-button">Sandbox</button>
            </Link>
            <Link to={`/${config_account}/widget/index?page=library`}>
              <button className="header-button">Library</button>
            </Link>
          </div>
        </div>
      </div>
    ),
    // customize the footer
    Footer: () => (
      <div className="footer-wrapper">
        <div className="footer-container">
          <div className="footer-content">
            Powered by livepeer, built on NEAR, a part of everything
          </div>
        </div>
      </div>
    ),
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
          ...props,
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

  background-color: black;

  .header-container {
    top: 100px;
    background-color: black;

    margin-bottom: 20px;
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
  }

  .header-title {
    color: gray;
    font-size: 50px;
    font-weight: bold;
    font-family: inherit;
  }
  .header-button {
    background-color: #23242b;
    color: #dde4e1;
    font-weight: 600;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: opacity 0.3s ease, background-color 0.3s ease;
    &:hover {
      opacity: 1;
      background-color: #555555;
    }
  }
  .footer-wrapper {
    display: flex;
    justify-content: center;
  }

  .footer-container {
    position: sticky;
    width: 540px;
    background-color: #2d2d2d;
    color: #dde4e1;
    padding: 20px;
    text-align: center;
    justify-content: center;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  .footer-content {
    font-size: 14px;
    font-weight: 600;
  }

  @media (min-width: 768px) {
    .footer-content {
      flex-direction: row;
      justify-content: space-between;
      padding: 0 20px;
    }
  }
`;

return (
  <CSS>
    <Widget src="${alias_every}/widget/app.view" props={{ config, ...props }} />
  </CSS>
);
