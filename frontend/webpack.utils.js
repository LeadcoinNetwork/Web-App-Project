var fs = require("fs")

function JestUpdateModuleResoultionPacker() {
  var dirs = getRootDirectories()
  var packgeJson = require("./package.json")
  // "moduleNameMapper": {
  // "\\.s?css$": "<rootDir>/src/actions/types"
  var o = {}
  dirs.forEach(dir => {
    o["^" + toCamelcase(dir) + "(.*)$"] = "<rootDir>/src/" + dir + "$1"
    o["^" + dir + "(.*)$"] = "<rootDir>/src/" + dir + "$1"
  })
  o["\\.s?css$"] = "<rootDir>/src/actions/types"
  packgeJson.jest.moduleNameMapper = o
  var newJson = JSON.stringify(packgeJson, null, 2)
  fs.writeFileSync("./package.json", newJson)
}
function toCamelcase(item) {
  return item[0].toUpperCase() + item.slice(1)
}
function getAliasesFromRootSrcForWebPack() {
  var aliases = {}
  var filesAndFolder = getRootDirectories()
  filesAndFolder.forEach(item => {
    aliases[toCamelcase(item)] = __dirname + "/src/" + item
    aliases[item] = __dirname + "/src/" + item
  })
  return aliases
}
function getRootDirectories() {
  return fs
    .readdirSync(__dirname + "/src")
    .filter(item => fs.lstatSync(__dirname + "/src/" + item).isDirectory())
    .sort()
}

module.exports = {
  JestUpdateModuleResoultionPacker,
  getAliasesFromRootSrcForWebPack,
}
