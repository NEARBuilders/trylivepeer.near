// we use the custom VM component
// which renders gateway/components/Broadcast
// return (
//   <>
//     {/* need to be explicit with props when passing from widget to VM */}
//     <Broadcast value={props.key} />
//   </>


// );

 return (
   <>
     {/* need to be explicit with props when passing from widget to VM */}
     <BroadcastComponent value={props.key}>
				<BroadcastComponent.Player />
			</BroadcastComponent>
   </>
 );
