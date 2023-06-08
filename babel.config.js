module.exports = function (api) {
  api.cache(true)
 
  return {
    "presets": ["@babel/preset-env"],
    "plugins": ["@vue/babel-plugin-jsx"]
  }
}