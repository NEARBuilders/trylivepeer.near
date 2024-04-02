// we use the custom VM component
// which renders gateway/components/Player
return (
  <>
    {/* need to be explicit with props when passing from widget to VM */}
    <Player value={props.key} props={props.playerProps}/>
  </>
);
