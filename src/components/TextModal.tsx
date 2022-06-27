//console
import { KeyboardEvent, useEffect, useState, useRef } from "react";
import styles from "stylesheets/CommandPallet.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { State } from "store/reducer";
import { getTextFromDB } from "helpers/getTextFromDB";

interface Props {
	setShowTextModal: Function;
}

export default function TextModal(props: Props) {
	const {
		preferences: { textList },
	} = useSelector((state: State) => state);
	const [palletText, setPalletText] = useState("");

	const [highlightedOption, setHighlightedOption] = useState(0);
	const [commandList, setCommandList] = useState<string[]>([]);
	const dispatch = useDispatch();
	const palletTextBox = useRef<HTMLInputElement>(null);	

	useEffect(() => {
		const filteredTexts = textList.filter((text: string) =>
			text.toLowerCase().includes(palletText.toLowerCase())
		);
		setCommandList(filteredTexts);
		setHighlightedOption(0);
	}, [palletText]);

	const handlePalletKeys = (e: KeyboardEvent) => {
		if (e.key === "Enter") {
			const text = commandList[highlightedOption];
			setPalletText("");
			let databaseTextCode = text.match(/^(\d+)_/);
			if (databaseTextCode != null) {
				getTextFromDB(databaseTextCode[1]);
			}
			props.setShowTextModal(false);
		} else if (e.key === "Escape") {
			props.setShowTextModal(false);
		}
		e.stopPropagation();
	};

	const changeHighlight = (index: number) => {
		setHighlightedOption(index);
	};

	return (
		<div
			className="modal-backdrop"
			onClick={() => {
				// close modal when outside of modal is clicked
				props.setShowTextModal(false);
			}}>
			<div className={styles.commandPallet} onKeyDown={handlePalletKeys}>
				<div
					style={{ backgroundColor: "inherit" }}
					onClick={(e) => {
						e.stopPropagation();
					}}>
					<input
						ref={palletTextBox}
						type="text"
						className={styles.commandInput}
						placeholder="Text wählen..."
						value={palletText}
						autoFocus
						onChange={(e) => setPalletText(e.target.value)}
					/>
					<span
						style={{
							marginLeft: "75px",
							cursor: "pointer",
							paddingLeft: "5px",
							paddingRight: "5px",
							fontWeight: "bolder",
						}}
						onClick={(e) => {
							const text = commandList[highlightedOption];
							setPalletText("");
							let databaseTextCode = text.match(/^(\d+)_/);
							if (databaseTextCode != null) {
								getTextFromDB(databaseTextCode[1]);
							}

							props.setShowTextModal(false);
						}}>
						LOS
					</span>
				</div>

				<div className="textModalDiv">
					{commandList.map((text, idx) => (
						<div
							className={`${styles.command} ${
								highlightedOption === idx && styles.highlighted
							}`}
							key={idx}
							onClick={(e) => {
								let databaseTextCode = text.match(/^(\d+)_/);
								if (databaseTextCode != null) {
									getTextFromDB(databaseTextCode[1]);
									props.setShowTextModal(false);
								}
							}}
							onMouseOver={(e) => changeHighlight(idx)}>
							{text}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
