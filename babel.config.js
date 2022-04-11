module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'rename-jsx-attribute',
        {
          attributes: {},
        },
      ],
    ],
  };
};
