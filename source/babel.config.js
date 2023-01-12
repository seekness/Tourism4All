const plugins = ['react-native-reanimated/plugin'];

if (process.env.BABEL_ENV === 'production') {
  plugins.push('transform-remove-console');
}

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: plugins,
};
