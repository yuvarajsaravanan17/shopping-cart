document.addEventListener('DOMContentLoaded',function()
{
    var form=document.getElementById('login-form');
    var body=document.querySelector("body");
    var name=document.getElementById('userName');
    var age=document.querySelector('#userAge');
    var phone=document.querySelector('#userPhone');
    var address=document.querySelector('#userAddress');
    var email=document.querySelector('#userEmail');
    var password=document.querySelector('#userPassword');
    var confirmPassword=document.querySelector('#confirmPassword');
    var pincode=document.querySelector('#userPincode');
    var city=document.querySelector("#userCity");
    var allDatas=[name,age,phone,address,email,password,confirmPassword,pincode,city]
    body.addEventListener('mousedown',function()
{
     errorMessageRemove(allDatas);
})
    
   
 function errorMessageRemove(datas)
 {
    datas.forEach(data=>{
        let parent=data.parentElement;
        parent.classList.remove("error");

    })

 }
    
    function requiredCheck(datas)
    {
        datas.forEach(data=>{
            if(data.value.trim()==="")
                {
                    errorMessage(data,"This Field Is Required!!!")
                }
        })

    }
    function errorMessage(input,message)
    {
        let parent=input.parentElement;
        parent.classList.add("error");
        let errorElement=parent.querySelector("span");
        errorElement.innerText=message;
    }
    function nameCheck(input) {

        let check= /^[a-zA-Z]+$/.test(input.value.trim());
        if(!check)
            errorMessage(input,"Name must Be Alpha!")
        return check;
    }
    
    function emailCheck(email) {
        const check = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
        if(!check)
        errorMessage(email,"Email is not valid!")
    return check;
    }

    function phoneCheck(phone) {
        const check = /^\d{10}$/.test(phone.value);  
        if(!check)
            errorMessage(phone,'Phone number must be 10 digit!')
        return check;
    }

    
    function passwordCheck(password) {

        const check = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password.value.trim());;
        if(!check)
            errorMessage(password,'password is not valid ');
        return check;
    }

    function ageCheck(age) {
      if(age.value>=18 && age.value<=70)
        return true;
      else
      errorMessage(age,'Age muse be >=18 or <=70');
    }
    function confirmPasswordCheck(password,confirmPassword)
    {
        if(password.value.trim()==confirmPassword.value.trim())
            return true;
        else
        errorMessage(confirmPassword,'Confirm password is not matched!')
    }
    function pinCodeCheck(pincode)
    {
        if((pincode.value.length!=6))
            return errorMessage(pincode,'Pincode must be 6 digit!')
        else
        return true;
    }
    
    form.addEventListener("submit",function(event)
{   

    
    event.preventDefault();
    
    requiredCheck(allDatas);
    let a=nameCheck(name)
    let b= nameCheck(city)
    let c= phoneCheck(phone)
    let d=pinCodeCheck(pincode) 
    let e=  emailCheck(email) 
    let f=   ageCheck(age) 
    let g=    confirmPasswordCheck(password,confirmPassword)
    let h=passwordCheck(password);
    console.log(a,b,c,d,e,f,g,h)
    allCheck=nameCheck(name) && nameCheck(city)&&phoneCheck(phone) && passwordCheck(password) &&
    pinCodeCheck(pincode) &&emailCheck(email) &&ageCheck(age) && confirmPasswordCheck(password,confirmPassword);
    console.log(allCheck)
    if(allCheck)
        
        {
    const obj={
        name:name.value.trim().toLowerCase(),
        age:age.value,
        email:email.value.trim().toLowerCase(),
        phone:phone.value.trim(),
        address:email.value.trim().toLowerCase(),
        city:city.value.trim().toLowerCase(),
        pincode:pincode.value.trim(),
        password:password.value.trim()
    }
    console.log(obj)

    const datas=JSON.parse(localStorage.getItem('users'))||[];
    console.log(datas)
    var addConfirm=datas.find(data=>{
        console.log(data.email)
         return data.email==email.value;  
    })
    console.log(addConfirm)
    if(!addConfirm)
        {
            datas.push(obj);
            localStorage.setItem('users',JSON.stringify(datas));
            console.log("data Added!!!");
            Swal.fire({
                icon: 'success',
                title: 'Registration Successful',
                text: 'You have successfully registered!'
            }).then(() => {
                form.reset();
            });
            setTimeout(()=>
                {  window.location.href="index.html";
                }
            ,1000);
           
        }
        else
        {
            Swal.fire({
                icon: 'error',
                title: 'Email Already Exists',
                text: 'The email you entered is already registered.'
            });
        }
        }
        else{
           console.log("Not All Condition Satisfied")
        }

 
   
    

   

})

    















})