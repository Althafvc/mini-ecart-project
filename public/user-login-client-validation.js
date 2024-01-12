const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const passwordRegex =/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/

const email=document.getElementById('email')
const labemail=document.querySelector('.labemail')
const password=document.getElementById('password')
const labepassword=document.querySelector('.labepassword')


email.onblur=()=>{
if(!emailRegex.test(email.value)){
    labemail.innerHTML=('invalid email format')
    labemail.classList.add('red')
}
else{
    labemail.innerHTML=('E mail')
    labemail.classList.remove('red')
}
}

password.onblur=()=>{
   if(!passwordRegex.test(password.value)){
    labepassword.innerHTML=('invalid password format')
    labepassword.classList.add('red')

   }else{
    labepassword.innerHTML=('Password')
    labepassword.classList.remove('red')
   }
}