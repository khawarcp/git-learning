const product = JSON.parse(document.querySelector('#product-json').textContent);
document.querySelectorAll('.product-button input[type=radio]').forEach((radio) => {
    radio.addEventListener('change', () => {
        console.log(radio.value)
    })
})
