import './style.css';

import { currentMusicSelector } from './current-music/current-music.component';

const currentMusic = document.createElement(currentMusicSelector);

document.querySelector('#app')!.appendChild(currentMusic); 