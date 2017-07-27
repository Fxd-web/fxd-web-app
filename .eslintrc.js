module.exports = {
  root: true,
  extends: 'airbnb/base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'quote-props': 0,
    'consistent-return': 0,
    'func-names': 0,
    'comma-dangle':0,
    'import/first':0,
    'import/no-unresolved':0,
    'import/no-extraneous-dependencies':0,
    'import/newline-after-import':0,
    'import/extensions':0,
    'object-shorthand':0,
    'no-unused-expressions':0,
    'key-spacing':0,
    'global-require':0,
    'camelcase':0,
  },
}
