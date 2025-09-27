const form = document.getElementById('registrationForm');
const inputs = form.querySelectorAll('input');
const serverMessage = document.getElementById('server-message');
const SERVER_URL = 'http://localhost:5000/api/register'; // API endpoint

// --- Phase 2: Client-Side Validation Logic ---

const validationRules = {
    username: (value) => value.length >= 3 ? '' : 'Username must be at least 3 characters.',
    email: (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value) ? '' : 'Please enter a valid email address.';
    },
    password: (value) => value.length >= 8 ? '' : 'Password must be at least 8 characters long.'
};

const displayError = (input, msgElem, message) => {
    input.classList.add('invalid');
    input.classList.remove('valid');
    msgElem.textContent = message;
};

const displaySuccess = (input, msgElem) => {
    input.classList.remove('invalid');
    input.classList.add('valid');
    msgElem.textContent = '';
};

const validateField = (input) => {
    const name = input.name;
    const value = input.value.trim();
    const errorMessageElement = document.getElementById(`${name}-error`);
    
    // Check required fields and run specific rules
    if (input.required && value === '') {
        displayError(input, errorMessageElement, `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`);
        return false;
    }
    if (validationRules[name]) {
        const message = validationRules[name](value);
        if (message) {
            displayError(input, errorMessageElement, message);
            return false;
        }
    }

    displaySuccess(input, errorMessageElement);
    return true;
};

// Listeners for real-time feedback (Phase 2)
inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => serverMessage.classList.add('hidden'));
});

// --- Phase 3: Form Submission and Server Communication ---

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Stop default form submission

    let isFormValid = true;
    inputs.forEach(input => {
        if (!validateField(input)) { isFormValid = false; }
    });

    if (!isFormValid) {
        serverMessage.textContent = 'Please correct the highlighted errors.';
        serverMessage.className = 'failure';
        serverMessage.classList.remove('hidden');
        return;
    }

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData); 

    try {
        const res = await fetch(SERVER_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        const data = await res.json();
        serverMessage.classList.remove('hidden');

        if (res.ok) { // Status 201 Created (Success)
            serverMessage.textContent = `Success: ${data.message}`;
            serverMessage.className = 'success';
            form.reset(); 
            inputs.forEach(input => input.classList.remove('valid'));
        } else { // Status 400, 409, 500 (Failure)
            const errorMsg = data.error || 'An unknown server error occurred.';
            serverMessage.textContent = `Error: ${errorMsg}`;
            serverMessage.className = 'failure';

            // Highlight the email field if the server says it's a duplicate
            if (errorMsg.includes('email is already registered')) {
                 displayError(document.getElementById('email'), document.getElementById('email-error'), errorMsg);
            }
        }
    } catch (error) {
        serverMessage.textContent = 'Network error. Could not connect to the server.';
        serverMessage.className = 'failure';
        serverMessage.classList.remove('hidden');
    }
});