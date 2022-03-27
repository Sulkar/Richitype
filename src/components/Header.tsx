import { resetTest } from "helpers/resetTest";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	setTheme,
	setTime,
	setType,
	setWordList,
	timerSet,
	setCurrentText,
} from "store/actions";
import { State } from "store/reducer";
import "stylesheets/Header.scss";
import "stylesheets/AnimatedTheme.scss";
import OptionsModal from "./OptionsModal";
import TextModal from "./TextModal";
import TimeModal from "./TimeModal";
import { time } from "console";

export interface Options {
	time: number[];
	/*theme: string[];*/
	type: string[];
}

interface AnimationProps {
	top: number;
	left: number;
	theme: string;
}

export const options: Options = {
	time: [5, 15, 30, 45, 60, 120],
	/*theme: [
		"default",
		"mkbhd",
		"mocha",
		"coral",
		"ocean",
		"azure",
		"forest",
		"rose-milk",
		"us-light"
	],*/
	type: ["001_words", "002_sentences", "003_text", "004_text", "005_text", "006_text", "007_text", "008_text", "009_text"],
};

type MyProps = {
	fill: string;
};

export default function Header() {
	const [showModal, setShowModal] = useState(false);
	const [showTimeModal, setShowTimeModal] = useState(false);
	const [showTextModal, setShowTextModal] = useState(false);

	const {
		preferences: { timeLimit, theme, type, currentText },
		time: { timerId },
	} = useSelector((state: State) => state);
	const [animationProps, setAnimationProps] =
		useState<AnimationProps | null>();
	const dispatch = useDispatch();

	useEffect(() => {
		const theme = localStorage.getItem("theme") || "default";
		const type = localStorage.getItem("type") || "words";
		const currentText = localStorage.getItem("currentText") || "words";
		const time = parseInt(localStorage.getItem("time") || "60", 10);
		import(`wordlists/${type}.json`).then((words) =>
			dispatch(setWordList(words.default))
		);
		dispatch(setCurrentText(currentText));

		dispatch(timerSet(time));
		dispatch(setType(type));
		dispatch(setTime(time));
		dispatch(setTheme(theme));
	}, [dispatch]);

	// Set Theme
	useEffect(() => {
		if (theme) {
			document.querySelector(".theme")?.childNodes.forEach((el) => {
				if (el instanceof HTMLButtonElement)
					el.classList.remove("selected");
			});
			document
				.querySelector(`button[value="${theme}"]`)
				?.classList.add("selected");
			//document.body.children[1].classList.remove(...options.theme);
			document.body.children[1].classList.add(theme);
			localStorage.setItem("theme", theme);
		}
	}, [dispatch, theme]);

	// Set Time
	useEffect(() => {
		if (timeLimit !== 0) {
			document.querySelector(".time")?.childNodes.forEach((el) => {
				if (el instanceof HTMLButtonElement)
					el.classList.remove("selected");
			});
			document
				.querySelector(`button[value="${timeLimit}"]`)
				?.classList.add("selected");
			dispatch(setTime(timeLimit));
			localStorage.setItem("time", `${timeLimit}`);
			resetTest();
		}
	}, [dispatch, timeLimit]);

	// Set Type
	useEffect(() => {
		if (type !== "") {
			document.querySelector(".type")?.childNodes.forEach((el) => {
				if (el instanceof HTMLButtonElement)
					el.classList.remove("selected");
			});
			document
				.querySelector(`button[value="${type}"]`)
				?.classList.add("selected");
			dispatch(setType(type));
			localStorage.setItem("type", type);
			resetTest();
		}
	}, [dispatch, type]);

	// Set CurrentText
	useEffect(() => {
		if (currentText !== "") {
			dispatch(setCurrentText(currentText));
			localStorage.setItem("currentText", currentText);
			resetTest();
		}
	}, [dispatch, currentText]);

	const openOptionsModal = ({
		target,
		clientX,
		clientY,
	}: React.MouseEvent) => {
		setShowModal((s) => true);
	};
	const openTextModal = ({ target, clientX, clientY }: React.MouseEvent) => {
		setShowTextModal((s) => true);
	};
	const openTimeModal = ({ target, clientX, clientY }: React.MouseEvent) => {
		setShowTimeModal((s) => true);
	};

	const handleOptions = ({ target, clientX, clientY }: React.MouseEvent) => {
		if (target instanceof HTMLButtonElement && target.dataset.option) {
			//setShowModal((s) => !s);
			if (target.value === theme || +target.value === timeLimit) {
				target.blur();
				return;
			}
			switch (target.dataset.option) {
				case "theme":
					setTimeout(() => {
						dispatch(setTheme(target.value));
					}, 750);
					setAnimationProps({
						top: clientY,
						left: clientX,
						theme: target.value,
					});
					break;
				case "time":
					dispatch(setTime(+target.value));
					break;
				case "type":
					dispatch(setType(target.value));
					break;
			}
			target.blur();
		}
	};

	const Icon = ({ fill }: MyProps) => (
		<svg viewBox="0 0 640 512" fill={fill}>
			<path d="M0 224v272c0 8.84 7.16 16 16 16h80V192H32c-17.67 0-32 14.33-32 32zm360-48h-24v-40c0-4.42-3.58-8-8-8h-16c-4.42 0-8 3.58-8 8v64c0 4.42 3.58 8 8 8h48c4.42 0 8-3.58 8-8v-16c0-4.42-3.58-8-8-8zm137.75-63.96l-160-106.67a32.02 32.02 0 0 0-35.5 0l-160 106.67A32.002 32.002 0 0 0 128 138.66V512h128V368c0-8.84 7.16-16 16-16h96c8.84 0 16 7.16 16 16v144h128V138.67c0-10.7-5.35-20.7-14.25-26.63zM320 256c-44.18 0-80-35.82-80-80s35.82-80 80-80 80 35.82 80 80-35.82 80-80 80zm288-64h-64v320h80c8.84 0 16-7.16 16-16V224c0-17.67-14.33-32-32-32z"></path>
		</svg>
	);

	const GearIcon = () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			fill="currentColor"
			className="bi bi-gear-fill"
			viewBox="0 0 16 16">
			<path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
		</svg>
	);
	return (
		//<header className={timerId ? "hidden" : undefined}>
		<>
			<header className="">
				<a href="." className="logo">
					<div className="icon">
						{theme === "default" ? (
							<Icon fill="#d1d0c5" />
						) : (
							<Icon fill="tomato" />
						)}
					</div>
					<div className="text">typer</div>
				</a>
				<div className="buttons">
					<div className="time">
						Zeit:
						{options.time.map((seconds: number) => (
							<button
								className="mini"
								key={seconds}
								data-option={"time"}
								value={seconds}
								onClick={(e) => handleOptions(e)}>
								{seconds}
							</button>
						))}
						|
						<button
							className="mini"
							key={""}
							data-option={"time"}
							value={""}
							onClick={(e) => openTimeModal(e)}>
							{""} <GearIcon />
						</button>
						
					</div>

					<div className="theme">
						<button
							className="mini"
							onClick={(e) => openOptionsModal(e)}>
							theme
						</button>
					</div>
					<div className="type">
						Text:
						<button
							className="mini"
							onClick={(e) => openTextModal(e)}>
							{currentText}
						</button>
					</div>
				</div>
				{animationProps ? (
					<div
						className={`animated-theme ${animationProps.theme}`}
						style={{
							top: animationProps.top,
							left: animationProps.left,
						}}
						onAnimationEnd={() => setAnimationProps(null)}></div>
				) : null}
			</header>
			{showModal && <OptionsModal setShowModal={setShowModal} />}
			{showTextModal && <TextModal setShowTextModal={setShowTextModal} />}
			{showTimeModal && <TimeModal setShowTimeModal={setShowTimeModal} />}
		</>
	);
}
