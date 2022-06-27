import { setCurrentText, setTextTitle, setWordList } from "store/actions";
import { store } from "store/store";
import axios from "axios";

export const getTextFromDB = async (dbCode: string) => {
	const { dispatch } = store;
	const urlDatabaseGetText = "http://127.0.0.1/php/get_text.php";
	dispatch(setCurrentText(["loading..."]));

	axios
		.post(urlDatabaseGetText, {
			text_code: dbCode,
		})
		.then(function (response) {
			let splitWordArray = response.data.text.split("|");
			dispatch(setCurrentText(splitWordArray));
			dispatch(setWordList(splitWordArray));
			dispatch(
				setTextTitle(response.data.code + "_" + response.data.titel)
			);
		})
		.catch(function (error) {
			console.log(error);
		});
};
