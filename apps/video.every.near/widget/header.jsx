const { Button } = VM.require("video.every.near/widget/Components.button") || {
  Button: () => <></>,
};

const { href } = VM.require("buildhub.near/widget/lib.url") || {
  href: () => {},
};

const Header = styled.div`
  border-bottom: 1px solid #e2e2e2;
  background: #fff;
  padding: 16px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    height: 32px;
    width: auto;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const logoUrl =
  "https://ipfs.near.social/ipfs/bafkreigkltpi3n6zltlryzfa7ipfyjz2vm3bdaizy6i6hinsjjudyldrtq";

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

const BellIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M6.8667 14C6.97829 14.2029 7.14233 14.3722 7.34169 14.4901C7.54106 14.608 7.76842 14.6702 8.00003 14.6702C8.23165 14.6702 8.45901 14.608 8.65837 14.4901C8.85773 14.3722 9.02178 14.2029 9.13337 14M4 5.33331C4 4.27245 4.42143 3.25503 5.17157 2.50489C5.92172 1.75474 6.93913 1.33331 8 1.33331C9.06087 1.33331 10.0783 1.75474 10.8284 2.50489C11.5786 3.25503 12 4.27245 12 5.33331C12 9.99998 14 11.3333 14 11.3333H2C2 11.3333 4 9.99998 4 5.33331Z"
        stroke="#171717"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const [open, setOpen] = useState(false);
const toggleOpen = () => {
  setOpen((prev) => !prev);
};

const Dropdown = styled.div`
  max-height: ${({ open }) => (open ? "500px" : "0")};
  overflow: hidden;
`;

return (
  <>
    <Header>
      <Link
        to={href({
          widgetSrc: "video.every.near/widget/app",
        })}
      >
        <img src={logoUrl} />
      </Link>
      <div className="d-none d-md-flex align-items-center gap-2">
        <Button type="icon">
          <CodeIcon />
        </Button>
        <Button type="icon">
          <BellIcon />
        </Button>
        <Button variant="primary">connect</Button>
      </div>
      <div className="d-md-none">
        <Button type="icon" onClick={toggleOpen}>
          <i className="bi bi-list"></i>
        </Button>
      </div>
    </Header>
    <Dropdown open={open}>
      <div
        className="d-md-none d-flex flex-column gap-2 p-3"
        style={{
          borderBottom: "1px solid #e2e2e2",
        }}
      >
        <Button onClick={toggleOpen}>
          <CodeIcon /> source
        </Button>
        <Button onClick={toggleOpen}>
          <BellIcon /> notifications
        </Button>
        <Button onClick={toggleOpen} variant="primary">
          connect
        </Button>
      </div>
    </Dropdown>
  </>
);
