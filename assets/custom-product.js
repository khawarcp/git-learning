const product = JSON.parse(document.querySelector('#product-json').textContent);

document.querySelectorAll('.product-button input[type=radio]').forEach((radio) => {

   
  
    radio.addEventListener('change', () => {
        let selectionOptions = [];    
      
        //pushing the checked inputs into the selectedOption Array
        document.querySelectorAll('.product-button input[type=radio]:checked').forEach((radio) => {      
          selectionOptions.push(radio.value);                
        })        
          
        //finding the matched variant from variants of selected options
        let matchedVariant = product.variants.find((variant) => {
          let pass = true;                    
          for(let i=0; i < selectionOptions.length; i++){                        
            if(selectionOptions.indexOf(variant.options[i]) === -1){
              pass = false;
              break;
            }            
          }
          return pass;
        })

        //add matched quantity to input name=id
        document.getElementById('product-id').value = matchedVariant.id;          
        

        //matchvariant id from master select variant id      
        document.querySelectorAll('.master-select .select__select option').forEach((variant) => {          
          variant.removeAttribute('selected');
          if(variant.value == matchedVariant.id){            
            variant.setAttribute('selected', 'selected');
            document.getElementById('product-id').dataset.quantity = variant.dataset.quantityvariant;             
          }          
        })

        //add to cart button inventory enable disable
        let add_to_cart = document.getElementById('add-cart-btn');        
        if(matchedVariant.available){
          add_to_cart.textContent = 'Add to Cart';
          add_to_cart.disabled = false;
        }else{
          add_to_cart.textContent = 'Out of Stock';
          add_to_cart.disabled = true;
        }

        //change the featured image using variant change
        if(matchedVariant.featured_image){
          document.getElementById('product-image').setAttribute('src', matchedVariant.featured_image.src);
        }
      
    })
})


//increment quantity
document.getElementById('quant-plus').addEventListener('click', () => {
    let currentVal = Number(document.getElementById('quantity').value);
    document.getElementById('quantity').value = currentVal+1;
})

//decrement quantity
document.getElementById('quant-minus').addEventListener('click', () => {
    let currentVal = Number(document.getElementById('quantity').value);
    if(currentVal > 1){
      document.getElementById('quantity').value = currentVal-1;
    }      
})


//Change product featurd image using thumbails
document.querySelectorAll('.product-images-thumbs li').forEach((item) => {
    item.addEventListener('click', () => {
        document.querySelector('.product-images-thumbs li.selected').classList.remove('selected');
        item.classList.add('selected');
        document.getElementById('product-image').setAttribute('src', item.querySelector('img').getAttribute('src'))
    })    
})


// add to cart ajax fetech api
let add_btn = document.getElementById('add-cart-btn');
add_btn.addEventListener('click', (e) => {
    e.preventDefault();
    let addToCart = document.getElementById('product-form')
    let formData = new FormData(addToCart);
    
    fetch(window.Shopify.routes.root + 'cart/add.js', {
         method : 'POST',
            body : formData    
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        document.getElementById('add-cart-btn').textContent = 'Item added to cart';
        document.getElementById('cart-notification').classList.add('animate', 'active');
        console.log(data);
        // cart counter update
        fetch(window.Shopify.routes.root + 'cart.js')
          .then(response => response.json())
          .then((cart) => {
            console.log(cart) 
              console.log(cart.item_count)  
            if(cart.item_count > 1){
                document.querySelector('.cart-count-bubble span').textContent = cart.item_count;    
            }else{
                let divSpan = document.createElement('div');
                divSpan.setAttribute('class', 'cart-count-bubble');
                divSpan.insertAdjacentHTML('afterbegin', `<span aria-hidden="true">${cart.item_count}</span>`);
                document.getElementById('cart-icon-bubble').appendChild(divSpan);                
            }
            
          });
        console.log('item added to the cart');
    })
    .catch((error) => {
      console.error('Error:', error);
    });    
});


// Extra Work create the json at html and loop through it
let product_variants = JSON.parse(document.getElementById('product-variant-json').textContent);
product_variants.variants.forEach((item) => {
    console.log(item.var_id, item.var_price, item.var_compare_at_price, var_quantity);
});
