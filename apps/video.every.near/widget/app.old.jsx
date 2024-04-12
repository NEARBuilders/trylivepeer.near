const config = {
  theme: {
    // add key values to define colors
    // "--main-color": "blue",
    // "--secondary-color": "red",
    // background: "var(--main-color)",
    // color: "var(--secondary-color)",
  },
  layout: {
    src: "devs.near/widget/Layout",
    props: {
      variant: "standard",
    },
  },
  blocks: {
    // these get passed to the layout and children
    Header: () => (
      // customize your header
      <Widget
        src="video.every.near/widget/header.old"
        props={{ routes: config.router.routes, ...passProps }}
      />
    ),
    Footer: () => <></>, // customize your footer
  },
  router: {
    param: "page",
    routes: {
      home: {
        path: "video.every.near/widget/browse.old",
        blockHeight: "final",
        init: {
          name: "Browse",
        },
        default: true,
      },
      create: {
        path: "video.every.near/widget/create",
        blockHeight: "final",
        init: {
          name: "Create",
        },
      },
      view: {
        path: "video.every.near/widget/view",
        blockHeight: "final",
        init: {
          name: "View",
          path: props.path,
          blockHeight: props.blockHeight,
        },
      },
      library: {
        path: "video.every.near/widget/Library.index",
        blockHeight: "final",
        init: {
          name: "View",
          path: props.path,
          blockHeight: props.blockHeight,
        },
      },
    },
  },
};

const Root = styled.div`
  .container {
    border: none !important;
  }
`;

return (
  <Root>
    <Widget src="every.near/widget/app.view" props={{ config, ...props }} />
  </Root>
);
