const Scan = require("../../radar/scanner/scan")
const DistanceSorter = require("../../radar/scanner/distanceSorter")

module.exports = (scansData) => {
	const scans = [];
	scansData.forEach((scanData) => {
		scans.push(new Scan(scanData));
	});
	DistanceSorter.sortByCloserDistance(scans);
	return scans;
}