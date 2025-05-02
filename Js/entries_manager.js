let arr = [
    {
        "id": 1,
        "name": "Nhật ký học tập"
    },
    {
        "id": 2,
        "name": "Nhật ký mục tiêu và kế hoạch"
    },
    {
        "id": 3,
        "name": "Nhật ký trải nghiệm - học qua đời sống"
    }
]

localStorage.setItem('entries', JSON.stringify(arr));

function displayUsers(arr) {
    const entriesList = document.getElementById('addEntries');
    let html = '';

    arr.forEach((value, index) => {
        html += `
        <tr>
            <th scope="row">${value.id}</th>
            <td>${value.name}</td>
            <td>
                <button type="button" class="btn btn-primary edix"  onclick="addCategory('2', ${index})">
  Edit
</button>
                <button type="button" class="btn btn-danger" onclick="delEntries(${index})">delete</button>
            </td>
        </tr>
        `
    });
    
    entriesList.innerHTML = html;
}

displayUsers(arr);

function addCategory(type, id) {
    let input = document.getElementById('categoryName').value.trim();
    if (type == 1) {
        if(input == ''){
            return;
        }
        let obj = new Object();
        obj.id = arr.length + 1;
        obj.name = input;
    
        arr.push(obj);
        displayUsers(arr);
        document.getElementById('categoryName').value = '';
        localStorage.setItem('entries', JSON.stringify(arr));
    }else if (type == 2) {
        document.getElementById('categoryName').value = arr[id].name
        
        document.querySelector(".edix").onclick = function () {
            let newValue = document.getElementById('categoryName').value.trim();
            if (newValue !== '') {
                arr[id].name = newValue;
                displayUsers(arr);
                localStorage.setItem('entries', JSON.stringify(arr));
                document.getElementById('categoryName').value = '';
            }
        };
    }

}


function delEntries(index) {
    arr.splice(index, 1);
    displayUsers(arr);
    localStorage.setItem('entries', JSON.stringify(arr));
}

function editEntries(index) {
    document.querySelector('.name').value = arr[index].name
}

