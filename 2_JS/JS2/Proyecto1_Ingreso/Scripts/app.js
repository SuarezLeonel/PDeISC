import { initTheme, toggleTheme, updateButtonText } from '/Modules/ui.js';

/**
 * Lógica Principal del Proyecto 1
 * Maneja el ingreso, validación y envío de números al servidor.
 */

const state = {
    numbers: [],
    minNumbers: 10,
    maxNumbers: 20
};

// Elementos del DOM
const numberForm = document.getElementById('numberForm');
const numberInput = document.getElementById('numberInput');
const numberGrid = document.getElementById('numberGrid');
const countDisplay = document.getElementById('count');
const saveBtn = document.getElementById('saveBtn');
const themeToggle = document.getElementById('themeToggle');
const errorMsg = document.getElementById('errorMsg');
const successMsg = document.getElementById('successMsg');

// Inicializar Tema
initTheme('themeToggle');

// Evento: Cambio de Tema
themeToggle.addEventListener('click', () => {
    const newTheme = toggleTheme();
    updateButtonText(themeToggle, newTheme);
});

// Evento: Agregar Número
numberForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = parseFloat(numberInput.value);

    // Validación: No exceder el máximo
    if (state.numbers.length >= state.maxNumbers) {
        showError('Se ha alcanzado el máximo de 20 números.');
        return;
    }

    // Validación: Es un número real
    if (isNaN(value)) {
        showError('Por favor ingrese un número válido.');
        return;
    }

    addNumber(value);
    numberInput.value = '';
    hideError();
});

/**
 * Agrega un número al estado y actualiza la UI
 * @param {number} num 
 */
function addNumber(num) {
    state.numbers.push(num);
    
    // Crear elemento visual (chip)
    const chip = document.createElement('div');
    chip.className = 'number-chip';
    chip.textContent = num;
    numberGrid.appendChild(chip);

    updateUI();
}

/**
 * Actualiza el contador y el estado del botón de guardado
 */
function updateUI() {
    countDisplay.textContent = state.numbers.length;
    
    // Habilitar botón si cumple con el mínimo (10)
    saveBtn.disabled = state.numbers.length < state.minNumbers;
}

/**
 * Envía los números al backend para guardarlos y manejamos la descarga
 */
saveBtn.addEventListener('click', async () => {
    try {
        hideError();
        hideSuccess();

        const response = await fetch('/api/save-numbers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ numbers: state.numbers })
        });

        if (response.ok) {
            // Obtener el contenido del archivo como texto
            const textContent = await response.text();
            
            // Crear un Blob con el contenido de texto para la descarga
            const blob = new Blob([textContent], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `numeros_${Date.now()}.txt`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            showSuccess('¡Éxito! El archivo se ha guardado en el servidor y se ha descargado con los números.');
            
            // Reiniciar estado
            state.numbers = [];
            numberGrid.innerHTML = '';
            updateUI();
        } else {
            const result = await response.json();
            showError(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error('Error al conectar con el servidor:', error);
        showError('Hubo un problema al conectar con el servidor.');
    }
});

// Helpers de errores y mensajes
function showError(msg) {
    errorMsg.textContent = msg;
    errorMsg.style.display = 'block';
    setTimeout(hideError, 5000);
}

function hideError() {
    errorMsg.style.display = 'none';
}

function showSuccess(msg) {
    successMsg.textContent = msg;
    successMsg.style.display = 'block';
    setTimeout(hideSuccess, 5000);
}

function hideSuccess() {
    successMsg.style.display = 'none';
}
