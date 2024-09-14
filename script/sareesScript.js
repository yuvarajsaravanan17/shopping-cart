document.addEventListener('DOMContentLoaded',function()
{
  const parameters=(new URL(window.location).searchParams);
  const userEmail=parameters.get('userEmail')
  const userPassword=parameters.get('userPassword');
   const sareeDatas=JSON.parse(localStorage.getItem('Saree'));
   
   console.log(sareeDatas)
   const data="";
   var element=1;

   sareeDatas.forEach(data => {
    var tag=".item"+element+" .data";
    let item=document.querySelector(tag );
    data=`Id : ${data.id}<br/>Name : ${data.name}<br/>Price : ${data.price}<br/>Stock : ${data.availableStock}<br/>`
    item.innerHTML=data;
    data=""
    element++;
    
   });
   const buttonCart=document.querySelectorAll(".items img");
   buttonCart.forEach(button=>{
   button.addEventListener('click',function()
{   
    const datas=button.parentNode;
    const img=datas.firstElementChild.getAttribute("src");
    console.log(img)
    const data=datas.children[1];
    const fullTag=data.innerHTML;
    const dataArray=fullTag.split("<br>")
    const id=dataArray[0].slice(4).trim();
   console.log(id)

    sareeDatas.forEach(data=>{
      console.log(data.id)
      if(data.id==id)
         {
              if(!localStorage.getItem(userEmail))
                {
                  localStorage.setItem(userEmail,JSON.stringify([]));
                }
              let cartObj={
                id:data.id,
                item:data.name,
                category:data.category,
                price:data.price,
                img:img
               };
               cartObj=[cartObj];
               let datasFromStorage=JSON.parse(localStorage.getItem(userEmail));
               let dupConfirm;
               datasFromStorage.forEach(storeData=>{
                if(storeData.id===data.id)
                  {
                    Swal.fire({
                      icon: 'error',
                      title: 'Item Already Exists In The Cart',
                      
                  });
                    dupConfirm=true;
                    
                  
                  }
               })
               if(!dupConfirm)
                {
                  Swal.fire({
                    icon: 'success',
                    title: 'Items Is Added In The Cart!!!',
                    
                });
               console.log(datasFromStorage)
               datasFromStorage=datasFromStorage.concat(cartObj);
               console.log(datasFromStorage);
               localStorage.setItem(userEmail,JSON.stringify(datasFromStorage))
                }
            
           
         }
    })
    console.log(datas)


})
})




})