import React from 'react'
import classes from './CurrentAlarmFilter.scss'
// import { RadioGroup, Radio, Classes, Tooltip, Tree } from '@blueprintjs/core'

type Props = {

};
export class CurrentAlarmFilter extends React.Component {
  props: Props;

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     type: 'product',
  //     criterics: 'alarm-only',
  //     nodes: [{
  //       label: '$PRD_ID',
  //       hasCaret: true,
  //       isExpanded: true,
  //       childNodes: [{
  //         iconName: '',
  //         label: '$PRODUCT_ID*4600',
  //       }]
  //     }, {
  //       label: '$PRD_ID',
  //       hasCaret: true,
  //       isExpanded: true,
  //       childNodes: [{
  //         label: '$LINE_ID',
  //         hasCaret: true,
  //         isExpanded: true,
  //         childNodes: [{
  //           label: '$OPERATION',
  //           hasCaret: true,
  //           isExpanded: true,
  //           childNodes: [{
  //             label: '$PRD_ID$LINE_ID$OPERATION',
  //             iconName: 'pt-icon-small-tick'
  //           }]
  //         }]
  //       }]
  //     }]
  //   }
  // }
  //
  // handleNodeClick = (nodeData: ITreeNode, _nodePath: number[], e: React.MouseEvent < HTMLElement > ) => {
  //   const originallySelected = nodeData.isSelected
  //   if (!e.shiftKey) {
  //     this.forEachNode(this.state.nodes, (n) => n.isSelected = false)
  //   }
  //   nodeData.isSelected = originallySelected == null ? true : !originallySelected
  //   this.setState(this.state)
  // }
  //
  // handleNodeCollapse = (nodeData: ITreeNode) => {
  //   nodeData.isExpanded = false
  //   this.setState(this.state)
  // }
  //
  // handleNodeExpand = (nodeData: ITreeNode) => {
  //   nodeData.isExpanded = true
  //   this.setState(this.state)
  // }
  //
  // forEachNode(nodes: ITreeNode[], callback: (node: ITreeNode) => void) {
  //   if (nodes == null) {
  //     return
  //   }
  //
  //   for (const node of nodes) {
  //     callback(node)
  //     this.forEachNode(node.childNodes, callback)
  //   }
  // }
  //
  // handleMealChange(e) {
  //   this.setState({
  //     type: e.target.value
  //   })
  // }
  //
  // handleCritericsChange(e) {
  //   this.setState({
  //     criterics: e.target.value
  //   })
  // }

  render () {
    return (
      <div className={classes['CurrentAlarmFilter-container']}>
        {
        // <div className={classes['select']}>
        //   <select name="" id="" onChange={this.handleCritericsChange} value={this.state.criterics}>
        //     <option value="all-criterics" key="all-criterics">All criterics</option>
        //     <option value="alarm-only" key="alarm-only">Alarm Only</option>
        //   </select>
        // </div>
        //
        // <div className={classes['radios']}>
        //     <RadioGroup
        //       onChange={this.handleMealChange}
        //       selectedValue={this.state.type}
        //     >
        //       <Radio label="product" name="product" value="product" className={classes['pt-control']} />
        //       <Radio label="line" name="line" value="line" />
        //     </RadioGroup>
        // </div>
        //
        // <div>
        //   <Tree
        //     contents={this.state.nodes}
        //     className={Classes.ELEVATION_0}
        //     onNodeClick={this.handleNodeClick}
        //     onNodeCollapse={this.handleNodeCollapse}
        //     onNodeExpand={this.handleNodeExpand} />
        // </div>
      }
      </div>
    )
  }
}

export default CurrentAlarmFilter
