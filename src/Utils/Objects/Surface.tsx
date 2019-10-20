import React from 'react'
import Constants from '../../Utils/constants'

const {TRBL} = Constants
type ITrbl = typeof TRBL

type IProp = {
    children?: React.ReactChildren| React.ReactNode,
    className: string,
    style: {}
    trbl: ITrbl,
    view: {width: string | number, height: string | number}
}

export default function Surface(props: IProp) {

  const { className, view, trbl, style, children, ...other } = props

  const paddingBottom = (typeof view.height === 'number' && typeof view.width ==='number') ?  `${Math.round((view.height / view.width) * 100)}%` : '10%'

  // uses bottom-padding hack. See https://css-tricks.com/scale-svg/
  return (
    <div
      className={className}
      style={{
        ...style,
        position: 'relative',
        width: '100%',
        height: '0px',
        paddingBottom,
      }}
      {...other}
    >
      <svg
        viewBox={`0 0 ${view.width} ${view.height}`}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          left: 0,
          top: 0,
        }}
      >
        <g>{children}</g>
      </svg>
    </div>
  )
}