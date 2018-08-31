var manifest = require("../../src/extension/manifest.json"),
    fileSystem = require("fs"),
    path = require("path"),
    env = require("./env");

// var iconSmall = require("../../src/extension/icon-34.png")
// var iconLarge = require("../../src/extension/icon-128.png")

// generates the manifest file using the package.json informations
manifest.description = process.env.npm_package_description;
manifest.version = process.env.npm_package_version;

fileSystem.writeFileSync(
  path.join(__dirname, "../../build/extension/manifest.json"),
  JSON.stringify(manifest)
);

[
  'icon-34.png',
  'icon-128.png',
].map(item=> {
fileSystem.createReadStream( path.join(__dirname, `../../src/extension/${item}` ))
.pipe(fileSystem.createWriteStream(  path.join(__dirname, `../../build/extension/${item}`)));

})
