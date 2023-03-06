import { join } from 'path'
import { getEnv } from '../Tools'
import { BrowserWindow, app } from 'electron'
import type { BrowserWindowConstructorOptions } from 'electron'

interface WindowOptions extends BrowserWindowConstructorOptions {
	uuid: string
}

const cache = new Map()

export function createWindow(options: WindowOptions): BrowserWindow {
	const win = new BrowserWindow(options)
	if (cache.has(options.uuid)) {
		console.warn('this window has already been created.')
	}
	cache.set(options.uuid, win)
	win.on('closed', () => cache.delete(options.uuid))
	return win
}

export function findWindowById(id: string): BrowserWindow {
	return cache.get(id)
}

interface UrlOptions {
	page: string
	hash?: boolean // 是否是 hash 路由，如果是，将会在url后添加 '/#/', 默认为 true
	params?: {
		[prop: string]: string
	}
}
export function loadUrl(win: BrowserWindow, opt: UrlOptions): BrowserWindow {
	opt.hash = opt.hash === undefined ? true : opt.hash
	let location
	if (app.isPackaged) {
		location = join(__dirname, `../../dist/renderer/${opt.page}.html`)
		win.loadFile(location, {
			query: opt.params
		})
	} else {
		const url = getEnv('VITE_DEV_SERVER_URL')
		const hash = opt.hash ? '#/' : ''
		location = `${url}${hash}${opt.page}${toQueryString(opt.params)}`
		win.loadURL(location)
	}
	return win
}

function toQueryString(object: any) {
	let result = ''
	object = object ? object : {}
	Object.keys(object).forEach(key => {
		result += `&${key}=${object[key]}`
	})
	return result ? `?${result.slice(1)}` : '';
}

export const WindowManager = {
	createWindow,
	findWindowById,
	loadUrl
}
