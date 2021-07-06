// // import data  from "../data.js";

// // var obj = { // does not create a new scope
// //     i: 10,
// //     b: () => console.log(this.i, this),
// //     c: function() {
// //       console.log(this.i, this);
// //     }
// //   }

// products: [
//     {
//       _id: '111111111111111111111111',
//       name: 'Hiskywin Full Zip Running Shirts Thermal Workout',
//       category: 'Shirts',
//       image: '../images/product-1.jpg',
//       price: 59,
//       brand: 'Hiskywin',
//       rating: 4.5,
//       numReviews: 10,
//       countInStock: 6,
//     },
//     {
//       _id: '2',
//       name: 'Nike Full-Zip Hoodie Mens Workout Sweatshirt',
//       category: 'Shirts',
//       image: '../images/product-2.jpg',
//       price: 70,
//       brand: 'Nike',
//       rating: 5,
//       numReviews: 51,
//     },
//     {
//       _id: '3',
//       name: 'Adidas Mens Long Sleeve Hoodie',
//       category: 'Shirts',
//       image: '../images/product-3.jpg',
//       price: 59,
//       brand: 'Adidas',
//       rating: 4,
//       numReviews: 45,
//     },
//     {
//       _id: '4',
//       name: 'Under Armour Mens Sportstyle Tricot Joggers',
//       category: 'Pants',
//       image: '../images/product-4.jpg',
//       price: 90,
//       brand: 'Under Armour',
//       rating: 2.5,
//       numReviews: 198,
//       countInStock: 6,
//     },
//     {
//       _id: '5',
//       name: 'Champion Mens Graphic Powerblend Fleece Jogger',
//       category: 'Pants',
//       image: '../images/product-5.jpg',
//       price: 119,
//       brand: 'Champion',
//       rating: 3.5,
//       numReviews: 89,
//       countInStock: 6,
//     },
//     {
//       _id: '6',
//       name: 'Aelfric Eden Mens Joggers Pants Long Multi-Pockets',
//       category: 'Pants',
//       image: '../images/product-6.jpg',
//       price: 85,
//       brand: 'Aelfric Eden',
//       rating: 4.5,
//       numReviews: 45,
//       countInStock: 6,
//     },
//   ]

// function bodyload(){
//     const {products}=data;


        
        
      
//           var cardsDeck=document.createElement("div");
//           cardsDeck.className="cards-deck";

//           products.map(function (product) {
//               var cards= document.createElement("div");
//               cards.className="cards";
//               var cardsheader= document.createElement("div");
//               cardsheader.className="cards-header";
//               var anchor= document.createElement("a");
//               anchor.href=`/#/product/${product._id}`;
//               var images=document.createElement("img");
//             //   images.src=product.image;
//             //   images.alt=product.name;
              
//               cardsDeck.appendChild(cards);
//               cards.appendChild(cardsheader);
//               cardsheader.appendChild(anchor);
//               cardsheader.appendChild(images);

//               var cardsbody= document.createElement("div");
//               cardsbody.className="cards-body";
//               var anchor1= document.createElement("a");
//               anchor1.href=`/#/product/1`;
//               anchor1.innerHTML=product.name;
//               cards.appendChild(cardsbody);
//               cardsbody.appendChild(anchor1);


//               var cardsbody2= document.createElement("div");
//               cardsbody2.className="cards-body2";
//               cardsbody2.innerHTML= product.brand;
//               cards.appendChild(cardsbody2);


//               var cardfooter= document.createElement("div");
//               cardfooter.className="cards-footer";
//               cardfooter.innerHTML= product.brand;
//               cards.appendChild(cardfooter);

//           })


// }  
// // export default bodyload;    
// // const HomeLayout={
    
         
// //     onScreen:()=>{
// //         const {products}=data;


        
        
      
// //           var cardsDeck=document.createElement("div");
// //           cardsDeck.className="cards-deck";

// //           products.map(function (product) {
// //               var cards= document.createElement("div");
// //               cards.className="cards";
// //               var cardsheader= document.createElement("div");
// //               cardsheader.className="cards-header";
// //               var anchor= document.createElement("a");
// //               anchor.href=`/#/product/${product._id}`;
// //               var images=document.createElement("img");
// //             //   images.src=product.image;
// //             //   images.alt=product.name;
              
// //               cardsDeck.appendChild(cards);
// //               cards.appendChild(cardsheader);
// //               cardsheader.appendChild(anchor);
// //               cardsheader.appendChild(images);

// //               var cardsbody= document.createElement("div");
// //               cardsbody.className="cards-body";
// //               var anchor1= document.createElement("a");
// //               anchor1.href=`/#/product/1`;
// //               anchor1.innerHTML=product.name;
// //               cards.appendChild(cardsbody);
// //               cardsbody.appendChild(anchor1);


// //               var cardsbody2= document.createElement("div");
// //               cardsbody2.className="cards-body2";
// //               cardsbody2.innerHTML= product.brand;
// //               cards.appendChild(cardsbody2);


// //               var cardfooter= document.createElement("div");
// //               cardfooter.className="cards-footer";
// //               cardfooter.innerHTML= product.brand;
// //               cards.appendChild(cardfooter);







              
// //           })
// //         }
// //     };


  
// //            (products).map(function(product){

// //             ` <div class="cards">
// //                     <div class="cards-header">
// //                        <a href="/#/product/${product._id}">
// //                         <img src="${product.image}" alt="${product.name}"> 
    
// //                        </a> 
// //                     </div>

// //                     <div class="cards-body">
// //                         <a href="/#/product/1">
// //                             ${product.name}
// //                        </a>
// //                     </div>
// //                     <div class="cards-body2">
// //                             ${product.brand}
// //                     </div>
// //                     <div class="cards-footer">
// //                         $${product.price}
                     
// //                     </div>
                
// //                 })
               

// //      }
// //   };
     
         
// //   export default HomeLayout;































// //   const HomeLayout={
    
         
// //     onScreen:()=>{
// //         const {products}=data;


        
        
// //           return `
// //           <div class="cards-deck">
// //            ${(products).map(function(product){

// //             ` <div class="cards">
// //                     <div class="cards-header">
// //                        <a href="/#/product/${product._id}">
// //                         <img src="${product.image}" alt="${product.name}"> 
    
// //                        </a> 
// //                     </div>

// //                     <div class="cards-body">
// //                         <a href="/#/product/1">
// //                             ${product.name}
// //                        </a>
// //                     </div>
// //                     <div class="cards-body2">
// //                             ${product.brand}
// //                     </div>
// //                     <div class="cards-footer">
// //                         $${product.price}
                     
// //                     </div>
                
// //                 `})}
// //                `

// //       }
// //   };

// //   export default HomeLayout;
