import { Track } from '@spotify/web-api-ts-sdk';
import { getCurrentlyPlayingTrack } from './current-music.service';

import { div, img } from '../lib/thingy';

const style = `
	.container {
		display: flex;
		background-color: #333;
		padding: 16px;
		border-radius: 10px;
		color: #fff;
	}

	.album-art {
		width: 256px;
		height: 256px;
		margin-right: 24px;
	}
	
	.album-info {
		display: flex;
		flex-direction: column;
		font-size: 16px;
	}

	.artist,
	.track {
		margin-bottom: 16px;
	}
`;

class CurrentMusicComponent extends HTMLElement {
	shadow: ShadowRoot | null = null;
	
	constructor() {
		super();
	}

	connectedCallback(): void {
		this.shadow = this.attachShadow({ mode: 'open' });
		const styleElement = document.createElement('style');
		styleElement.textContent = style;
		this.shadow.appendChild(styleElement);


		const albumArt = img({ classNames: ['album-art'] });
		const albumName = div({ classNames: ['album-name'], innerText: '-' });
		const artistName = div({ classNames: ['artist'], innerText: '-' })
		const trackName = div({ classNames: ['track'], innerText: '-' });

		const albumInfo = div({ classNames: ['album-info' ], children: [
				artistName,
				trackName,
				albumName,
			]
		});
		const template = div({ classNames: ['container'], children: [albumArt, albumInfo] });
	
		this.shadow.appendChild(template());

		setInterval(() => {
			getCurrentlyPlayingTrack(state => {
				if (state !== null) {
					const item = state.item as Track;
					const aritsts = item.artists;
					const images = item.album.images;
					const album = item.album;
	
					const artistName2 = aritsts.map(artist => artist.name).join(' ');
					artistName.changeInnerText(artistName2);
					trackName.changeInnerText(item.name);
					albumName.changeInnerText(album.name);
	
					const image = images[0];
	
					albumArt.changeAttributes([{ src: image.url }])
				}
			});
		}, 5000);
	}
}

export const currentMusicSelector = 'current-music';

customElements.define(currentMusicSelector, CurrentMusicComponent);