let users = [
    {
        "id": 1,
        "firstname": "Lê",
        "lastname": "Minh Thu",
        "email": "minhthu@gmail.com",
        "password": "123456"
      },
      {
        "id": 2,
        "firstname": "Vũ",
        "lastname": "Hồng Vân",
        "email": "hongvan@yahoo.com",
        "password": "abc123"
      }
];

localStorage.setItem('users', JSON.stringify(users));

let array = JSON.parse(localStorage.getItem('users')) || [];

const form = document.querySelector('.myForm');
const firsName = document.getElementById('firsName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const password1 = document.getElementById('password1');
const password2 = document.getElementById('password2');

form.addEventListener('submit', event => {
    event.preventDefault();

    if(validateInputs()){
        let obj = new Object();
        obj.id = array.length + 1;
        obj.firstname = firsName.value;
        obj.lastname = lastName.value;
        obj.email = email.value;
        obj.password = password1.value;

        array.push(obj);
        localStorage.setItem('users', JSON.stringify(array));

        const message = document.getElementById("message");
        message.innerText = "Register successful."
        message.style.display = "block";
            
        setTimeout(function() {
            message.style.display = "none";
            location.href = "../Pages/login.html";
        }, 3000);
    }
})

const setError = (element, masage) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = masage;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validateInputs = () => {
    const firsNameValue = firsName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const password1Value = password1.value.trim();
    const password2Value = password2.value.trim();

    let check = true;

    if(firsNameValue == ''){
        setError(firsName, "👉 This field is required");
        check = false;
    } else{
        setSuccess(firsName);
    }

    if(lastNameValue == ''){
        setError(lastName, "👉 This field is required");
        check = false;
    } else{
        setSuccess(lastName);
    }

    if(emailValue == ''){
        setError(email, "👉 This field is required");
        check = false;
    } else if(!isValidEmail(emailValue)){
        setError(email, "👉 invalid email format");
        check = false;
    }else{
        setSuccess(email);
    }

    if(password1Value == ''){
        setError(password1, "👉 This field is required");
        check = false;
    } else if(password1Value.length < 6){
        setError(password1, "👉 password must be at least 6 characters long");
        check = false;
    }else{
        setSuccess(password1);
    }

    if(password2Value == ''){
        setError(password2, "👉 This field is required");
        check = false;
    } else if(password1Value != password2Value){
        setError(password2, "👉 Password confirmation does not match");
        check = false;
    }else{
        setSuccess(password2);
    }

    return check;
};