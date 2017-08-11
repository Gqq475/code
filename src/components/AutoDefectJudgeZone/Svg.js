import React from 'react'

type Props = {
  info: Object
};

export default class Svg extends React.Component {
  props: Props;

  render () {
    const {info} = this.props
    return (
      <div>
        {info.x
      ? (<svg
        width='100%'
        height='100%'
        viewBox={`0 0 100 ${info.proportion}`}
        preserveAspectRatio='xMinYMin slice'
        style={{marginBottom: '-3px'}}
      >
        <image
          href={info.src}
          x='0'
          y='0'
          width='100%' />
        <rect
          x={info.x}
          y={info.y}
          width={info.width}
          height={info.height}
          fill='none'
          fillOpacity='0'
          stroke='red'
          strokeOpacity='1'
          strokeWidth='.7'
          />
      </svg>)
        : (<div style={{width: '100%', height: '100%'}}>loading...</div>)
      }
      </div>
    )
  }
}
