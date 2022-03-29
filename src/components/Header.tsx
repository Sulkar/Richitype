import { resetTest } from "helpers/resetTest";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	setTheme,
	setTime,
	setWordList,
	timerSet,
	setCurrentText,
	setUser,
} from "store/actions";
import { State } from "store/reducer";
import "stylesheets/Header.scss";
import "stylesheets/AnimatedTheme.scss";
import TextModal from "./TextModal";
import TimeModal from "./TimeModal";
import UserModal from "./UserModal";

export interface Options {
	time: number[];
	theme: string[];
	currentText: string[];
}

interface AnimationProps {
	top: number;
	left: number;
	theme: string;
}

export const options: Options = {
	time: [5, 15, 30, 45, 60, 120],
	theme: ["dark", "light"],
	currentText: [
		"001_Wörter",
		"002_fj",
		"003_urk",
		"004_dk",
		"005_Sätze_Englisch",
		"006_Der_Braunbär",
		"007_Lachen",
		"008_test",
	],
};

type MyProps = {
	fill: string;
};

export default function Header() {
	const [showTimeModal, setShowTimeModal] = useState(false);
	const [showUserModal, setShowUserModal] = useState(false);
	const [showTextModal, setShowTextModal] = useState(false);

	const {
		preferences: { timeLimit, theme, currentText, user },
		time: { timerId },
	} = useSelector((state: State) => state);
	const [animationProps, setAnimationProps] =
		useState<AnimationProps | null>();
	const dispatch = useDispatch();

	useEffect(() => {
		const theme = localStorage.getItem("theme") || "dark";
		const currentText = localStorage.getItem("currentText") || "001_Wörter";
		const user = localStorage.getItem("user") || "";
		const time = parseInt(localStorage.getItem("time") || "60", 10);
		import(`wordlists/${currentText}.json`).then((words) =>
			dispatch(setWordList(words))
		);
		dispatch(setCurrentText(currentText));
		dispatch(setUser(user));
		dispatch(timerSet(time));

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
			document.body.className = theme;
			//document.body.classList.add(theme);
			localStorage.setItem("theme", theme);
		}
	}, [dispatch, theme]);

	// Set Time
	useEffect(() => {
		if (timeLimit !== 0) {
			dispatch(setTime(timeLimit));
			localStorage.setItem("time", `${timeLimit}`);
			resetTest();
		}
	}, [dispatch, timeLimit]);

	// Set CurrentText
	useEffect(() => {
		if (currentText !== "") {
			dispatch(setCurrentText(currentText));
			localStorage.setItem("currentText", currentText);
			resetTest();
		}
	}, [dispatch, currentText]);

	// Set user
	useEffect(() => {
		if (user !== "") {
			dispatch(setUser(user));
			localStorage.setItem("user", user);
			resetTest();
		}
	}, [dispatch, user]);

	const openTextModal = () => {
		setShowTextModal((s) => true);
	};
	const openTimeModal = () => {
		setShowTimeModal((s) => true);
	};
	const openUserModal = () => {
		setShowUserModal((s) => true);
	};

	const switchTheme = (theme: string) => {
		setTimeout(() => {
			dispatch(setTheme(theme));
		}, 750);
		setAnimationProps({
			top: 0,
			left: 0,
			theme: theme,
		});
	};

	const handleOptions = ({ target, clientX, clientY }: React.MouseEvent) => {
		if (target instanceof HTMLButtonElement && target.dataset.option) {
			if (target.value === theme || +target.value === timeLimit) {
				target.blur();
				return;
			}

			dispatch(setTime(+target.value));
			target.blur();
		}
	};

	const Icon = () => (
		<svg viewBox="0 0 640 512" fill="currentColor">
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

	const TimeIcon = () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			fill="currentColor"
			viewBox="0 0 16 16">
			<path d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07a7.001 7.001 0 0 1 3.274 12.474l.601.602a.5.5 0 0 1-.707.708l-.746-.746A6.97 6.97 0 0 1 8 16a6.97 6.97 0 0 1-3.422-.892l-.746.746a.5.5 0 0 1-.707-.708l.602-.602A7.001 7.001 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5zm2.5 5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.035 8.035 0 0 0 .86 5.387zM11.613 1.86a2.5 2.5 0 1 1 3.527 3.527 8.035 8.035 0 0 0-3.527-3.527z" />
		</svg>
	);

	const UserIcon = () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			fill="currentColor"
			viewBox="0 0 16 16">
			<path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
		</svg>
	);

	const LightIcon = () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			fill="currentColor"
			viewBox="0 0 16 16">
			<path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
		</svg>
	);

	const DarkIcon = () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			fill="currentColor"
			viewBox="0 0 16 16">
			<path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
		</svg>
	);

	return (
		//<header className={timerId ? "hidden" : undefined}>
		<>
			<header className="">
				<a href="." className="logo">
					<div className="icon color-print">
						<Icon />
					</div>
					<div className="text color-print">typer</div>
				</a>
				<div className="buttons">
					<div className="user color-print">
						Name:
						<span className="mini color-print"> {user}</span>
						<button
							className="mini color-print"
							data-option={"user"}
							onClick={() => openUserModal()}>
							<UserIcon />
						</button>
					</div>
					<div className="time hide-in-print">
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
						<span className="mini selected" data-option={"time"}>
							{timeLimit}
						</span>
						<button
							className="mini"
							data-option={"time"}
							onClick={() => openTimeModal()}>
							<TimeIcon />
						</button>
					</div>

					<div className="theme hide-in-print">
						<button
							className="mini"
							onClick={() =>
								switchTheme(theme === "dark" ? "light" : "dark")
							}>
							{theme === "dark" ? <LightIcon /> : <DarkIcon />}
						</button>
					</div>
					<div className="type color-print">
						Text:
						<button
							className="mini color-print"
							onClick={(e) => openTextModal()}>
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
			{showTextModal && <TextModal setShowTextModal={setShowTextModal} />}
			{showTimeModal && <TimeModal setShowTimeModal={setShowTimeModal} />}
			{showUserModal && <UserModal setShowUserModal={setShowUserModal} />}
		</>
	);
}
