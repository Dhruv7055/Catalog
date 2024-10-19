function decodeBaseValue(base, value) {
    return parseInt(value, base);
}

function interpolatePolynomial(points, degree) {
    function computeBasis(i, x) {
        const [xi] = points[i];
        let result = 1;
        for (let j = 0; j < degree; j++) {
            if (j !== i) {
                const [xj] = points[j];
                result *= (x - xj) / (xi - xj);
            }
        }
        return result;
    }

    function interpolate(x) {
        return points.reduce((acc, [xi, yi], i) => acc + yi * computeBasis(i, x), 0);
    }

    return interpolate(0);
}

function calculateSecret(data) {
    const { n, k } = data.keys;
    const points = Object.keys(data).filter(key => key !== 'keys').map(key => {
        const x = parseInt(key);
        const base = parseInt(data[key].base);
        const y = decodeBaseValue(base, data[key].value);
        return [x, y];
    }).slice(0, k);

    return Math.round(interpolatePolynomial(points, k));
}

const testCase1 = {
    "keys": { "n": 4, "k": 3 },
    "1": { "base": "10", "value": "4" },
    "2": { "base": "2", "value": "111" },
    "3": { "base": "10", "value": "12" },
    "6": { "base": "4", "value": "213" }
};

const testCase2 = {
    "keys": { "n": 10, "k": 7 },
    "1": { "base": "6", "value": "13444211440455345511" },
    "2": { "base": "15", "value": "aed7015a346d63" },
    "3": { "base": "15", "value": "6aeeb69631c227c" },
    "4": { "base": "16", "value": "e1b5e05623d881f" },
    "5": { "base": "8", "value": "316034514573652620673" },
    "6": { "base": "3", "value": "2122212201122002221120200210011020220200" },
    "7": { "base": "3", "value": "20120221122211000100210021102001201112121" },
    "8": { "base": "6", "value": "20220554335330240002224253" },
    "9": { "base": "12", "value": "45153788322a1255483" },
    "10": { "base": "7", "value": "1101613130313526312514143" }
};

const secret1 = calculateSecret(testCase1);
const secret2 = calculateSecret(testCase2);

console.log(`Secret for Test Case 1: ${secret1}`);
console.log(`Secret for Test Case 2: ${secret2}`);
