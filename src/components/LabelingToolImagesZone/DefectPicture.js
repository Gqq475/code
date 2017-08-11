import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classes from './LabelingToolImagesZone.scss'
import { Resizable } from 'react-resizable'
import Draggable from 'react-draggable'
import { throttle } from 'lodash'
import {
  DRAG_DEFECT_MARK,
  RESIZE_DEFECT_MARK
} from 'routes/OJS/modules/OJS'

export class DefectPicture extends React.Component {
  static propTypes = {
    srcOfOriginalImage: PropTypes.string,
    widthOfOriginalImage: PropTypes.number,
    heightOfOriginalImage: PropTypes.number,
    addframe: PropTypes.func,
    handleMarkDrag: PropTypes.func,
    handleMarkResize: PropTypes.func,
    defectList: PropTypes.array,
    currentDefectIndex: PropTypes.number
  }
  render () {
    let {
      srcOfOriginalImage,
      widthOfOriginalImage,
      heightOfOriginalImage,
      addframe,
      handleMarkDrag,
      handleMarkResize,
      defectList
    } = this.props
    return (
      <div
        style={{
          width: `${widthOfOriginalImage}px`,
          height: `${heightOfOriginalImage}px`,
          backgroundImage: `url('${srcOfOriginalImage}')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          margin: '0 auto',
          position: 'absolute'
        }}
        onClick={addframe}>
        {defectList.map((val, index) => {
          return (
            <section
              className={`${classes.outerFrame}`}
              key={index.toString()}
              >
              <Draggable
                axis='both'
                position={{
                  x: val.x,
                  y: val.y
                }}
                onDrag={(event, position) => {
                  if (this.props.currentDefectIndex === index) {
                    handleMarkDrag(index, position, this.props.defectList[index])
                  }
                }}
                cancel={'.react-resizable-handle'}
                >
                <Resizable
                  className={
                    (this.props.currentDefectIndex === index)
                    ? `${classes.innerFrame} ${classes['innerFrame--active']}`
                    : `${classes.innerFrame} `
                  }
                  width={val.width}
                  height={val.height}
                  onResize={(event, { element, size }) => {
                    if (this.props.currentDefectIndex === index) {
                      handleMarkResize(index, size, this.props.defectList[index])
                    }
                  }}>
                  <span
                    style={{
                      position: 'absolute',
                      width: val.width + 'px',
                      height: val.height + 'px'
                    }}
                    />
                </Resizable>
              </Draggable>
            </section>
          )
        })
      }
      </div>
    )
  }
}

export default connect(
  (state) => ({
    defectList: state.ojs.defectList,
    currentDefectIndex: state.ojs.currentDefectIndex
  }),
  (dispatch, ownProps) => ({
    handleMarkDrag: throttle((index, newPosition, { width, height }) => {
      let { x, y } = newPosition
      let { widthOfOriginalImage, heightOfOriginalImage } = ownProps
      if (x < -10) {
        x = -10
      } else if (x > (widthOfOriginalImage - width + 10)) {
        x = widthOfOriginalImage - width + 10
      }

      if (y < -10) {
        y = -10
      } else if (y > (heightOfOriginalImage - height + 10)) {
        y = heightOfOriginalImage - height + 10
      }

      dispatch({
        type: DRAG_DEFECT_MARK,
        data: {
          index, x, y
        }
      })
    }, 50),
    handleMarkResize: throttle((index, newSize, { x, y }) => {
      let { width, height } = newSize
      let { widthOfOriginalImage, heightOfOriginalImage } = ownProps
      if (width > widthOfOriginalImage + 10 - x) {
        width = widthOfOriginalImage + 10 - x
      }
      if (height > heightOfOriginalImage + 10 - y) {
        height = heightOfOriginalImage + 10 - y
      }
      dispatch({
        type: RESIZE_DEFECT_MARK,
        data: {
          index, width, height
        }
      })
    }, 50)
  })
)(DefectPicture)
