const signinform = document.getElementById('signinform');
const signupform = document.getElementById('signupform');



signinform.addEventListener('submit', (e)=>{
    if (signinvalidateForm() === true){
        signinform.submit();
    }
    else{   
        e.preventDefault()
    }
})
const signinvalidateForm = () =>{
    let result = true
    const email = document.getElementById('signinemail').value
    const password = document.getElementById('signinpassword').value
    const errorMessage = document.getElementById('signinerrorBox')
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

signupform.addEventListener('submit', (e)=>{
    if (signupvalidateForm() === true){
        signupform.submit();
        // e.preventDefault();
    }
    else{   
        e.preventDefault()
    }
})

const signupvalidateForm = () =>{
    let result = true
    const firstname = document.getElementById('signupfirstname').value
    const lastname = document.getElementById('signuplastname').value
    const email = document.getElementById('signupemail').value
    const password = document.getElementById('signuppassword').value
    const errorMessage = document.getElementById('signuperrorBox')
    const emailpattern = /[a-z0-9]+@[a-z]+\.([a-z]{2}|[a-z]{3})/;
    errorMessage.innerText = ''
    if (firstname.length <= 1){
        errorMessage.innerHTML += 'Enter a valid First Name!\n'
        result = false 
    }
    if (lastname.length <= 1){
        errorMessage.innerHTML += 'Enter a valid Last Name!\n'
        result = false 
    }
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