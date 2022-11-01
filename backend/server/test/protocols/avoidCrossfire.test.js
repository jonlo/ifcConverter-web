const { PROTOCOLS } = require("../../radar/constants");
const setTestScanData = require('./ScanDataTestParser');
const ProtocolFactory = require('../../radar/protocols/protocolFactory');

const scansData = [{ enemies: { number: 10, type: "soldier" }, allies: 3, coordinates: { y: 35, x: 5 } }, { enemies: { number: 20, type: "soldier" }, coordinates: { y: 5, x: 35 } }]


test('avoid crossfire ', () => {
	let scans = setTestScanData(scansData);
	const protocol = ProtocolFactory.createProtocol(PROTOCOLS.AVOID_CROSSFIRE);
	scans = protocol.apply(scans);
	const result = { x: scans[0].coordinates.x, y: scans[0].coordinates.y }
	expect(result).toStrictEqual({ x: 35, y: 5 });
});