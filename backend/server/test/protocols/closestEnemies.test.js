const {PROTOCOLS} = require("../../radar/constants");
const ProtocolFactory = require('../../radar/protocols/protocolFactory');
const setTestScanData = require('./ScanDataTestParser');

const scansData = [{ enemies: { number: 10, type: "soldier" }, coordinates: { y: 35, x: 5 } }, { enemies: { number: 20, type: "soldier" }, coordinates: { y: 30, x: 10 } }];

test('closest enemies ', () => {
	let scans = setTestScanData(scansData);
	const protocol = ProtocolFactory.createProtocol(PROTOCOLS.CLOSEST_ENEMIES);
	scans = protocol.apply(scans);
	const result = { x: scans[0].coordinates.x, y: scans[0].coordinates.y }
	expect(result).toStrictEqual({ x: 10, y: 30 });
});