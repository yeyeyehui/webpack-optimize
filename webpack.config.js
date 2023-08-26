const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const SpeedMeasureWebpackPlugin = require("speed-measure-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HashPlugin = require("./plugins/hash-plugin");
const smw = new SpeedMeasureWebpackPlugin();
//const bootstrap = path.resolve(__dirname,'node_modules/bootstrap/dist/css/bootstrap.css');
module.exports = {
  //如果mode是production,会启用压缩插件,如果配置为none表示不会启用压缩插件
  mode: "development",
  devtool: false,
  entry: {
    main: "./src/index.js",
    //vendor: ['lodash']//vendor是供应商，第三方的意思
    //因为第三代码是不常改变的，所以我们希望长期缓存，单独形成一个文件，哈希不变一直走缓存
  },
  output: {
    path: path.resolve("build"),
    filename: "[name].[hash:8].js",
    clean: true,

    // libraryExport: ['add'], // 只导出add方法

    // 根据入口文件内容，全局var创建一个变量calculator
    // library: "calculator",
    // libraryTarget: "var",

    //   module.exports = (function (modules) {}({})
    // libraryTarget: "commonjs",

    //   exports["calculator"] = (function (modules) {}({})
    // libraryTarget: "commonjs2",
  },
  optimization: {
    moduleIds: "deterministic",
    chunkIds: "deterministic",
  },
  /*  optimization: {
     minimize: true,//启用压缩
     minimizer:[new TerserPlugin()]
   }, */
  //配置如何查找源代码中引入的模块
  resolve: {
    extensions: [".js"],
    alias: {
      //bootstrap
    },
    modules: ["mymodules", "node_modules"],
    mainFields: ["style", "main"], //指是查找package.json中的字段，默认main当入口文件，这里可以改成先找style入口文件
    mainFiles: ["index.js", "base.js"], // 路径是文件夹，默认走的是文件夹的index.js，index.js没有就招base.js
  },
  //指定如何查找loader
  resolveLoader: {
    extensions: [".js"],
    alias: {
      //bootstrap
    },
    modules: ["loaders", "node_modules"],
  },
  module: {
    //一般来说我们拿到模块后要分析里面的依赖的模块import/require
    //些模块我们知道它肯定没有依赖别的模块 jquery lodash,所以可以省这一步
    noParse: /jquery|lodash/,
    noParse(request) {
      return /jquery|lodash/.test(request);
    },
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(jpg|png|gif|bmp|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "images/[chunkhash][ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      /* minify: {
        removeComments: true,
        collapseWhitespace:true
      } */
    }),
    new webpack.IgnorePlugin({
      contextRegExp: /moment$/, //目录的正则
      resourceRegExp: /locale/, //请求的正则
    }),
    //new BundleAnalyzerPlugin()
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
    }),
    //new OptimizeCssAssetsWebpackPlugin()
    //new HashPlugin()
  ],
};
