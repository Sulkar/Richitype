import { resetTest } from "helpers/resetTest";
import { useSelector, useDispatch } from "react-redux";
import { State } from "store/reducer";
import "stylesheets/Result.scss";

export default function Result() {
	const {
		word: { wordList, typedHistory, currWord, typedWord },
		time: { timer },
		preferences: { timeLimit, user },
	} = useSelector((state: State) => state);
	const spaces = wordList.indexOf(currWord);
	let correctChars = 0;
	const result = typedHistory.map(
		(typedWord, idx) => typedWord === wordList[idx]
	);
	result.forEach((r, idx) => {
		if (r) correctChars += wordList[idx].length;
	});
	const wpm = ((correctChars + spaces) * 60) / timeLimit / 5;

	const printResult = () => {
		window.print();
	};

	return (
		<div className="result">
			<table>
				<tbody className="color-print">
					<tr>
						<td colSpan={2} align="center">
							<h1>{Math.round(wpm) + " wpm"}</h1>
						</td>
					</tr>
					<tr>
						<th>Zeit:</th>
						<td>{timeLimit} Sekunden</td>
					</tr>
					<tr>
						<th>Restzeit:</th>
						<td>{timer} Sekunden</td>
					</tr>
					<tr>
						<th>richtige Wörter:</th>
						<td>{result.filter((x) => x).length}</td>
					</tr>
					<tr className="wrong">
						<th>falsche Wörter:</th>
						<td>{result.filter((x) => !x).length}</td>
					</tr>

					<tr className="hide-in-print">
						<td colSpan={2} align="center">
							<button onClick={() => resetTest()}>
								Neu starten
							</button>
						</td>
					</tr>

					<tr className="hide-in-print">
						<td colSpan={2} align="center">
							<a
								className="printResult"
								href="#"
								onClick={() => printResult()}>
								drucken
							</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
