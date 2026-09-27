import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig, mergeConfig, type PluginOption } from 'vite'

import baseConfig from './vite.config.ts'

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [
      visualizer({
        filename: '.bundle-analysis/stats.html',
        template: 'treemap',
        gzipSize: true,
        brotliSize: true,
        open: true,
      }) as PluginOption,
    ],
  }),
)
