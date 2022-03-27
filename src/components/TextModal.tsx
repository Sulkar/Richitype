//console
import { KeyboardEvent, useEffect, useState, useRef } from "react";
import styles from "stylesheets/CommandPallet.module.scss";
import { options, Options } from "./Header";
import { useDispatch } from "react-redux";
import { setTime, setTheme, setType, setCurrentText } from "store/actions";

interface Props {
	setShowTextModal: Function;
}

export default function TextModal(props: Props) {
	const [palletText, setPalletText] = useState("");
	const [selectedOption, setSelectedOption] = useState("");
	const [highlightedOption, setHighlightedOption] = useState(0);
	const [commandList, setCommandList] = useState<string[]>([]);
	const dispatch = useDispatch();
	const palletTextBox = useRef<HTMLInputElement>(null);

	useEffect(() => {
		setSelectedOption("type");
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

	const handleCommandSelection = (command: string) => {
		setPalletText("");
		if (!command) return;
		if (!selectedOption) {
			setSelectedOption(command);
			return;
		}
		switch (selectedOption) {
			case "time":
				dispatch(setTime(+command));
				props.setShowTextModal(false);
				break;
			case "theme":
				dispatch(setTheme(command));
				props.setShowTextModal(false);
				break;
			case "type":
				dispatch(setType(command));
				dispatch(setCurrentText(command));
				props.setShowTextModal(false);
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
			props.setShowTextModal(false);
		}
		e.stopPropagation();
	};

	const changeHighlight = (index:number) => {
		setHighlightedOption(index);
	}

	return (
		<div
			className="modal-backdrop"
			onClick={() => {
				// close modal when outside of modal is clicked
				props.setShowTextModal(false);
			}}>
			<div className={styles.commandPallet} onKeyDown={handlePalletKeys}>
				<input
					ref={palletTextBox}
					type="text"
					className={styles.commandInput}
					placeholder="Text wählen..."
					value={palletText}
					autoFocus
					onChange={(e) => setPalletText(e.target.value)}
					onClick={(e) => {
						e.stopPropagation();
					}}
				/>

				<div className="textModalDiv">
					{commandList!.map((option, idx) => (
						<div
							className={`${styles.command} ${
								highlightedOption === idx && styles.highlighted
							}`}
							key={idx}
							onClick={(e) => {
								handleCommandSelection(option);
							}}
							onMouseOver={(e) => changeHighlight(idx)}
							>
							{option}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
