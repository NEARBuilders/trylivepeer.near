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
      <Widget
        src="video.every.near/widget/header"
        loading=""
        props={{ routes: config.router.routes, ...props }}
      />
    ),
    Footer: () => <></>, // customize your footer
  },
  router: {
    param: "page",
    routes: {
      home: {
        path: "video.every.near/widget/browse",
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

const poppinsCSS = fetch(
  "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
).body;

const Root = styled.div`
  .container {
    border: none !important;
  }
  ${poppinsCSS}
  font-family: "Poppins", sans-serif;
`;

return (
  <Root>
    <Widget
      src="video.every.near/widget/app.view"
      props={{ config, ...props }}
      loading=""
    />
  </Root>
);
