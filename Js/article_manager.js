let arr = [
  {
    id: 1,
    title: "Deadline đầu tiên của kỳ học",
    entries: "Nhật ký học tập",
    content: "Hôm nay mình vừa nộp xong bài tập lớn. Mệt nhưng thấy rất nhẹ nhõm!",
    mood: "Căng thẳng",
    status: "Private",
    image: "https://toigingiuvedep.vn/wp-content/uploads/2022/04/hinh-anh-hoc-bai-cham-chi.jpg",
    date: "2025-02-23"
  },
  {
    id: 2,
    title: "Cà phê chiều chủ nhật",
    entries: "Nhật ký trải nghiệm - học qua đời sống",
    content: "Ngồi một mình trong quán quen, nghe nhạc lofi và viết vài dòng nhật ký...",
    mood: "Thư giãn",
    status: "Public",
    image: "https://toigingiuvedep.vn/wp-content/uploads/2022/04/hinh-anh-hoc-bai-cham-chi.jpg",
    date: "2025-03-15"
  }
];

if (!localStorage.getItem('article')) {
  localStorage.setItem('article', JSON.stringify(arr));
}

let perPage = 5;
let currentPage = 1;
let editingId = null;

function loadArticles() {
  let articles = JSON.parse(localStorage.getItem('article')) || [];
  renderArticles(articles);
}

function renderArticles(data) {
  let list = document.querySelector('.articleList');
  let start = (currentPage - 1) * perPage;
  let end = start + perPage;
  let html = '';

  data.slice(start, end).forEach((item) => {
    // console.log(item);
    
    html += `
      <tr>
        <td><img src="${item.image}" alt=""></td>
        <td>${item.title}</td>
        <td>${item.entries}</td>
        <td>${item.content}</td>
        <td><div class="status">${item.status}</div></td>
        <td>
          <select class="form-select status-select" data-id="${item.id}">
            <option value="Public" ${item.status === "Public" ? "selected" : ""}>Public</option>
            <option value="Private" ${item.status === "Private" ? "selected" : ""}>Private</option>
          </select>
        </td>
        <td>
          <div class="d-flex">
            <button class="style edit" data-id="${item.id}">Edit</button>
            <button class="style del" data-id="${item.id}">Delete</button>
          </div>
        </td>
      </tr>`;
  });

  list.innerHTML = html;
  addListeners();
  renderPagination(data.length);
}

function addListeners() {
  document.querySelectorAll('.del').forEach(btn => {
    btn.addEventListener('click', function () {
      let id = parseInt(this.getAttribute('data-id'));
      let articles = JSON.parse(localStorage.getItem('article')) || [];
      articles = articles.filter(a => a.id !== id);
      localStorage.setItem('article', JSON.stringify(articles));
      loadArticles();
    });
  });

  document.querySelectorAll('.status-select').forEach(select => {
    select.addEventListener('change', function () {
      let id = parseInt(this.getAttribute('data-id'));
      let articles = JSON.parse(localStorage.getItem('article')) || [];
      let article = articles.find(a => a.id === id);
      if (article) {
        article.status = this.value;
        localStorage.setItem('article', JSON.stringify(articles));
        loadArticles();
      }
    });
  });

  document.querySelectorAll('.edit').forEach(btn => {
    btn.addEventListener('click', function () {
      let id = parseInt(this.getAttribute('data-id'));
      let articles = JSON.parse(localStorage.getItem('article')) || [];
      let article = articles.find(a => a.id === id);
      if (article) {
        editingId = id;
        document.getElementById('formGroupExampleInput').value = article.title;
        document.querySelector('.article').value = article.entries;
        document.getElementById('formGroupExampleInput2').value = article.mood;
        document.getElementById('exampleFormControlTextarea1').value = article.content;

        if (article.status === "Public") {
          document.getElementById("inlineRadio1").checked = true;
        } else {
          document.getElementById("inlineRadio2").checked = true;
        }

        let modal = new bootstrap.Modal(document.getElementById("myModal"));
        modal.show();
      }
    });
  });
}

function renderPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / perPage);
  let html = '';

  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="btn btn-sm ${i === currentPage ? 'btn-dark' : 'btn-outline-dark'}" onclick="changePage(${i})">${i}</button> `;
  }

  document.querySelector('.pation').innerHTML = html;
}

function changePage(page) {
  currentPage = page;
  loadArticles();
}

document.getElementById('btnAddArticle').addEventListener('click', function () {
  let title = document.getElementById('formGroupExampleInput').value.trim();
  let entries = document.querySelector('.article').value;
  let mood = document.getElementById('formGroupExampleInput2').value.trim();
  let content = document.getElementById('exampleFormControlTextarea1').value.trim();
  let status = document.querySelector('input[name="inlineRadioOptions"]:checked')?.value === "option1" ? "Public" : "Private";

  let fileInput = document.getElementById('imgInput');
  let file = fileInput.files[0];

  if (!title || !entries || !content) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      saveArticle(e.target.result);
    };
    reader.readAsDataURL(file);
  } else {
    saveArticle("https://via.placeholder.com/60");
  }
});

function saveArticle(imageBase64) {
  let title = document.getElementById('formGroupExampleInput').value.trim();
  let entries = document.querySelector('.article').value;
  let mood = document.getElementById('formGroupExampleInput2').value.trim();
  let content = document.getElementById('exampleFormControlTextarea1').value.trim();
  let status = document.querySelector('input[name="inlineRadioOptions"]:checked')?.value === "option1" ? "Public" : "Private";

  let articles = JSON.parse(localStorage.getItem('article')) || [];

  if (editingId) {
    let article = articles.find(a => a.id === editingId);
    if (article) {
      article.title = title;
      article.entries = entries;
      article.content = content;
      article.mood = mood;
      article.status = status;
      article.image = imageBase64;
    }
    editingId = null;
    alert("✅ Đã cập nhật bài viết!");
  } else {
    let newArticle = {
      id: articles.length ? articles[articles.length - 1].id + 1 : 1,
      title,
      entries,
      content,
      mood,
      status,
      image: imageBase64,
      date: new Date().toISOString().split('T')[0]
    };
    articles.push(newArticle);
    alert("✅ Thêm bài viết thành công!");
  }

  localStorage.setItem('article', JSON.stringify(articles));
  document.querySelector('.btn-close').click();
  resetForm();
  loadArticles();
}

function resetForm() {
  document.getElementById('formGroupExampleInput').value = '';
  document.querySelector('.article').value = '';
  document.getElementById('formGroupExampleInput2').value = '';
  document.getElementById('exampleFormControlTextarea1').value = '';
  document.getElementById('imgInput').value = '';
  document.getElementById("inlineRadio1").checked = true;
}

function articleList() {
  let selec = document.querySelector('.article');
  let html = '<option selected></option>';

  let entries = JSON.parse(localStorage.getItem('entries')) || [];
  entries.forEach(value => {
    html += `<option value="${value.name}">${value.name}</option>`;
  });

  selec.innerHTML = html;
}

loadArticles();
articleList();