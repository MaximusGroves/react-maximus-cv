import React from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

import { withTheme, withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import CrossFadeImage from 'react-crossfade-image';

import { writeImgUrl } from 'helpers';

const style = theme => ({
  viewRoot: {
    overflowX: 'hidden',
    width: '100vw',
    height: '100%',
  },

  parallaxBg: {
    position: 'fixed',
    textAlign: 'center',
    overflow: 'hidden',
    width: '100vw',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'unset',
      right: 0,
      left: 0,
      margin: 'auto',
    },
  },

  parallaxContent: {
    position: 'absolute',
    overflowY: 'auto',
    top: 0,
    width: '100vw',
    overflowX: 'hidden',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'unset',
      right: 0,
      left: 0,
      margin: 'auto',
    },
  },

  bannerSpace: {
    paddingTop: 400,
    [theme.breakpoints.down('md')]: {
      paddingTop: 'calc( 400px - ( ( 1300px - 100vw) / 13 * 4 )  )',
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: 184,
      paddingBottom: 60,
    },
  },
});

const ViewPage = componentProps => {
  const {
    classes,
    theme,
    width,
    thisPage,
    pageNumber,
    currentPage,
    viewProps,
    topNudge,
    subtractVal,
    totalPages,
    changeTab,
    hideOthers,
    lastScroll,
  } = componentProps;

  const [bannerProps, setBannerSpring] = useSpring(() => ({
    transform: `translate3d(${(pageNumber - currentPage) * 100}vw, 0px, 0px)`,
    xyz: [(pageNumber - currentPage) * 100, 0, 0],
    config: { mass: 1, tension: 170, friction: 36 },
  }));

  const [contentProps, setContentSpring] = useSpring(() => ({
    transform: `translateX(${(pageNumber - currentPage) * 100}vw)`,
    config: { mass: 1, tension: 170, friction: 30 },
  }));

  const [nudgeBannerProps, setNudgeBanner] = useSpring(() => ({
    transform: `translateX(0px)`,
    config: { mass: 1, tension: 280, friction: 120 },
  }));
  const [nudgeWrapperProps, setNudgeWrapper] = useSpring(() => ({
    transform: `translateX(0px)`,
    config: { mass: 1, tension: 120, friction: 10 },
  }));

  const makeBannerProps = scroll => {
    return {
      transform: `translate3d(${(pageNumber - currentPage) * 100}vw, ${scroll /
        -3}px, 0px)`,
    };
    // return ({ xyz: [((pageNumber - currentPage) * 100), (scroll / -3), 0 ]});
  };

  const makeContentProps = () => {
    return { transform: `translateX(${(pageNumber - currentPage) * 100}vw)` };
  };

  /*
    if created, set must be called on every render to get the updated currentPage
    usespring's set function doesn't trigger rerenders,
    so this doesn't get stuck in a loop 👍
   */

  /*
    ref looses scrollTop when hidden after animation complete, so this caches
    and sets the previous value when changing tabs
   */
  let scrollVal = 0;
  if (thisPage.ref.current) {
    if (thisPage.ref.current.scrollTop === 0 && !hideOthers) {
      scrollVal = lastScroll;
    } else {
      scrollVal = thisPage.ref.current.scrollTop;
    }
  }

  setBannerSpring(makeBannerProps(scrollVal));
  setContentSpring(makeContentProps());

  // console.log(thisPage.ref.current ? thisPage.ref.current.scrollTop : null)
  const bind = useDrag(({ down, movement: [x, mx, my], cancel, velocity }) => {
    const netDirX = x >= 0 ? 1 : -1;
    // console.log('velocity', velocity);
    if (
      down &&
      currentPage - netDirX > -1 &&
      currentPage - netDirX < totalPages &&
      (Math.abs(x) > window.innerWidth / 2 || (mx > my / 2 && velocity > 0.75))
    ) {
      cancel();
      setNudgeWrapper({ transform: `translateX(0px)` });
      setNudgeBanner({ transform: `translateX(0px)` });
      changeTab({}, currentPage - netDirX);
    } else {
      setNudgeWrapper({
        transform: down ? `translateX(${x})` : `translateX(0px)`,
      });
      setNudgeBanner({
        transform: down ? `translateX(${x})` : `translateX(0px)`,
      });
      // setContentSpring({ scroll: thisPage.ref.current.scrollTop - dy});
    }
  });

  return (
    <div
      className={classes.viewRoot}
      style={
        !hideOthers || currentPage === pageNumber
          ? { display: 'block' }
          : { display: 'none' }
      }
    >
      <animated.div
        className={classes.parallaxBg}
        style={{
          top: topNudge,
          // transform: bannerProps.xyz.interpolate((x, y, z) => `translate3d(${x}vw, ${y}px, ${z}px)`
          ...bannerProps,
        }}
      >
        <animated.div {...bind()} style={nudgeBannerProps}>
          <CrossFadeImage
            src={writeImgUrl(theme.images.banners[thisPage.shortName])}
            style={
              width === 'xs'
                ? {
                    minWidth: 600,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    overflow: 'hidden',
                  }
                : { minWidth: 600, overflow: 'hidden' }
            }
          />
        </animated.div>
      </animated.div>

      <animated.div
        className={classes.parallaxContent}
        style={{
          marginTop: topNudge,
          height: `calc( 100% - ${subtractVal}px )`,
          ...contentProps,
        }}
        scrollTop={contentProps.scroll}
        ref={thisPage.ref}
        onScroll={e => setBannerSpring(makeBannerProps(e.target.scrollTop))}
      >
        <animated.div {...bind()} style={nudgeWrapperProps}>
          {React.createElement(thisPage.component, {
            ...viewProps,
            className: classes.bannerSpace,
          })}
        </animated.div>
      </animated.div>
    </div>
  );
};

ViewPage.propTypes = {
  changeTab: PropTypes.func,
  classes: PropTypes.object,
  currentPage: PropTypes.number,
  pageNumber: PropTypes.number,
  subtractVal: PropTypes.number,
  theme: PropTypes.object,
  thisPage: PropTypes.object,
  topNudge: PropTypes.number,
  totalPages: PropTypes.number,
  viewProps: PropTypes.object,
  width: PropTypes.string,
  hideOthers: PropTypes.bool,
  lastScroll: PropTypes.number,
};

export default withWidth()(withTheme(withStyles(style)(ViewPage)));
