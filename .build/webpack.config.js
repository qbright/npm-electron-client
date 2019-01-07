const mainConfig = require("./webpack.main.config");
const rendererConfig = require("./webpack.render.config");

const config = [mainConfig, rendererConfig];

module.exports = config;