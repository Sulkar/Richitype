import { resetTest } from "helpers/resetTest";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	setTheme,
	setTime,
	timerSet,
	setTextTitle,
	setUser,
	setTextList,
} from "store/actions";
import { State } from "store/reducer";
import "stylesheets/Header.scss";
import "stylesheets/AnimatedTheme.scss";
import TextModal from "./TextModal";
import TimeModal from "./TimeModal";
import UserModal from "./UserModal";
import { getTextFromDB } from "helpers/getTextFromDB";
import { getTextsFromDB } from "helpers/getTextsFromDB";

export interface Options {
	time: number[];
	theme: string[];
}

interface AnimationProps {
	top: number;
	left: number;
	theme: string;
}

export const options: Options = {
	time: [5, 15, 30, 45, 60, 120],
	theme: ["dark", "light"],
};

type MyProps = {
	fill: string;
};

export default function Header() {
	const [showTimeModal, setShowTimeModal] = useState(false);
	const [showUserModal, setShowUserModal] = useState(false);
	const [showTextModal, setShowTextModal] = useState(false);

	const {
		preferences: { timeLimit, theme, user, textTitle },
		time: { timerId },
	} = useSelector((state: State) => state);
	const [animationProps, setAnimationProps] =
		useState<AnimationProps | null>();
	const dispatch = useDispatch();

	const fillTextList = (textArray) => {
		let tempCodeTextList: string[] = [];
		textArray.forEach((element) => {
			let tempDbText = element.code + "_" + element.titel;
			tempCodeTextList.push(tempDbText);
		});

		dispatch(setTextList(tempCodeTextList));
	};

	useEffect(() => {
		const theme = localStorage.getItem("theme") || "dark";
		const user = localStorage.getItem("user") || "";
		const time = parseInt(localStorage.getItem("time") || "60", 10);

		dispatch(setTextTitle("..."));
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

	// Set user
	useEffect(() => {
		if (user !== "") {
			dispatch(setUser(user));
			localStorage.setItem("user", user);
			resetTest();
		}
	}, [dispatch, user]);

	//load texts from DB once per page load
	useEffect(() => {
		getTextsFromDB().then(function (responseData) {
			fillTextList(responseData);
			getTextFromDB(responseData[0].code);
		});
	}, []);

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

	const RichitypeIcon = () => (
		<svg viewBox="0 0 514.56 290.95" fill="currentColor">
			<g>
				<g>
					<path d="M472.83,291H41.72A41.77,41.77,0,0,1,0,249.23V43A41.77,41.77,0,0,1,41.72,1.29c17.92,0,75.52-.2,142.21-.43C279.71.53,388.24.15,414.05.25c13.27-.26,49.22-.74,60.39,1.17,12.66,2.17,22.05,6.24,27.89,12.09A41.4,41.4,0,0,1,514.56,43V249.23A41.77,41.77,0,0,1,472.83,291ZM402.94,19.23c-37.86,0-133.47.33-218.94.63-66.71.23-124.32.43-142.28.43A22.74,22.74,0,0,0,19,43V249.23A22.74,22.74,0,0,0,41.72,272H472.83a22.75,22.75,0,0,0,22.73-22.72V43a22.59,22.59,0,0,0-6.66-16.07c-1.06-1.06-5.49-4.7-17.67-6.79-7.88-1.35-36.7-1.3-56.76-.91h0l-4.5.1v-.1Z" />
					<path d="M188.78,83.4H168a9.5,9.5,0,0,1,0-19h20.78a9.5,9.5,0,0,1,0,19Z" />
					<path d="M277.28,83.4h-40a9.5,9.5,0,0,1,0-19h40a9.5,9.5,0,0,1,0,19Z" />
					<path d="M365.78,83.4h-40a9.5,9.5,0,0,1,0-19h40a9.5,9.5,0,0,1,0,19Z" />
					<path d="M454.28,83.4h-40a9.5,9.5,0,0,1,0-19h40a9.5,9.5,0,0,1,0,19Z" />
					<path d="M188.39,131.73H168a9.5,9.5,0,0,1,0-19h20.39a9.5,9.5,0,1,1,0,19Z" />
					<path d="M276.89,131.73h-40a9.5,9.5,0,0,1,0-19h40a9.5,9.5,0,1,1,0,19Z" />
					<path d="M455.42,131.73H325.78a9.5,9.5,0,0,1,0-19H455.42a9.5,9.5,0,1,1,0,19Z" />
					<path d="M188,180.06H166.22a9.5,9.5,0,1,1,0-19H188a9.5,9.5,0,0,1,0,19Z" />
					<path d="M276.5,180.06h-40a9.5,9.5,0,0,1,0-19h40a9.5,9.5,0,0,1,0,19Z" />
					<path d="M390.6,230.07a9.5,9.5,0,0,1-9.5-9.5V128.68a9.5,9.5,0,1,1,19,0v91.89A9.51,9.51,0,0,1,390.6,230.07Z" />
					<path d="M99.11,228.4h-40a9.5,9.5,0,1,1,0-19h40a9.5,9.5,0,0,1,0,19Z" />
					<path d="M345.78,228.4H147.61a9.5,9.5,0,0,1,0-19H345.78a9.5,9.5,0,0,1,0,19Z" />
					<path d="M79.61,127.81H71.54v36.56q0,7.22-3.18,10.63a10.84,10.84,0,0,1-8.31,3.42,10.62,10.62,0,0,1-8.54-3.57q-3-3.57-3-10.48V76.81q0-7.45,3.33-10.79t10.79-3.34H100.1a116.23,116.23,0,0,1,13.28.66A33.54,33.54,0,0,1,123.31,66a28.8,28.8,0,0,1,9.47,6.44A28.44,28.44,0,0,1,139,82.21,32.54,32.54,0,0,1,141.16,94q0,12.72-7.18,20.33t-21.77,10.79a41.88,41.88,0,0,1,11.72,9.63,97.38,97.38,0,0,1,10,13.54,101.35,101.35,0,0,1,6.83,13q2.44,5.79,2.44,8a8.16,8.16,0,0,1-1.43,4.46,10.15,10.15,0,0,1-3.92,3.5,12.43,12.43,0,0,1-5.75,1.28,11.16,11.16,0,0,1-6.52-1.83A17.37,17.37,0,0,1,121,172q-1.9-2.79-5.16-8.22l-9.24-15.37a84.84,84.84,0,0,0-8.88-12.89,21.91,21.91,0,0,0-8-6.05A27.28,27.28,0,0,0,79.61,127.81ZM92.81,80H71.54v31.28H92.19a57.78,57.78,0,0,0,14-1.43,16.43,16.43,0,0,0,8.65-4.89q3-3.45,3-9.51a14.4,14.4,0,0,0-9.08-13.74Q104.69,80,92.81,80Z" />
					<path d="M345.78,180.06H325.39a9.5,9.5,0,0,1,0-19h20.39a9.5,9.5,0,0,1,0,19Z" />
					<path d="M455.42,180.06H435a9.5,9.5,0,0,1,0-19h20.39a9.5,9.5,0,0,1,0,19Z" />
					<path d="M455.42,230.07H435a9.5,9.5,0,0,1,0-19h20.39a9.5,9.5,0,0,1,0,19Z" />
				</g>
			</g>
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
						<RichitypeIcon />
					</div>
					<div className="text color-print">richitype</div>
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
							{textTitle}
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
