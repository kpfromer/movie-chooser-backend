module.exports = {
  './src/**/*.(ts|js|md)': ['prettier --write', 'git add'],
  './src/**/*.(ts|js)': ['eslint --fix', 'git add']
};
