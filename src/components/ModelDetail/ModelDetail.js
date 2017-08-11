import React from 'react'
import classes from './ModelDetail.scss'
import {Button} from '@blueprintjs/core'
import EditDialog from './EditDialog'
type Props = {
  id: Number,
  data: Object
};
export class TextField {
  constructor (key, value) {
    this.key = key
    this.value = value
  }

  getRender (btn) {
    return (
      <div className={classes.textField}>
        <div className={classes.key}>
          {this.key}
        </div>
        <div className={classes.value}>
          {this.value}
          {btn}
        </div>
      </div>
    )
  }
}
export class ModelDetail extends React.Component {
  props: Props;
  constructor (props) {
    super(props)
    this.state = {
      isEditOpen: false
    }
    this.onEdit = this.onEdit.bind(this)
  }
  onEdit () {
    this.setState({
      isEditOpen: !this.state.isEditOpen
    })
  }
  render () {
    if (this.props.data.id === undefined) {
      return <div />
    } else {
      return (
        <div className={classes['ModelDetail-container']}>
          <div style={{width: '45%'}}>
            <div style={{fontSize: '20px', fontWeight: 'bold'}}>
              {new TextField('Name：', this.props.data.name).getRender()}
            </div>
            {new TextField('Submitted：', this.props.data.createTime).getRender()}
            {new TextField('Status：', this.props.data.status).getRender()}
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div style={{position: 'relative',
              width: '45%',
              border: '2px solid #d7d7d7',
              'borderRadius': '4px',
              padding: '30px 50px',
              margin: '20px 0'}}>
              <div style={{position: 'absolute', top: '-10px', left: '5px', backgroundColor: '#fff'}}>Details</div>
              <div style={{fontWeight: 'bold'}}>Defect images size</div>
              <div style={{paddingLeft: '40px'}}>
                {new TextField('Training：', `${this.props.data.trainingImageCount} images`).getRender()}
                {new TextField('Validation：', `${this.props.data.validationImageCount} images`).getRender()}
                <Button disabled='false' className={classes['btn-submit']} style={{position: 'absolute', top: '90px'}}>
                  Analysis
                </Button>
                {new TextField('Test：', `${this.props.data.testImageCount} images`).getRender()}
                <Button disabled='false' className={classes['btn-submit']} style={{position: 'absolute', top: '126px'}}>
                  Analysis
                </Button>
              </div>
              <div style={{fontWeight: 'bold'}}>Defect Types</div>
              <div style={{paddingLeft: '40px'}}>
                {new TextField('Total trained：', this.props.data.id).getRender()}
                <Button disabled='false' className={classes['btn-submit']} style={{position: 'absolute', top: '180px'}}>
                  Details
                </Button>
              </div>
              <div style={{fontWeight: 'bold'}}>Images Data Resource</div>
              <div style={{margin: '20px 40px'}}>{this.props.data.imageResource}</div>
              <div style={{fontWeight: 'bold'}}>Model Save Path</div>
              <div style={{margin: '20px 40px'}}>{this.props.data.path}</div>
            </div>
            <div style={{position: 'relative',
              width: '45%',
              height: '220px',
              border: '2px solid #d7d7d7',
              'borderRadius': '4px',
              padding: '50px',
              margin: '20px 0'}}>
              <div style={{position: 'absolute', top: '-10px', left: '5px', backgroundColor: '#fff'}}>Properties</div>
              {new TextField('产品：', this.props.data.productCode).getRender()}
              {new TextField('站点：', this.props.data.operationCode).getRender()}
              {new TextField('线别：', this.props.data.lineCode).getRender()}
              {new TextField('机台：', this.props.data.eqCode).getRender()}
              <Button className={classes['btn-submit']} onClick={this.onEdit}>
                Edit
              </Button>
              <EditDialog
                isOpen={this.state.isEditOpen}
                toggleDialog={this.onEdit}
                operation={this.props.data.operationCode}
                lineID={this.props.data.lineCode}
                subEntity={this.props.data.eqCode}
                product={this.props.data.productCode} />
            </div>
          </div>
        </div>
      )
    }
  }
}

export default ModelDetail
