import React from 'react'
import ReactDOM from 'react-dom'
import classes from './DefectJudgeDialog.scss'
import { Dialog, Slider } from '@blueprintjs/core'

const boxWidth = 420
const boxHeight = 315
type Props = {
  toggleDialog: Function,
  isOpen: boolean,
  data: Object,
  message: String
};

const getOffset = function (elem) {
  let { offsetTop: top, offsetLeft: left } = elem
  if (elem.parentNode.nodeType !== 9) {
    let info = getOffset(elem.parentNode)
    top += info.top
    left += info.left
    return {top: top, left: left}
  }
  return {top: top, left: left}
}

export class DefectJudgeDialog extends React.Component {
  props: Props

  constructor (props) {
    super(props)
    this.getChangeHandler = this.getChangeHandler.bind(this)
    this.getImgInfo = this.getImgInfo.bind(this)
    this.handleImgMouseDown = this.handleImgMouseDown.bind(this)
    this.handleImgMouseUp = this.handleImgMouseUp.bind(this)
    this.getImgInfoWishZoom = this.getImgInfoWishZoom.bind(this)
    this.getImgStyleWishOriginZoom = this.getImgStyleWishOriginZoom.bind(this)
    this.checkBoundary = this.checkBoundary.bind(this)
    this.handleChangeImg = this.handleChangeImg.bind(this)
    this.state = {
      zoom: 0,
      imgInfo: {},
      originZoomWidth: 0,
      originZoomHeight: 0,
      activeImg: 0
    }
  }

  getChangeHandler (value) {
    return (value) => this.setState({ zoom: value })
  }

  handleChangeImg (index) {
    return () => {
      console.log(this.props, 'index: ', index)
      this.getImgInfo(this.props.data.defect.imagePathList[index])
      this.setState({
        activeImg: index,
        zoom: 0
      })
    }
  }

  getImgInfo (url) {
    const img = new Image()
    const that = this
    img.onload = function () {
      that.setState({
        imgInfo: {
          width: this.width,
          height: this.height
        },
        originZoomWidth: 0,
        originZoomHeight: 0
      })
    }
    img.src = url
  }

  getImgInfoWishZoom () {
    const step = Math.abs(this.state.imgInfo.width - boxWidth) / 100
    return {
      width: boxWidth + step * this.state.zoom,
      height: boxHeight + step * this.state.zoom
    }
  }

  getImgStyleWishOriginZoom () {
    const imgInfo = this.getImgInfoWishZoom()
    return {
      left: imgInfo.width * this.state.originZoomWidth,
      top: imgInfo.height * this.state.originZoomHeight
    }
  }

  handleImgMouseUp (e) {
    window.onmousemove = null
    const {target: img} = e
    this.checkBoundary(img)()
  }

  checkBoundary (img) {
    return () => {
      img = img || ReactDOM.findDOMNode(this.refs.img)
      const styleObj = window.getComputedStyle(img, null)
      const left = parseInt(styleObj.left)
      const top = parseInt(styleObj.top)
      const width = parseInt(styleObj.width)
      const height = parseInt(styleObj.height)

      if ((Math.abs(left) + boxWidth) > width) {
        img.style.left = (boxWidth - width) + 'px'
      }
      if ((Math.abs(top) + boxHeight) > height) {
        img.style.top = (boxHeight - height) + 'px'
      }
      if (left > 0) {
        img.style.left = 0
      }
      if (top > 0) {
        img.style.top = 0
      }
    }
  }

  handleImgMouseDown (e) {
    const {width, height} = this.getImgInfoWishZoom()
    let {pageX: X, pageY: Y, target: img} = e
    const left = parseInt(img.style.left) || 0
    const top = parseInt(img.style.top) || 0
    const that = this
    window.onmousemove = function (e) {
      const nX = e.pageX
      const nY = e.pageY
      let nLeft = left + (nX - X)
      let nTop = top + (nY - Y)

      img.style.left = nLeft + 'px'
      img.style.top = nTop + 'px'

      that.setState({
        originZoomWidth: nLeft / width,
        originZoomHeight: nTop / height
      })

      e.preventDefault()
    }
  }

  handleImgMouseMove (e) {
    e.preventDefault()
  }

  render () {
    let alterationHistory = {}
    let defect = {}
    let url = ''
    if (this.props.data) {
      alterationHistory = this.props.data.alterationHistory
      defect = this.props.data.defect
      url = defect.imagePathList[this.state.activeImg]
      this.state.imgInfo.width || this.getImgInfo(url)
    }
    return (
      <div className={classes['DefectJudgeDialog-container']}>
        {(() => {
          if (this.props.data) {
            return (
              <Dialog
                iconName='inbox'
                isOpen={this.props.isOpen}
                onClose={this.props.toggleDialog}
                title='Defect detail'
                className={classes.dialogWidth}
              >
                <div className='pt-dialog-body'>
                  {this.state.imgInfo.width
                    ? (<div className={classes.inspectingImage}>
                      <div className={classes.editPic}>
                        <div className={classes.editPicSlider}>
                          <Slider
                            min={0}
                            max={100}
                            stepSize={1}
                            labelStepSize={10}
                            onChange={this.getChangeHandler()}
                            onRelease={this.checkBoundary()}
                            value={this.state.zoom}
                          />
                        </div>
                        <div className={classes.pic} >
                          <img
                            ref='img'
                            className={classes.picImg}
                            src={url}
                            onMouseDown={this.handleImgMouseDown}
                            onMouseUp={this.handleImgMouseUp}
                            onMouseMove={this.handleImgMouseMove}
                            width={this.getImgInfoWishZoom().width}
                            style={this.getImgStyleWishOriginZoom()}
                          />
                        </div>
                      </div>
                      <div className={classes.modeSelection}>
                        <ul className={classes.modeSelectionUl}>
                          {defect.imagePathList.map((src, i) => (
                            <li
                              key={`img-${i}`}
                              onClick={this.handleChangeImg(i)}
                              className={(() => {
                                if (this.state.activeImg === i) {
                                  return `${classes.modeSelectionLi} ${classes.active}`
                                } else {
                                  return `${classes.modeSelectionLi}`
                                }
                              })()}
                            >
                              <img
                                className={classes.modeSelectionT1}
                                src={src}
                                alt=''
                                />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>)
                    : ''
                  }

                  <h5 className={classes.mt20}>Revision history</h5>

                  {alterationHistory.map((item, i) => (
                    <p key={`history-${i}`} className={classes.historyItem}>
                      {item.dateTime} {item.owner} {item.detail}
                    </p>
                  ))}
                </div>
              </Dialog>
            )
          } else {
            return (
              <Dialog
                iconName='inbox'
                isOpen={this.props.isOpen}
                onClose={this.props.toggleDialog}
                title='Defect detail'
                className={classes.dialogWidth}
              >
                <div className='pt-dialog-body'>{this.props.message ? this.props.message : 'loading...'}</div>
              </Dialog>
            )
          }
        })()}
      </div>
    )
  }
}

export default DefectJudgeDialog
