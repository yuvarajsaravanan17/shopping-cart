document.addEventListener('DOMContentLoaded',function()
{


    const parameters=new URL(window.location).searchParams;
    const userEmail=parameters.get('userEmail')
    const userPassword=parameters.get('userPassword')
    const cartItems=JSON.parse(localStorage.getItem(userEmail))
    const body=document.querySelector("#table-content");
    const total=document.querySelector("#total");
    var totalAmountOfOrder;
    var totalAmount=0;
    var orderData=[];
    var itemIdStock=[];
    if(cartItems)
        {
   
    cartItems.forEach(data => {
     
        var row=document.createElement("tr");
        rowData=`
        <td><img src=${data.img}></td>
        <td>${data.id}</td>
        <td>${data.category}</td>
        <td>${data.item}</td>
        <td>${data.price}</td>
        <td><input type=number id="quantity" value=1>
        <td>${data.price}</td>
        <td><img src=../images/delete.png id="delete"><td>`;
        
        row.innerHTML=rowData;
        body.appendChild(row);
        totalAmount+=Number(data.price);
        total.innerText=totalAmount;
         var id=data.id;
         var img=data.img;
         var item=data.item;
         var category=data.category;
         var price=data.price;
         var quantity=1;  
        var myItemData={id,img,item,category,price,quantity};
        itemIdStock.push(myItemData);
        console.log(itemIdStock)
       
    });
  

    const quantityChange=document.querySelectorAll("#quantity");

    
    quantityChange.forEach(function(button)
        {

            button.addEventListener('change',function(event)
        {       
               let parentOfChange=button.parentElement.parentElement;
               let amountCell=parentOfChange.children[6];
               let category=parentOfChange.children[2].innerText;
            
               let idOfChange=parseInt(parentOfChange.children[1].innerText);
               console.log(category)
               console.log(amountCell);
               if(event.target.value<1)
                {
                    event.target.value=1;
                }
               let quantityOfChange=parseInt(event.target.value);
               let stockCheck=false;
               var maximumQuantity=0;
               let categoryData=JSON.parse(localStorage.getItem(category));
               console.log(categoryData)
            
               categoryData.forEach(data=>{
                if(idOfChange==data.id)
                    {
                if(quantityOfChange<=data.availableStock)
                 {  stockCheck=true;
                  
                 
                 
                }
                maximumQuantity=data.availableStock;}
               })
               if(stockCheck){
               
               let price=parentOfChange.children[4].innerText;
               console.log(price)
               let amount=price* (quantityOfChange);
            
               amountCell.innerText=amount;

              totalFunction();
               const parentOfDelete=button.parentElement.parentElement;
               for(let i=0;i<itemIdStock.length;i++)
                {
                    if(itemIdStock[i].id==idOfChange)
                        {
                            itemIdStock[i].quantity=quantityOfChange;  
                       
                        }
                }
            
               }
               else{
                Swal.fire({
                    icon: 'error',
                    title: 'Stock Limit Exceeded',
                    text: `The maximum available stock for this item is ${maximumQuantity}.`,
                });
                event.target.value=maximumQuantity;
               }


        })
        }
    )
   

    const deleteBtns=document.querySelectorAll("#delete");
    console.log(deleteBtns)
    deleteBtns.forEach(btn=>
        {
            
            btn.addEventListener('click',function()
        {
            
            const parentOfDelete=btn.parentElement.parentElement;
            
            var id=parentOfDelete.children[1].innerText;
            console.log(id)
         
            for(let i=0;i<cartItems.length;i++)
                {
                    console.log(cartItems[i].id)
                    console.log(cartItems)
                    if(cartItems[i].id==id)
                        { 
                        
                                
                                     
                            Swal.fire({
                                title: 'Are you sure?',
                                text: "Do you really want to delete these items from your cart?",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes, delete them!',
                                cancelButtonText: 'No, keep them'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    
                                    cartItems.splice(i,1);
                                    console.log(cartItems);
                                    parentOfDelete.remove();
                                    localStorage.setItem(userEmail,JSON.stringify(cartItems));
                                    totalFunction();
                                    Swal.fire(
                                        'Deleted!',
                                        'Your cart items have been deleted.',
                                        'success'
                                    );
                                }
                            });
                           
                        }
                }
            
                })
        }    
    )

   const paymentBtn=document.querySelector("#payment");
   paymentBtn.addEventListener('click',function()
{   
    
    Swal.fire({
        title: 'Confirm Payment',
        text: "Do you really want to proceed with the payment?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, pay now!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            let orderItem;
            let orderImg;
            let orderQuantity;
            let orderTotalAmount;
    
            itemIdStock.forEach(data=>{
            let category=data.category;
            let storedDatas=JSON.parse(localStorage.getItem(category));
            for(let i=0;i<storedDatas.length;i++)
                {
                    if(storedDatas[i].id==data.id)
                        {
                            
                            console.log(storedDatas[i].availableStock-=data.quantity);
                            console.log(storedDatas[i].availableStock)
                            localStorage.setItem(category,JSON.stringify(storedDatas));
                        }
                }
            
                    localStorage.removeItem(userEmail);
                    totalAmountOfOrder=document.querySelector("#total").innerText;
                    orderData.push(data);
           
          

                      })

                let orderObj={
                    orderId:userEmail+Math.floor(Math.random()*1000),
                    orderData:orderData,
                    orderAmount:totalAmountOfOrder};
                let getorderStoredDatas=JSON.parse(localStorage.getItem(userEmail+"-order"))||[];
                console.log(getorderStoredDatas)
                getorderStoredDatas.push(orderObj)
                console.log(getorderStoredDatas)
                localStorage.setItem(userEmail+"-order",JSON.stringify(getorderStoredDatas));
                console.log("Cart Deleted!!!")
                body.innerHTML="<h4>No Cart Items Found!!!</h4>";
            Swal.fire(
                'Payment Successful!',
                'Your payment has been processed successfully.',
                'success'
            );
        }
    });
          


})
        }
        else{
            const noData=document.querySelector("#noBody");
            noData.innerHTML=`<h3 style="margin-top:20px">No Cart Items Found!!!!</h3>`;
            console.log(noData)
        }


        let totalBtn=document.querySelector("#totalButton");
        let totalValueArea=document.querySelector("#total")
      
        totalBtn.addEventListener('click',function()
    {      totalFunction();
    })
    function totalFunction()
    {
        let child=0;
        totalAmount=0;
         console.log(cartItems)
        cartItems.forEach(data=>{
          let row=body.children[child];
          console.log(parseInt(row.children[6].innerText))
          totalAmount+=parseInt(row.children[6].innerText);
          child++;
          totalValueArea.innerText=totalAmount;
          
          
        })
    }


})