import hacker from '../assets/images/hacker.jpg';
import citynight from '../assets/images/citynight.jpg';
import legs from '../assets/images/legs.jpg';
import club from '../assets/images/club.jpg';
import edge from '../assets/images/edge.jpg';
import glad from '../assets/images/glad.jpg';
import defaultPalette from './defaultPalette';
import buildDefaultOverrides from './defaultOverrides';


const images = {
  banners: {
    Cover: glad,
    Career: hacker,
    Comedy: club,
    Commerce: citynight,
  },
  profile: edge,
};

const {primary, ...restPalette} = defaultPalette;

const palette = {
  type: 'dark',
  primary:{
    main: defaultPalette.gt.gold,
  },
  mainBackground: defaultPalette.gt.navy,
  ...restPalette,
}

const { MuiPaper, ...restOverrides } = buildDefaultOverrides(palette);

const overrides = {
  MuiPaper: {
    elevation1: {
      boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
    },
    ...MuiPaper,
  },

  ...restOverrides,
}

const nightGame = {
  images,
  palette,
  overrides
};

export default nightGame;
