const product = JSON.parse(document.querySelector('#product-json').textContent);
const productVariants = JSON.parse(document.querySelector('#product-variants-json').textContent);


document.querySelectorAll('.product-button input[type=radio]').forEach((radio) => {

    radio.addEventListener('change', () => {
        let selectionOptions = [];        
                radio.closest('.single-value').nextElementSibling.firstElementChild.removeAttribute('checked')
          
      radio.setAttribute('checked', 'checked');
        document.querySelectorAll('.product-button input[type=radio]:checked').forEach((radio) => {
          selectionOptions.push(radio.value);  
          
        })        
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
         
      
    })
})
