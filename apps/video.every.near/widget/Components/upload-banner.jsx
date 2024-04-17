const { Button } = VM.require("video.every.near/widget/Components.button") || {
  Button: () => <></>,
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
  color: #6f6f6f;
  font-family: Poppins;
  font-size: 12px;
  line-height: 140%; /* 16.8px */
  letter-spacing: -0.12px;
  margin: 0;
`;

const BannerContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: black;

  border-radius: 8px;
  border: 1px solid #c7c7c7;

  img {
    height: 100%;
    object-fit: cover;
    aspect-ratio: 138 / 59;
    border-radius: 8px 0 0 8px;
    vertical-align: top;
  }

  .img-container {
    border-radius: 8px 0 0 8px;
    height: inherit;
    max-width: 35%;
  }

  .content {
    padding: 24px;
    display: flex;
    flex-direction: column;
    background-color: white;
    align-self: stretch;
    justify-content: center;
    width: 100%;
    border-radius: 0 8px 8px 0;
    gap: 24px;

    h4 {
      color: #292c2a;
      font-family: Poppins;
      font-size: 18px;
      font-weight: 500;
      line-height: 150%; /* 27px */
      letter-spacing: -0.18px;
      margin-bottom: 8px;
    }

    p {
      color: var(--Gray-Light-11, #6f6f6f);
      font-family: Poppins;
      font-size: 14px;
      line-height: 140%; /* 19.6px */
      letter-spacing: -0.14px;
      margin: 0;
    }
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;

    .img-container {
      max-width: 100%;
      border-radius: 8px 8px 0 0;
      height: 128px;
      margin: 0 auto;
    }

    .content {
      border-radius: 0 0 8px 8px;
    }
  }
`;

const imageUrl =
  "https://ipfs.near.social/ipfs/bafkreihwn3bhw73lv76kqlngczcsgqyjcmwzirpb6funfigqmotql7deaq";

const UploadBanner = () => {
  return (
    <BannerContainer>
      <div className="img-container">
        <img src={imageUrl} />
      </div>
      <div className="content">
        <div>
          <h4>Welcome to every.video on Near!</h4>
          <p>
            Craft and customize your own video app effortlessly with Near.
            Unleash your creativity and showcase your unique style in every
            frame.
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <Button variant="primary">upload</Button>
          <Button>create</Button>
        </div>
      </div>
    </BannerContainer>
  );
};

return { UploadBanner };
