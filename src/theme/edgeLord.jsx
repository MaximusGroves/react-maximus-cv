import chip from '../assets/images/chip.jpg';
import joker from '../assets/images/joker.jpg';
import matrix from '../assets/images/matrix.jpg';
import edge from '../assets/images/edge.jpg';
import glad from '../assets/images/glad.jpg';

import defaultPalette from './defaultPalette';

const edgeLord = {
  images: {
    banners: {
      Cover: glad,
      Career: matrix,
      Comedy: joker,
      Commerce: chip,
    },
    profile: edge,
  },

  palette: {
    mainBackground: defaultPalette.gray.f5,
    ...defaultPalette
  }
};

export default edgeLord;
