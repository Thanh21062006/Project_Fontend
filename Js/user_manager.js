let users = JSON.parse(localStorage.getItem('users'));

function displayUsers(user) {
    const userList = document.getElementById('userList');
    let html = '';

    user.forEach((user) => {
        html += `
        <tr>
            <td><img src="https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg" alt="User Avatar">${user.firstname + ' ' + user.lastname}</td>
            <td><b>Hoạt động</b></td>
            <td class="email">${user.email}</td>
            <td><button>block</button></td>
            <td><button>unblock</button></td>
        </tr>
        `
    });
    userList.innerHTML = html;
}

displayUsers(users);