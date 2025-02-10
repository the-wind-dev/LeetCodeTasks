/*
Дана матрица размером m x n, где каждая ячейка является либо стеной 'W', либо врагом 'E', либо пустой '0'.
Верните максимальное количество врагов, которых можно уничтожить, используя одну бомбу. Вы можете разместить бомбу только в пустой ячейке.

Бомба уничтожает всех врагов в той же строке и столбце от точки установки до тех пор, пока не встретит стену
*/

const MATRIX = [
    ['E', 'W', 'E', '0', 'W'],
    ['0', '0', 'E', 'W', 'W'],
    ['E', '0', '0', 'E', '0'],
    ['E', '0', '0', 'E', '0'],
    ['E', '0', '0', 'E', '0'],
    ['E', '0', '0', 'E', '0'],
    ['E', '0', '0', 'E', '0'],
    ['E', '0', '0', 'E', '0'],
    ['W', 'E', '0', '0', 'E']
];

class MatrixGenerator {
    constructor() {
        this.options = ['W', 'E', '0'];
        this.matrix = [];
    }

    generateMatrix(rows, cols) {
        this.matrix = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                const value = this.options[Math.floor(Math.random() * this.options.length)];
                row.push(value);
            }
            this.matrix.push(row);
        }
    }

    findEmptyCells() {
        const emptyCells = [];
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                if (this.matrix[i][j] === '0') {
                    emptyCells.push({ row: i, col: j });
                }
            }
        }
        return emptyCells;
    }

    placeRandomCharge() {
        const emptyCells = this.findEmptyCells();
        if (emptyCells.length === 0) {
            console.log("No empty cells available to place the charge.");
            return null;
        }

        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const { row, col } = emptyCells[randomIndex];

        this.matrix[row][col] = 'X';
        console.log(`Placed charge at (${row}, ${col}).`);
        return { row, col };
    }

    printMatrix() {
        for (const row of this.matrix) {
            console.log(row.join(' '));
        }
    }
}

class ChargePlacer {
    constructor(row, col) {
        this.chargeLocationRow = row;
        this.chargeLocationCol = col;
        this.defeatedEnemies = 0;
    }

    countDefeatedEnemies(matrix) {
        this.defeatedEnemies = 0;

        this.countInDirection(matrix, 0, -1); // Влево
        this.countInDirection(matrix, 0, 1);  // Вправо
        this.countInDirection(matrix, -1, 0); // Вверх
        this.countInDirection(matrix, 1, 0);  // Вниз

        return this.defeatedEnemies;
    }

    countInDirection(matrix, rowStep, colStep) {
        let row = this.chargeLocationRow + rowStep;
        let col = this.chargeLocationCol + colStep;

        while (row >= 0 && row < matrix.length && col >= 0 && col < matrix[0].length) {
            const cell = matrix[row][col];
            if (cell === 'W') break;
            if (cell === 'E') this.defeatedEnemies++;
            row += rowStep;
            col += colStep;
        }
    }
}

const matrixGenerator = new MatrixGenerator();
matrixGenerator.generateMatrix(7, 8);
console.log("Initial matrix:");
matrixGenerator.printMatrix();

const chargeLocation = matrixGenerator.placeRandomCharge();
if (chargeLocation) {
    console.log("Matrix after placing the charge:");
    matrixGenerator.printMatrix();

    const chargePlacer = new ChargePlacer(chargeLocation.row, chargeLocation.col);
    const defeatedEnemies = chargePlacer.countDefeatedEnemies(matrixGenerator.matrix);
    console.log("Enemies defeated:", defeatedEnemies);
}