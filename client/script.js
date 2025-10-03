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