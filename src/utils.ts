/**
 * Check whether an object has the property
 * @param obj Object reference
 * @param key Object property key inside the object
 * @returns Object has the property key
 */
function hasOwn(obj: any, key: string): any {
	return Object.prototype.hasOwnProperty.call(obj, key)
}

/**
 * Deep clone for multiple objects
 * @param deep Deep clone
 * @param>} objects List of objects to merged
 * @returns Merged object
 */
function extend(deep = false, ...objects: any[]): any {
	const extended = {}

	// Merge the object into the extended object
	const merge = (obj: any) => {
		const keys = obj ? Object.keys(obj) : []
		for (let i = 0, length = keys.length; i < length; i++) {
			const key = keys[i]
			if (hasOwn(obj, key)) {
				// If deep merge and property is an object, merge properties
				if (deep && Object.prototype.toString.call(obj[key]) === '[object Object]') {
					// @ts-ignore
					extended[key] = extend(true, extended[key], obj[key])
				} else {
					// @ts-ignore
					extended[key] = obj[key]
				}
			}
		}
	}

	// Loop through each object and conduct a merge
	for (let i = 0, length = objects.length; i < length; i++) {
		merge(objects[i])
	}

	return extended
}

// eslint-disable-next-line no-useless-escape
const PATTERN_DYNAMIC_SEGMENT = `\/:([^\/]*)`

/**
 * Get dynamic segments from path
 * @param path Path
 * @returns List of dynamic segments as key (without the "/:"")
 */
function getDynamicSegmentsFromPath(path: string): string[] {
	const segments = path.match(new RegExp(PATTERN_DYNAMIC_SEGMENT, 'g')) || []
	const segmentLength = segments.length
	const dynamicSegments = []

	if (segmentLength) {
		for (let i = 0; i < segmentLength; i++) {
			dynamicSegments.push(segments[i].replace('/:', ''))
		}
	}

	return dynamicSegments
}

/**
 * Create RegExp from path
 * Used to match path with dynamic segments ("/:id/:name" = "/42/john-doe")
 * @param path Path
 * @returns Path transformed in RegExp
 */
function createRegExpFromPath(path: string): string {
	return `^${path.replace(
		new RegExp(PATTERN_DYNAMIC_SEGMENT, 'g'),
		PATTERN_DYNAMIC_SEGMENT.replace(':', '')
	)}$`
}

export { extend, hasOwn, getDynamicSegmentsFromPath, createRegExpFromPath }
