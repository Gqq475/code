/*
 Since every test runs in its own environment,
 these scripts will be executed in the testing environment immediately
 before executing the test code itself.
*/
import { shallow, render, mount } from 'enzyme'
import toJson from 'enzyme-to-json'

global.fetch = require('jest-fetch-mock')
global.shallow = shallow
global.render = render
global.mount = mount
global.toJson = toJson

console.log = () => {}
console.warn = () => {}
