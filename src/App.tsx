import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "components/Header";
import Test from "components/Test";
import Result from "components/Result";
import Footer from "components/Footer";
import { State } from "store/reducer";
import { setCurrentText, setLastWord, setTimerId } from "store/actions";
import { recordTest } from "helpers/recordTest";
import "stylesheets/themes.scss";

export default function App() {
	const {
		time: { timerId, timer },
		word: { currWord, typedWord, activeWordRef },
		preferences: {lastWord, currentText},

	} = useSelector((state: State) => state);
	const dispatch = useDispatch();
	const [showPallet, setShowPallet] = useState(false);

	useEffect(() => {
		document.onkeydown = (e) => {
			if (e.ctrlKey && e.key === "k") {
				setShowPallet((s) => !s);
				e.preventDefault();
			} else if (
				e.key.length === 1 ||
				e.key === "Backspace" ||
				e.key === "Tab"
			) {
				recordTest(e.key, e.ctrlKey);
				e.preventDefault();
			}
		};
		return () => {
			document.onkeydown = null;
		};
	}, [dispatch]);

	useEffect(() => {
		let idx = typedWord.length - 1;
		const currWordEl = activeWordRef?.current!;
		if (currWordEl) {
			currWordEl.children[idx + 1].classList.add(
				currWord[idx] !== typedWord[idx] ? "wrong" : "right"
			);
		}
	}, [currWord, typedWord, activeWordRef]);

	useEffect(() => {
		let idx = typedWord.length;
		const currWordEl = activeWordRef?.current!;
		console.log("remove wrong right " + currWord)
		
		if (currWordEl && idx < currWord.length)
			currWordEl.children[idx + 1].classList.remove("wrong", "right");		
		
	}, [currWord, typedWord, activeWordRef]);

	useEffect(() => {
				
		if (currWord === undefined && timerId){
			console.log("lastWord")
			dispatch(setLastWord(true));
			clearInterval(timerId);
			dispatch(setTimerId(null));
			document.getElementsByClassName("box")[0].classList.remove("boxPartial");
		}else{
			console.log("not last word")
		}
		
	}, [currWord]);

	useEffect(() => {
		if (timer === 0 && timerId) {
			
			clearInterval(timerId);
			dispatch(setTimerId(null));
			document.getElementsByClassName("box")[0].classList.remove("boxPartial");
		}
	}, [dispatch, timer, timerId]);

	return (
		<>
			<Header />
			{(timer === 0 || lastWord ) ? <Result /> : ""}
			<Test />
			<Footer />
		</>
	);
}
