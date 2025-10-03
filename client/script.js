<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const statusMessage = document.getElementById('statusMessage');
    const SERVER_URL = 'http://localhost:5001/api/register'; 

    // --- Validation Rules (Updated) ---
    const validationRules = {
        username: (value) => value.length >= 3 ? '' : 'Username must be at least 3 characters.',
        email: (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value) ? '' : 'Please enter a valid email address.';
        },
        password: (value) => value.length >= 8 ? '' : 'Password must be at least 8 characters long.',
        
        // NEW RULE: Check if confirmPassword matches the original password field
        confirmPassword: (value) => {
            const password = document.getElementById('password').value;
            return value === password ? '' : 'Passwords do not match.';
        }
    };

    // --- Helper Functions (setStatus, validateField, validateAllFields - Assumed Complete) ---
    // (Your existing functions for validation and status messages should remain here)

    const setStatus = (message, type) => {
        statusMessage.textContent = message;
        statusMessage.className = `status ${type}`;
        statusMessage.classList.remove('hidden');
    };

    // NOTE: Ensure your existing validateField and validateAllFields functions correctly
    // iterate over ALL required inputs, including the new 'confirmPassword' field.
    const validateField = (inputElement) => {
        // ... (Keep your full existing logic here)
        // This function must handle checking if the field matches the validationRules
        const fieldName = inputElement.name;
        const value = inputElement.value.trim();
        const errorMessageId = `${fieldName}-error`;
        const errorMessageElement = document.getElementById(errorMessageId);
        const rule = validationRules[fieldName];
        
        if (!rule) return true;

        const error = rule(value);

        if (error) {
            errorMessageElement.textContent = error;
            inputElement.classList.add('invalid');
            return false;
        } else {
            errorMessageElement.textContent = '';
            inputElement.classList.remove('invalid');
            return true;
        }
    };

    const validateAllFields = () => {
        let allValid = true;
        const inputs = form.querySelectorAll('input[required]');
        inputs.forEach(input => {
            if (!validateField(input)) {
                allValid = false;
            }
        });
        return allValid;
    };


    // --- Form Submission (API Call) ---
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        
        if (!validateAllFields()) {
            setStatus('Please correct the errors before submitting.', 'error');
            return;
        }

        // Data payload must include the new confirmPassword field
        const formData = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            confirmPassword: document.getElementById('confirmPassword').value, // <--- NEW FIELD
        };

        try {
            const response = await fetch(SERVER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                setStatus(result.message || 'Registration successful!', 'success');
                form.reset();
                form.querySelectorAll('input').forEach(input => input.classList.remove('invalid'));
            } else {
                // Server returns error messages, including the new 'Password and Confirmation must match.'
                setStatus(result.error || 'An unexpected server error occurred.', 'error');
            }

        } catch (error) {
            console.error('Network or Fetch Error:', error);
            setStatus('Error: Could not connect to the server.', 'error');
        }
    });
});
=======
const form = document.getElementById('registrationForm');
const inputs = form.querySelectorAll('input');
const serverMessage = document.getElementById('server-message');
const SERVER_URL = 'http://localhost:5000/api/register';


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

inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => serverMessage.classList.add('hidden'));
});


form.addEventListener('submit', async (e) => {
    e.preventDefault(); 

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

        if (res.ok) { 
            serverMessage.textContent = `Success: ${data.message}`;
            serverMessage.className = 'success';
            form.reset(); 
            inputs.forEach(input => input.classList.remove('valid'));
        } else { 
            const errorMsg = data.error || 'An unknown server error occurred.';
            serverMessage.textContent = `Error: ${errorMsg}`;
            serverMessage.className = 'failure';

           
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
>>>>>>> eb69874119b590ac2184caac046b7c563ff80c2d
