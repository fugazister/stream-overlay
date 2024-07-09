import { PlaybackState, SpotifyApi } from '@spotify/web-api-ts-sdk';

import { ClientID } from '../secret';

const sdk = SpotifyApi.withUserAuthorization(ClientID, 'http://localhost:5173/', ['user-read-currently-playing']);

export function getCurrentlyPlayingTrack(cb: (state: PlaybackState) => void) {
	sdk.player.getCurrentlyPlayingTrack().then(state => {
		cb(state);
	});
}
