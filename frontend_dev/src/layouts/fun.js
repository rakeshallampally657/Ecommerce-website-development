//***********************Declarations************************************************ */
var jsonobj=[];
var jsonobj2=[];
var loadBody, loadProduct,Error404Screen;
const apiUrl='http://localhost:500'

//*****************************parseurl*********************************************** */
function  parseRequestUrl() {
  const url= document.location.hash.toLowerCase();
  const request= url.split('/');
  return{resource:request[1],
  id:request[2],
  action:request[3]}

}
//*****************************routing************************************************************** */
const routes={
  '/': "loadBody",
  '/product/:id': "loadProduct",
  '/viewcart/:id': "cartItems",
  '/signin':      "signInPage",
  '/register':    "register"
}


function router() {
  const request = parseRequestUrl();
  console.log(request);
  const parseUrl =
  (request.resource ? `/${request.resource}` : '/') +
  (request.id ? '/:id' : '') +
  (request.verb ? `/${request.verb}` : '');
  const screen = routes[parseUrl] ? routes[parseUrl] : "Error404Screen";

  if(screen=="loadBody"){

    fetchInfo();

  }

  else if(screen=="loadProduct"){

    const request=parseRequestUrl();
    fetchProductData(request.id);
    
  }
  else if(screen=="cartItems"){

    
    // cartItems();
    const request=parseRequestUrl();
    fetchCartData(request.id);
  
    
  }
  else if(screen =="signInPage"){
    var main= document.getElementById("container-main");
   main.innerHTML=signIn();

  }
  else{
    var main= document.getElementById("container-main");
   main.innerHTML=errorScreen404();
    
      
    }


 }
 



//************************************loadBody-homescreen************************************************** */
function fetchInfo() {
  fetch('http://127.0.0.1:500/getproducts')
  .then(response => response.json())
  .then(jsonobj=> bodyload(jsonobj))   //the param is jsonobj but it contains prodcuts info
 
  
}

function bodyload(products){
  var cardsDeck=document.getElementById("cardDeck");
            
  
  products.map(function (product) {
      var cards= document.createElement("div");
      cards.className="cards";
      var cardsheader= document.createElement("div");
      cardsheader.className="cards-header";
      var anchor= document.createElement("a");
      anchor.href="/#/product/"+product._id;
      var images=document.createElement("img");
      images.src=product.image;
      images.alt=product.name;
      anchor.appendChild(images);
                
                cardsDeck.appendChild(cards);
                cards.appendChild(cardsheader);
                cardsheader.appendChild(anchor);
                cardsheader.appendChild(images);
  
                var cardsbody= document.createElement("div");
                cardsbody.className="cards-body";
                var anchor1= document.createElement("a");
                anchor1.href='/#/product/'+product._id;
                
                anchor1.innerHTML=product.name;
                cards.appendChild(cardsbody);
                cardsbody.appendChild(anchor1);

                var productRatingElement=rating(product.rating);
                cardsbody.appendChild(productRatingElement);

  
                var cardsbody2= document.createElement("div");
                cardsbody2.className="cards-body2";
                cardsbody2.innerHTML= product.brand;
                cards.appendChild(cardsbody2);
  
  
                var cardfooter= document.createElement("div");
                cardfooter.className="cards-footer";
                cardfooter.innerHTML= "$"+`${product.price}`;
                cards.appendChild(cardfooter);
  
            })
  
  
  }  


//***************************************loadProduct******************************************************************** */
function fetchProductData(id) {
  fetch('http://127.0.0.1:500/getproduct/'+id)
  .then(response => response.json())
  .then(jsonobj2=> productLoad(jsonobj2))   //the param is jsonobj but it contains prodcuts info

}
function productLoad(params) {
//  console.log(params);
 var main= document.getElementById("container-main");
 main.innerHTML=renderProduct(params);
 
}
function renderProduct(product) {
  
  return(`
  <div class="container-fluid">
    <div class="row p-3">
      <div class="col-lg-5 p-5" >
        <img id="image-id" src="${product.image}" alt="${product.name}"></img>
        
        <div class="back-to-result">
          <a href="/">back to products </a>
        </div>

       </div>
      <div class="col-lg-6 p-5">
        <ul id="unorderedlist">
         <li>
         <b><font face="sans-serif" color="blue" size="4">${product.name}</font></b>
          
         </li>
         <li id="hi">
        
        <font face="arial" color="gray">
          <span id="rating">${product.rating} <span class="fa fa-star"></span> </span> 
          &#160; ${product.numReviews}   Reviews
        </font>
          
         </li>
         <div>
         <font face="arial" size="5">
          <b>
              $ ${product.price-(0.1*(product.price))} 
          </b>
         </font>
         <br>
         <font color="gray" face="arial">
            <strike>$ ${product.price} </strike>
         </font>
         <font color="green" face="arial">
            10% Off
         </font>
         <br>
        
     </div>

         <li>
         Status : 
                  ${
                    product.countInStock > 0
                      ? `<span class="available">In Stock</span>`
                      : `<span class="unavailable">Unavailable</span>`
                  }
        
         </font>


         </li>

         <li>
         <button onclick="addToCart()" type="button" class="btn btn-primary btn-lg btn-block"> <span class="fa fa-shopping-cart"></span> Add to Cart</button>

         </li>
          
          
      </ul>
                   
      </div>
     
    </div>
  </div>
    `
  )

  
}



//****************************************cartItems***********************************************************

function addToCart() {

  const request= parseRequestUrl();
  document.location.hash=`/viewcart/${request.id}`;

  
}

function fetchCartData(id) {
  fetch('http://127.0.0.1:500/getproduct/'+id)
  .then(response => response.json())
  .then(jsonobj2=> cartItems(jsonobj2))   //the param is jsonobj but it contains prodcuts info

}
var cartArray=[];

function cartItems(product) { 
  
  var retrievedData = localStorage.getItem("cartLocal");
  var found= false;
  if(retrievedData!=null){
      cartArray = JSON.parse(retrievedData);
      found = cartArray.find(function(element, index) {
        if(element.productID ===product._id)
        return true;
      });
  }
  if(!found){

      cartArray.push({productID: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      qty: 1
    })
    localStorage.setItem("cartLocal", JSON.stringify(cartArray));
    
   }

if(cartArray !=null){
  var main= document.getElementById("container-main");
    main.innerHTML=renderCart();

}

  
}

function updateQty(obj){
    for (var item of cartArray){
      if(obj.id===item.productID){
        item.qty=parseInt(obj.value);//updating quantity
        localStorage.setItem("cartLocal", JSON.stringify(cartArray));
        var main= document.getElementById("container-main");
        main.innerHTML=renderCart();
      }

    }
   
  

  }


  function deleteItem(obj){
    console.log("hit");
    for(var [index,item] of cartArray.entries()){
      if(obj.id==item.productID){
        cartArray.splice(index,1);
        localStorage.setItem("cartLocal", JSON.stringify(cartArray));


      }
    }
    var main= document.getElementById("container-main");
    main.innerHTML=renderCart();

  }

function renderCart() {

  var total=cartArray.reduce(function (accumulator, item) {
    return accumulator + (item.price*item.qty);
  }, 0)
  var noOfItems=cartArray.reduce(function (accumulator, item) {
    return accumulator + item.qty;
  }, 0)

  
  
  return(`
  <div class="container-fluid mt-2">
  <div class="row">
    <div class="col-lg-8">
    ${
      cartArray.length===0 ? '<div>Cart is empty. <a href="/">Shop items</a>'
      :`<table class="table table-hover" id="tabledisplay">
      <thead>
          <tr>
              <th>My Cart Items</th>
              <th></th>
           
              <th>Price</th>
             
          </tr>
      </thead>
      <tbody>

      
      
      ${cartArray.map(productItem =>

        
        `<tr>
        
          <td> <img src=" ${productItem.image}" width="75" height="75"> </td>
          <td>
          <table border="0" id="tablecart">
  <tr><a href="/#/product/${productItem.productID}"> ${productItem.name} </a>  </tr>
  <tr>
    <td>
    <select onchange="updateQty(this)" class="custom-select qty-sel" id="${productItem.productID}" >       
           
    ${
      [...Array(productItem.countInStock).keys()].map(index=> (index+1 ===productItem.qty) ?
        ` <option selected value="${index+1}" >${index+1} </option>` : ` <option  value="${index+1}" >${index+1} </option>`)
    }
            
            
          </select>
        
          
        
          </td>
    <td>
    <button onclick="deleteItem(this)" class="btn  btn-danger" id="${productItem.productID}"> Remove </button>
    </td>  
  </tr>
  </table>
          
</td>
          
          <td> $${productItem.price*productItem.qty} </td>

        </tr>

        `)}
        </tbody>
   </table>`
    
    }

    </div>
     
    <div class="col-lg-4">
    <table class="table" border="0" id="placeOrdertab">
  <thead>
    <tr>
      <th>PRICE DETAILS</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>price (${noOfItems} items) </td>
      <td>$${total}</td>
      
    </tr>
    <tr>
      <td colspan="2"> <button class="btn btn-info btn-block">PLACE ORDER  </button></td>
      
    </tr>
   
  
  </tbody>
</table>

  


    </div>
  <div>
  </div>
  

  `.replace(/,/g, ' '))
  
}

//************************************************sign-in screen************************* */
function logSubmit(event) {
  
  event.preventDefault();
  const userName = document.getElementById("username").value;
  const password =  document.getElementById("password").value;
  const data = {
     email: userName,
     password:password
  }
  fetch('http://127.0.0.1:500/user/signin', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
  .then(response => response.json())
  .then(data => { login(data)})
  .catch((error) => {
  console.error('Error:', error);
});


}

function login(data){
  if(data.message){
    alert(data.message);
  }
  else{
    console.log('Success:', data)
    location.href='/';
    



  }
  
}
function signIn(){
  return(`
  <div class="container">
	<div class="d-flex justify-content-center h-100">
		<div class="card bg-primary">
			<div class="card-header">
				<h3>Sign In</h3>
				
			</div>
			<div class="card-body">
				<form onsubmit="logSubmit(event)">
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fas fa-user"></i></span>
						</div>
						<input type="text" class="form-control" placeholder="useremail" id="username">
						
					</div>
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fas fa-key"></i></span>
						</div>
						<input type="password" class="form-control" placeholder="password" id="password" >
					</div>
					<div class="row align-items-center remember">
						<input type="checkbox">Remember Me
					</div>
					<div class="form-group">
						
        
          <input type="submit" value="Login" class="btn  btn-block btn-success mt-3">
     
					</div>
				</form>
			</div>
			<div class="card-footer">
				<div class="d-flex justify-content-center links">
					Don't have an account?<a href="/#/register">Sign Up</a>
				</div>
				<div class="d-flex justify-content-center links2">
					<a href="#">Forgot your password?</a>
				</div>
			</div>
		</div>
	</div>
</div>
  
  `)
}

//*************************************Errorscreen***************************************************************** */
function errorScreen404() {
  return(`
    <div> Page not found</div>
    `)
  
}


//*******************************************ratingComponent************************************************** */
function rating(productRatings) {
  var productRatingElement=document.createElement("div");
  var span1 =document.createElement("span");
  var span2 =document.createElement("span");
  var span3 =document.createElement("span");
  var span4 =document.createElement("span");
  var span5 =document.createElement("span");
 
  span1.className=(productRatings>=1)?('fa fa-star checked') :((productRatings>=0.5) ? ('fa fa-star-half-full checked') : ('fa fa-star' ));
  span2.className=(productRatings>=2)?('fa fa-star checked') :((productRatings>=1.5) ? ('fa fa-star-half-full checked') : ('fa fa-star' ));
  span3.className=(productRatings>=3)?('fa fa-star checked') :((productRatings>=2.5) ? ('fa fa-star-half-full checked') : ('fa fa-star' ));
  span4.className=(productRatings>=4)?('fa fa-star checked') :((productRatings>=3.5) ? ('fa fa-star-half-full checked') : ('fa fa-star' ));
  span5.className=(productRatings>=5)?('fa fa-star checked') :((productRatings>=4.5) ? ('fa fa-star-half-full checked') : ('fa fa-star' ));
 
   productRatingElement.appendChild(span1);
   productRatingElement.appendChild(span2);
   productRatingElement.appendChild(span3);
   productRatingElement.appendChild(span4);
   productRatingElement.appendChild(span5);
 return productRatingElement;
}






//**********************EveentListeners*********************************** */
document.addEventListener("load",router());
window.addEventListener("hashchange",router);
// document.getElementById("cartBtn").addEventListener("click",addToCart);
