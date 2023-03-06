import { fork } from 'child_process'
import type { ForkOptions } from 'child_process'

interface ThreadOptions extends ForkOptions {
	modulePath: string;
	args?: any[]
}

export class ThreadController {
	static createThread (options: ThreadOptions) {
		console.log('creating thread');
		const {modulePath, args} = options
		const child = fork(modulePath, args, options)
		let flag = false;
		setInterval(() => {
			flag = !flag;
			if (flag) {
				child.kill('SIGSTOP');
			} else {
				child.kill('SIGCONT');
			}
		}, 5000)
	}
}
