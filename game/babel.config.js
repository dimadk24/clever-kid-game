module.exports = {
  presets: [
    [
      '@babel/env',
      {
        useBuiltIns: 'usage',
      },
    ],
    [
      '@babel/preset-react',
    ],
  ],
  plugins: ['react-hot-loader/babel', '@babel/plugin-syntax-dynamic-import'],
};
