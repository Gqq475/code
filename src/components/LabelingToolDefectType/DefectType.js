import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { TabList, TabPanel, Tabs, Tab } from '@blueprintjs/core'
import classes from './LabelingToolDefectType.scss'
import {
  MODIFY_DEFECT_MARK_NAME,
  SET_CURRENT_DEFECT_TYPE
} from 'routes/OJS/modules/OJS'

type Props = {
  data: PropTypes.object,
  modifyDefectTypeName: PropTypes.func,
  setCurrentDefectType: PropTypes.func,
  isDialog: PropTypes.bool
};

const DefectTypeItem = (props) => {
  let { index, isSelected, defectTypeId, defectTypeName, handleClick } = props
  return (
    <div
      data-index={index}
      className={+isSelected && classes.active}
      onClick={(e) => handleClick(e.target.dataset.index * 1, defectTypeId, defectTypeName)}
      >
      { defectTypeName }
    </div>
  )
}

DefectTypeItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  defectTypeId: PropTypes.number,
  defectTypeName: PropTypes.string,
  handleClick: PropTypes.func
}

export class DefectType extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      General: {},
      Thin: {},
      Photo: {},
      Etch: {},
      Testing: {},
      CF: {},
      selected: ''
    }
  }

  handleClick (index, defectTypeId, defectTypeName) {
    this.setState({
      selected: index
    })
    if (this.props.isDialog) {
      this.props.setCurrentDefectType(defectTypeId, defectTypeName)
    } else {
      this.props.modifyDefectTypeName(defectTypeId, defectTypeName)
    }
  }

  render () {
    return (
      <div>
        <Tabs>
          <TabList className={classes.tabs}>
            <Tab>General</Tab>
            <Tab>Thin Film</Tab>
            <Tab>Photo</Tab>
            <Tab>Etch</Tab>
            <Tab>Testing</Tab>
            <Tab>CF</Tab>
          </TabList>
          <TabPanel className={classes.tabContent}>
            {
              this.props.data &&
              this.props.data.map((item, index) => {
                if (item.departmentCode === 'General') {
                  return (
                    <DefectTypeItem
                      index={index}
                      key={`${item.departmentCode}-${item.id}`}
                      isSelected={this.state.selected === index}
                      defectTypeId={item.id}
                      defectTypeName={item.name}
                      handleClick={this.handleClick} />
                  )
                }
              })
            }
          </TabPanel>
          <TabPanel className={classes.tabContent}>
            {
              this.props.data &&
              this.props.data.map((item, index) => {
                if (item.departmentCode === 'ThinFilm') {
                  return (
                    <DefectTypeItem
                      index={index}
                      key={`${item.departmentCode}-${item.id}`}
                      isSelected={this.state.selected === index}
                      defectTypeId={item.id}
                      defectTypeName={item.name}
                      handleClick={this.handleClick} />
                  )
                }
              })
            }
          </TabPanel>
          <TabPanel className={classes.tabContent}>
            {
              this.props.data &&
              this.props.data.map((item, index) => {
                if (item.departmentCode === 'Photo') {
                  return (
                    <DefectTypeItem
                      index={index}
                      key={`${item.departmentCode}-${item.id}`}
                      isSelected={this.state.selected === index}
                      defectTypeId={item.id}
                      defectTypeName={item.name}
                      handleClick={this.handleClick} />
                  )
                }
              })
            }
          </TabPanel>
          <TabPanel className={classes.tabContent}>
            {
              this.props.data &&
              this.props.data.map((item, index) => {
                if (item.departmentCode === 'Etch') {
                  return (
                    <DefectTypeItem
                      index={index}
                      key={`${item.departmentCode}-${item.id}`}
                      isSelected={this.state.selected === index}
                      defectTypeId={item.id}
                      defectTypeName={item.name}
                      handleClick={this.handleClick} />
                  )
                }
              })
            }
          </TabPanel>
          <TabPanel className={classes.tabContent}>
            {
              this.props.data &&
              this.props.data.map((item, index) => {
                if (item.departmentCode === 'Testing') {
                  return (
                    <DefectTypeItem
                      index={index}
                      key={`${item.departmentCode}-${item.id}`}
                      isSelected={this.state.selected === index}
                      defectTypeId={item.id}
                      defectTypeName={item.name}
                      handleClick={this.handleClick} />
                  )
                }
              })
            }
          </TabPanel>
          <TabPanel className={classes.tabContent}>
            {
              this.props.data &&
              this.props.data.map((item, index) => {
                if (item.departmentCode === 'CF') {
                  return (
                    <DefectTypeItem
                      index={index}
                      key={`${item.departmentCode}-${item.id}`}
                      isSelected={this.state.selected === index}
                      defectTypeId={item.id}
                      defectTypeName={item.name}
                      handleClick={this.handleClick} />
                  )
                }
              })
            }
          </TabPanel>
        </Tabs>
      </div>
    )
  }
}

export default connect(
  (state) => ({}),
  (dispatch) => ({
    setCurrentDefectType: (defectTypeId, defectTypeName) => {
      dispatch({
        type: SET_CURRENT_DEFECT_TYPE,
        data: {
          defectTypeId,
          defectTypeName
        }
      })
    },
    modifyDefectTypeName: (defectTypeId, defectTypeName) => {
      dispatch({
        type: MODIFY_DEFECT_MARK_NAME,
        data: {
          defectTypeId,
          defectTypeName
        }
      })
    }
  })
)(DefectType)
