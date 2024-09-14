document.addEventListener('DOMContentLoaded',function()
{
  const parameters=(new URL(window.location).searchParams);
  const userEmail=parameters.get('userEmail')
  const userPassword=parameters.get('userPassword');
   const tShirtDatas=JSON.parse(localStorage.getItem('tShirts'));

   if(tShirtDatas.length===0)
    {
        const emptyData=document.querySelector("#noDataFound");
        emptyData.innerHTML=`<h3 id='noDataAlign'>No Data Found For The TShirsts!!!</h3>`
    }

})