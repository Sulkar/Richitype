//console
import { KeyboardEvent, useEffect, useState, useRef } from "react";
import styles from "stylesheets/CommandPallet.module.scss";
import { useDispatch } from "react-redux";
import { setUser } from "store/actions";

interface Props {
	setShowUserModal: Function;
}

export default function TimeModal(props: Props) {
	const dispatch = useDispatch();
	const palletTextBox = useRef<HTMLInputElement>(null);

	const handlePalletKeys = (e: KeyboardEvent) => {
		if (e.key === "Enter") {
			props.setShowUserModal(false);
		} else if (e.key === "Escape") {
			props.setShowUserModal(false);
		}
		e.stopPropagation();
	};

	const updateNewUser = (currentValue: string) => {
		dispatch(setUser(currentValue));
	};

	return (
		<div
			className="modal-backdrop"
			onClick={() => {
				props.setShowUserModal(false);
			}}>
			<div className={styles.commandPallet} onKeyDown={handlePalletKeys}>
				<input
					ref={palletTextBox}
					type="text"
					className={styles.commandInput}
					placeholder="Name eingeben."
					autoFocus
					onChange={(evt) => updateNewUser(evt.target.value)}
					onClick={(e) => {
						e.stopPropagation();
					}}
				/>
			</div>
		</div>
	);
}
