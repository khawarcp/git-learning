const product = JSON.parse(document.querySelector('#product-json').textContent);
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

        console.log(matchedVariant);
      
    })
})
