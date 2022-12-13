const product = JSON.parse(document.querySelector('#product-json').textContent);
document.querySelectorAll('.product-button input[type=radio]').forEach((radio) => {
    radio.addEventListener('change', () => {
        const selectionOptions = [];
        document.querySelectorAll('.product-button input[type=radio]:checked').forEach((radio) => {
          selectionOptions.push(radio.value);
        })        
        console.log(selectionOptions)
    })
})
