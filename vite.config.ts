import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from "vite-plugin-electron";
import config from './tsconfig.json'
import {resolve} from "path";

const conf = config.compilerOptions.paths;
const alias = {}

Object.keys(conf).forEach(key => {
	const k = key.replace('/*', '');
	const v = conf[key][0].replace('/*', '')
	alias[k] = resolve(__dirname, v)
})


export default defineConfig({
	plugins: [
		vue(),
		electron([
			{
				// Main-Process entry file of the Electron App.
				entry: 'electron/main.ts',
				vite: {
					configFile: 'electron.config.ts'
				}
			},
			{
				entry: 'electron/preload.ts',
				onstart(options) {
					console.log('starting Electron App');
					// Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete,
					// instead of restarting the entire Electron App.
					options.reload()
				},
			}
		])
	],
	resolve: {
		alias
	}
})
