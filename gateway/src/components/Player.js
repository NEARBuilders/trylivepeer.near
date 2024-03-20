import * as Player from "@livepeer/react/player";
import { getSrc } from "@livepeer/react/external";

const PLAYBACK_ID = "8b3bdqjtdj4jsjwa";

export const getPlaybackSource = async (playbackId = PLAYBACK_ID) => {
	const playbackInfo = await livepeer.playback.get(playbackId);
	const src = getSrc(playbackInfo.playbackInfo);
	return src;
};

export const VideoPlayer = (props) => {
	// export const DemoPlayer = ({ src }: { src: Src | null }) => {

	const src = getPlaybackSource();

	return (
		<Player.Root src={src}>
			<Player.Container>
				<Player.Video title="Live stream" />
				<Player.Controls className="flex items-center justify-center">
					<Player.PlayPauseTrigger className="w-10 h-10">
						<Player.PlayingIndicator asChild matcher={false}>
							<PlayIcon />
						</Player.PlayingIndicator>
						<Player.PlayingIndicator asChild>
							<PauseIcon />
						</Player.PlayingIndicator>
					</Player.PlayPauseTrigger>
				</Player.Controls>
			</Player.Container>
		</Player.Root>
	);
};
