/*
Вам дано целое число n. У вас есть бинарная сетка размером n x n, в которой все значения изначально равны 1, за исключением некоторых индексов, указанных в массиве minuses. Элемент массива minuses с индексом i определяется как minuses[i] = [xi, yi], где grid[xi][yi] == 0.

Верните порядок самого большого крестообразного знака из 1, выровненного по осям, который содержится в сетке. Если такого знака нет, верните 0.

Крестообразный знак из 1 порядка k имеет некоторый центр grid[r][c] == 1, а также четыре луча длиной k - 1, идущих вверх, вниз, влево и вправо, состоящие из 1. Обратите внимание, что за пределами лучей креста могут быть 0 или 1, проверяется только соответствующая область крестообразного знака на наличие 1
*/

class PlusSign {
    constructor(size) {
        this.size = size;
        this.minuses = [];
        this.matrix = Array.from({ length: this.size }, () => Array(this.size).fill(1));
        this.maxOrder = 0;
        this.plusCenter = [];
    }

    printMatrix() {
        for (const row of this.matrix) {
            console.log(row.join(' '));
        }
    }

    generateMinuses(number) {
        const maxPossibleMinuses = this.size * this.size;
        if (number >= maxPossibleMinuses) {
            throw new Error(`Cannot generate ${number} unique pairs for size ${this.size}. Maximum is ${maxPossibleMinuses}.`);
        }

        this.minuses = [];

        const usedPlaces = new Set();
        while (this.minuses.length < number) {
            const xi = Math.floor(Math.random() * this.size);
            const yi = Math.floor(Math.random() * this.size);
            const place = `${xi}, ${yi}`;
            if (!usedPlaces.has(place)) {
                usedPlaces.add(place);
                this.minuses.push([xi, yi]);
            }
        }
    }

    setMinuses() {
        for (const [row, col] of this.minuses) {
            this.matrix[row][col] = 0;
        }
    }

    setMinuses() {
        this.minuses.forEach((minus) => {
            const row = minus[0];
            const col = minus[1];
            this.matrix[row][col] = 0;
        })
    }

    findPlusSign() {
        this.plusCenter = [];
        const maxOrder = Math.floor((this.size - 1) / 2);
        for (let k = 1; k <= maxOrder; k++) {
            for (let i = k; i < this.size - k; i++) {
                for (let j = k; j < this.size - k; j++) {
                    const center = [i, j];
                    if (this.checkX(k, center)) {
                        this.maxOrder = k;
                        this.plusCenter = center;
                    }
                    
                }
            }
        }
    }

    checkX(k, center) {
        const row = center[0];
        const col = center[1];
        if (this.matrix[row][col] == 0) {
            return false;
        }
        for (let i = row - k; i <= row + k; i++) {
            if (this.matrix[i][col] == 0) {
                return false;
            }
        }
        for (let j = row - k; j <= row + k; j++) {
            if (this.matrix[row][j] == 0) {
                return false;
            }
        }
        return true;
    }
}

const plusSign = new PlusSign(4);
plusSign.generateMinuses(100);
plusSign.setMinuses();
plusSign.printMatrix();
plusSign.findPlusSign();
console.log("max order", plusSign.maxOrder);
console.log("last X position", plusSign.plusCenter);