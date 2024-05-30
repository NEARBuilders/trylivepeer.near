const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  color: #a5a5a5;

  h4 {
    font-size: 18px;
    font-weight: 700;
    margin-top: 16px;
  }

  .player-component {
    margin-bottom: 16px;
  }
`;

return (
  <ContentContainer>
    <h4>1. Add the api key:</h4>
    <Broadcast.ApiKey />
    <h4>2. Generate a stream key:</h4>
    <Broadcast.GenerateStream />
    <h4>3. Stream:</h4>
    <Broadcast.Player />
    <Broadcast.Debug />
  </ContentContainer>
);
