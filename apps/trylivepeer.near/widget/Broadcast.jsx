// we use the custom VM component
// which renders gateway/components/Broadcast
return (
  <>
    {/* need to be explicit with props when passing from widget to VM */}
    <Broadcast value={props.key} />
  </>
);
