module.exports = {
  extends: 'airbnb',
  plugins: ['react', 'import'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      generators: true,
      experimentalObjectRestSpread: true
    },
    sourceType: 'module',
    allowImportExportEverywhere: false
  },
  plugins: ['flowtype'],
  extends: ['airbnb', 'plugin:flowtype/recommended'],
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: true
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.json', '.css', '.styl']
      }
    }
  },
  globals: {
    window: true,
    FileReader: true,
    Blob: true,
    localStorage: true,
    navigator: true,
    document: true,
    require: true,
    __dirname: true,
    __DEV__: true,
    CONFIG: true,
    process: true,
    jest: true,
    describe: true,
    test: true,
    it: true,
    expect: true,
    beforeEach: true,
    fetch: true,
    alert: true,
    URL: true,
    XMLHttpRequest: true
  },
  rules: {
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        jsx: 'never',
        styl: 'never',
        css: 'never'
      }
    ],
    'no-shadow': 0,
    'no-use-before-define': 0,
    'no-param-reassign': 0,
    'react/prop-types': 0,
    'react/no-render-return-value': 0,
    'no-confusing-arrow': 0,
    'no-underscore-dangle': 0,
    'no-plusplus': 0,
    camelcase: 1,
    'prefer-template': 1,
    'react/no-array-index-key': 1,
    'global-require': 1,
    'react/jsx-indent': 1,
    'dot-notation': 1,
    'import/no-named-default': 1,
    'no-unused-vars': 1,
    'flowtype/no-weak-types': 1,
    'consistent-return': 0,
    'import/prefer-default-export': 0,
    'no-console': 0,
    'jsx-a11y/no-static-element-interactions': 1,
    'no-case-declarations': 1,
    // 'semi': [2, 'always'],
    'flowtype/semi': [
      2, 'always'
    ],
    'jsx-quotes': [
      1, 'prefer-double'
    ],
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.jsx', '.js']
      }
    ],
    'spaced-comment': [
      2,
      'always',
      {
        markers: ['?']
      }
    ],
    'arrow-parens': [
      2,
      'as-needed',
      {
        requireForBlockBody: false
      }
    ],
    'arrow-body-style': 1,
    'function-paren-newline': 1,
    // 'brace-style': [2, 'stroustrup'],
    'comma-dangle': [
      2,
      {
        arrays: 'never',
        objects: 'never',
        imports: 'never',
        exports: 'never',
        functions: 'never'
      }
    ],
    'max-len': [
      'warn',
      {
        code: 200,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreComments: true,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true
      }
    ],
    'react/sort-comp': [
      2,
      {
        order: [
          'propTypes',
          'props',
          'state',
          'defaultProps',
          'contextTypes',
          'childContextTypes',
          'getChildContext',
          'static-methods',
          'lifecycle',
          'everything-else',
          'render'
        ]
      }
    ],
    'linebreak-style': 0,
    'import/no-mutable-exports': 0,
    'import/no-dynamic-require': 0,
    'import/no-cycle': 0,
    'no-return-assign': 0,
    'react/no-string-refs': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/media-has-caption': 0,
    'no-nested-ternary': 0,
    'react/no-did-mount-set-state': 0,
    'react-hooks/exhaustive-deps': 0,
    'react/state-in-constructor': 0,
    'react/jsx-props-no-spreading': 0,
    'react/static-property-placement': 0,
    'react/jsx-curly-newline': 1,
    'react/jsx-fragments': 0,
    'react/no-unescaped-entities': 1
  }
};