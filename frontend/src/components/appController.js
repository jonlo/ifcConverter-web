import { uploadCall, convertCall, downloadCall } from '../api/apiCalls';

export class AppController {

	static download(file) {
		const url = window.URL.createObjectURL(file);
		const a = document.createElement('a');
		a.href = url;
		a.download = file.name;
		a.click();
	}

	static async convertIfc(file, fileName, options, convertTo) {
		await uploadCall(file);
		const convertResponse = await convertCall({ file: fileName, options: options, outputFile: `${fileName.split('.')[0]}.${convertTo.id}` });
		if (convertResponse !== null && convertResponse.ok) {
			const downloadedFile = await downloadCall(convertResponse);
			if (downloadedFile !== null) {
				return downloadedFile;
			}
		}
		return null;
	}

}