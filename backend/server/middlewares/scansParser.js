
let scansParser = (req, res, next) => {
	try {
		
		next();	
	} catch (error) {
		res.status(500);
		res.json({
			error:"wrong scans json provided"
		})
	}
	
};

module.exports = scansParser;
