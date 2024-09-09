async function getAllUsers(){
    const access_token = localStorage.getItem('access_token');
    const role = localStorage.getItem('role');

    const response = await fetch('/users',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }

    })
    const data = await response.json();

    console.log(data);
    populateTable(data)
}

getAllUsers()

function populateTable(users){
    const table = document.getElementById('table')
    table.innerHTML = ''
    users.forEach(user =>{
        const row = document.createElement('tr')
        
        const nameCell = document.createElement('td')
        nameCell.textContent = user.name
        row.appendChild(nameCell)

        const emailCell = document.createElement('td')
        emailCell.textContent = user.email
        row.appendChild(emailCell)

        const roleCell = document.createElement('td')
        roleCell.textContent = user.role
        row.appendChild(roleCell)

        const actionsCell = document.createElement('td')

        // const deleteCell = document.createElement('td')

        const deleteButton = document.createElement('button')
        deleteButton.textContent = 'Delete'

        deleteButton.addEventListener('click', async () => {
            const isConfirmed = window.confirm('Are you sure you want to delete this user?')

            if (!isConfirmed) {
                return
            }

            const access_token = localStorage.getItem('access_token');

            const response = await fetch(`/users/${user._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                }
            })

            const data = await response.json()

            if (response.status === 200) {
                console.log(data)
                getAllUsers()
            } else {
                console.log(data)
            }
        })

        const viewMore = document.createElement('button')
        viewMore.textContent = 'View More'

        viewMore.addEventListener('click', () => {
            window.location.href = `/admin-dashboard/${user._id}`
        })

        actionsCell.appendChild(viewMore)

        actionsCell.appendChild(deleteButton)

        row.appendChild(actionsCell)



        table.appendChild(row)

    })

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
