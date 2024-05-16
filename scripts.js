document.getElementById('fetchUsersBtn').addEventListener('click', function() {
    fetch('http://localhost:3001/api/users/')
        .then(response => response.json())
        .then(data => {
            const userList = document.getElementById('userList');
            userList.innerHTML = ''; // Limpiar la lista antes de agregar nuevos elementos

            if (data.ok) {
                data.usuarios.forEach(user => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `Nombre: ${user.nombre}, Email: ${user.email}`;
                    userList.appendChild(listItem);
                });
            } else {
                const listItem = document.createElement('li');
                listItem.textContent = 'Error al obtener los usuarios.';
                userList.appendChild(listItem);
            }
        })
        .catch(error => {
            console.error('Error al obtener los usuarios:', error);
            const userList = document.getElementById('userList');
            userList.innerHTML = '';
            const listItem = document.createElement('li');
            listItem.textContent = 'Error al obtener los usuarios.';
            userList.appendChild(listItem);
        });
});
