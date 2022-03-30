let productNameInput = document.getElementById('productName'); // el variable da shayl el input kolo msh elvalue
let productPriceInput = document.getElementById('productPrice');
let productCategoryInput = document.getElementById('productCategory');
let productDescInput = document.getElementById('productDesc');
let productsContainer;
let productUpdateIndex = null // null protoype will change in update funtion;    // let mainBtn = document.getElementById('btn') //hna lma 7tetto fe vaiable w fe el update 7tet esm el varibale.innerHTML 


if (localStorage.getItem('products') == null) {
  productsContainer = [];
} else {
  productsContainer = JSON.parse(localStorage.getItem('products'))
  dispayProduct(productsContainer)
}

function addProduct() {
  if (validateProductName() == true && validateProductPrice() == true) 
  {
    if (document.getElementById('btn').innerHTML == "add product") {
      let product =
      {
        name: productNameInput.value,
        price: productPriceInput.value,
        cetegory: productCategoryInput.value,
        desc: productDescInput.value
      }
      productsContainer.push(product);
      localStorage.setItem("products", JSON.stringify(productsContainer))
      dispayProduct(productsContainer);
      clearForm()
    }
    else 
    {
      update()
    }
  }else
  {
    alert("not valid")
  }
 
}


function dispayProduct(productList) {
  let cartoona = ``
  for (let i = 0; i < productList.length; i++) {
    cartoona +=
      `
    <tr>
    <td>${i}</td>
    <td>${productList[i].name}</td>
    <td>${productList[i].price}</td>
    <td>${productList[i].cetegory}</td>
    <td>${productList[i].desc}</td>
    <td><button class="btn btn-warning" onclick="updateProduct(${i})">Update</button></td>
    <td><button class="btn btn-danger" onclick="deleteProduct(${i})" >Delete</button></td>
    </tr>
    `
  }
  document.getElementById('tableRow').innerHTML = cartoona;
}

function deleteProduct(productIndex) {
  productsContainer.splice(productIndex, 1)
  localStorage.setItem("products", JSON.stringify(productsContainer))
  dispayProduct(productsContainer)
}

function clearForm() {
  productNameInput.value = ""
  productPriceInput.value = ""
  productCategoryInput.value = ""
  productDescInput.value = ""
}
console.log(productUpdateIndex);
function updateProduct(index) {
  productNameInput.value = productsContainer[index].name
  productPriceInput.value = productsContainer[index].price
  productCategoryInput.value = productsContainer[index].cetegory
  productDescInput.value = productsContainer[index].desc
  document.getElementById('btn').innerHTML = "Update Product"
  productUpdateIndex = index
  console.log(productUpdateIndex);

}
function update() {
  productsContainer[productUpdateIndex].name = productNameInput.value
  productsContainer[productUpdateIndex].price = productPriceInput.value
  productsContainer[productUpdateIndex].cetegory = productCategoryInput.value
  productsContainer[productUpdateIndex].desc = productDescInput.value
  dispayProduct(productsContainer)
  document.getElementById('btn').innerHTML = "add product"
  
}

// function updateProducts(index) 
// {
//   let productUpdate = index;
//   let product =
//   {
//     name: productNameInput.value,
//     price: productPriceInput.value,
//     cetegory: productCategoryInput.value,
//     desc: productDescInput.value
//   }
//   productsContainer.splice(productUpdate,1, product);
//   localStorage.setItem("products", JSON.stringify(productsContainer))
//   dispayProduct(productsContainer);
//   clearForm()
//   document.getElementById('btn').innerHTML = "add product"
// }


function searchProducts(term) 
{
  let searchProducts = []
  for (let i = 0; i < productsContainer.length; i++) 
  {
    if (productsContainer[i].name.toLowerCase().includes(term.toLowerCase())) 
    {
      searchProducts.push(productsContainer[i])
    }
    dispayProduct(searchProducts)
  }
}
function validateProductName() 
{
  var regex = /^[A-Z][a-z]{3,8}$/
  if (regex.test(productNameInput.value) ) 
  {
    return true ;
  }else
  {
    return false ;
  }
}
function validateProductPrice() 
{
  var regex = /^\d{1,20}$/
  if (regex.test(productPriceInput.value) ) 
  {
    return true ;
  }else
  {
    return false ;
  }
}
