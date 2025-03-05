import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginStyleInTemplate from '../src'
import Inspect from 'vite-plugin-inspect'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vitePluginStyleInTemplate(), Inspect()],
})
