import { getChildCount, displayResult } from '/Modules/inspector.js';

document.getElementById('btnInspect').addEventListener('click', () => {
    const count = getChildCount('mainContainer');
    displayResult('resultDisplay', count);
});
