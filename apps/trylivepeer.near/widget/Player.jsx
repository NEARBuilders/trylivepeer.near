// we use the custom VM component
// which renders gateway/components/Player
return (
  <>
    <Player.GetSrc />
    <Player.Display value={props.key} {...props.playerProps} />
  </>
);
