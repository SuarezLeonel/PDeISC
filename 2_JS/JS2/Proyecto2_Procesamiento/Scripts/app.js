import { initTheme, toggleTheme, updateButtonText } from '/Modules/ui.js';

/**
 * Lógica Principal del Proyecto 2
 * Maneja la subida de archivos y la visualización del dashboard.
 */

const fileInput = document.getElementById('fileInput');
const serverFileSelect = document.getElementById('serverFileSelect');
const processServerBtn = document.getElementById('processServerBtn');
const statusMsg = document.getElementById('statusMsg');
const dashboard = document.getElementById('resultsDashboard');
const themeToggle = document.getElementById('themeToggle');
const downloadBtn = document.getElementById('downloadBtn');

/**
 * Estado global para manejar la descarga
 */
const state = {
    downloadContent: ''
};

// Inicializar Tema y cargar archivos del servidor
initTheme('themeToggle');
loadServerFiles();

// Elementos del Dashboard
const totalVal = document.getElementById('totalVal');
const usefulVal = document.getElementById('usefulVal');
const discardedVal = document.getElementById('discardedVal');
const percentVal = document.getElementById('percentVal');
const numberList = document.getElementById('numberList');
const sortedList = document.getElementById('sortedList');
const factorialList = document.getElementById('factorialList');

themeToggle.addEventListener('click', () => {
    const newTheme = toggleTheme();
    updateButtonText(themeToggle, newTheme);
});

/**
 * Carga la lista de archivos disponibles en el servidor
 */
async function loadServerFiles() {
    try {
        console.log('Cargando archivos del servidor...');
        const response = await fetch('/api/server-files');
        console.log('Respuesta recibida:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Resultado JSON:', result);
        
        if (result.success) {
            serverFileSelect.innerHTML = result.files.length > 0 
                ? result.files.map(f => `<option value="${f}">${f}</option>`).join('')
                : '<option value="">No hay archivos disponibles</option>';
            
            processServerBtn.disabled = result.files.length === 0;
        } else {
            throw new Error(result.message || 'Error desconocido del servidor');
        }
    } catch (error) {
        console.error('Error al cargar archivos del servidor:', error);
        serverFileSelect.innerHTML = `<option value="">Error al cargar: ${error.message}</option>`;
    }
}

// Evento: Cambio de Archivo (Local PC)
fileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validación Frontend: Extensión
    if (!file.name.endsWith('.txt')) {
        showStatus('Error: Solo se permiten archivos .txt', 'error');
        fileInput.value = '';
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    showStatus('Procesando archivo local...', 'success');

    try {
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            showStatus('¡Archivo procesado con éxito!', 'success');
            renderDashboard(result.data);
            state.downloadContent = result.data.downloadContent;
            // Recargar lista del servidor ya que el procesamiento genera nuevos archivos
            loadServerFiles();
        } else {
            showStatus(`Error: ${result.message}`, 'error');
            dashboard.style.display = 'none';
        }
    } catch (error) {
        console.error('Error:', error);
        showStatus('Error al conectar con el servidor.', 'error');
    }
});

// Evento: Procesar archivo del servidor
processServerBtn.addEventListener('click', async () => {
    const fileName = serverFileSelect.value;
    if (!fileName) return;

    showStatus(`Procesando archivo del servidor: ${fileName}...`, 'success');

    try {
        const response = await fetch('/api/process-server-file', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fileName })
        });

        const result = await response.json();

        if (result.success) {
            showStatus('¡Archivo del servidor procesado!', 'success');
            renderDashboard(result.data);
            state.downloadContent = result.data.downloadContent;
            loadServerFiles();
        } else {
            showStatus(`Error: ${result.message}`, 'error');
            dashboard.style.display = 'none';
        }
    } catch (error) {
        console.error('Error:', error);
        showStatus('Error al conectar con el servidor.', 'error');
    }
});

/**
 * Renderiza los datos en el dashboard
 */
function renderDashboard(data) {
    dashboard.style.display = 'block';
    
    // Valores numéricos
    totalVal.textContent = data.totalCount;
    usefulVal.textContent = data.usefulCount;
    discardedVal.textContent = data.discardedCount;
    percentVal.textContent = `${data.usefulPercentage}%`;

    // Limpiar listas
    numberList.innerHTML = '';
    sortedList.innerHTML = '';
    factorialList.innerHTML = '';

    // Renderizar lista completa con detalles
    let hasFactorials = false;
    data.allDetails.forEach(item => {
        const span = document.createElement('span');
        span.className = `num-tag ${item.isUseful ? 'is-useful' : ''} ${item.isFactorial ? 'is-factorial' : ''}`;
        span.textContent = item.val;
        numberList.appendChild(span);

        // Si es factorial, agregarlo a la nueva sección específica
        if (item.isFactorial) {
            hasFactorials = true;
            const factSpan = document.createElement('span');
            factSpan.className = 'num-tag is-factorial-detail';
            factSpan.innerHTML = `<strong>${item.val}</strong> (Factorial de ${item.factorialBase}!)`;
            factorialList.appendChild(factSpan);
        }
    });

    // Mensaje si no se encontraron factoriales
    if (!hasFactorials) {
        const noFactorialMsg = document.createElement('p');
        noFactorialMsg.textContent = 'No se encontraron números factoriales en este archivo.';
        noFactorialMsg.style.fontStyle = 'italic';
        noFactorialMsg.style.gridColumn = '1 / -1';
        factorialList.appendChild(noFactorialMsg);
    }

    // Renderizar lista ordenada de útiles
    data.sortedUseful.forEach(val => {
        const span = document.createElement('span');
        span.className = 'num-tag is-useful';
        span.textContent = val;
        sortedList.appendChild(span);
    });
}

// Evento: Descargar Archivo (Manual)
downloadBtn.addEventListener('click', () => {
    if (!state.downloadContent) {
        showStatus('Error: No hay datos para descargar. Primero procese un archivo.', 'error');
        return;
    }

    const blob = new Blob([state.downloadContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `numeros_utiles_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
});

function showStatus(msg, type) {
    statusMsg.textContent = msg;
    statusMsg.className = type;
    statusMsg.style.display = 'block';
}
