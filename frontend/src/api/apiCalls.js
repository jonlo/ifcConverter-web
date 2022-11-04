export async function uploadCall(file) {
	const data = new FormData()
	data.append('ifc', file)
	const rawResponse = await fetch("http://localhost:3005/upload", {
		method: 'POST',
		body: data
	});
	const responseData = await rawResponse.json();
	if (rawResponse.status === 200) {
		console.log('upload successful');
		console.log(responseData);
	} else {
		console.log("error");
	}

}

export async function convertCall(data) {
	const rawResponse = await fetch("http://localhost:3005/convert", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			file: data.file,
			options: data.options,
			outputFile: data.outputFile
		})
	});
	const responseData = await rawResponse.json();
	if (rawResponse.status === 200) {
		console.log('convert successful');
		console.log(responseData);
	} else {
		console.log("error");
	}
}
