import React from 'react';
import { useSpring, animated, config } from 'react-spring';
import { withTheme, withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import CrossfadeImage from 'react-crossfade-image';

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
    top: 0,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'unset',
      right: 0,
      left: 0,
      margin: 'auto'
    }
  },

  parallaxContent: {
    position: 'absolute',
    textAlign: 'center',
    overflowY: 'auto',
    top: 0,
    width: '100vw',
    // height:'100vh',
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
    subtractVal
  } = componentProps;


  const [bannerProps, setBannerSpring] = useSpring(() => ({ transform: `translate3d(${((pageNumber - currentPage) * 100)}vw, 0px, 0px)`, config: { mass: 1, tension: 170, friction: 36 } }));
  const contentProps = useSpring({ transform: `translateX(${((pageNumber - currentPage) * 100)}vw)`, config: { mass: 1, tension: 170, friction: 30 } });

  const makeNewProps = (scroll) => {
    return ({ transform: `translate3d(${((pageNumber - currentPage) * 100)}vw, ${ scroll / -3}px, 0px)` });
  };

  //if created, must be called on render to get the updated currentPage
  setBannerSpring(makeNewProps(thisPage.ref.current ? thisPage.ref.current.scrollTop : 0));


  return (

    <div className={classes.viewRoot} >


      <animated.div className={classes.parallaxBg} style={{ top: topNudge, ...bannerProps }}>
        <CrossfadeImage
          src = {theme.images.banners[thisPage.shortName]}
          style = {width === 'xs' ? { minWidth: 600, left: '50%', transform: 'translateX(-50%)', overflow: 'hidden' } : { minWidth: 600, overflow: 'hidden' }}
        />
      </animated.div>

      <animated.div className={classes.parallaxContent} style={{ marginTop: topNudge, height: `calc( 100% - ${subtractVal}px )`, ...contentProps }} ref={thisPage.ref} onScroll={e => setBannerSpring(makeNewProps(e.target.scrollTop))}>
        {React.createElement(
          thisPage.component,
          { ...viewProps, className: classes.bannerSpace }
        )}
      </animated.div>

    </div>

  );
};

export default withWidth()(withTheme(withStyles(style)(ViewPage)));
