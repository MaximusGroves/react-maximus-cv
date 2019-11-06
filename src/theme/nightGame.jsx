import hacker from '../assets/images/hacker.jpg';
import legs from '../assets/images/legs.jpg';
import pirate from '../assets/images/pirate.jpg';
import club from '../assets/images/club.jpg';
import walker from '../assets/images/walker.jpg';

import defaultPalette from './defaultPalette';

const {primary, ...rest} = defaultPalette

const nightGame = {
  images: {
    banners: {
      Cover: pirate,
      Career: hacker,
      Comedy: club,
      Commerce: legs,
    },
    profile: walker,
  },

  palette: {
    type: 'dark',
    primary:{
      // main:'#7d7249',
      main: defaultPalette.gt.gold,
    },
    mainBackground: defaultPalette.gt.navy,
    ...rest,
  },
};

export default nightGame;
