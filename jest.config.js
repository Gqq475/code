const i18n = require('./config/i18n.js')
const config = {
  api_qca: '/api'
  // api_qca     : 'http://172.22.35.188:50080/api',  // stable
  // api_qca     : 'http://172.22.34.220:50080/api',  // mainline
}

module.exports = {
  'roots': [
    './tests'
  ],
  'moduleDirectories': [
    'node_modules',
    './src'
  ],
  'moduleNameMapper': {
    '\\.(css|scss)$': 'identity-obj-proxy'
  },
  'globals': {
    '__QCA__': JSON.stringify(config['api_qca']),
    '_': JSON.stringify(i18n)
  },
  'setupFiles': ['./tests/jestsetup.js'],
  'snapshotSerializers': [
    '<rootDir>/node_modules/enzyme-to-json/serializer'
  ],
  'collectCoverageFrom': [
    'src/**/*.{js,jsx}'
  ],
  'coverageReporters': ['json', 'lcov', 'text-summary']
}
