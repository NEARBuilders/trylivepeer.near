const [displayVideo, setDisplayVideo] = useState(false);

return (
  <OptionComponent>
    <div>
      How to upload a video:
      <Player.FileUploader
        url={"https://livepeer-webserver-613b208ef083.herokuapp.com"}
      />
      <Player.Display />
    </div>
    <div>
      how to display a video already uploaded starting from the playback id:
      <button type="button" onClick={() => setDisplayVideo(true)}>
        Play video
      </button>
      {displayVideo && (
        <Player.Display
          url={"https://livepeer-webserver-613b208ef083.herokuapp.com"}
          playbackId={"62fa7rxnbjzmoj2a"}
        />
      )}
    </div>
  </OptionComponent>
);
