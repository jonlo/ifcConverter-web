let backendURL = "http://localhost:3010";

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
	backendURL = "http://localhost:3010";
} else {
	backendURL = "/ifcconverter/backend";
}

export async function uploadCall(file) {
	const data = new FormData()
	data.append('ifc', file)
	const rawResponse = await fetch(`${backendURL}/upload`, {
		method: 'POST',
		body: data
	});
	const responseData = await rawResponse.json();
	if (rawResponse.status === 200) {
		return responseData;
	} else {
		console.log("error");
		return null;
	}

}

export async function convertCall(data) {
	const rawResponse = await fetch(`${backendURL}/convert`, {
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
		return null;
	}
}

export async function downloadCall(data) {
	const rawResponse = await fetch(`${backendURL}/download?${new URLSearchParams({
		file: data.file
	})}`, {
		method: 'GET'
	});
	const fileBlob = await rawResponse.blob();
	if (rawResponse.status === 200) {
		return blobToFile(fileBlob, data.file);
	} else {
		console.log("error");
		return null;
	}
}

function blobToFile(theBlob, fileName) {
	theBlob.lastModifiedDate = new Date();
	theBlob.name = fileName;
	return theBlob;
}