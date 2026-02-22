const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;
const config = {
    transformer: {
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
      },
      resolver: {
        // Removes 'svg' from assetExts and adds it to sourceExts so Metro treats it like code
        assetExts: assetExts.filter((ext) => ext !== 'svg'),
        sourceExts: [...sourceExts, 'svg'],
      },
};

module.exports = mergeConfig(defaultConfig, config);
