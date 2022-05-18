const formbox = document.getElementById('formbox');

formbox.addEventListener('submit', (e)=>{
    if (validateForm() === true){
        formbox.submit();
        e.preventDefault();
    }
    else{   
        e.preventDefault()
    }
})

const validateForm = () =>{
    let result = true
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const errorMessage = document.getElementById('errorBox')
    const emailpattern = /[a-z0-9]+@[a-z]+\.([a-z]{2}|[a-z]{3})/;
    errorMessage.innerText = ''
    if (!emailpattern.test(email)){
        errorMessage.innerText = 'Enter a valid email address!\n'
        result = false
    }
    if (password.length < 8) {
        errorMessage.innerHTML += 'Password\'s length should be at least 8 characters!\n'
        result = false 
    }
    return result
}
