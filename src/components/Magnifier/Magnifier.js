import React from 'react'
import { throttle } from 'lodash'
import Draggable from 'react-draggable'
import { Radio, RadioGroup } from '@blueprintjs/core'
import classes from './Magnifier.scss'

type Props = {
  srcOfOriginalImage: String,
  widthOfOriginalImage: Number,
  heightOfOriginalImage: Number,
  scaleSize: Number,
  widthOfMagnifier: Number,
  closeMagnifier: Function,
  selectScaleSize: Function,
  scaleSize: Number
};

export class Magnifier extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.onDrag = throttle(this.onDrag, 10).bind(this)
    this.state = {
      x: 0,
      y: 0
    }
  }
  onDrag (event, { x, y }) {
    let { widthOfMagnifier, widthOfOriginalImage, heightOfOriginalImage } = this.props

    if (x < -(widthOfMagnifier / 2)) {
      x = -widthOfMagnifier / 2
    } else if (x > (widthOfOriginalImage - (widthOfMagnifier / 2))) {
      x = widthOfOriginalImage - (widthOfMagnifier / 2)
    }

    if (y < -(widthOfMagnifier / 2)) {
      y = -(widthOfMagnifier / 2)
    } else if (y > (heightOfOriginalImage - (widthOfMagnifier / 2))) {
      y = heightOfOriginalImage - (widthOfMagnifier / 2)
    }

    this.setState({
      x: x,
      y: y
    })
  }
  render () {
    let {
      srcOfOriginalImage,
      scaleSize,
      widthOfOriginalImage,
      widthOfMagnifier,
      closeMagnifier
    } = this.props
    return (
      <Draggable
        axis='both'
        position={{
          x: this.state.x,
          y: this.state.y
        }}
        onDrag={this.onDrag}>
        <div
          style={{
            border: '2px solid #2586c2',
            borderRadius: `${widthOfMagnifier / 2}px`,
            width: `${widthOfMagnifier}px`,
            height: `${widthOfMagnifier}px`,
            cursor: 'pointer',
            backgroundColor: 'white',
            backgroundImage: `url(${srcOfOriginalImage})`,
            backgroundSize: `${widthOfOriginalImage * scaleSize}px auto`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: `${-(this.state.x * scaleSize + (widthOfMagnifier / 2 * (scaleSize - 1)))}px ` +
            `${-(this.state.y * scaleSize + (widthOfMagnifier / 2 * (scaleSize - 1)))}px`
          }}
        >
          <span
            className='pt-button pt-intent-primary pt-icon-cross'
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              paddingLeft: '7px'
            }}
            onClick={closeMagnifier}
            />
          <RadioGroup
            onChange={this.props.selectScaleSize}
            selectedValue={this.props.scaleSize}
            className={classes.radioGroup}
          >
            <Radio label='1x' value={1} className={classes.radio} />
            <Radio label='2x' value={2} className={classes.radio} />
            <Radio label='3x' value={3} className={classes.radio} />
          </RadioGroup>
        </div>
      </Draggable>
    )
  }
}

export default Magnifier
