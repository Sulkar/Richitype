//console
import { KeyboardEvent, useRef } from "react";
import styles from "stylesheets/CommandPallet.module.scss";
import { useDispatch } from "react-redux";
import { setTime } from "store/actions";

interface Props {
	setShowTimeModal: Function;
}

export default function TimeModal(props: Props) {
	const dispatch = useDispatch();
	const palletTextBox = useRef<HTMLInputElement>(null);

	const handlePalletKeys = (e: KeyboardEvent) => {
		if (e.key === "Enter") {
			props.setShowTimeModal(false);
		} else if (e.key === "Escape") {
			props.setShowTimeModal(false);
		}
		e.stopPropagation();
	};

	const updateNewTime = (currentValue: string) => {
		const newTime = parseInt(currentValue);
		if (!isNaN(newTime)) {
			dispatch(setTime(+newTime));
		}
	};

	return (
		<div
			className="modal-backdrop"
			onClick={() => {
				props.setShowTimeModal(false);
			}}>
			<div className={styles.commandPallet} onKeyDown={handlePalletKeys}>
				<input
					ref={palletTextBox}
					type="text"
					className={styles.commandInput}
					placeholder="Zeit in Sekunden eingeben."
					autoFocus
					onChange={(evt) => updateNewTime(evt.target.value)}
					onClick={(e) => {
						e.stopPropagation();
					}}
				/>
			</div>
		</div>
	);
}
