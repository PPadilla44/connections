import { levels, scores } from "@prisma/client";
import { Level } from "../types";

const covertDocToObj = (doc: any) => {
    return {
        ...doc,
        createdAt: doc.createdAt?.toString() as string,
        updatedAt: doc.updatedAt?.toString() as string,
    };
};

type diffOptions = {
    [key: number]: Level['difficulty']
}

const convertDifficulty = (diff: number): Level['difficulty'] => {
    const diffObj: diffOptions = {
        1: "Easy",
        2: "Medium",
        3: "Hard"
    }
    return diffObj[diff];
}

const convertLevel = (doc: levels): Level => {
    return {
        ...covertDocToObj(doc),
        difficulty: convertDifficulty(doc.difficulty)
    }
}

const getFastestTime = (scores: scores[]): scores => {
    let firstTime = scores[0].time
    let fastestIndex = 0;
    let fastest = {
        mins: parseInt(firstTime[0] + firstTime[1]),
        secs: parseInt(firstTime[3] + firstTime[4]),
        mills: parseInt(firstTime[6] + firstTime[7] + firstTime[8]),
    }
    for (let i = 0; i < scores.length; i++) {
        const item = scores[i];
        const time = item.time;
        const potFastest = {
            mins: parseInt(time[0] + time[1]),
            secs: parseInt(time[3] + time[4]),
            mills: parseInt(time[6] + time[7] + time[8]),
        }
        if (potFastest.mins < fastest.mins) {
            fastest = potFastest;
            fastestIndex = i;
            continue;
        }
        if (potFastest.secs < fastest.secs) {
            fastest = potFastest;
            fastestIndex = i;
            continue;
        }
        if (potFastest.mills < fastest.mills) {
            fastest = potFastest;
            fastestIndex = i;
            continue;
        }
    }
    return scores[fastestIndex];
}

export { covertDocToObj, convertLevel, getFastestTime };