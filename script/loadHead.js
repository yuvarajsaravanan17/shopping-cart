document.addEventListener('DOMContentLoaded',function(){
      
       
        fetch('loadHeader.html')
        .then(response=>response.text())
        .then(data=>document.querySelector("#header").innerHTML=data)
        .catch(error=>console.log(error));
        
    
              

    }
)