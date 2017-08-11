import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import classes from './LabelingTool.scss'
import { Button } from '@blueprintjs/core'
import Tabs from 'components/LabelingToolDefectType'
import LabelingToolImagesZone from 'components/LabelingToolImagesZone'
import LabelingToolDefectCodeList from 'components/LabelingToolDefectCodeList'
import LabelingToolCategoryDialog from 'components/LabelingToolCategoryDialog'
import OurToaster from 'components/OurToaster'
import {
  SELECT_DEFECTPICTURE_SOURCE,
  MARK_DEFECT,
  SELECT_DEFECT_MARK,
  INITIALIZE_LABELING_TOOL
} from 'routes/OJS/modules/OJS'

type Props = {
  data: Object,
  getLabelingToolImageList: Function,
  getLabelingToolImageDefect: Function,
  defectPictureSource: String,
  selectDefectPictureSource: Function,
  selectDefect: Function,
  defectList: Array,
  markDefect: Function,
  getDefectTypeList: Function,
  addDefectType: Function,
  token: String,
  // dispatch: Function,
  emptyLabelingTool: Function
};

export class LabelingTool extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.toggleDialog = this.toggleDialog.bind(this)
    this.getImagesList = this.getImagesList.bind(this)
    this.requestJudge = this.requestJudge.bind(this)
    this.state = {
      isOpen: false,
      selected: '',
      pageNo: 1,
      pageSize: 10
    }
  }

  handleClick (e) {
    let { index, id } = e.target.dataset
    index *= 1
    this.setState({
      selected: e.target.dataset.index
    })
    this.props.selectDefectPictureSource(this.props.data.labelingToolImageList[index])
    this.props.getLabelingToolImageDefect(this.state, id)
  }

  toggleDialog () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  getImagesList () {
    this.props.getLabelingToolImageList()
  }

  componentWillUnmount () {
    this.props.emptyLabelingTool()
  }

  requestJudge () {
    let { id } = this.props.defectPictureSource
    fetch(`${__QCA__}/offline/labeling/image/defect/xmlfile?imageId=${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': this.props.token
      }
    })
      .then(response => response.json())
      .then(json => {
        if (json.code === 200000) {
          OurToaster.show({message: '判定成功!'})
        } else {
          OurToaster.show({message: '判定失败!'})
        }
      })
  }

  render () {
    return (
      <div className={classes['LabelingTool-container']}>
        <div>
          <Button className={`pt-button pt-intent-primary ${classes.btnFile}`} onClick={this.getImagesList}>
             文件
          </Button>
          <Button className={`pt-button pt-intent-primary ${classes.btn}`} disabled>
             文件夹
          </Button>
        </div>
        <div className={classes.imgList}>
          <ul>
            {
              this.props.data.labelingToolImageList &&
              this.props.data.labelingToolImageList.map((item, index) => {
                let itemClass = classNames({
                  [classes.imgItem]: true,
                  [classes.active]: this.state.selected === index + ''
                })
                return (
                  <li
                    onClick={this.handleClick}
                    className={itemClass}
                    key={`${index}`}
                    data-index={index}
                    data-id={item.id}>
                    {item.name}
                  </li>
                )
              })
            }
          </ul>
        </div>
        <LabelingToolDefectCodeList
          defectList={this.props.defectList}
          selectDefect={this.props.selectDefect}
          />
        <LabelingToolImagesZone
          widthOfOriginalImage={400}
          heightOfOriginalImage={300}
          defectList={this.props.defectList}
          markDefect={this.props.markDefect}
          defectPictureSource={this.props.defectPictureSource}
          selectDefect={this.props.selectDefect}
          />
        <div className={classes.decidsion}>
          <Tabs data={this.props.data} getDefectTypeList={this.props.getDefectTypeList} />
          <div className={classes.btnGroup}>
            <Button className={classes.category} onClick={this.toggleDialog}>类别修改</Button>
            <Button onClick={this.requestJudge}>判定</Button>
            <LabelingToolCategoryDialog isOpen={this.state.isOpen} toggleDialog={this.toggleDialog}
              addDefectType={this.props.addDefectType}
              data={this.props.data} getDefectTypeList={this.props.getDefectTypeList}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
 (state) => ({
   defectPictureSource: state.ojs.defectPictureSource,
   defectList: state.ojs.defectList,
   currentDefectIndex: state.ojs.currentDefectIndex,
   token: state.auth.token
 }),
 (dispatch) => ({
   selectDefectPictureSource: (sourceObj) => {
     dispatch({
       type: SELECT_DEFECTPICTURE_SOURCE,
       data: { ...sourceObj }
     })
   },
   markDefect: (data) => {
     dispatch({
       type: MARK_DEFECT,
       data
     })
   },
   selectDefect: (rowIndex) => {
     dispatch({
       type: SELECT_DEFECT_MARK,
       data: rowIndex
     })
   },
   emptyLabelingTool: () => {
     dispatch({
       type: INITIALIZE_LABELING_TOOL
     })
   }
 })
)(LabelingTool)
