// standard-version-updater.js
const stringifyPackage = require('stringify-package');
const detectIndent = require('detect-indent');
const detectNewline = require('detect-newline');

module.exports.readVersion = function (contents) {
  const { Major, Minor, Patch } = JSON.parse(contents).version;
  return `${Major}.${Minor}.${Patch}`
}

module.exports.writeVersion = function (contents, version) {
  const json = JSON.parse(contents)
  let indent = detectIndent(contents).indent
  let newline = detectNewline(contents)
  json.version = {
    Major: parseInt(version.split('.')[0]),
    Minor: parseInt(version.split('.')[1]),
    Patch: parseInt(version.split('.')[2])
  }
  return stringifyPackage(json, indent, newline)
}
