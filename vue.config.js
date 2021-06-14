module.exports = {
  lintOnSave: false,
  devServer: {
    port: process.env.VUE_APP_PORT,
    host: "0.0.0.0",
    watchOptions: {
      poll: 1000,
    },
  },
};
