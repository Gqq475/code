import classes from './Pagination.scss'
import React from 'react'

type Props = {
  current: Number,
  total: Number,
  goValue: String,
  switchChange: Function,
  goPrev: Function,
  goNext: Function,
  pageClick: Function,
};
export default class Pagination extends React.Component {
  props: Props
  constructor (props) {
    super(props)
    this.pageClick = this.pageClick.bind(this)
    this.state = {
    }
  }

  pageClick (num) {
    return () => {
      this.props.pageClick(num)
    }
  }

  render () {
    let _this = this
    // 当前页码
    let cur = this.props.current
    // 显示分页按钮
    let pageNum = []
    let begin
    let len
    if (_this.props.totalPage > 5) {
      len = 5
      if (cur >= (_this.props.totalPage - 2)) {
        begin = _this.props.totalPage - 4
      } else if (cur <= 3) {
        begin = 1
      } else {
        begin = cur - 2
      }
    } else {
      len = _this.props.totalPage
      begin = 1
    }
    // 根据返回的总记录数计算当前页显示的数据
    for (let i = 0; i < len; i++) {
      let cur = this.props.current
      let showI = begin + i
      if (cur === showI) {
        pageNum.push({num: showI, cur: true})
      } else {
        pageNum.push({num: showI, cur: false})
      }
    }
    return (
      <div className={classes.div}>
        <div className={classes['paginationDiv']}>
          <div className={classes.leftDiv}>
            <a className={this.props.current === 1 ? `${classes.prev} ${classes.disable}` : classes.prev}
              onClick={this.props.goPrev} />
            <span>
              {
              pageNum.map((curPageNum, i) => (
                <a key={`page-${i}`} onClick={this.pageClick(curPageNum.num)}
                  className={curPageNum.cur ? `${classes.num} ${classes.current}` : classes.num}>{curPageNum.num}
                </a>
              ))
            }
            </span>
            <a className={this.props.current === this.props.total ? `${classes.next} ${classes.disable}` : classes.next}
              onClick={this.props.goNext} />
          </div>
          <div className={classes['rightDiv']}>
            总共<span className={classes['num-total']}>{_this.props.total}</span>条，
                共
            <span className={classes['num-total']}>{_this.props.totalPage}</span>
              页，到第
            <input className={classes.input}
              type='text'
              value={this.props.goValue ? _this.props.current : ''}
              onChange={this.props.switchChange} />
              页
          </div>
        </div>
      </div>
    )
  }
}
