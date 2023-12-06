import {AnimScene} from './anim.mjs';

const frame = document.getElementById('frame');
const width = frame.viewBox.baseVal.width;
const height = frame.viewBox.baseVal.height;
document.scene = new AnimScene(frame, width, height, [6, 5, 4, 3, 2, 1]);