// import bricks from '../assets/images/bricks.jpg';
// import wallmic from '../assets/images/wallmic.jpg';
import writer from '../assets/images/writer.jpg';
import coffee from '../assets/images/coffee.jpg';
import torsos from '../assets/images/torsos.jpg';
import legs from '../assets/images/legs.jpg';
import tweak from '../assets/images/tweak.jpg';
import max from '../assets/images/profileMaxTiny.jpg';

import defaultPalette from './defaultPalette';
import buildDefaultOverrides from './defaultOverrides';


const images = {
  banners: {
    Cover: tweak,
    Career: coffee,
    Comedy: writer,
    Commerce: legs
  },
  profile: max,
};

const palette = {
  mainBackground: defaultPalette.gray.f5,
  ...defaultPalette
};

const overrides = buildDefaultOverrides(palette);

const schoolSpirit = {
  images,
  palette,
  overrides,
};

export default schoolSpirit;
