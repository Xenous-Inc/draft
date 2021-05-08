module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["inline-dotenv", 'react-native-reanimated/plugin'],
    env: {
      production: {
        plugins: [["inline-dotenv", {
          path: '.env.prod'
        }]]
      },
      development: {
        plugins: [["inline-dotenv", {
          path: '.env.dev'
        }]]
      },
    }
  };
};
