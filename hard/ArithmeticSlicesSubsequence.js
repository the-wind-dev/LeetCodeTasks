/*
Дан целочисленный массив nums, вернуть количество всех арифметических подпоследовательностей nums.
Арифметическаая последовательность состоит минимум из 3х элементов.
*/

/*
Input: nums = [2,4,6,8,10]
Output: 7
*/
const NUMS = [2,4,6,8,10];

class Arithmetic {
    constructor() {
        this.len = 0;
        this.result = 0;
        this.subsequences = [];
    }

    dfs(depth, numsArray, currentSub) {
        if (depth === this.len) {
            if (currentSub.length < 3) return;
            for (let i = 1; i < currentSub.length; i++) {
                if (currentSub[i] - currentSub[i - 1] !== currentSub[1] - currentSub[0]) return;
            }
            this.result++;
            this.subsequences.push([...currentSub]);
            return;
        }
        this.dfs(depth + 1, numsArray, currentSub);
        currentSub.push(numsArray[depth]);
        this.dfs(depth + 1, numsArray, currentSub);
        currentSub.pop();
    }

    numberOfArithmeticSlices(numsArray) {
        this.len = numsArray.length;
        this.result = 0;
        this.dfs(0, numsArray, []);
        return this.result;
    }
}

const arithmetic = new Arithmetic();

arithmetic.numberOfArithmeticSlices(NUMS);
console.log(arithmetic.result, arithmetic.subsequences);