import { RefObject } from "react";

export const SET_WORD = "SETWORD";
export const SET_CHAR = "SETCHAR";
export const TIMER_DECREMENT = "TIMERDECREMENT";
export const APPEND_TYPED_HISTORY = "APPENDTYPEDHISTORY";
export const TIMER_SET = "TIMERSET";
export const TIMERID_SET = "TIMERIDSET";
export const PREV_WORD = "PREVWORD";
export const SET_WORDLIST = "SETWORDLIST";
export const SET_THEME = "SETTHEME";
export const SET_TIME = "SETTIME";
export const SET_REF = "SETREF";
export const SET_CARET_REF = "SETCARETREF";
export const SET_CURRENT_TEXT = "SETCURRENTTEXT";
export const SET_LAST_WORD = "SETLASTWORD";
export const SET_USER = "SETUSER";
export const SET_TEXT_LIST = "SETTEXTLIST";
export const SET_TEXT_TITLE = "SETTEXTTITLE";

// Time Actions
export const timerDecrement = () => ({ type: TIMER_DECREMENT });
export const timerSet = (payload: number) => ({ type: TIMER_SET, payload });
export const setTimerId = (payload: NodeJS.Timer | null) => ({
	type: TIMERID_SET,
	payload,
});

// Word Actions
export const setWord = (payload: string) => ({ type: SET_WORD, payload });
export const setChar = (payload: string) => ({ type: SET_CHAR, payload });
export const setTypedWord = (payload: string) => ({ type: SET_CHAR, payload });
export const appendTypedHistory = () => ({
	type: APPEND_TYPED_HISTORY,
});
export const backtrackWord = (payload: boolean) => ({
	type: PREV_WORD,
	payload,
});
export const setWordList = (payload: string[]) => ({
	type: SET_WORDLIST,
	payload,
});
export const setTextTitle = (payload: string) => ({
	type: SET_TEXT_TITLE,
	payload,
});
export const setRef = (payload: RefObject<HTMLDivElement>) => ({
	type: SET_REF,
	payload,
});
export const setCaretRef = (payload: RefObject<HTMLSpanElement>) => ({
	type: SET_CARET_REF,
	payload,
});

// Prefrences Actions
export const setTheme = (payload: string) => ({ type: SET_THEME, payload });
export const setTime = (payload: number) => ({ type: SET_TIME, payload });

export const setCurrentText = (payload: string[]) => ({
	type: SET_CURRENT_TEXT,
	payload,
});
export const setLastWord = (payload: boolean) => ({
	type: SET_LAST_WORD,
	payload,
});
export const setUser = (payload: string) => ({
	type: SET_USER,
	payload,
});
export const setTextList = (payload: string[]) => ({
	type: SET_TEXT_LIST,
	payload,
});
