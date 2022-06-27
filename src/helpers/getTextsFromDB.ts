import axios from "axios";

export const getTextsFromDB = async () => {
	const urlDatabaseGetTextTitles = "http://127.0.0.1/php/get_text_titles.php";

	const res = await axios
		.post(urlDatabaseGetTextTitles)
		.then(function (response) {
			return response.data;
		})
		.catch(function (error) {
			console.log(error);
		});

	return res;
};
