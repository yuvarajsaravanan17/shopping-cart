document.addEventListener('DOMContentLoaded',function()
{

    
     const form=document.querySelector('#register-form');
     console.log(form)
     var eyeIcon=document.querySelector("#eye");
     var eyeParent=eyeIcon.parentElement.parentElement;
     var eyeInput=eyeParent.children[1];
     const successDiv=document.querySelector(".success");
     eyeIcon.addEventListener('mousedown',function(){
        eyeInput.setAttribute('type','text');

     })
     eyeIcon.addEventListener('mouseup',function()
    {
        eyeInput.setAttribute('type','password')
    })
     function emailCheck(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email.value))
            {
               const parent=email.parentElement;
               console.log(parent)
               parent.classList.add('error');
               const errorElement=parent.querySelector('span');
               errorElement.innerText="Email is not found!!!";
               console.log(errorElement)
            }
    }

    function errorShow(emailId)
    {
        var parent=emailId.parentElement;
        console.log(parent);
        parent.classList.add('error');
        var error=parent.querySelector('span')
        error.innerText="Email Is Not Found!!"
    }
    form.addEventListener('focus',function()
{
    error.innerText="";
})
     form.addEventListener('submit',function(event)
     {
        event.preventDefault();
        var emailId=document.querySelector("#userEmail");
       
        var passwordId=document.querySelector("#userPassword");
        const userEmail=document.querySelector("#userEmail").value;
        const userPassword=document.querySelector("#userPassword").value;
        emailCheck(emailId);
        
   
        if(JSON.parse(localStorage.getItem("users")))
            {
                const users=JSON.parse(localStorage.getItem("users"));
        const userFind=users.find((user)=>{
            return user.email===userEmail&& user.password===userPassword;
        })
     
        if(userFind)
            {   
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'You have successfully logged in!',
                    showConfirmButton: false,
                    timer: 3000
                });
                setTimeout(()=>
                {
                    window.location.href=`homePage.html?userEmail=${userEmail}&userPassword=${userPassword}`;
                },1000)
              
            }
            else
        {
            var parent=emailId.parentElement;
           
            parent.classList.add('error');
            var error=parent.querySelector('span')
                errorElement.innerText="Email is not found!!!";

        }
        }
        else{
        }
        
     })










})