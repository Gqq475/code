import React from 'react'
import classes from './DefectJudgeZone.scss'
import Tabs from 'components/DefectCodeTabs'
import Dialog from 'components/DefectJudgeDialog'
import OurToaster from 'components/OurToaster'
import { Button } from '@blueprintjs/core'
import { identifyRole } from '../../Utils.js'

type Props = {
  data: Object,
  defectDetail: Object,
  submitJudge: Function,
  getDefectDetailById: Function,
  userRole: Array
};

export class DefectJudgeZone extends React.Component {
  props: Props

  constructor (props) {
    super(props)
    this.handleEnabledChange = this.handleEnabledChange.bind(this)
    this.handleSelectCode = this.handleSelectCode.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.cb = this.cb.bind(this)
    this.toggleDialog = this.toggleDialog.bind(this)
    this.select = this.props.data.result.lots.map((r, i) => {
      return {
        id: r.id,
        isSelected: false,
        defectCode: r.defectCode
      }
    })
    this.state = {
      isOpen: false,
      defectDetail: null,
      defectId: null
    }
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
        defectId: this.props.data.result.lots[i].id,
        defectCode: d.defectCode
      })
    })
    this.props.submitJudge(formatted, this.cb)
  }

  cb (res) {
    if (res.code === 200000) {
      OurToaster.show({message: '判定成功!'})
    } else {
      OurToaster.show({message: '判定失败!'})
    }
    // this.select = this.props.data.result.lots.map((r, i) => {
    //   return {
    //     id: r.id,
    //     isSelected: false,
    //     defectCode: ''
    //   }
    // })
    // this.setState({})
  }

  toggleDialog (id) {
    return () => {
      if (!this.state.isOpen) {
        this.props.getDefectDetailById(id)
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

  componentWillMount () {
    this.setState({
      defectDetail: this.props.defectDetail
    })
  }

  componentWillReceiveProps (nextProps) {
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

    this.select = []
  }

  render () {
    let data = this.props.data.result.lots
    if (data.length !== 0 && (this.select.length === 0 ||
      data[0].id !== this.select[0].id)) {
      this.select = this.props.data.result.lots.map((r, i) => {
        return {
          id: r.id,
          isSelected: false,
          defectCode: r.defectCode
        }
      })
    }
    return (
      <div className={classes['DefectJudgeZone-container']}>
        <div className={classes.main}>
          {
          data.length === 0
          ? (<h4>无数据</h4>)
          : data.map((d, i) => {
            return (
              <div key={i} className={classes.picContainer}>
                <span
                  className={`pt-icon-standard pt-icon-info-sign ${classes.picInfo}`}
                  onClick={this.toggleDialog(d.id)}
                 />
                <label className='pt-control pt-checkbox .modifier'>
                  { (identifyRole(this.props.userRole) !== 'guest-only')
                    ? (<div>
                      <input type='checkbox'
                        checked={this.select[i].isSelected}
                        onChange={this.handleEnabledChange(i)} />
                      <span className='pt-control-indicator' style={{ right: 0, left: 'auto' }} />
                    </div>) : null }
                  <span>Defect ID: {d.id}</span>
                  <img className={classes.pic} src={d.imagePathList[0]} />
                </label>
                {
                  // <Checkbox
                  //   checked={this.select[i].isSelected}
                  //   onChange={this.handleEnabledChange(i)}>
                  //   <span>{d.id}</span>
                  //   <img className={classes.pic} src={d.imagePathList[0]} />
                  // </Checkbox>
                }
                <div className={classes.defectCode}>
                  {this.select[i].defectCode === '' ? '-' : this.select[i].defectCode}
                </div>
              </div>
            )
          })
        }
        </div>
        <div className={classes.info}>
          <Tabs handleSelectCode={this.handleSelectCode} />
          { (identifyRole(this.props.userRole) !== 'guest-only')
            ? (<Button onClick={this.handleSubmit}>判定</Button>) : null }
        </div>
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

export default DefectJudgeZone
