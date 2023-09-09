(function ($) {
    "use strict";


})(jQuery);

let active = 'all';

function showProduct(element) {
    element.style.display = 'initial';
    element.style.transition = '0.3s';
    setTimeout(() => element.style.opacity = '1.0', 100);
    setTimeout(() => element.style.transition = 'none', 310);
}

function hideProduct(element) {
    element.style.transition = '0.3s';
    element.style.opacity = '0';
    setTimeout(() => {
        element.style.transition = 'none';
        element.style.display = 'none';
    }, 300);
}

function switchCategory(category='all', button) {
    if(category === active) return;
    document.querySelector('.cherry.category-buttons>.active').classList.remove('active');
    active = category;
    if(category === 'all') {
        const products = document.querySelectorAll('.ctg');
        for(let i = 0; i < products.length; i++) showProduct(products[i]);
    } else {
        const productsShow = document.querySelectorAll(`.ctg.ctg-${category}`);
        for(let i = 0; i < productsShow.length; i++) showProduct(productsShow[i]);
        const productsHide = document.querySelectorAll(`.ctg:not(.ctg-${category})`);
        for(let i = 0; i < productsHide.length; i++) hideProduct(productsHide[i]);
    }
    button.classList.add('active');
}

function buyProduct(name='Não definido', mp='', pp='') {
    document.getElementById('buy-modal-title').innerText = name;
    document.getElementById('buy-modal-link').href = mp;
    $('#buy-modal').modal();
}