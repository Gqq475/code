import React from 'react'
import classes from './CriteriaManager.scss'
import CMTableWS from 'components/AGTable'
import CMEditerWS from 'components/CriteriaManagerEditer'
import Utils from '../../Utils.js'
import OurToaster from 'components/OurToaster'
import { connect } from 'react-redux'
type Props = {
  data: Object,
  getCriteriaManagerDetail: Function,
  criteriaManagerUpdate: Function,
  criteriaManagerAdd: Function,
  token: String,
  userRole: Array
};
const field = {
  [_.ID]: 'id',
  [_.OOC]: 'ooc',
  [_.OOS]: 'oos',
  [_.LASTUPDATE]: 'updateTime',
  [_.UPDATEBY]: 'updateBy',
  [_.SUMMARY]: 'summary',
  [_.STATUS]: 'enabled'
}

export class CriteriaManager extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.getDetailById = this.getDetailById.bind(this)
    this.showEdit = this.showEdit.bind(this)
    this.setDataSource = this.setDataSource.bind(this)
    this.state = {
      showEditType: ''
    }
  }

  getDetailById (id) {
    this.setState({
      showEditType: id ? 'update' : ''
    })
    this.props.getCriteriaManagerDetail(id)
  }

  showEdit () {
    this.setState({
      showEditType: 'add'
    })
    this.props.getCriteriaManagerDetail(null)
  }

  setDataSource (pageSize, gridApi) {
    // Add data source
    let dataSource = {
      rowCount: null,
      getRows: (params) => {
        let pageNo = parseInt(params.startRow / pageSize) + 1
        let sortBy = params.sortModel[0] ? params.sortModel[0].colId : 'id'
        let order = params.sortModel[0] ? params.sortModel[0].sort : 'asc'
        let url = Utils.format(this.props.data.cmTemplate, [pageNo, pageSize, sortBy, order])

        fetch(url, {
          headers: {
            'Authorization': this.props.token
          }
        })
          .then(response => response.json())
          .then((data) => {
            if (data.code === 200000) {
              let criteria = Utils.dataFormat(data.result.criteria, field)
              let tmpData = []
              criteria.forEach((item) => {
                if (item.enabled === 1) {
                  item.enabled = 'enabled'
                } else {
                  item.enabled = 'disable'
                }
                tmpData.push(item)
              })

              params.successCallback(tmpData, data.result.totalCount)
            } else {
              OurToaster.show({message: `获取列表失败！${data.msg}`})
            }
          })
      }
    }

    gridApi.setDatasource(dataSource)
  }

  render () {
    return (
      <div className={classes['CriteriaManager-container']}>
        <div className={classes.pb10}>
          {
           (Utils.identifyRole(this.props.userRole) !== 'guest-only') ? (
             <button
               className='pt-button pt-icon-add pt-intent-primary'
               type='button'
               onClick={this.showEdit}
               >Add</button>
            ) : null
          }
        </div>
        {
          this.props.data.criteriaManager &&
            <CMTableWS
              field={field}
              setDataSource={this.setDataSource}
              loading={this.props.data.reloadAGgrid}
              handleClick={this.getDetailById}
            />
        }
        {
          (this.state.showEditType || this.props.data.criteriaManagerDetail) ? (
            <section className={`${classes['section']} ${classes['mtb10']}`}>
              <CMEditerWS
                userRole={this.props.userRole}
                type={this.state.showEditType}
                criteriaManagerUpdate={this.props.criteriaManagerUpdate}
                criteriaManagerAdd={this.props.criteriaManagerAdd}
                loading={this.props.data.createManageGDetail}
                data={
                    this.props.data.criteriaManagerDetail
                    ? this.props.data.criteriaManagerDetail.result
                    : {}
                  }
              />
            </section>
          ) : null
        }
      </div>
    )
  }
}
export default connect(
  (state) => ({
    token: state.auth.token,
    userRole: state.auth.userRole
  }),
  (dispatch, state) => {
    return {
      dispatch
    }
  }
)(CriteriaManager)
