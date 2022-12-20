import gordon from '../assets/images/gordon.jpg';
import joker from '../assets/images/joker.jpg';
import matrix from '../assets/images/matrix.jpg';
import tweak from '../assets/images/tweak.jpg';
import snake from '../assets/images/snake2.jpg';
import walker from '../assets/images/walker.jpg';
import walkerMini from '../assets/images/walker-mini-close.jpg';
import pirate from '../assets/images/pirate.jpg';

import defaultPalette from './defaultPalette';
import buildDefaultOverrides from './defaultOverrides';

const images = {
  banners: {
    Cover: pirate,
    Career: matrix,
    Comedy: joker,
    Commerce: gordon,
    Video: snake,
  },
  profile: walker,
  miniProfile: walkerMini,
};

const palette = {
  mainBackground: defaultPalette.gray.f5,
  // backgroundTile:
  ...defaultPalette,
};

const defaultOverrides = buildDefaultOverrides(palette);

const overrides = {
  ...defaultOverrides,
};

const edgeLord = {
  images,
  palette,
  overrides,
};

export default edgeLord;
