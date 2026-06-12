import fs from 'node:fs';

fs.readFile('./train.csv', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
    } else {
        const arr = data.toString().split('\n');
        let totalFare = 0;
        let totalFare1 = 0;
        let totalFare2 = 0;
        let totalFare3 = 0;
        let totalSurvived = 0;
        let totalNotSurvived = 0;
        let countSurvivedMen = 0;
        let countSurvivedWomen = 0;
        let countNotSurvivedMen = 0;
        let countNotSurvivedWomen = 0;
        let countSurvivedChildren = 0;
        let countNotSurvivedChildren = 0;
        for (let i = 1; i < arr.length; i++) {
            const row = arr[i].split(',');
            if (!row) {
                continue;
            }
            totalFare += parseFloat(row[10]) ? parseFloat(row[10]) : 0;
            if (row[2] === '1') {
                totalFare1 += parseFloat(row[10]) ? parseFloat(row[10]) : 0;
            } else if (row[2] === '2') {
                totalFare2 += parseFloat(row[10]) ? parseFloat(row[10]) : 0;
            } else if (row[2] === '3') {
                totalFare3 += parseFloat(row[10]) ? parseFloat(row[10]) : 0;
            }
            if (row[1] === '0') {
                totalNotSurvived++;
                if (row[6] && Number(row[6]) < 18) {
                    countNotSurvivedChildren++;
                } else {
                    if (row[5] === 'male') {
                        countNotSurvivedMen++;
                    } else {
                        countNotSurvivedWomen++;
                    }
                }
            } else {
                totalSurvived++;
                if (row[6] && Number(row[6]) < 18) {
                    countSurvivedChildren++;
                } else {
                    if (row[5] === 'male') {
                        countSurvivedMen++;
                    } else {
                        countSurvivedWomen++;
                    }
                }
            }
        }
        console.log(`Total Fare: ${totalFare.toFixed(2)}`);
        console.log(`Total Fare 1st Class: ${totalFare1.toFixed(2)}`);
        console.log(`Total Fare 2nd Class: ${totalFare2.toFixed(2)}`);
        console.log(`Total Fare 3rd Class: ${totalFare3.toFixed(2)}`);
        console.log(`Total Survived: ${totalSurvived}`);
        console.log(`Total Not Survived: ${totalNotSurvived}`);
        console.log(`Count Survived Men: ${countSurvivedMen}`);
        console.log(`Count Survived Women: ${countSurvivedWomen}`);
        console.log(`Count Not Survived Men: ${countNotSurvivedMen}`);
        console.log(`Count Not Survived Women: ${countNotSurvivedWomen}`);
        console.log(`Count Survived Children: ${countSurvivedChildren}`);
        console.log(`Count Not Survived Children: ${countNotSurvivedChildren}`);
    }
})