import { app, BrowserWindow } from "electron";
import { ThreadController } from "@@/Managers/Thread";
import { createWindow, loadUrl } from "@@/Managers/Window";
import { join } from "path";

class Core {
	static ThreadController = ThreadController;
	static createMainWindow (): BrowserWindow {
		const win = createWindow({
			uuid: 'main',
			width: 800,
			height: 600,
			maximizable: false,
			resizable: true,
			center: true,
			frame: false,
			show: true,
			movable: true,
			transparent: true,
			webPreferences: {
				preload: join(__dirname, './preload.js'),
			},
		})
		if (!app.isPackaged) {
			win.webContents.openDevTools()
		}
		loadUrl(win, {
			page: ''
		})
		return win;
	}
}

export default Core;
