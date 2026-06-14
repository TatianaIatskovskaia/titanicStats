import fs from 'node:fs';
import {Titanic} from "./files_actions/titanic_stats.js";
import readline from "node:readline";

const fileStream = fs.createReadStream('./train.csv', 'utf8');
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

let isFirstLine = true;
const stats = new Titanic();

rl.on('line', (line) => {
    if (isFirstLine) {
        isFirstLine = false;
        return;
    }
    stats.lineInWork(line);
});

rl.on('close', () => {
    console.log(`Total fares:`, stats.totalFares.toFixed(2));
    console.log(`Average fares by classes:`, stats.avgFaresByClasses)
    console.log(stats.totalSurvived);
    console.log(stats.totalSurvivedByGender);
    console.log(stats.totalSurvivedChildren)
});


// fs.readFile('./train.csv', 'utf-8', (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         const arr = data.split('\n');
//         arr.shift();
//         const stats = new Titanic(arr, /,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
//         console.log(`Total fares:`, stats.totalFares.toFixed(2));
//         console.log(`Average fares by classes:`, stats.avgFaresByClasses)
//         console.log(stats.totalSurvived);
//         console.log(stats.totalSurvivedByGender);
//         console.log(stats.totalSurvivedChildren)
//     }
// })