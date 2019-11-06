
import { render } from 'react-dom'
import React, { useRef } from 'react'
import clamp from 'lodash-es/clamp'
import { useSprings, animated } from 'react-spring'
import { useGesture } from 'react-use-gesture'


function Viewpager() {
  const index = useRef(0)
  const [props, set] = useSprings(pages.length, i => ({ x: i * window.innerWidth, sc: 1, display: 'block' }))
  const bind = useGesture(({ down, delta: [xDelta], direction: [xDir], distance, cancel }) => {
    if (down && distance > window.innerWidth / 2)
      cancel((index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, pages.length - 1)))
    set(i => {
      if (i < index.current - 1 || i > index.current + 1) return { display: 'none' }
      const x = (i - index.current) * window.innerWidth + (down ? xDelta : 0)
      const sc = down ? 1 - distance / window.innerWidth / 2 : 1
      return { x, sc, display: 'block' }
    })
  })
  return props.map(({ x, display, sc }, i) => (
    <animated.div {...bind()} key={i} style={{ display, transform: x.interpolate(x => `translate3d(${x}px,0,0)`) }}>
      <animated.div style={{ transform: sc.interpolate(s => `scale(${s})`), backgroundImage: `url(${pages[i]})` }} />
    </animated.div>
  ))
}











import React, { useCallback } from 'react'
import ReactDOM from 'react-dom'
import { useSpring, animated as a, interpolate } from 'react-spring'
import lorem from 'lorem-ipsum'
import './styles.css' // Icon made by Freepik from www.flaticon.com

function App() {
  const [{ st, xy }, set] = useSpring(() => ({ st: 0, xy: [0, 0] }))
  const interpBg = xy.interpolate((x, y) => `perspective(400px) rotateY(${x / 60}deg) rotateX(${-y / 60}deg) translate3d(-50%, -50%, 0)`)
  const interpEye = interpolate([st, xy], (o, xy) => `translate(${xy[0] / 30 + 157},${xy[1] / 30 + 80 + o / 2}) scale(0.8)`)
  const interpPupil = interpolate([st, xy], (o, xy) => `translate(${xy[0] / 25},${xy[1] / 25 + -10 + o / 8})`)
  const onMove = useCallback(({ clientX: x, clientY: y }) => set({ xy: [x - window.innerWidth / 2, y - window.innerHeight / 2] }), [])
  const onScroll = useCallback(e => set({ st: e.target.scrollTop / 30 }), [])
  return (
    <div class="container" onScroll={onScroll}>
      <div style={{ height: '700%', overflow: 'hidden' }}>{lorem({ count: 200 })}</div>
      <a.svg style={{ transform: interpBg }} viewBox="0 0 490 512">
        <a.g id="eye" transform={interpEye}>
          <a.g transform={interpPupil} fill="#FFFFFF">
            <circle fill="#333031" cx="105" cy="104" r="36" />
            <path d="M83,103.921875 C83,86.402344 95.484375,71.804688 112.042969,68.527344 C109.765625,68.078125 107.410156,67.835938 105,67.835938 C85.070312,67.835938 68.914062,83.992188 68.914062,103.921875 C68.914062,123.851562 85.070312,140.007812 105,140.007812 C107.410156,140.007812 109.765625,139.765625 112.042969,139.316406 C95.484375,136.039062 83,121.441406 83,103.921875 Z" />
          </a.g>
        </a.g>
      </a.svg>
    </div>
  )
}


