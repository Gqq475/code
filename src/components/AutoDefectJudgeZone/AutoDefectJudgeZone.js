import React from 'react'
import classes from './AutoDefectJudgeZone.scss'
import Tabs from 'components/AutoDefectCodeTabs'
import { Button } from '@blueprintjs/core'
import Pagination from 'components/Pagination'
import OurToaster from 'components/OurToaster'
import Svg from './Svg.js'
import Dialog from 'components/DefectJudgeDialog'
import { identifyRole } from '../../Utils.js'

type Props = {
  data: Object,
  defectDetail: Object,
  autoSubmitJudge: Function,
  getAutoDefectDetailById: Function,
  productCode: String,
  glassCode: String,
  handlePageClick: Function,
  handleClick: Function,
  id: Number,
  getAutoDefectJudgeList: Function,
  dataState: Object,
  autoList: Function,
  userRole: Array
};

export class AutoDefectJudgeZone extends React.Component {
  props: Props

  constructor (props) {
    super(props)
    this.handleEnabledChange = this.handleEnabledChange.bind(this)
    this.handleSelectCode = this.handleSelectCode.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.cb = this.cb.bind(this)
    this.pageClick = this.pageClick.bind(this)
    this.goPrevClick = this.goPrevClick.bind(this)
    this.goNext = this.goNext.bind(this)
    this.goSwitchChange = this.goSwitchChange.bind(this)
    this.getColorByConfidence = this.getColorByConfidence.bind(this)
    this.getDefectFrame = this.getDefectFrame.bind(this)
    this.autoRefresh = this.autoRefresh.bind(this)
    this.toggleDialog = this.toggleDialog.bind(this)
    this.getSvgInfo = this.getSvgInfo.bind(this)
    this.select = this.props.data.result.judgeresults.map((r, i) => {
      return {
        id: r.id,
        isSelected: false,
        defectCode: r.defectCode
      }
    })
    this.imgLoaded = []
    this.state = {
      indexList: [], // 获取数据的存放数组
      // totalNum: '', // 总记录数
      totalData: {},
      current: 1, // 当前页码
      pageSize: 6, // 每页显示的条数5条
      goValue: 1, // 获取分页框的值
      // totalPage: ''// 总页数
      autoRefresh: false,
      isOpen: false,
      defectId: null,
      defectDetail: null,
      svgInfo: {}
    }

    this.timer = null
  }

  handleEnabledChange (i) {
    return () => {
      this.select[i].isSelected = !this.select[i].isSelected
      this.setState({})
    }
  }

  handleSelectCode (code) {
    this.select.map((s) => {
      s.defectCode = s.isSelected ? code : s.defectCode
      s.isSelected = false
    })
    this.setState({})
  }

  handleSubmit () {
    let formatted = []
    this.select.map((d, i) => {
      formatted.push({
        id: this.props.data.result.judgeresults[i].id.toString(),
        defect_code: d.defectCode
      })
    })
    this.props.autoSubmitJudge({defect_codes: JSON.stringify(formatted)}, this.cb)
  }

  cb (res) {
    if (res.code === 200000) {
      OurToaster.show({message: '判定成功!'})
    } else {
      OurToaster.show({message: '判定失败!'})
    }
  }

  componentWillMount () {
    this.pageClick(1)
    this.setState({
      defectDetail: this.props.defectDetail
    })
  }

  componentWillReceiveProps (nextProps) {
    this.select = this.props.data.result.judgeresults.map((r, i) => {
      return {
        id: r.id,
        isSelected: false,
        defectCode: r.defectCode
      }
    })
    if (
        nextProps.defectDetail && (
          !this.props.defectDetail || (
            this.state.defectId && this.state.defectId === nextProps.defectDetail.result.defect.id
            ) || (
            nextProps.defectDetail.result.defect.id !== this.props.defectDetail.result.defect.id
          )
        )
      ) {
      this.setState({
        defectDetail: nextProps.defectDetail
      })
    } else {
      this.setState({
        defectDetail: null
      })
    }
  }

  // 获取当前页的数据
  pageClick (pageNum) {
    if (pageNum !== this.state.current) {
      this.state.current = pageNum
    }
    if (pageNum !== '') {
      this.state.indexList = []
      for (let i = (pageNum - 1) * this.state.pageSize; i < this.state.pageSize * pageNum; i++) {
        if (this.props.data.result.judgeresults[i]) {
          this.state.indexList.push(this.props.data.result.judgeresults[i])
        }
      }
      this.setState({indexList: this.state.indexList})
      this.props.handlePageClick(this.state)
    }
  }

  goPrevClick () {
    let cur = parseInt(this.state.current)
    if (cur > 1) {
      this.pageClick(cur - 1)
    }
  }

  goNext () {
    let cur = parseInt(this.state.current)
    if (cur < this.props.data.result.totalPage) {
      this.pageClick(cur + 1)
    }
  }

  goSwitchChange (e) {
    const value = e.target.value
    if (value === '') {
      this.setState({goValue: undefined})
    } else {
      this.setState({goValue: value})
    }

    if (value !== '' && !/^[1-9]\d*$/.test(value)) {
      OurToaster.show({message: '页码只能输入大于1的正整数'})
    } else if (value !== '' && parseInt(value) > parseInt(this.props.data.result.totalPage)) {
      OurToaster.show({message: '没有这么多页'})
    } else {
      this.pageClick(value)
    }
  }

  getDefectFrame (d, proportion) {
    const borderWidth = 7
    return {
      position: 'absolute',
      left: `${(d.boundMinX * proportion) + borderWidth}px`,
      top: `${(d.boundMinY * proportion) + borderWidth}px`,
      height: `${((d.boundMaxY - d.boundMinY) * proportion) + borderWidth}px`,
      width: `${((d.boundMaxX - d.boundMinX) * proportion) + borderWidth}px`,
      border: '2px solid red'
    }
  }

  getColorByConfidence (num) {
    if (num < 0.8) {
      return '#f5a623'
    } else if (num >= 0.8) {
      return '#7ed321'
    }
  }

  autoRefresh (e) {
    if (e.target.checked) {
      this.setState({
        autoRefresh: true
      })
      this.props.autoList(true)
      this.timer = setInterval(() => {
        this.props.getAutoDefectJudgeList(this.props.dataState, false)
        this.props.handleClick(this.props.id)
      }, 10000)
    } else {
      this.setState({
        autoRefresh: false
      })
      this.props.autoList(true)
      clearInterval(this.timer)
    }
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  toggleDialog (id) {
    return () => {
      if (!this.state.isOpen) {
        this.props.getAutoDefectDetailById(id)
        this.setState({
          defectId: id,
          isOpen: !this.state.isOpen
        })
      } else {
        this.setState({
          isOpen: !this.state.isOpen,
          defectDetail: null,
          defectId: null
        })
      }
    }
  }

  getSvgInfo ({id, imageList, boundMaxX, boundMaxY, boundMinX, boundMinY}) {
    const src = imageList[0]
    const boxWidth = boundMaxX - boundMinX
    const boxHeight = boundMaxY - boundMinY
    const Img = new Image()
    const _this = this
    this.imgLoaded.push(id)
    Img.onload = function () {
      let { width, height } = this
      const temp = {
        src: src,
        x: `${boundMinX / width * 100}%`,
        y: `${boundMinY / height * 100}%`,
        width: `${boxWidth / width * 100}%`,
        height: `${boxHeight / height * 100}%`,
        proportion: height / width * 100
      }

      _this.setState({
        svgInfo: Object.assign({}, _this.state.svgInfo, {[id]: temp})
      })
    }
    Img.src = src
  }

  render () {
    let data = this.props.data.result.judgeresults
    if (data.length !== 0 && (this.select.length === 0 ||
      data[0].id !== this.select[0].id)) {
      this.select = this.props.data.result.judgeresults.map((r, i) => {
        return {
          id: r.id,
          isSelected: false,
          defectCode: r.defectCode
        }
      })
    }
    return (
      <div className={classes['AutoDefectJudgeZone-container']}>
        <div className={classes['top']}>
          <div>
            <div className={classes['top-left']}>
              <div className={classes.productGlass}>Product: </div>
              <div className={`${classes.strong} ${classes.fz16}`}>
                {this.props.productCode}
              </div>
            </div>
            <div className={classes['top-left']}>
              <div className={classes.productGlass}>Glass: </div>
              <div className={`${classes.strong} ${classes.fz16}`}>
                {this.props.glassCode}
              </div>
            </div>
          </div>
          <div>
            <div className={classes['top-right']}>Total&nbsp;
              <span>{this.props.data.result.totalNum}&nbsp;
              </span>images
            </div>
            <label className='pt-control pt-checkbox'>
              <input type='checkbox' onChange={this.autoRefresh} checked={this.state.autoRefresh} />
              <span className='pt-control-indicator' />
              自动刷新
            </label>
          </div>
        </div>
        <div className={classes['container']}>
          <div className={classes.main}>
            {(() => {
              if (data.length === 0) {
                return (<h4>无数据</h4>)
              } else if (data[0].noData === 'no') {
                return (<h4 />)
              } else {
                let tmp = data.map((d, i) => {
                  return (
                    <div key={i} className={classes.picContainer}>
                      <span
                        className={`pt-icon-standard pt-icon-info-sign ${classes.picInfo}`}
                        onClick={this.toggleDialog(d.id)}
                      />
                      <div className={classes.defectCodeDefectCode}>
                        <span className={classes.defectCode}>
                          {this.select[i].defectCode === '' ? '-' : this.select[i].defectCode}
                        </span>
                        <span className={classes.reliability} style={{color: this.getColorByConfidence(d.confidence)}}>
                          {d.confidence * 100}%
                        </span>
                      </div>
                      <section>
                        <div className={classes.judgeResultTitle}>
                          <span>Judge Result ID: {d.id}</span>
                          {
                            (identifyRole(this.props.userRole) === 'admin') ? (
                              <label
                                style={{
                                  margin: 0
                                }}
                                className='pt-control pt-checkbox'>
                                <input type='checkbox'
                                  checked={this.select[i].isSelected}
                                  onChange={this.handleEnabledChange(i)} />
                                <span className={`pt-control-indicator ${classes['pt-control-indicator']}`} />
                              </label>
                            ) : null
                          }
                        </div>
                        <div className={classes.svgBox}>
                          {this.state.svgInfo[d.id]
                            ? <Svg info={this.state.svgInfo[d.id] || {}} />
                            : this.imgLoaded.includes(d.id) || this.getSvgInfo(d)
                          }
                        </div>
                      </section>
                    </div>
                  )
                })
                return tmp
              }
            })()}
          </div>
          <div className={classes.info}>
            <Tabs handleSelectCode={this.handleSelectCode} />
            {
              (identifyRole(this.props.userRole) === 'admin') ? (
                <Button onClick={this.handleSubmit}>判定</Button>
              ) : null
            }
          </div>
        </div>
        <Pagination
          total={this.props.data.result.totalNum}
          current={this.props.data.result.pageNO}
          totalPage={this.props.data.result.totalPage}
          goValue={this.state.goValue}
          pageClick={this.pageClick}
          goPrev={this.goPrevClick}
          goNext={this.goNext}
          switchChange={this.goSwitchChange} />
        {this.state.isOpen
          ? (<Dialog
            isOpen={this.state.isOpen}
            toggleDialog={this.toggleDialog()}
            data={this.state.defectDetail && this.state.defectDetail.result}
            message={this.state.defectDetail && this.state.defectDetail.message}
          />)
          : ''
        }
      </div>
    )
  }
}

export default AutoDefectJudgeZone
