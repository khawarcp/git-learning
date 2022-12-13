const product = JSON.parse(document.querySelector('#product-json').textContent);
document.querySelectorAll('.product-button input[type=radio]').forEach((radio) => {
    radio.addEventListener('change', () => {
        let selectionOptions = [];
        document.querySelectorAll('.product-button input[type=radio]:checked').forEach((radio) => {
          selectionOptions.push(radio.value);
        })        
        // var matchedVariant = product.variants.find((variant) => {
        //   var pass = true;
        //   for(var i=0; i < selectionOptions.lenght; i++){
        //     if(selectionOptions.indexOf(variant.options[i]) === -1){
        //       pass = false;
        //       break;
        //     }
        //   }
        //   return pass;
        // })

        console.log(selectionOptions);
      
    })
})
