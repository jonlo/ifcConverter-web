export async function uploadCall(file) {
	const data = new FormData()
	data.append('ifc', file)
	const rawResponse = await fetch("http://localhost:3005/upload", {
		method: 'POST',
		body: data
	});
	const responseData = await rawResponse.json();
	if (rawResponse.status === 200) {
		return responseData;
	} else {
		console.log("error");
	}

}

export async function convertCall(data) {
	console.log(data.outputFile);
	console.log(data.options);
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
		return responseData;
	} else {
		console.log("error");
	}
}

export async function downloadCall(data) {
	const rawResponse = await fetch("http://localhost:3005/download?" + new URLSearchParams({
		file: data.file
	}), {
		method: 'GET'
	});
	const fileBlob = await rawResponse.blob();
	if (rawResponse.status === 200) {
		return blobToFile(fileBlob, data.file);
	} else {
		console.log("error");
	}
}

function blobToFile(theBlob, fileName) {
	theBlob.lastModifiedDate = new Date();
	theBlob.name = fileName;
	return theBlob;
}