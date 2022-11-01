const { exec } = require("child_process");


module.exports = {
	convertIfc: (file, outputFormat, options) => {
		
		exec(`IfcConvert ${file} ${options} ${outputFormat}`, (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				return;
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
				return;
			}
			console.log(`stdout: ${stdout}`);
		});
	}

} 