function extend(deep = false, ...objects) {
	const extended = {}

	// Merge the object into the extended object
	const merge = (obj) => {
		const keys = obj ? Object.keys(obj) : []
		for (let i = 0, length = keys.length; i < length; i++) {
			const key = keys[i]
			if (Object.prototype.hasOwnProperty.call(obj, key)) {
				// If deep merge and property is an object, merge properties
				if (deep && Object.prototype.toString.call(obj[key]) === '[object Object]') {
					extended[key] = extend(true, extended[key], obj[key])
				} else {
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

export { extend }
