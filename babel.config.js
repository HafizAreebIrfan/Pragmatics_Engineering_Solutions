module.exports = function(api) {
  api.cache(true);

  const isTest = process.env.NODE_ENV === 'test';

  const presets = [
    ['module:@react-native/babel-preset', { unstable_transformProfile: 'hermes-stable' }],
  ];

  // Only include nativewind/babel preset when NOT in test environment
  if (!isTest) {
    presets.push('nativewind/babel');
  }

  const plugins = [
    'react-native-reanimated/plugin',
    '@babel/plugin-transform-export-namespace-from',
  ];

  return {
    presets,
    plugins,
  };
};
