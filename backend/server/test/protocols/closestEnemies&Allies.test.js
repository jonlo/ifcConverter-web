const { PROTOCOLS } = require("../../radar/constants");
const ProtocolFactory = require('../../radar/protocols/protocolFactory');
const setTestScanData = require('./ScanDataTestParser');

const scansData = [{enemies:{number:10,type:"soldier"},allies:3,coordinates:{y:35,x:5}},{enemies:{number:20,type:"soldier"},coordinates:{y:5,x:35}}];

test('closest enemies && assist allies ', () => {
	let scans = setTestScanData(scansData);
	const closestProtocol = ProtocolFactory.createProtocol(PROTOCOLS.CLOSEST_ENEMIES);
	scans = closestProtocol.apply(scans);
	const alliesProtocol = ProtocolFactory.createProtocol(PROTOCOLS.ASSIST_ALLIES);
	scans = alliesProtocol.apply(scans);
	const result = { x: scans[0].coordinates.x, y: scans[0].coordinates.y }
	expect(result).toStrictEqual({ x: 5, y: 35 });
});