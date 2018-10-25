import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'test.js',
  output: {
    file: 'test.bundle.js',
    format: 'umd',
    name: 'test'
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      "presets": [
        [
          "@babel/preset-env",
          {
            "useBuiltIns": "entry"
          }
        ]
      ]
    })
  ]
}