import React from 'react';
import { useSpring, animated, config, interpolate } from 'react-spring';
import { withTheme, withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import CrossfadeImage from 'react-crossfade-image';
import { useDrag } from 'react-use-gesture';

const style = theme => ({

  viewRoot: {
    overflowX: 'hidden',
    width: '100vw',
    height: '100%'
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
      margin: 'auto'
    }
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
      margin: 'auto'
    }
  },

  bannerSpace: {
    paddingTop: 400,
    [theme.breakpoints.down('md')]: {
      paddingTop: 'calc( 400px - ( ( 1300px - 100vw) / 13 * 4 )  )'
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: 184
    }
  }

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
    changeTab
  } = componentProps;


  const [bannerProps, setBannerSpring] = useSpring(() => ({
    // transform: `translate3d(${((pageNumber - currentPage) * 100)}vw, 0px, 0px)`,
    xyz: [(pageNumber - currentPage) * 100, 0, 0],
    config: { mass: 1, tension: 180, friction: 39 }
  }));

  const [contentProps, setContentSpring] = useSpring(() => ({
    transform: `translateX(${((pageNumber - currentPage) * 100)}vw)`,
    config: { mass: 1.1, tension: 170, friction: 30 } }));

  const [nudgeBannerProps, setNudgeBanner] = useSpring(() => ({
    transform: `translateX(0px)`,
    config: { mass: 1, tension: 280, friction: 120 }
  }));
  const [nudgeWrapperProps, setNudgeWrapper] = useSpring(() => ({
    transform: `translateX(0px)`,
    config: {mass: 1, tension: 120, friction: 10}
  }));

  const makeBannerProps = (scroll) => {
    //return ({ transform: `translate3d(${((pageNumber - currentPage) * 100)}vw, ${ scroll / -3}px, 0px)` });
    return ({ xyz: [((pageNumber - currentPage) * 100), (scroll / -3), 0 ]});
  };
  const makeContentProps = () => {
    return ({ transform: `translateX(${((pageNumber - currentPage) * 100)}vw)` });
  };

  /*
    if created, set must be called on every render to get the updated currentPage
    usespring's set function doesn't trigger rerenders,
    so this doesn't get stuck in a loop 👍
   */
  setBannerSpring(makeBannerProps(thisPage.ref.current ? thisPage.ref.current.scrollTop : 0));
  setContentSpring(makeContentProps());

  // console.log(thisPage.ref.current ? thisPage.ref.current.scrollTop : null)
  const bind = useDrag(({ down, movement: [x], cancel, }) => {
    const netDirX = x >= 0 ? 1 : -1;
    // console.log('delta', delta);
    if (down && (currentPage - netDirX) > -1 && (currentPage - netDirX) < totalPages &&
      (Math.abs(x) > (window.innerWidth / 2))) {
      cancel();
      setNudgeWrapper({ transform: `translateX(0px)` });
      setNudgeBanner({ transform: `translateX(0px)` });
      changeTab({}, (currentPage - netDirX));
    } else {
      setNudgeWrapper({ transform: down ? `translateX(${x})` : `translateX(0px)` });
      setNudgeBanner({ transform: down ? `translateX(${x})` : `translateX(0px)` });
      // setContentSpring({ scroll: thisPage.ref.current.scrollTop - dy});
    }
  });


  return (

    <div className={classes.viewRoot} >

      <animated.div className={classes.parallaxBg} style={{ top: topNudge,       transform: bannerProps.xyz.interpolate((x, y, z) => `translate3d(${x}vw, ${y}px, ${z}px)`),
      }}>
        <animated.div
          {...bind()}
          style={nudgeBannerProps}
        >
          <CrossfadeImage
            src = {theme.images.banners[thisPage.shortName]}
            style = {
              width === 'xs' ?
                { minWidth: 600, left: '50%', transform: 'translateX(-50%)', overflow: 'hidden' } :
                { minWidth: 600, overflow: 'hidden' }
            }
          />
        </animated.div>
      </animated.div>

      <animated.div
        className={classes.parallaxContent}
        style={{
          marginTop: topNudge,
          height: `calc( 100% - ${subtractVal}px )`,
          ...contentProps
        }}
        scrollTop={contentProps.scroll}
        ref={thisPage.ref}
        onScroll={e => setBannerSpring(makeBannerProps(e.target.scrollTop))}
      >

        <animated.div
          {...bind()}
          style={nudgeWrapperProps}
        >

          {React.createElement(
            thisPage.component,
            { ...viewProps, className: classes.bannerSpace }
          )}

        </animated.div>

      </animated.div>

    </div>

  );
};

export default withWidth()(withTheme(withStyles(style)(ViewPage)));
