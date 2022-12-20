import hacker from '../assets/images/hacker.jpg';
import citynight from '../assets/images/citynight.jpg';
// import legs from '../assets/images/legs.jpg';
import club from '../assets/images/club.jpg';
import edge from '../assets/images/edge.jpg';
// import tweak from '../assets/images/tweak.jpg';
import snake from '../assets/images/snake.jpg';
import edgeMini from '../assets/images/edge-mini-close.jpg';
import glad from '../assets/images/glad.jpg';
import defaultPalette from './defaultPalette';
import buildDefaultOverrides from './defaultOverrides';

const images = {
  banners: {
    Cover: glad,
    Career: hacker,
    Comedy: club,
    Commerce: citynight,
    Video: snake,
  },
  profile: edge,
  miniProfile: edgeMini,
};

const palette = {
  ...defaultPalette,

  type: 'dark',
  // primary: {
  //   main: defaultPalette.green.main
  // },
  mainBackground: defaultPalette.gt.navy,
};

const { MuiPaper, MuiTypography, ...restOverrides } = buildDefaultOverrides(
  palette
);

const overrides = {
  MuiPaper: {
    ...MuiPaper,
    elevation1: {
      boxShadow:
        '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
    },
  },

  MuiTypography: {
    ...MuiTypography,
    root: {
      userSelect: 'none',
      '& a': {
        color: palette.primary.main,
      },
    },
  },

  ...restOverrides,
};

const nightGame = {
  images,
  palette,
  overrides,
};

export default nightGame;
