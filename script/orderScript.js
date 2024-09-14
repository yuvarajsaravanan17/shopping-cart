document.addEventListener('DOMContentLoaded',function()
{
    let body=document.querySelector("#table-content");
    const parameters=new URL(window.location).searchParams;
    const userEmail=parameters.get('userEmail')
    const userPassword=parameters.get('userPassword')
    const orderItems=JSON.parse(localStorage.getItem(userEmail+"-order"))
    if(orderItems)
        {
    orderItems.forEach(order=> {
        let orderId=order.orderId;
        let orderAmount=order.orderAmount;
        let orderObj=order.orderData;
        let row=document.createElement('tr');
        row.classList.add('orderRow')
        let data=`<td>Order Id : ${orderId} </td><td>    Order Amount : ${orderAmount}</td> `
        row.innerHTML=data;
        body.appendChild(row);
        orderObj.forEach((data)=>{
            let row=document.createElement('tr');
            let dataOfTable=`<td><img src="${data.img}">ID : ${data.id} </td>
            <td>Item :${data.item} </td>
            <td>Price :${data.price} </td>
            <td>Quantity: ${data.quantity}</td>`;
            row.innerHTML=dataOfTable;
            body.appendChild(row);
          

        
         

        })
        
    });
}
else{
    const error=document.querySelector("#noBody");
    error.innerHTML="<h3>No Orders Found!!!</h3>"
}
})