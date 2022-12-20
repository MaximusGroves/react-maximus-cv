// import bricks from '../assets/images/bricks.jpg';
// import wallmic from '../assets/images/wallmic.jpg';
// import torsos from '../assets/images/torsos.jpg';
import writer from '../assets/images/writer.jpg';
import coffee from '../assets/images/coffee.jpg';
import legs from '../assets/images/legs.jpg';
// import tweak from '../assets/images/tweak.jpg';
import snake from '../assets/images/snake.jpg';

// import max from '../assets/images/profileMaxTiny.jpg';
// import max from '../assets/images/profileoutdoor.jpg';
import max from '../assets/images/profileAI.jpg';

// import maxMini from '../assets/images/profileMaxTiny-mini-close.jpg';
// import maxMini from '../assets/images/profileoutdoor-mini-close.jpg';
import maxMini from '../assets/images/profileAImini.jpg';

import defaultPalette from './defaultPalette';
import buildDefaultOverrides from './defaultOverrides';

const images = {
  banners: {
    Cover: snake,
    Career: coffee,
    Comedy: writer,
    Commerce: legs,
    Video: snake,
  },
  profile: max,
  miniProfile: maxMini,
};

const palette = {
  ...defaultPalette,
  mainBackground: defaultPalette.gray.f5,
};

const overrides = buildDefaultOverrides(palette);

const schoolSpirit = {
  images,
  palette,
  overrides,
};

export default schoolSpirit;
