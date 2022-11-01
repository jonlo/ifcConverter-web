const {PROTOCOLS} = require("../../radar/constants");
const ProtocolFactory = require('../../radar/protocols/protocolFactory');
const setTestScanData = require('./ScanDataTestParser');

const scansData = [{ coordinates: { x: 0, y: 40 }, enemies: { type: "soldier", number: 10 } }, { coordinates: { x: 0, y: 80 }, allies: 5, enemies: { type: "mech", number: 1 } }];

test('prioritize mech ', () => {
	let scans = setTestScanData(scansData);
	const protocol = ProtocolFactory.createProtocol(PROTOCOLS.PRIORITIZE_MECH);
	scans = protocol.apply(scans);
	const result = { x: scans[0].coordinates.x, y: scans[0].coordinates.y }
	expect(result).toStrictEqual({ x: 0, y: 80 });
});