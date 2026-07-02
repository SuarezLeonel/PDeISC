/**
 * Módulo para demostrar las 3 formas de lectura de formularios en JavaScript
 */

/**
 * Método 1: Usando document.getElementById o querySelector
 * Acceso directo a los valores de los elementos por su ID o selector.
 */
export const readById = (formId) => {
    console.log("--- Método 1: getElementById ---");
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;
    
    return { name, email, role };
};

/**
 * Método 2: Usando la API FormData
 * Una forma moderna y eficiente de capturar todos los campos de un formulario.
 */
export const readByFormData = (formElement) => {
    console.log("--- Método 2: FormData ---");
    const formData = new FormData(formElement);
    
    // Podemos convertirlo a un objeto plano fácilmente
    return Object.fromEntries(formData.entries());
};

/**
 * Método 3: Usando document.forms y la propiedad elements
 * Acceso por el nombre (name) del formulario y sus elementos internos.
 */
export const readByElements = (formName) => {
    console.log("--- Método 3: document.forms + elements ---");
    const form = document.forms[formName];
    const elements = form.elements;
    
    return {
        name: elements['name'].value,
        email: elements['email'].value,
        role: elements['role'].value
    };
};