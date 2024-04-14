const { href } = VM.require("buildhub.near/widget/lib.url") || {
  href: () => {},
};

const { Button } = VM.require("video.every.near/widget/Components.button") || {
  Button: () => <></>,
};

const PoweredBy = styled.h3`
  display: flex;
  align-items: center;
  gap: 4px;

  color: #a5a5a5 !important;

  font-family: Poppins;
  font-size: 12px !important;
  line-height: 140% !important; /* 16.8px */
  font-weight: 400 !important;
  letter-spacing: -0.12px !important;
  margin-bottom: 8px !important;

  img {
    height: 12px;
    width: auto;
    object-fit: cover;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  h1 {
    color: #292c2a;
    font-family: Poppins;
    font-size: 24px;
    font-weight: 500;
    line-height: 130%; /* 31.2px */
    letter-spacing: -0.48px;
    margin: 0;
    text-wrap: balance;
  }

  h3 {
    color: #292c2a;
    font-family: Poppins;
    font-size: 18px;
    font-weight: 500;
    line-height: 150%; /* 27px */
    letter-spacing: -0.18px;
    margin-bottom: 8px;
  }

  p {
    color: #777d7a;
    font-family: Poppins;
    font-size: 16px;
    line-height: 150%; /* 24px */
    letter-spacing: -0.16px;
  }
`;

return (
  <Container>
    <div>
      <PoweredBy>
        Powered by{" "}
        <img src="https://ipfs.near.social/ipfs/bafkreia4rl6nknogzwwcj5qjladmgytyufxyl56fgr6nfjbwc6l5f6in4y" />
      </PoweredBy>
      <h1>
        Empower your blockchain app development with our comprehensive widget
        collection
      </h1>
    </div>
    <div>
      <h3>About Livepeer</h3>
      <p>
        Livepeer is pioneering a scalable, decentralized video infrastructure
        network that empowers developers and broadcasters to create powerful
        video applications.
      </p>
      <p>
        This a collection of widgets that can be used to build Livepeer apps on
        the Blockchain Operating System.
      </p>
    </div>
    <div className="d-flex align-items-center gap-2">
      <Link
        style={{ textDecoration: "none" }}
        to={href({
          widgetSrc: "video.every.near/widget/app",
          params: {
            page: "library",
            tab: "creator",
          },
        })}
      >
        <Button variant="primary">creator</Button>
      </Link>
      <Link
        style={{ textDecoration: "none" }}
        to={href({
          widgetSrc: "video.every.near/widget/app",
          params: {
            page: "library",
            tab: "player",
          },
        })}
      >
        <Button>player</Button>
      </Link>
    </div>
  </Container>
);
