const product = JSON.parse(document.querySelector('#product-json').textContent);

document.querySelectorAll('.product-button input[type=radio]').forEach((radio) => {

   
  
    radio.addEventListener('change', () => {
        let selectionOptions = [];    

         // radio.removeAttribute('checked');
    
      
        //pushing the checked inputs into the selectedOption Array
        document.querySelectorAll('.product-button input[type=radio]:checked').forEach((radio) => {      
          selectionOptions.push(radio.value);      
          console.log(radio);
          // radio.setAttribute('checked', 'checked');
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
