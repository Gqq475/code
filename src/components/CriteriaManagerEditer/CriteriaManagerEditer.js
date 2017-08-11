import React, {PropTypes} from 'react'
import classes from './CriteriaManagerEditer.scss'
import { Slider, Checkbox, Radio, Switch } from '@blueprintjs/core'
import { identifyRole } from '../../Utils.js'

type Props = {
  criteriaManagerUpdate: Function,
  criteriaManagerAdd: Function,
  data: Object,
  type: String,
  loading: Boolean,
  userRole: Array,
};

const Select = ({
  name = 'name',
  options = {1: 1, 2: 2, 3: 3},
  value = 3,
  handleChange = () => {},
  disabled = false,
  className = '',
  styles = {}
}) => (
  <label className={`pt-label ${className}`}>
    {name}
    <div
      className='pt-select'
      style={styles}
    >
      <select
        value={value}
        disabled={disabled}
        onChange={handleChange}
      >
        {Object.keys(options).map((k, i) => {
          return <option key={i} value={k}>{Object.values(options)[i]}</option>
        })}
      </select>
    </div>
  </label>
)
Select.propTypes = {
  name: PropTypes.string,
  options: PropTypes.object,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  handleChange: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  styles: PropTypes.object
}

const LabelInput = ({
    styles = { width: 200 },
    placeholder = '',
    name = 'test',
    value = '',
    className = '',
    disabled = false,
    handleChange = () => {}
  }) => (
    <label className={`pt-label ${className}`}>
      {name}
      <div className='pt-input-group'>
        <input
          className='pt-input'
          type='text'
          style={styles}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChange={handleChange}
        />
      </div>
    </label>
)
LabelInput.propTypes = {
  styles: PropTypes.object,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func
}

export class CriteriaManagerEditer extends React.Component {
  props: Props;

  constructor (props) {
    super(props)

    this.handleLevelChange = this.handleLevelChange.bind(this)
    this.postDataFormat = this.postDataFormat.bind(this)
    this.doUpdate = this.doUpdate.bind(this)
    this.doAdd = this.doAdd.bind(this)
    this.resetState = this.resetState.bind(this)
    this.formatData = this.formatData.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)

    this.state = {}
  }

  componentDidMount () {
    const {data} = this.props
    Object.keys(data).length
      ? this.setState({...this.formatData(data)})
      : this.setState(this.resetState())
  }

  componentWillReceiveProps (newprops) {
    const {data} = newprops
    Object.keys(data).length
      ? this.setState({...this.formatData(data)})
      : this.setState(this.resetState())
  }

  resetState () {
    return {
      id: null,
      enabled: false,
      alarmLevel: 4,
      productName: 'SV509-CF',
      operationName: '2100',
      lineIDName: 'PIPR01',
      subEntityName: 'PIN01',
      outliner: 1,
      ooc: 0,
      oos: 0,
      qualityType: 1,
      qualityJson: '',
      timeRadio: 1,
      timeCondInterval: 10,
      timeCondPieceCount: 10,
      timeCondPieceType: 2,
      timeCondType: 1,
      totalDefect: true,
      defectSize: true,
      ss: true,
      s: true,
      m: true,
      l: true,
      o: true,
      defectCode: true,
      judegDefectCode: true,
      defectCodeVal: '',
      judegDefectCodeVal: '',
      updateBy: 'unknown',
      summary: ''
    }
  }

  handleLevelChange () {
    return (value: number) => this.setState({ alarmLevel: value })
  }

  handleChange (type) {
    return (e) => {
      let value = e.target.value
      if (type === 'ooc' || type === 'oos') {
        value = value.replace(/[^\d.]/g, '')
      } else if (type === 'outliner' || type === 'timeCondInterval' || type === 'timeCondPieceCount') {
        value = !(value = parseInt(e.target.value, 10)) || isNaN(value) ? 1 : value
      }

      this.setState({
        [type]: value
      })
    }
  }

  handleCheckboxChange (type) {
    return (e) => {
      this.setState({
        [type]: !this.state[type]
      })
    }
  }

  formatData (data) {
    data.timeRadio = 2
    if (data.timeCondInterval === -1) {
      data.timeRadio = 1
      data.timeCondInterval = 10
      data.timeCondPieceCount = 10
      data.timeCondPieceType = 2
      data.timeCondType = 1
    }

    if (data.enabled === 1 || data.enabled === true) {
      data.enabled = true
    } else {
      data.enabled = false
    }
    return Object.assign(data)
  }

  postDataFormat () {
    const takeOut = [
      'totalDefect',
      'defectSize',
      'ss',
      's',
      'm',
      'l',
      'o',
      'defectCode',
      'judegDefectCode',
      'defectCodeVal',
      'judegDefectCodeVal'
    ]
    let postData = {}
    let qualityJson = {}

    Object.keys(this.state).forEach((k, i) => {
      if (takeOut.indexOf(k) > -1) {
        qualityJson[k] = Object.values(this.state)[i]
      } else {
        postData[k] = Object.values(this.state)[i]
      }
    })

    postData.qualityJson = JSON.stringify(qualityJson)
    postData.enabled = (postData.enabled === true ? 1 : 2)
    if (+postData.timeRadio === 1) {
      postData.timeCondInterval = -1
      postData.timeCondPieceCount = -1
      postData.timeCondPieceType = -1
      postData.timeCondType = -1
    }
    postData.qualityType = 1
    postData.updateBy = 'unknown'
    delete postData.timeRadio
    postData.id || delete postData.id

    return postData
  }

  doUpdate () {
    this.props.criteriaManagerUpdate(this.postDataFormat())
  }

  doAdd () {
    this.props.criteriaManagerAdd(this.postDataFormat())
  }

  render () {
    const { type } = this.props
    return (
      <div className={classes['CriteriaManagerEditer-container']}>
        {this.props.loading
          ? (<div className={classes['loading']} />)
          : ''}
        <div className={`${classes['title-save']} ${classes['clearfix']}`}>
          {
            (identifyRole(this.props.userRole) !== 'guest-only') ? (
              <div>
                <button
                  disabled={type !== 'add'}
                  className={`pt-button pt-intent-primary pt-large ${classes['right']}`}
                  onClick={this.doAdd}
                >Edit mode</button>
                <button
                  disabled={type !== 'update'}
                  className={`pt-button pt-intent-primary pt-large ${classes['right']} ${classes['mr20']}`}
                  onClick={this.doUpdate}
                >Apply change</button>
              </div>
            ) : null
          }
          <h4>规则详情</h4>
          {
            this.state['id']
            ? (<div><strong>ID {this.state.id}</strong>&nbsp;<span /></div>)
            : <div>&nbsp;</div>
          }
        </div>

        <div className={classes['enable-level-alarms']}>
          <div className={classes.enable}>
            <Switch
              label='Enable'
              checked={this.state.enabled}
              onChange={this.handleCheckboxChange('enabled')}
            />
          </div>
          <div className={`${classes.level} ${classes.clearfix}`}>
            <div className={classes['level-left']}>
              告警级别
            </div>
            <div className={classes['level-slider']}>
              <Slider
                min={1}
                max={9}
                labelStepSize={1}
                onChange={this.handleLevelChange()}
                value={this.state.alarmLevel}
              />
            </div>
          </div>
          <div className={classes.alarms}>
            <strong />
          </div>
        </div>

        <div className={classes.step}>
          <div className={`${classes['step-item']} ${classes['step-item-1']}`}>
            <h5>1. <span>Product</span></h5>
            <div className={classes['padding-p']}>
              <Select
                name='Product'
                value={this.state.productName}
                handleChange={this.handleChange('productName')}
                options={{
                  'SV509-CF': 'SV509-CF',
                  'JV508-CG': 'JV508-CG',
                  'GV507-DF': 'GV507-DF',
                  'NV506-HF': 'NV506-HF',
                  '8V505-BF': '8V505-BF'
                }}
              />
            </div>
            <div className={classes['padding-p']}>
              <Select
                name='Operation'
                value={this.state.operationName}
                handleChange={this.handleChange('operationName')}
                options={{
                  '2100': '2100',
                  '3100': '3100',
                  '4100': '4100',
                  '5100': '5100',
                  '6100': '6100'
                }}
              />
            </div>
            <div className={classes['padding-p']}>
              <Select
                name='LINE ID'
                value={this.state.lineIDName}
                handleChange={this.handleChange('lineIDName')}
                options={{
                  'PIPR01': 'PIPR01',
                  'KIHR02': 'KIHR02',
                  'YIHR10': 'YIHR10',
                  'LIPK90': 'LIPK90',
                  'OIPK01': 'OIPK01'
                }}
              />
            </div>
            <div className={classes['padding-p']}>
              <Select
                name='Sub entity'
                value={this.state.subEntityName}
                handleChange={this.handleChange('subEntityName')}
                options={{
                  'PIN01': 'PIN01',
                  'PIN02': 'PIN02',
                  'PIN03': 'PIN03',
                  'PIN04': 'PIN04',
                  'PIN05': 'PIN05'
                }}
              />
            </div>
            <div className={classes['padding-p']}>
              <LabelInput
                name='Outliner'
                value={this.state.outliner}
                handleChange={this.handleChange('outliner')}
              />
            </div>
            <div className={classes['padding-p']}>
              <LabelInput
                name='Summary'
                value={this.state.summary}
                handleChange={this.handleChange('summary')}
              />
            </div>
          </div>
          <div className={`${classes['step-item']} ${classes['step-item-2']}`}>
            <h5>2. <span>Condition</span></h5>
            <div className={classes['ooc-oos']}>
              <LabelInput
                className={`pt-inline ${classes.ooc}`}
                value={this.state.ooc}
                name='OOC'
                handleChange={this.handleChange('ooc')}
                styles={{
                  width: 50
                }}
              />
              <LabelInput
                className={`pt-inline ${classes.oos}`}
                value={this.state.oos}
                name='OOS'
                handleChange={this.handleChange('oos')}
                styles={{
                  width: 50
                }}
              />
            </div>
            <ul className={classes['ul']}>
              <li>
                <Checkbox
                  checked={this.state.totalDefect}
                  onChange={this.handleCheckboxChange('totalDefect')}
                >
                Total defect
                </Checkbox>
                <ul className={classes['ul']}>
                  <li className={classes['defect-size']}>
                    <Checkbox
                      disabled={!this.state.totalDefect}
                      checked={this.state.defectSize}
                      onChange={this.handleCheckboxChange('defectSize')}
                    >
                      Defect size
                    </Checkbox>
                    <ul className={classes['ul']}>
                      <li>
                        <Checkbox
                          disabled={!this.state.totalDefect || !this.state.defectSize}
                          checked={this.state.ss}
                          onChange={this.handleCheckboxChange('ss')}
                        >
                        SS
                        </Checkbox>
                      </li>
                      <li>
                        <Checkbox
                          disabled={!this.state.totalDefect || !this.state.defectSize}
                          checked={this.state.s}
                          onChange={this.handleCheckboxChange('s')}
                        >
                        S
                        </Checkbox>
                      </li>
                      <li>
                        <Checkbox
                          disabled={!this.state.totalDefect || !this.state.defectSize}
                          checked={this.state.m}
                          onChange={this.handleCheckboxChange('m')}
                        >
                        M
                        </Checkbox>
                      </li>
                      <li>
                        <Checkbox
                          disabled={!this.state.totalDefect || !this.state.defectSize}
                          checked={this.state.l}
                          onChange={this.handleCheckboxChange('l')}
                        >
                        L
                        </Checkbox>
                      </li>
                      <li>
                        <Checkbox
                          disabled={!this.state.totalDefect || !this.state.defectSize}
                          checked={this.state.o}
                          onChange={this.handleCheckboxChange('o')}
                        >
                        O
                        </Checkbox>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Checkbox
                      disabled={!this.state.totalDefect}
                      checked={this.state.defectCode}
                      onChange={this.handleCheckboxChange('defectCode')}
                    >
                    Defect Code (用逗号分隔)
                    </Checkbox>
                    <div className={classes['ml20']}>
                      <input
                        className='pt-input'
                        type='text'
                        placeholder=''
                        value={this.state.defectCodeVal}
                        onChange={this.handleChange('defectCodeVal')}
                        disabled={!this.state.totalDefect || !this.state.defectCode}
                      />
                    </div>
                  </li>
                  <li className={classes['mt10']}>
                    <Checkbox
                      disabled={!this.state.totalDefect}
                      checked={this.state.judegDefectCode}
                      onChange={this.handleCheckboxChange('judegDefectCode')}
                    >
                    Judge defect Code (用逗号分隔)
                    </Checkbox>
                    <div className={classes['ml20']}>
                      <input
                        className='pt-input'
                        type='text'
                        placeholder=''
                        value={this.state.judegDefectCodeVal}
                        onChange={this.handleChange('judegDefectCodeVal')}
                        disabled={!this.state.totalDefect || !this.state.judegDefectCode}
                      />
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className={`${classes['step-item']} ${classes['step-item-1']}`}>
            <h5>3. <span>Time</span></h5>
            <div className={classes['time-radio']}>
              <Radio
                label='单片超过(无时间设定)'
                value={1}
                checked={+this.state.timeRadio === 1}
                name='timeRadio'
                onChange={this.handleChange('timeRadio')}
                />
              <Radio
                label='时间区间内+片数设定'
                value={2}
                checked={+this.state.timeRadio === 2}
                name='timeRadio'
                onChange={this.handleChange('timeRadio')}
              />
              <div className={classes['radio-select']}>
                <Select
                  name=''
                  value={this.state.timeCondType}
                  disabled={+this.state.timeRadio === 1}
                  className={`pt-inline ${classes['left']} ${classes['select']}`}
                  handleChange={this.handleChange('timeCondType')}
                  options={{
                    '1': '固定区间总和',
                    '2': '固定区间平均',
                    '3': '移动区间总和',
                    '4': '移动区间平均'
                  }}
                  styles={{
                    width: 130
                  }}
                />
                <LabelInput
                  name=''
                  disabled={+this.state.timeRadio === 1}
                  value={this.state.timeCondInterval}
                  handleChange={this.handleChange('timeCondInterval')}
                  styles={{
                    width: 50,
                    float: 'left',
                    margin: '0 10px 0 10px'
                  }}
                />
                分钟
              </div>
              <div className={classes['radio-select']}>
                <span className={`${classes['left']} ${classes['span']}`}>最少</span>
                <Select
                  name=''
                  value={this.state.timeCondPieceType}
                  disabled={+this.state.timeRadio === 1}
                  className={`pt-inline ${classes['left']} ${classes['select']}`}
                  handleChange={this.handleChange('timeCondPieceType')}
                  options={{
                    1: '连续片数',
                    2: '累积片数',
                    3: '平均片数'
                  }}
                  styles={{
                    width: 100
                  }}
                />
                <LabelInput
                  name=''
                  value={this.state.timeCondPieceCount}
                  disabled={+this.state.timeRadio === 1}
                  handleChange={this.handleChange('timeCondPieceCount')}
                  styles={{
                    width: 50,
                    float: 'left',
                    margin: '0 10px 0 10px'
                  }}
                />
                片
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CriteriaManagerEditer
