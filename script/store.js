document.addEventListener('DOMContentLoaded',function()
{
    const parameters=(new URL(document.location)).searchParams;
    const userEmail=parameters.get('userEmail');
    const userPassword=parameters.get('userPassword')
    const displayName=document.querySelector("#yourName")
   

  async function getData()
  {

    const datas= await fetch("https://3cca047c11644cc795c596cd8ac8ff40.api.mockbin.io/");
    const jsonData=await datas.json();
    console.log(jsonData)
    let pantData=[];
    let shirtData=[];
    let tShirtData=[];
    let sareeData=[];
    let chudiData=[];
    jsonData.forEach(data => {
        if(data.category=='Pant')
            pantData.push(data)
        if(data.category=='Shirt')
            shirtData.push(data)
        
        if(data.category=='t-shirt')
            tShirtData.push(data)
        
        if(data.category=='Saree')
            sareeData.push(data)
        
        if(data.category=='Chudi')
            chudiData.push(data)
        
        
    });

    localStorage.setItem('Pant',JSON.stringify(pantData))
    localStorage.setItem('Saree',JSON.stringify(sareeData))
    localStorage.setItem('tShirts',JSON.stringify(tShirtData))
    localStorage.setItem('Chudi',JSON.stringify(chudiData))
    localStorage.setItem('Shirt',JSON.stringify(shirtData))
    

  }
  getData();
  const parent=document.querySelector("#header");
  function pantTimeToLoad()
  {
     setTimeout(()=>{
        var profileMenu=document.querySelector(".yourData");
        var homeLink=document.querySelector("#nanoCart");
         var pantLink=document.getElementById("pant")
         var tShirtLink=document.getElementById("tShirt");
         var shirtLink=document.getElementById("shirt");
         var sareeLink=document.getElementById("saree");
         var chudiLink=document.getElementById("chudi");
         var cartLink=document.getElementById("cartLink");
         var orderLink=document.getElementById('orderLink');
        
       
       
         cartLink.addEventListener('click',function()
     {
         window.location.href=`cart.html?userEmail=${userEmail}&userPassword=${userPassword}`;
     })
         pantLink.addEventListener('click',function()
 {
     window.location.href=`pants.html?userEmail=${userEmail}&userPassword=${userPassword}`;
 })
 
shirtLink.addEventListener('click',function()
{
window.location.href=`shirts.html?userEmail=${userEmail}&userPassword=${userPassword}`;
})
tShirtLink.addEventListener('click',function()
{
window.location.href=`tShirts.html?userEmail=${userEmail}&userPassword=${userPassword}`;
})
sareeLink.addEventListener('click',function()
{
window.location.href=`sarees.html?userEmail=${userEmail}&userPassword=${userPassword}`;
})
chudiLink.addEventListener('click',function()
{
window.location.href=`chudis.html?userEmail=${userEmail}&userPassword=${userPassword}`;
})

orderLink.addEventListener('click',function()
{
window.location.href=`order.html?userEmail=${userEmail}&userPassword=${userPassword}`;
})
homeLink.addEventListener('click',function()
{
    window.location.href=`homePage.html?userEmail=${userEmail}&userPassword=${userPassword}`;
})
let profile=document.querySelector("#profile-content");
const profileData=JSON.parse(localStorage.getItem('users'));
var yourProfile;
profileData.forEach(profile=>
  {
    
     
     if(profile.email==userEmail)
      yourProfile=profile;
    
       
  })

  var profileLink=document.getElementsByClassName("yourData");
  let userName=yourProfile.name;
  profileMenu.innerHTML=`<li><a><i class="fa-solid fa-envelope icon"></i>${ userEmail}</a></li><li><a><i class="fa-solid fa-user-tie icon"></i>${userName}</a></li><li><a><i class="fa-solid fa-phone icon"></i>${yourProfile.phone}</a></li>`;

 
     
     },1000);
     
  }
  pantTimeToLoad();


 

  
  
 
 

 
  
 







})