import bricks from '../assets/images/bricks.jpg';
import coffee from '../assets/images/coffee.jpg';
import torsos from '../assets/images/torsos.jpg';
import tweak from '../assets/images/tweak.jpg';
import max from '../assets/images/profileMaxTiny.jpg';

import defaultPalette from './defaultPalette';

const schoolSpirit = {
  images: {
    banners: {
      Cover: tweak,
      Career: coffee,
      Comedy: bricks,
      Commerce: torsos
    },
    profile: max
  },

  palette: {
    mainBackground: defaultPalette.gray.f5,
    ...defaultPalette
  }
};

export default schoolSpirit;
