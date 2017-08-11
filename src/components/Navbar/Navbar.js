import React from 'react'
import { connect } from 'react-redux'
import classes from './Navbar.scss'
import { Link } from 'react-router'
import { Menu, Popover, Position, Button, MenuItem } from '@blueprintjs/core'
import SubNav from 'components/SubNav'
import { deauthenticate } from 'actions'
import ReLogin from 'components/ReLogin'
import { identifyRole } from '../../Utils.js'

type Props = {
  route: Object,
  lockScreen: Boolean,
  userRole: Array,
  deauthenticate: Function
}

export class Navbar extends React.Component {
  props: Props;

  render () {
    let { userRole } = this.props
    let path = null
    let RouteLink = null
    if ((/qca/).exec(this.props.route.path)) {
      path = 'QCA'
    } else if ((/drtm/).exec(this.props.route.path)) {
      path = 'dRTM'
    } else {
      path = 'SADJ'
    }
    if ((/QCA/).exec(path)) {
      RouteLink = (
        <div style={{
          display: 'flex'
        }}>
          <Link to='/dRTM/currentalarm'
            className={classes.link}>
            {'dRTM'}
          </Link>
          {
            (identifyRole(userRole) !== 'guest-only') ? (
              <Link to={'/ojs/servicemanagement'}
                className={classes.link}>
                {'SADJ'}
              </Link>
            ) : null
          }
        </div>
      )
    } else if ((/SADJ/).exec(path)) {
      RouteLink = (
        <div style={{
          display: 'flex'
        }}>
          <Link to={'/dRTM/currentalarm'}
            className={classes.link}>
            {'dRTM'}
          </Link>
          <Link to={'/qca/dashboard'}
            className={classes.link}>
            {'QCA'}
          </Link>
        </div>
      )
    } else if ((/dRTM/).exec(path)) {
      RouteLink = (
        <div style={{
          display: 'flex'
        }}>
          <Link to={'/qca/dashboard'}
            className={classes.link}>
            {'QCA'}
          </Link>
          {
            (identifyRole(userRole) !== 'guest-only') ? (
              <Link to={'/ojs/servicemanagement'}
                className={classes.link}>
                {'SADJ'}
              </Link>
            ) : null
          }
        </div>
      )
    }
    const dRTMCompassMenu = (
      <Menu className={classes.menu}>
        <Link to='/drtm/currentalarm' className={classes.menuItem}>
          <Button className={`pt-menu-item pt-minimal ${classes['menu-item-button']}`}
            text={_.CURRENTALARM} />
        </Link>
        <Link to='/drtm/alarmhistory' className={classes.menuItem}>
          <Button className={`pt-menu-item pt-minimal ${classes['menu-item-button']}`}
            text={_.ALARMHISTORY} />
        </Link>
        <Link to='/drtm/criteriamanager' className={classes.menuItem}>
          <Button className={`pt-menu-item pt-minimal ${classes['menu-item-button']}`}
            text={_.CRITERIAMANAGER} />
        </Link>

        <Link to='/drtm/alarmrate' className={classes.menuItem}>
          <Button className={`pt-menu-item pt-minimal ${classes['menu-item-button']}`}
            text={_.ALARMRATE} />
        </Link>
      </Menu>
    )
    const QCACompassMenu1 = (
      <Menu className={classes.menu}>
        <Link to='/qca/dashboard' className={classes.menuItem}>
          <Button className={`pt-menu-item pt-minimal ${classes['menu-item-button']}`}
            text={_.DASHBOARD} />
        </Link>
        <Link to='/qca/defectmap' className={classes.menuItem}>
          <Button className={`pt-menu-item pt-minimal ${classes['menu-item-button']}`}
            text={_.DEFECTMAP} />
        </Link>
        <Link to='/qca/' className={classes.menuItem}>
          <Button className={`pt-menu-item pt-minimal ${classes['menu-item-button']}`}
            text={_.膜厚分析} />
        </Link>
        <Link to='/qca/' className={classes.menuItem}>
          <Button className={`pt-menu-item pt-minimal ${classes['menu-item-button']}`}
            text={'接触脚功能与破片功能'} />
        </Link>
      </Menu>
    )
    const QCACompassMenu2 = (
      <Menu className={classes.menu}>
        <Link to='/qca/' className={classes.menuItem}>
          <Button className={`pt-menu-item pt-minimal ${classes['menu-item-button']}`}
            text={'Format试算功能'} />
        </Link>
        <Link to='/qca/' className={classes.menuItem}>
          <Button className={`pt-menu-item pt-minimal ${classes['menu-item-button']}`}
            text={_.AOI拍照正确性分析} />
        </Link>
        <Link to='/qca/' className={classes.menuItem}>
          <Button className={`pt-menu-item pt-minimal ${classes['menu-item-button']}`}
            text={_.REPAIR即时修补统计} />
        </Link>
        <Link to='/qca/' className={classes.menuItem}>
          <Button className={`pt-menu-item pt-minimal ${classes['menu-item-button']}`}
            text={_.检测机台检出率} />
        </Link><Link to='/qca/' className={classes.menuItem}>
          <Button className={`pt-menu-item pt-minimal ${classes['menu-item-button']}`}
            text={_.AOI灰阶监控} />
        </Link>
      </Menu>
    )
    const QCACompassMenu3 = (
      <Menu className={classes.menu}>
        <Link to='/qca/' className={classes.menuItem}>
          <Button className={`pt-menu-item pt-minimal ${classes['menu-item-button']}`}
            text={_.AOIMAP对比} />
        </Link>
        <Link to='/qca/' className={classes.menuItem}>
          <Button className={`pt-menu-item pt-minimal ${classes['menu-item-button']}`}
            text={_.PANEL对比分析} />
        </Link>
        <Link to='/qca/' className={classes.menuItem}>
          <Button className={`pt-menu-item pt-minimal ${classes['menu-item-button']}`}
            text={_.REPAIRFORMAT修补功能} />
        </Link>
        <Link to='/qca/' className={classes.menuItem}>
          <Button className={`pt-menu-item pt-minimal ${classes['menu-item-button']}`}
            text={_.TEST即时修补统计} />
        </Link>
      </Menu>
    )
    const QCACompassMenu4 = (
      <Menu className={classes.menu}>
        <MenuItem className={classes.subMenu} text='共通性分析统计功能'>
          <Link to='/qca/stk' className={classes.menuItem}>
            <Button className={`pt-menu-item pt-minimal ${classes['menu-item-button']}`}
              text={_.搬运路径共通性分析} />
          </Link>
          <Link to='/qca/stk' className={classes.menuItem}>
            <Button className={`pt-menu-item pt-minimal ${classes['menu-item-button']}`}
              text={'机台共通性分析'} />
          </Link>
          <Link to='/qca/stk' className={classes.menuItem}>
            <Button className={`pt-menu-item pt-minimal ${classes['menu-item-button']}`}
              text={'原物料共通性分析'} />
          </Link>
          <Link to='/qca/stk' className={classes.menuItem}>
            <Button className={`pt-menu-item pt-minimal ${classes['menu-item-button']}`}
              text={'制程参数（EDC）比对'} />
          </Link>
          <Link to='/qca/echarts' className={classes.menuItem}>
            <Button className={`pt-menu-item pt-minimal ${classes['menu-item-button']}`}
              text={'Echarts制图试用'} />
          </Link>
        </MenuItem>
        <Link to='/qca/' className={classes.menuItem}>
          <Button className={`pt-menu-item pt-minimal ${classes['menu-item-button']}`}
            text={_.DEFECTRATE分析} />
        </Link>
        <Link to='/qca/' className={classes.menuItem}>
          <Button className={`pt-menu-item pt-minimal ${classes['menu-item-button']}`}
            text={_.REWORKRATE分析} />
        </Link>
        <Link to='/qca/' className={classes.menuItem}>
          <Button className={`pt-menu-item pt-minimal ${classes['menu-item-button']}`}
            text={_.黄光专区} />
        </Link>
      </Menu>
    )
    const SAJDCompassMenu = (
      <Menu className={classes.menu}>
        <Link to='/ojs/labelingtool' className={classes.menuItem}>
          <Button className={`pt-menu-item pt-minimal ${classes['menu-item-button']}`}
            text='标记工具' />
        </Link>
        <Link to='/ojs/modelversion' className={classes.menuItem}>
          <Button className={`pt-menu-item pt-minimal ${classes['menu-item-button']}`}
            text='模型管理' />
        </Link>
        <Link to='/ojs/modeltrain' className={classes.menuItem}>
          <Button className={`pt-menu-item pt-minimal ${classes['menu-item-button']}`}
            text='模型训练' />
        </Link>
        <Link to='/ojs/modeltest' className={classes.menuItem}>
          <Button className={`pt-menu-item pt-minimal ${classes['menu-item-button']}`}
            text='模型检测' />
        </Link>
      </Menu>
    )
    return (
      <div className={classes['Navbar-container']}>
        {this.props.lockScreen && <ReLogin />}
        <nav className={`pt-navbar pt-dark ${classes.navbar}`}>
          <div className='pt-navbar-group pt-align-left'>
            <div className='pt-navbar-heading'>
              <img className={classes.logo} src='/quality03_0111-20.png' />
            </div>
            <div className={classes.title}>
              {path}
            </div>
            {this.renderList(this.props.userRole, path, SAJDCompassMenu,
             QCACompassMenu4, QCACompassMenu3, QCACompassMenu2, QCACompassMenu1, dRTMCompassMenu)}
          </div>
          <div className='pt-navbar-group pt-align-right'>
            <span className='pt-navbar-divider' />
            { RouteLink }
            <span className='pt-navbar-divider' />
            <button className='pt-button pt-minimal pt-icon-notifications' />
            <button className='pt-button pt-minimal pt-icon-more' />
            <span className='pt-navbar-divider' />
            <span style={{cursor: 'pointer'}} onClick={this.props.deauthenticate}>Log out</span>
          </div>
        </nav>
        <SubNav {...this.props} location={path} />
      </div>
    )
  }

  renderList (userRole, path, SAJDCompassMenu, QCACompassMenu4,
   QCACompassMenu3, QCACompassMenu2, QCACompassMenu1, dRTMCompassMenu) {
    if ((/QCA/).exec(path)) {
      return (
        <section className={classes['navbar-lists']}>
          <Popover className={classes['button-bg']} content={QCACompassMenu1} position={Position.BOTTOM}>
            <span className={classes.button}>
              {_.通用功能}<span className='pt-icon-standard pt-icon-chevron-down pt-align-right' />
            </span>
          </Popover>
          <Popover className={classes['button-bg']} content={QCACompassMenu2} position={Position.BOTTOM}>
            <span className={classes.button}>
              {'检视专区'}<span className='pt-icon-standard pt-icon-chevron-down pt-align-right' />
            </span>
          </Popover>
          <Popover className={classes['button-bg']} content={QCACompassMenu3} position={Position.BOTTOM}>
            <span className={classes.button}>
              {'测试专区'}<span className='pt-icon-standard pt-icon-chevron-down pt-align-right' />
            </span>
          </Popover>
          <Popover className={classes['button-bg']} content={QCACompassMenu4} position={Position.BOTTOM}>
            <span className={classes.button}>
              {'工程专区'}<span className='pt-icon-standard pt-icon-chevron-down pt-align-right' />
            </span>
          </Popover>
        </section>
      )
    } else if ((/dRTM/).exec(path)) {
      return (
        <section className={classes['navbar-lists']}>
          <Popover className={classes['button-bg']} content={dRTMCompassMenu} position={Position.BOTTOM}>
            <span className={classes.button}>
              {_.ALARM}
              <span className='pt-icon-standard pt-icon-chevron-down pt-align-right' />
            </span>
          </Popover>
          <Link to='/drtm/defectjudge' className={`${classes.button} ${classes['button-a']}`}>
            {_.DEFECTJUDGE}
          </Link>
        </section>
      )
    } else if ((/SADJ/).exec(path)) {
      return (
        <section className={classes['navbar-lists']}>
          <Link to='/ojs/servicemanagement' className={`${classes.button} ${classes['button-a']}`}>
            {_.SERVICEMANAGEMENT}
          </Link>
          <Link to='/ojs/autodefectjudge' className={`${classes.button} ${classes['button-a']}`}>
            {_.AUTODEFECTJUDGE}
          </Link>
          {
            (identifyRole(userRole) === 'admin') ? (
              <Popover className={classes['button-bg']} content={SAJDCompassMenu} position={Position.BOTTOM}>
                <span className={classes.button}>
                  Offline
                  <span className='pt-icon-standard pt-icon-chevron-down pt-align-right' />
                </span>
              </Popover>
            ) : null
          }
        </section>
      )
    }
  }
}

export default connect(
  (state) => {
    return {
      token: state.auth.token,
      lockScreen: state.auth.lockScreen,
      userRole: state.auth.userRole
    }
  },
  (dispatch) => ({
    deauthenticate: () => dispatch(deauthenticate())
  })
)(Navbar)
