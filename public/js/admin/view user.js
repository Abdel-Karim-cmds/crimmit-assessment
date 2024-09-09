
const path = window.location.pathname;
const id = path.split("/").pop();
console.log(id)

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


async function getUser(){
   const access_token = localStorage.getItem('access_token');
    const response = await fetch(`/users/${id}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }
    });
    const data = await response.json();
    console.log(data)

    document.getElementById('ID').innerText = data.userID;
    document.getElementById('Full_Name').innerText = data.name;
    document.getElementById('email').innerText = data.email;
    document.getElementById('role').innerText = data.role;
}

getUser();

document.getElementById('modifyPasswordForm').addEventListener('submit', e=>{
   e.preventDefault();
   modifyPassword()
});

async function modifyPassword(){
   const access_token = localStorage.getItem('access_token');
   const password = document.getElementById('new_password').value;
   const confirmPassword = document.getElementById('confirm_password').value;

   if(password !== confirmPassword){
      createNotification('Passwords do not match', 'warning');
      return;
   }

   const response = await fetch(`/users/${id}`,{
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${access_token}`
      },
      body: JSON.stringify({
         password
      })

   });

   const data = await response.json();

   console.log(data);

   createNotification(data.message, 'success');

}


async function logout() {
   const access_token = localStorage.getItem('access_token');
   const response = await fetch('/auth/logout', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${access_token}`
      }
   });
   const data = await response.json();
   console.log(data);
   if (response.status === 200) {
      createNotification(data.message, 'success');
      localStorage.removeItem('access_token');
      localStorage.removeItem('role')
      window.location.href = '/';
   } else {
      createNotification(data.message, 'error');
   }
}
