let users = JSON.parse(localStorage.getItem('users'));

const form = document.getElementById('myForm');
const emailInput = document.getElementById('email');
const passInput = document.getElementById('password');

form.addEventListener('submit', even => {
    even.preventDefault();

    if(validateInputs()){
        let checkInput = users.some(value => value.email == emailInput.value.trim() && value.password == passInput.value.trim());
        
        if(emailInput.value.trim() == 'CaoTatthanh2006@gmail.com' && passInput.value.trim() == '12345678'){
            const message = document.getElementById("message");
            message.innerText = "Login successful."
            message.style.display = "block";
            
            setTimeout(function() {
                message.style.display = "none";
                location.href = "../Pages/user_manager.html";
            }, 1000);
        }

        if(checkInput){
            const message = document.getElementById("message");
            message.innerText = "Login successful."
            message.style.display = "block";
            
            setTimeout(function() {
                message.style.display = "none";
                location.href = "../Pages/dashboard.html";
            }, 1000);
        } else{
            const message = document.getElementById("message");
            message.innerText = "Invalid login credentials!"
            message.style.display = "block";
            
            setTimeout(function() {
                message.style.display = "none";
                form.reset();
            }, 3000); 
        }
    }
});

const setError = (element, masage) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.err');

    errorDisplay.innerText = masage;
    inputControl.classList.add('err');
    inputControl.classList.remove('success');
};

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.err');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('err');
};

const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validateInputs = () => {
    const emailValue = emailInput.value.trim();
    const passValue = passInput.value.trim();
    let check = true;

    if(emailValue == ''){
        setError(emailInput, "👉 email is required");
        check = false;
    } else if(!isValidEmail(emailValue)){
        setError(emailInput, "👉 invalid email format");
        check = false;
    } else{
        setSuccess(emailInput);
    }

    if(passValue == ''){
        setError(passInput, "👉 password is required");
        check = false;
    } else if(passValue.length < 6){
        setError(passInput, "👉 password must be at least 6 characters long");
        check = false;
    } else{
        setSuccess(passInput);
    }
    return check;
};