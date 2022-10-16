// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//     'postcss-preset-env': {}
//   },
// }

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-preset-env')
  ]
}
