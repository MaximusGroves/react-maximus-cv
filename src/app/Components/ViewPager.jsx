import { render } from 'react-dom';
import React, { useRef } from 'react';
import clamp from 'lodash-es/clamp';
import { useDrag } from 'react-use-gesture'
import { useSprings, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import { withStyles } from '@material-ui/core/styles';

const pages = [
  'https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/296878/pexels-photo-296878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
]


const style = theme => ({
  root:{
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    willChange: 'transform',

  },

  child:{
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    width:'100%',
    height: '100%',
    willChange: 'transform',
    boxShadow: '0 62.5px 125px -25px rgba(50, 50, 73, 0.5), 0 37.5px 75px -37.5px rgba(0, 0, 0, 0.6)',
  }


});

const ViewPager = funkProps => {
  const { classes, containerStyle } = funkProps;


  const index = useRef(0)
  const [props, set] = useSprings(pages.length, i => ({
    x: i * window.innerWidth,
    scale: 1,
    display: 'block'
  }))
  const bind = useDrag(({ down, movement: [mx], direction: [xDir], distance, cancel }) => {
    if (down && distance > window.innerWidth / 2)
      cancel((index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, pages.length - 1)))
    set(i => {
      if (i < index.current - 1 || i > index.current + 1) return { display: 'none' }
      const x = (i - index.current) * window.innerWidth + (down ? mx : 0)
      const scale = down ? 1 - distance / window.innerWidth / 2 : 1
      return { x, scale, display: 'block' }
    })
  })
  return props.map(({ x, display, scale }, i) => (
    <animated.div {...bind()} key={i} style={{ display, x }} className={classes.root}>
      <animated.div style={{ scale, backgroundImage: `url(${pages[i]})` }} className={classes.child}/>
    </animated.div>
  ))

};

export default withStyles(style)(ViewPager);
// export default ViewPager;