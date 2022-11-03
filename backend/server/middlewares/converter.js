const execCall = require('../controllers/execCall');

module.exports = (req, res, next) => {
	try {
		const options = req.body.options.join(',').replace(',', ' ');
		const command = process.platform === 'win32' ? 'IfcConvert' : './IfcConvert';
		const execStr = `${command} ./uploads/${req.body.file} ${options} ./uploads/${req.body.outputFile} -y`;
		console.log(execStr);
		const execData = execCall(execStr);
		if (execData.ok) {
			console.log(execData);
			next();
		} else {
			res.status(500);
			res.json({
				error: "ifcConvert failed"
			})
		}
	} catch (error) {
		res.status(500);
		res.json({
			error: "wrong exec data provided"
		})
	}

};





