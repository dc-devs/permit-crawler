interface ForestNameIdMap {
	[key: string]: {id: string, commercial: boolean};
}

const forestNameIdMap: ForestNameIdMap = {
	'Inyo National Forest': {id: '233262', commercial: true},
	'Yosemite': {id: '445859', commercial: false},
};

export default forestNameIdMap;
