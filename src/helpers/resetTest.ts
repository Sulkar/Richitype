import { setLastWord, setTimerId, setWordList, timerSet } from "store/actions";
import { store } from "store/store";

export const resetTest = async () => {
	const { dispatch, getState } = store;
	const {
		time: { timerId },
		preferences: { timeLimit, lastWord, currentText },

	} = getState();
	document
		.querySelectorAll(".wrong, .right")
		.forEach((el) => el.classList.remove("wrong", "right"));
	document.getElementsByClassName("box")[0].classList.add("boxPartial");
	if (timerId) {
		clearInterval(timerId);
		dispatch(setTimerId(null));
	}

	dispatch(setWordList(currentText));
	dispatch(timerSet(timeLimit));
	dispatch(setLastWord(false));
	
};
