export class Titanic {
    constructor() {
        this._separator = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
        this._totalFares = 0;
        this._faresByClasses = {};
        this._totalSurvived = {'Survived': 0, 'Non survived': 0};
        this._survivedByGender = {};
        this._survivedChildren = {'Children survived': 0, 'Children non survived': 0};
    }

    get totalFares() {
        return this._totalFares;
    }

    get avgFaresByClasses() {
        return Object.entries(this._faresByClasses).map(([key, value]) => {
            return {class: key, avg: (value.sum / value.count).toFixed(2)};
        });
    }

    get totalSurvived() {
        return this._totalSurvived;
    }

    get totalSurvivedByGender() {
        return this._survivedByGender;
    }

    get totalSurvivedChildren() {
        return this._survivedChildren;
    }

    lineInWork(line) {
        const c = line.split(this._separator);

        if (!isNaN(+c[9])) {
            this._totalFares += +c[9];
        }

        if (!isNaN(+c[9])) {
            const key = c[2];
            if (!this._faresByClasses[key]) {
                this._faresByClasses[key] = {sum: 0, count: 0};
            }
            this._faresByClasses[key].sum += +c[9];
            this._faresByClasses[key].count++;
        }

        if (c[1]) {
            const key = +c[1] ? 'Survived' : 'Non survived';
            if (!this._totalSurvived[key]) {
                this._totalSurvived[key] = 0;
            }
            this._totalSurvived[key]++;
        }

        if (c[4] && c[1]) {
            const key = this._survivedGender(c[4], c[1]);
            if (!this._survivedByGender[key]) {
                this._survivedByGender[key] = 0;
            }
            this._survivedByGender[key]++;
        }

        if (c[5] && c[5] < 18) {
            const key = +c[1] ? 'Children survived' : 'Children non survived';
            if (!this._survivedChildren[key]) {
                this._survivedChildren[key] = 0;
            }
            this._survivedChildren[key]++;
        }
    }

    _survivedGender(gender, survived) {
        survived = +survived ? 'survived' : 'non survived';
        return gender + " " + survived;
    }
}
