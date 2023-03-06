import {defineConfig} from 'vite'
import config from './tsconfig.json'
import {resolve} from "path";

const conf = config.compilerOptions.paths;
const alias = {}

Object.keys(conf).forEach(key => {
	const k = key.replace('/*', '');
	const v = conf[key][0].replace('/*', '')
	alias[k] = resolve(__dirname, v)
})

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias
	}
})
