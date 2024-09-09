const sign_in_btn = document.getElementById('sign-in-btn')
const sign_up_btn = document.getElementById('sign-up-btn')
const container = document.querySelector('.container')

sign_up_btn.addEventListener('click', () => {
    container.classList.add("sign-up-mode")
})

sign_in_btn.addEventListener('click', () => {
    container.classList.remove("sign-up-mode")
})
const loginForm = document.getElementById('loginForm')
const signupForm = document.getElementById('signupForm')


// Notifications

const toasts = document.querySelector('#toasts');

const createNotification = (message, type, time = 3000) => {
    console.log(message, type);
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerText = message;
    toast.classList.add(type);
    toasts.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, time);
};

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        console.log(data);
        const { access_token, role } = data

        if (response.status === 200) {

            // store the access token in local storage
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('role', role);

            createNotification('Successfully logged in', 'success');
            if (role == 'admin') {
                window.location.href = '/admin-dashboard';
            }
            else { 
                window.location.href = '/users-dashboard'; 
            }
            // window.location.href = '/users-dashboard';
            // fetchProtectedPage('/users-dashboard');

        } else {
            createNotification('User does not exists', 'error');
        }

    } catch (error) {
        console.error(error);
    }
})

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const consfirmPassword = document.getElementById('signupPassword2').value;
    if (!name || !email || !password || !consfirmPassword) {
        createNotification('Please fill in all fields', 'warning');
        return;
    }

    if (password !== consfirmPassword) {
        createNotification('Passwords do not match', 'warning');
        return;
    }

    if (!verifyPassword(password)) {
        createNotification('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character', 'warning', 6000);
        return;
    }

    try {
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();
        // consol

        if (response.status === 201) {
            createNotification('User created', 'success');
            // window.location.href = '/users-dashboard';
            fetchProtectedPage('/users-dashboard');

        } else {
            createNotification(data.message, 'error');
        }

    } catch (error) {
        console.error(error);
    }

})



function verifyPassword(password) {
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return strongRegex.test(password) ? true : false;
}
