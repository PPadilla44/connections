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

const getFastestTime = (scores: scores[]) => {
    let firstTime = scores[0].time
    let fastest = {
        mins: firstTime[0] + firstTime[1],
        secs: firstTime[3] + firstTime[4],
        mills: firstTime[6] + firstTime[7] + firstTime[8]
    }
    for(const item of scores) {
        const time = item.time;
        const mins = time[0] + time[1];
        const secs = time[3] + time[4];
        const mills = time[6] + time[7] + time[8];
        console.log(mins, secs, mills);
    }
    console.log(fastest);
    
    return fastest
}

export { covertDocToObj, convertLevel, getFastestTime };