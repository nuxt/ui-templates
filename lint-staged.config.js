module.exports = {
  '*.{js,ts}': ['yarn lint:eslint'],
  '*.{html,vue}': ['yarn lint:eslint', 'yarn lint:prettier'],
  '{!(package)*.json,*.code-snippets,.*rc}': [
    'yarn lint:prettier --parser json'
  ],
  'package.json': ['yarn lint:prettier']
}
