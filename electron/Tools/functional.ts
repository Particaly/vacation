export function getEnv(key:any) {
	return import.meta.env[key]
}

type Types =
	| 'object'
	| 'string'
	| 'array'
	| 'undefined'
	| 'null'
	| 'number'
	| 'function'
	| 'asyncfunction'
export function getType(target:any): Types {
	return Object.prototype.toString.call(target).slice(8, -1).toLowerCase() as Types
}
