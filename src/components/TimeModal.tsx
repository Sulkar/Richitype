//console
import { KeyboardEvent, useEffect, useState, useRef } from "react";
import styles from "stylesheets/CommandPallet.module.scss";
import { options, Options } from "./Header";
import { useDispatch } from "react-redux";
import { setTime, setTheme, setType, setCurrentText } from "store/actions";

interface Props {
	setShowTimeModal: Function;
}

export default function TimeModal(props: Props) {
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
				props.setShowTimeModal(false);
				break;
			case "theme":
				dispatch(setTheme(command));
				props.setShowTimeModal(false);
				break;
			case "type":
				dispatch(setType(command));
				dispatch(setCurrentText(command));
				props.setShowTimeModal(false);
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
			props.setShowTimeModal(false);
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
				props.setShowTimeModal(false);
			}}>
			<div className={styles.commandPallet} onKeyDown={handlePalletKeys}>
				<input
					ref={palletTextBox}
					type="text"
					className={styles.commandInput}
					placeholder="Zeit in Sekunden eingeben."
					value={palletText}
					autoFocus
					onChange={(e) => setPalletText(e.target.value)}
					onClick={(e) => {
						e.stopPropagation();
					}}
				/>

				
			</div>
		</div>
	);
}
