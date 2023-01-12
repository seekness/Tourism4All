/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  resolver: {
    extraNodeModules: {
      '@api': `${__dirname}/app/api`,
      '@components': `${__dirname}/app/components`,
      '@configs': `${__dirname}/app/configs`,
      '@models': `${__dirname}/app/models`,
      '@developer': `${__dirname}/app/developer`,
      '@navigation': `${__dirname}/app/navigation`,
      '@navigator': `${__dirname}/app/navigation/navigator`,
      '@screens': `${__dirname}/app/screens`,
      '@store': `${__dirname}/app/redux/store`,
      '@selectors': `${__dirname}/app/redux/selectors`,
      '@reducers': `${__dirname}/app/redux/reducers`,
      '@actions': `${__dirname}/app/redux/actions`,
      '@sagas': `${__dirname}/app/redux/sagas`,
      '@utils': `${__dirname}/app/utils`,
    },
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
