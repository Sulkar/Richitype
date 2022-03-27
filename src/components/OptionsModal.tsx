
//console
import { KeyboardEvent, useEffect, useState, useRef } from "react";
import styles from "stylesheets/CommandPallet.module.scss";
import { options, Options } from "./Header";
import { useDispatch } from "react-redux";
import { setTime, setTheme, setType, setCurrentText } from "store/actions";

interface Props {
	setShowModal: Function;
}

export default function OptionsModal(props: Props) {
	
	const [palletText, setPalletText] = useState("");
	const [selectedOption, setSelectedOption] = useState("");
	const [highlightedOption, setHighlightedOption] = useState(0);
	const [commandList, setCommandList] = useState<string[]>([]);
	const dispatch = useDispatch();
	const palletTextBox = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (!selectedOption) {
			setCommandList(
				Object.keys(options).filter((option) =>
					option.includes(palletText.toLowerCase())
				)
			);
		} else {
			const commands: Array<string> = options[
				selectedOption as keyof Options
			].map((o) => o.toString());
			setCommandList(
				commands.filter((option: string) =>
					option.includes(palletText.toLowerCase())
				)
			);
		}
		setHighlightedOption(0);
	}, [palletText, selectedOption]);

	

	const closeMenu = () => {
		props.setShowModal(false);
		document.removeEventListener('click', closeMenu);
	
	  }
	  document.addEventListener("click", closeMenu);

	const handleCommandSelection = (command: string) => {
		setPalletText("");
		console.log("innn")
		if (!command) return;
		if (!selectedOption) {
			setSelectedOption(command);
			return;
		}
		switch (selectedOption) {
			case "time":
				dispatch(setTime(+command));
				props.setShowModal(false);
				break;
			case "theme":
				dispatch(setTheme(command));
				props.setShowModal(false);
				break;
			case "type":
				dispatch(setType(command));
				dispatch(setCurrentText(command));
				props.setShowModal(false);
				break;
			default:
				console.log(selectedOption, command);
		}
	};

	const handlePalletKeys = (e: KeyboardEvent) => {
		if (e.key === "ArrowUp") {
			setHighlightedOption((op) => (op > 0 ? op - 1 : op));
		} else if (e.key === "ArrowDown") {
			setHighlightedOption((op) =>
				op < commandList.length - 1 ? op + 1 : op
			);
		} else if (e.key === "Enter") {
			const command = commandList[highlightedOption];
			handleCommandSelection(command);
		} else if (e.key === "Escape") {
			props.setShowModal(false);
		}
		e.stopPropagation();
	};
	

	return (
		<div className={styles.commandPallet} onKeyDown={handlePalletKeys} >
			<input
				ref={palletTextBox}
				type="text"
				className={styles.commandInput}
				placeholder="Text wählen"
				value={palletText}
				autoFocus
				onChange={(e) => setPalletText(e.target.value)}
			/>

			<div className={styles.commandList}>
				{commandList!.map((option, idx) => (
					<div
						className={`${styles.command} ${
							highlightedOption === idx && styles.highlighted
						}`}
						key={idx}
						onClick={() => handleCommandSelection(option)}>
						{option}
					</div>
				))}
			</div>
		</div>
	);
}