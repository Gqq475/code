import React from 'react'
import { assign } from 'lodash'
import classes from './LabelingToolImagesZone.scss'
import Magnifier from 'components/Magnifier'
import DefectPicture from './DefectPicture'

type Props = {
  widthOfOriginalImage: Number,
  heightOfOriginalImage: Number,
  defectPictureSource: Function,
  markDefect: Function,
  selectDefect: Function
};

export class LabelingToolImagesZone extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.addframe = this.addframe.bind(this)
    this.enableAddingFrame = this.enableAddingFrame.bind(this)
    this.openMagnifier = this.openMagnifier.bind(this)
    this.closeMagnifier = this.closeMagnifier.bind(this)
    this.selectScaleSize = this.selectScaleSize.bind(this)
    this.state = {
      magnifierIsValid: false,
      addingFrameIsValid: false,
      scaleSize: 2
    }
  }
  addframe (e) {
    if (this.props.defectPictureSource && this.state.addingFrameIsValid) {
      let lengthOfEdge = 20
      let { offsetX, offsetY } = e.nativeEvent
      this.setState({
        addingFrameIsValid: false
      })
      this.props.markDefect({
        width: lengthOfEdge,
        height: lengthOfEdge,
        x: offsetX - lengthOfEdge / 2,
        y: offsetY - lengthOfEdge / 2,
        name: 'Defect Code',
        imageId: this.props.defectPictureSource.id
      })
    }
  }
  enableAddingFrame (event) {
    this.setState(assign({}, this.state, {
      magnifierIsValid: false,
      addingFrameIsValid: true
    }))
  }
  openMagnifier () {
    this.setState(assign({}, this.state, {
      magnifierIsValid: true
    }))
    this.props.selectDefect({ rowIndex: null })
  }
  closeMagnifier () {
    this.setState(assign({}, this.state, {
      magnifierIsValid: false
    }))
  }
  selectScaleSize (e) {
    this.setState(assign({}, this.state, {
      scaleSize: e.target.value * 1
    }))
  }
  render () {
    return (
      <div className={classes['LabelingToolImagesZone-container']}>
        <section className={`${classes.btnGroup}`}>
          <button
            className='pt-button pt-intent-primary pt-icon-add'
            onClick={this.enableAddingFrame}
            >增加标记</button>
          <button
            className='pt-button pt-intent-primary pt-icon-search-template'
            onClick={this.openMagnifier}
            >打开放大镜</button>
        </section>
        <section
          style={{
            width: `${this.props.widthOfOriginalImage}px`,
            margin: '0 auto'
          }}>
          {
            (this.props.defectPictureSource)
            ? (<DefectPicture
              srcOfOriginalImage={this.props.defectPictureSource.path}
              widthOfOriginalImage={this.props.widthOfOriginalImage}
              heightOfOriginalImage={this.props.heightOfOriginalImage}
              addframe={this.addframe}
              />
            )
            : (<span className={`${classes.alertMessage}`}>
              请先选择需要标记的图片
            </span>)
          }
          {
            (this.state.magnifierIsValid) ? (
              <Magnifier
                scaleSize={this.state.scaleSize}
                selectScaleSize={this.selectScaleSize}
                widthOfMagnifier={150}
                srcOfOriginalImage={this.props.defectPictureSource.path}
                widthOfOriginalImage={this.props.widthOfOriginalImage}
                heightOfOriginalImage={this.props.heightOfOriginalImage}
                closeMagnifier={this.closeMagnifier}
                />
            ) : null
          }
        </section>
      </div>
    )
  }
}

export default LabelingToolImagesZone
