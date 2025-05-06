let article = JSON.parse(localStorage.getItem("article")) || [];

function renderPosts(data = article) {
  const recentContainer = document.querySelector(".page1");
  const allContainer = document.querySelector(".infomation");
  recentContainer.innerHTML = "";
  allContainer.innerHTML = "";

  data.slice(0, 3).forEach(article => {
    recentContainer.innerHTML += `
      <div class="col-md-4">
        <img src="${article.image || '../Assets/images/a6f14c1fa6846f29f11dc2e85f40b29fbcc92d57.png'}" alt="Article Image">
        <p>Date: ${article.date}</p>
        <div class="d-flex justify-content-between">
          <h3>${article.title}</h3>
          <button class="bg-transparent border-0" data-bs-toggle="modal" data-bs-target="#descriptionModal" onclick="viewArticle('${article.date}')"><i class="fa-solid fa-share-from-square"></i></button>
        </div>
        <p>${article.content}</p>
        <button>${article.category}</button>
      </div>`;
  });

  data.forEach(article => {
    allContainer.innerHTML += `
      <div class="col-md-4">
        <img src="${article.image || '../Assets/images/a6f14c1fa6846f29f11dc2e85f40b29fbcc92d57.png'}" alt="Article Image">
        <p>Date: ${article.date}</p>
        <div class="d-flex justify-content-between">
          <h3>${article.title}</h3>
          <button class="bg-transparent border-0" data-bs-toggle="modal" data-bs-target="#descriptionModal" onclick="viewArticle('${article.date}')"><i class="fa-solid fa-share-from-square"></i></button>
        </div>
        <p>${article.content}</p>
        <button>${article.category}</button>
      </div>`;
  });
}

function viewArticle(date) {
  const articleDetail = article.find(item => item.date === date);

  if (articleDetail) {
    document.getElementById("modalTitle").innerText = articleDetail.title;
    document.getElementById("modalDate").innerText = `Date: ${articleDetail.date}`;
    document.getElementById("modalContent").innerText = articleDetail.content;
    document.getElementById("modalCategory").innerText = articleDetail.category;
    document.getElementById("modalImage").src = articleDetail.image || '../Assets/images/a6f14c1fa6846f29f11dc2e85f40b29fbcc92d57.png';
  }
}

renderPosts();

document.querySelector(".btn-danger").addEventListener("click", () => {
  const title = document.getElementById("formGroupExampleInput").value;
  const category = document.querySelector(".article").value;
  const mood = document.getElementById("formGroupExampleInput2").value;
  const content = document.getElementById("exampleFormControlTextarea1").value;
  const date = new Date().toISOString().split("T")[0];
  const status = document.querySelector('input[name="inlineRadioOptions"]:checked')?.value;

  const imgInput = document.getElementById("imgInput");
  let image = "";
  if (imgInput.files && imgInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      image = e.target.result; 
      saveArticle();
    };
    reader.readAsDataURL(imgInput.files[0]);
  } else {
    saveArticle();
  }

  function saveArticle() {
    if (!title || !category || !content || !status) {
      alert("Please fill all required fields!");
      return;
    }

    const newArticle = {
      title,
      category,
      mood,
      content,
      date,
      status,
      image
    };

    article.unshift(newArticle);
    localStorage.setItem("article", JSON.stringify(article));
    renderPosts();
    alert("Article added!");
  }
});

function articleList() {
    let selec = document.querySelector('.article');
    let html = '<option selected></option>';
  
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.forEach(value => {
      html += `<option value="${value.name}">${value.name}</option>`;
    });
  
    selec.innerHTML = html;
}

articleList();