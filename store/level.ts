import { dots } from "@prisma/client";
import { line } from "../types";

export interface LevelState {
    currentConnections: number;
    first: dots | null;
    lines: line[];
    showStart: boolean;
    showSubmit: boolean;
    isActive: boolean;
    isPaused: boolean;
    time: number
}

export const initialLevelState: LevelState = {
    first: null,
    currentConnections: 0,
    lines: [],
    showStart: true,
    showSubmit: false,
    isActive: false,
    isPaused: true,
    time: 0
};

export declare type ActionType =
    "START"
    | "FINISH"
    | "CONNECT_LINE"
    | "RESET"
    | "HANDLE_CLICK"
    | "UPDATE_TIME";

export type LevelActions = {
    type: ActionType;
    payload?: any;
};

function reducer(state: LevelState, action: LevelActions): LevelState {
    const { type, payload } = action;
    const { first, lines } = state;

    switch (type) {
        case "HANDLE_CLICK": {
            const { point } = payload;
            let newFirst = first;
            let newLines = [...lines];

            if (!newFirst) {
                newFirst = point;
            } else {
                let firstNum = newFirst.sequence;
                let potPoint = point.sequence;
                let value = Math.abs(firstNum - potPoint);
                if (value === 1) {
                    const valueExist = lines.find(
                        (l) =>
                            l.id === `${newFirst!.sequence}-${point.sequence}` ||
                            l.id === `${point.sequence}-${newFirst!.sequence}`
                    );

                    if (!valueExist) {
                        const line: line = {
                            id: `${newFirst.sequence}-${point.sequence}`,
                            x1: newFirst.x,
                            y1: newFirst.y,
                            x2: point.x,
                            y2: point.y,
                        };

                        newLines = [...newLines, line];
                    } else {
                        console.log("ALREADY exist");
                    }
                    newFirst = point;
                } else if (value === 0) {
                    newFirst = null;
                    console.log("REPEAT");
                } else {
                    console.log("NOT VFALID");
                    newFirst = null;
                }
            }

            return {
                ...state,
                currentConnections: newLines.length,
                first: newFirst,
                lines: newLines,
            };
        }
        case "START":
            return { ...state, showStart: false, isActive: true, isPaused: false }
        case "FINISH":
            return { ...state, showSubmit: true, isPaused: true }
        case "UPDATE_TIME":
            return { ...state, time: payload }
        case "RESET":
            return {
                showStart: true,
                showSubmit: false,
                currentConnections: 0,
                first: null,
                lines: [],
                isActive: false,
                isPaused: true,
                time: 0
            };
        default:
            return state;
    }
}

export default reducer;