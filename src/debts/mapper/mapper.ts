const nestedObjectBuilder = (str, value) =>
	str.split(".").reduceRight((obj, key) => ({ [key]: obj }), value);

const objMerge = (target, source) => {
	for (const key of Object.keys(source)) {
		if (source[key] instanceof Object && key in target)
			Object.assign(source[key], objMerge(target[key], source[key]));
	}

	Object.assign(target || {}, source);
	return target;
};

const objValueMapper = (mappedObj, entityData) => {
	let finalObj = {};
	const baseKeys = Object.keys(mappedObj);

	baseKeys.forEach((baseKey) => {
		let entityValue = entityData[baseKey];
		const item = mappedObj[baseKey];
		const path = [baseKey];
		if (item instanceof Object) {
			path.push(item);
			const itemKeys = Object.keys(item);
			let newObj = {};
			itemKeys.forEach((ik) => {
				const nestedItem = item[ik];
				if (entityData[baseKey] && entityData[baseKey][ik]) {
					entityValue = entityData[baseKey][ik];
				}
				newObj = objMerge(newObj, nestedObjectBuilder(nestedItem, entityValue));
			});
			finalObj = objMerge(finalObj, newObj);
		} else {
			entityValue = entityData[baseKey];
			finalObj = objMerge(finalObj, nestedObjectBuilder(item, entityValue));
		}
	});
	return finalObj;
};

const objKeyMapper = (firstObject) => {
	let newObj = {};
	let firstObjectName = Object.keys(firstObject)[0];
	const secondObject = firstObject[firstObjectName];

	for (const i in secondObject) {
		const iValue = secondObject[i];
		newObj[i] = firstObjectName + "." + iValue;
	}
	return newObj;
};
// const dbt: Object = (mainObj = {}) => {
const objKeyValueMapper = (mainObj = {}) => {
	let mainObjClone = { ...mainObj };
	let newObject = {};
	const path = Object.keys(mainObj);
	const mainObjSpread = objKeyMapper(mainObj);
	const nestedObjKeys = Object.keys(debt).filter((val) => debt[val] instanceof Object);
	const nestedObjs = {};
	nestedObjKeys.forEach((i) => {
		nestedObjs[i] = debt[i];
		const nextPath = [...path, i];
		const nextObj = { [nextPath.join(".")]: { ...nestedObjs }[i] };
		const mappedItem = objKeyMapper(nextObj);
		console.log({ mappedItem });
		newObject[i] = mappedItem;
		// newObject = { ...newObject, ...mappedItem };
		delete mainObjSpread[i];
	});
	return { ...mainObjSpread, ...newObject };
};

const createqitec = () => {
	const mappedKeys = objKeyValueMapper({ debt });
	console.log({ mappedKeys });
	return objValueMapper(mappedKeys, payload);
};
