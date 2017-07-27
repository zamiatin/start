'use strict';

import Welcome from './welcome';
import About from './about';
import styles from './style/home.scss';
import image from './test.png';

const div = document.getElementById('title');
const img = new Image();
img.src = image;
div.append(img);
Welcome("zamnya!!!");

exports.welcome = Welcome;