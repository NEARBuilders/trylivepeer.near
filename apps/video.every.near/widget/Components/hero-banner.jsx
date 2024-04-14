const { Button } = VM.require("video.every.near/widget/Components.button") || {
  Button: () => <></>,
};

const { href } = VM.require("buildhub.near/widget/lib.url") || {
  href: () => {},
};

const Heading = styled.h2`
  color: #171717;
  font-family: Poppins;
  font-size: 32px;
  letter-spacing: -1.28px;
  margin: 0;

  span {
    font-weight: 600;
  }
`;

const SubHeading = styled.h3`
  display: flex;
  align-items: center;
  gap: 8px;

  color: #6f6f6f;
  font-family: Poppins;
  font-size: 12px;
  line-height: 140%; /* 16.8px */
  letter-spacing: -0.12px;
  margin: 0;

  img {
    height: 12px;
    width: auto;
    object-fit: cover;
  }
`;

const BannerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
`;

const CodeIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M12.0002 10.6667L14.6668 8.00002L12.0002 5.33335M4.00016 5.33335L1.3335 8.00002L4.00016 10.6667M9.66683 2.66669L6.3335 13.3334"
        stroke="#171717"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const CreateIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M3.33333 2V4.66667M12.6667 11.3333V14M2 3.33333H4.66667M11.3333 12.6667H14M8 2L6.72533 5.87533C6.6601 6.07367 6.5492 6.25392 6.40156 6.40156C6.25392 6.5492 6.07367 6.6601 5.87533 6.72533L2 8L5.87533 9.27467C6.07367 9.3399 6.25392 9.4508 6.40156 9.59844C6.5492 9.74608 6.6601 9.92633 6.72533 10.1247L8 14L9.27467 10.1247C9.3399 9.92633 9.4508 9.74608 9.59844 9.59844C9.74608 9.4508 9.92633 9.3399 10.1247 9.27467L14 8L10.1247 6.72533C9.92633 6.6601 9.74608 6.5492 9.59844 6.40156C9.4508 6.25392 9.3399 6.07367 9.27467 5.87533L8 2Z"
        stroke="#FCFCFC"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const HeroBanner = () => {
  return (
    <BannerContainer>
      <div>
        <Heading>
          <span>every.</span>video on NEAR
        </Heading>
        <SubHeading>
          Powered by{" "}
          <img src="https://ipfs.near.social/ipfs/bafkreia4rl6nknogzwwcj5qjladmgytyufxyl56fgr6nfjbwc6l5f6in4y" />
        </SubHeading>
      </div>
      <div className="d-flex align-items-center flex-wrap gap-2">
        <Link
          style={{ textDecoration: "none" }}
          to={href({
            widgetSrc: "video.every.near/widget/app",
            params: {
              page: "library",
            },
          })}
        >
          <Button>
            <CodeIcon /> component library
          </Button>
        </Link>
        <Button variant="primary">
          <CreateIcon /> create
        </Button>
      </div>
    </BannerContainer>
  );
};

return { HeroBanner };
