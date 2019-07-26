const plugins = [
  [
    "import",
    {
      libraryName: "vant",
      libraryDirectory: "es",
      style: true
    },
    "vant"
  ]
];
if (["production", "prod"].includes(process.env.NODE_ENV)) {
  plugins.push("transform-remove-console"); //打包去除console
}
module.exports = {
  presets: ["@vue/app"],
  plugins: plugins
};
