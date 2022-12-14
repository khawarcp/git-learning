const product = JSON.parse(document.querySelector('#product-json').textContent);
const productVariants = JSON.parse(document.querySelector('#product-variants-json').textContent);


document.querySelectorAll('.product-button input[type=radio]').forEach((radio) => {

    radio.addEventListener('change', () => {
        let selectionOptions = [];        
    
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

        document.querySelectorAll('.master-select .select__select option').forEach((variant) => {

          let variantTitle = variant.dataset.title;
          let variantText = variant.innerText;
          // console.log(variant.value);
          selectionOptions = selectionOptions.toString().replace(',', ' / ');
          console.log(variantTitle);
          
          console.log(matchedVariant.title);

          if(variantText.includes(matchedVariant.title)){
            // console.log(variant.value)            
            
          }

        })
      
    })
})
