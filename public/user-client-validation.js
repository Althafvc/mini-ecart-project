const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const passwordRegex =/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
const email=document.getElementById('email')
const labemail=document.querySelector('.labemail')
const labepassword=document.querySelector('.labepassword')
const password=document.getElementById('password')
const labeconfirmpassword=document.querySelector('.labeconfirmpassword')
const confirmpassword=document.getElementById('confirmpassword')




email.onblur=()=>{
    if(!emailRegex.test(email.value)){
        labemail.innerHTML='invalid E-mail format'
        labemail.classList.add('black')
    }else{
        labemail.innerHTML='E-mail:'
        labemail.classList.remove('black')
    }


  
}

password.onblur=()=>{
      
    if(!passwordRegex.test(password.value)){
        labepassword.innerHTML='invalid password format'
        labepassword.classList.add('black')
        
        
            }else{
                labepassword.innerHTML='Password'
                labemail.classList.remove('black')
            }
}

confirmpassword.onblur=()=>{

    if(!passwordRegex.test(confirmpassword.value)){
        labeconfirmpassword.innerHTML='This field is required'
        labeconfirmpassword.classList.add('black')


    }else{
        labeconfirmpassword.innerHTML='Confim Password:'
        labeconfirmpassword.classList.remove('black')

    }
}