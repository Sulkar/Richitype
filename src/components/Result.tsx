import { resetTest } from "helpers/resetTest";
import { useSelector, useDispatch } from "react-redux";
import { State } from "store/reducer";
import "stylesheets/Result.scss";

export default function Result() {
	const {
		word: { wordList, typedHistory, currWord, typedWord },
		time: { timer },
		preferences: { timeLimit },
	} = useSelector((state: State) => state);
	const spaces = wordList.indexOf(currWord); //currWort = aktuelles Wort, der Index davon gibt an, wieviele Leerzeichen man schon hat.

	// typedHistory = Array mit den geschriebenen Wörtern z.B.: ['steht', 'pfdegt', 'Hexe'], auch falsche Wörter werden hier aufgenommen
	// currWord = String: aktuelles Wort z.B.: November
	// typedWord = String: aktuelle Buchstaben des Worts z.B.: Nove

	let anschlaegeRichtig = 0;
	let anschlaegeFalsch = 0;
	let woerterRichtig = 0;
	let woerterFalsch = 0;

	const countAnschlaege = (originalWord: string, typedWord: string) => {
		for (var i = 0; i < originalWord.length; i++) {
			if (originalWord.charAt(i) === typedWord.charAt(i)) {
				anschlaegeRichtig++;
			} else {
				anschlaegeFalsch++;
			}
		}
	};
	const countWoerter = (originalWord: string, typedWord: string) => {
		if (originalWord === typedWord) {
			woerterRichtig++;
		} else {
			woerterFalsch++;
		}
	};

	//alle geschriebenen Wörter werden mit der Vorlage verglichen und nach Anschlägen ausgezählt
	typedHistory.forEach((_typedWord, index) => {
		countAnschlaege(wordList[index], _typedWord);
		let extraBuchstaben = _typedWord.length - wordList[index].length;
		anschlaegeFalsch += extraBuchstaben;
	});
	//aktuelles Wort wird nach Anschlägen ausgezählt
	const typedwordLength = typedWord.length;
	countAnschlaege(currWord.substring(0, typedwordLength), typedWord);
	//richtig geschriebene Wörter werden gezählt
	typedHistory.forEach((_typedWord, index) => {
		countWoerter(wordList[index], _typedWord);
	});
	//Wörter bzw. Anschläge pro Minute werden berechnet
	const wpm = (woerterRichtig * 60) / timeLimit;
	const apm = ((anschlaegeRichtig + spaces) * 60) / timeLimit;
	//Wirtschaft: Fehlerprozent = (Fehler * 100) / Anschläge

	const printResult = () => {
		window.print();
	};

	return (
		<div className="result">
			<table>
				<tbody className="color-print">
					<tr>
						<td colSpan={3} align="center">
							<h3>{Math.round(apm) + " Anschläge/min"}</h3>
							<h3>{Math.round(wpm) + " Wörter/min"}</h3>
						</td>
					</tr>
					<tr>
						<td>Zeit:</td>
						<td> </td>
						<td>{timeLimit} Sekunden</td>
					</tr>
					<tr>
						<td>Restzeit:</td>
						<td> </td>
						<td>{timer} Sekunden</td>
					</tr>

					<tr>
						<td>richtige Anschläge:</td>
						<td> </td>
						<td>{anschlaegeRichtig + spaces}</td>
					</tr>
					<tr className="wrong">
						<td>falsche Anschläge:</td>
						<td> </td>
						<td>{anschlaegeFalsch}</td>
					</tr>

					<tr>
						<td>richtige Wörter:</td>
						<td> </td>
						<td>{woerterRichtig}</td>
					</tr>
					<tr className="wrong">
						<td>falsche Wörter:</td>
						<td> </td>
						<td>{woerterFalsch}</td>
					</tr>

					<tr className="hide-in-print">
						<td colSpan={3} align="center">
							<button onClick={() => resetTest()}>
								Neu starten
							</button>
						</td>
					</tr>

					<tr className="hide-in-print">
						<td colSpan={3} align="center">
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
