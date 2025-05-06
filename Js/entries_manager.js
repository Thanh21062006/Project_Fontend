let arr = JSON.parse(localStorage.getItem('entries')) || [
    { id: 1, name: "Nhật ký học tập" },
    { id: 2, name: "Nhật ký mục tiêu và kế hoạch" },
    { id: 3, name: "Nhật ký trải nghiệm - học qua đời sống" }
];

let editingId = null;

function displayUsers(arr) {
    const entriesList = document.getElementById('addEntries');
    let html = '';

    arr.forEach((value, index) => {
        html += `
        <tr>
            <th scope="row">${value.id}</th>
            <td>${value.name}</td>
            <td>
                <button type="button" class="btn btn-primary" onclick="addCategory('2', ${value.id})">Edit</button>
                <button type="button" class="btn btn-danger" onclick="delEntries(${index})">Delete</button>
            </td>
        </tr>
        `;
    });

    entriesList.innerHTML = html;
    localStorage.setItem('entries', JSON.stringify(arr));
}

displayUsers(arr);

function addCategory(type, id) {
    let input = document.getElementById('categoryName').value.trim();

    if (type == '1') {
        if (input === '') return;

        if (editingId !== null) {
            const entry = arr.find(item => item.id === editingId);
            if (entry) {
                entry.name = input;
            }
            editingId = null;
        } else {
            let obj = {
                id: arr.length ? arr[arr.length - 1].id + 1 : 1,
                name: input
            };
            arr.push(obj);
        }

        document.getElementById('categoryName').value = '';
        displayUsers(arr);
        localStorage.setItem('entries', JSON.stringify(arr));

    } else if (type == '2') {
        const entry = arr.find(item => item.id === id);
        if (!entry) return;

        document.getElementById('categoryName').value = entry.name;
        editingId = id;
    }
}

function delEntries(index) {
    arr.splice(index, 1);
    displayUsers(arr);
    localStorage.setItem('entries', JSON.stringify(arr));
}


