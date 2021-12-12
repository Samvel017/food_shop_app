import signIn from './scripts/signin.js';
import alertMess from './scripts/alert.js';
import categoryFunc from './scripts/categories/meat.js';
import location from './scripts/location.js';

signIn();
let loc = document.querySelector('.location');
location(loc);
let btnLoading = document.querySelector('.btn_loading');
let heart = document.querySelector('.heart');
let cart = document.querySelector('.cart');
let countHeart = document.querySelector('.countHeart');
let countBag = document.querySelector('.countBag');
let cont = document.querySelector('.container');
let priceResult = document.querySelector('.priceResult');
let price = 0;
let heartArr = [];
let cartArr = [];

function reqUrl(type, appendBlock, bool = 'false') {
  const baseURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${type}&app_id=ada0f029&app_key=0710b882a14596c936a8d17857916c5a&random=${bool}`;
  fetch(baseURL)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      let arr = json.hits.map((key) => {
        return key.recipe;
      });
      console.log(arr, type);
      arr.forEach((elem) => {
        let randPrice = Math.ceil(Math.random() * 15);
        elem.price = randPrice;
        let block = document.createElement('div');
        block.classList.add('tab-block');
        block.innerHTML = `
        <img src="${elem.image}" alt=""/>
        <div class="tab-content">
          <h3>${elem.label}</h3>
          <h4>Price: ${elem.price}$</h4>
          <button class="btnHeart"><i class="fas fa-heart"></i></button>
          <button class="btnCart"><i class="fas fa-shopping-cart"></i></button>
        </div>
      `;
        let btnHeart = block.querySelector('.btnHeart');
        let btnCart = block.querySelector('.btnCart');

        btnHeart.addEventListener('click', () => {
          heartArr.push(elem);
          countHeart.innerHTML = `${heartArr.length}`;
          alertMess('liked');
          console.log(heartArr);
        });
        btnCart.addEventListener('click', () => {
          cartArr.push(elem);
          price = 0;
          cartArr.forEach((el) => {
            price += el.price;
          });
          priceResult.innerHTML = `$${price}.00`;
          countBag.innerHTML = `${cartArr.length}`;
          alertMess('cart');
          console.log(cartArr);
        });

        appendBlock.append(block);
      });
    })
    .catch((err) => {
      console.error(err);
    });
}
// reqUrl('meat');

// cake
// sandwich
// pizza
// vegetables
// fruit
// fish
// salad
// fresh meat

// -------------- Department Button ------------------

const ANIMATION_DURATION = 200;
let dep = document.querySelector('.department');
let movingMenu = document.querySelector('.category-bottom');
let btnRotate = document.querySelector('.department > .fa-chevron-down');
dep.addEventListener('click', () => {
  if (dep.classList.contains('active')) {
    btnRotate.classList.toggle('btnRotate');
    dep.classList.toggle('active');
    movingMenu.classList.toggle('active-tab');
    setTimeout(() => {
      movingMenu.style.position = 'absolute';
    }, ANIMATION_DURATION);
  } else {
    movingMenu.style.position = 'relative';
    btnRotate.classList.toggle('btnRotate');
    dep.classList.toggle('active');
    movingMenu.classList.toggle('active-tab');
  }
});

let searchResult = document.querySelector('.search-result');
let categoryNavs = document.querySelectorAll('.categoryNav');

categoryNavs.forEach((el) => {
  el.addEventListener('click', (event) => {
    let blocks = searchResult.querySelectorAll('.tab-block');
    blocks.forEach((e) => e.remove());
    let type = event.target.getAttribute('data-type');
    categoryFunc(
      type,
      searchResult,
      heartArr,
      cartArr,
      countHeart,
      countBag,
      price,
      alertMess,
      priceResult
    );
  });
});

// -------------------------------------------------------
// -------------------- TAB-MENU -------------------------
let tabPages = document.querySelector('.tab-pages');
let tabButtons = document.querySelectorAll('.tab-btn');
reqUrl('all', tabPages);
tabButtons.forEach((e) => {
  e.addEventListener('click', () => {
    let childs = tabPages.querySelectorAll('.tab-block');
    childs.forEach((el) => {
      el.remove();
    });
    tabButtons.forEach((e) => {
      e.classList.remove('active-tab');
    });
    let type = e.getAttribute('data-tab');
    reqUrl(type, tabPages, false);
    e.classList.add('active-tab');
  });
});

// -------------------------------------------------------

// -------------- MODALS -------------------

let modalHeartBg = document.querySelector('.modalHeartBg');
let modalCartBg = document.querySelector('.modalCartBg');

// -----------------------------------------

// ------------------------- HEART, CART -------------------

heart.addEventListener('click', () => {
  modalHeartBg.classList.add('open-modal');
  modalHeartBg.lastElementChild.innerHTML = '';
  if (heartArr != '') {
    heartArr.forEach((el) => {
      let block = document.createElement('div');
      block.classList.add('tab-block');
      block.innerHTML = `
        <img src="${el.image}" alt=""/>
        <div class="tab-content">
          <h3>${el.label}</h3>
          <h4>Price: ${el.price}$</h4>
          <button class="btnCart"><i class="fas fa-shopping-cart"></i></button>
          <button class="btnRemove"><i class="fas fa-times"></i></button>
        </div>
      `;
      let btnRemove = block.querySelector('.btnRemove');
      let btnCart = block.querySelector('.btnCart');
      btnCart.addEventListener('click', () => {
        cartArr.push(el);
        console.log(price);
        price = 0;
        cartArr.forEach((el) => {
          price += el.price;
        });
        priceResult.innerHTML = `$${price}.00`;
        alertMess('cart');
        countBag.innerHTML = `${cartArr.length}`;
      });
      btnRemove.addEventListener('click', () => {
        let index = heartArr.indexOf(el);
        if (index != '-1') {
          heartArr.splice(index, 1);
        }
        block.remove();
        countHeart.innerHTML = `${heartArr.length}`;
      });
      modalHeartBg.lastElementChild.append(block);
    });
  } else {
    modalHeartBg.lastElementChild.innerHTML = 'No liked products.';
  }
});

cart.addEventListener('click', () => {
  modalCartBg.classList.add('open-modal');
  modalCartBg.lastElementChild.innerHTML = '';
  if (cartArr != '') {
    cartArr.forEach((el) => {
      price = 0;
      cartArr.forEach((elem) => {
        price += elem.price;
      });
      let block = document.createElement('div');
      block.classList.add('tab-block');
      block.innerHTML = `
        <img src="${el.image}" alt=""/>
        <div class="tab-content">
          <h3>${el.label}</h3>
          <h4>Price: ${el.price}$</h4>
          <button class="btnRemove"><i class="fas fa-times"></i></button>
        </div>
      `;
      let btnRemove = block.querySelector('.btnRemove');
      btnRemove.addEventListener('click', () => {
        console.log(price);
        price -= el.price;

        priceResult.innerHTML = `$${price}.00`;
        let index = cartArr.indexOf(el);
        if (index != '-1') {
          cartArr.splice(index, 1);
        }
        block.remove();
        countBag.innerHTML = `${cartArr.length}`;
      });
      modalCartBg.lastElementChild.append(block);
    });
  } else {
    modalCartBg.lastElementChild.innerHTML = 'Cart is empty.';
  }
});

modalHeartBg.addEventListener('click', (e) => {
  if (e.target == modalHeartBg && e.target != modalHeartBg.lastElementChild) {
    modalHeartBg.classList.remove('open-modal');
  }
});
modalCartBg.addEventListener('click', (e) => {
  if (e.target == modalCartBg && e.target != modalCartBg.lastElementChild) {
    modalCartBg.classList.remove('open-modal');
  }
});

// ----------------------------------------------------------

// let aTags = document.querySelectorAll('a');
// aTags.forEach((a) => {
//   a.addEventListener('click', (event) => {
//     event.preventDefault();
//   });
// });

// ---------------------- SEARCH ---------------------------

let btnSearch = document.querySelector('#btnSearch');
let searchUsers = document.querySelector('#search-users');
let searchVal;

searchUsers.addEventListener('keyup', (e) => {
  if (e.keyCode == '13') {
    btnSearch.click();
  }
});
btnSearch.addEventListener('click', function () {
  let promise = new Promise((resolve, reject) => {
    let blocks = searchResult.querySelectorAll('.tab-block');
    blocks.forEach((e) => e.remove());
    btnLoading.classList.remove('hide');
    setTimeout(() => {
      btnLoading.classList.add('hide');
      resolve(btnLoading);
    }, 2500);
  }).then((btnLoading) => {
    searchVal = searchUsers.value.toLowerCase();
    console.log(searchVal);

    if (searchVal != '') {
      reqUrl(searchVal, searchResult, true);
    }
  });
});

// ---------------------------------------------------------

// ------------------- CONFIRM PURCHASE -----------------

let confirm = document.querySelector('#confirm');

confirm.addEventListener('click', () => {
  if (cartArr != '') {
    price = 0;
  cartArr = [];
  countBag.innerHTML = `${cartArr.length}`;
  priceResult.innerHTML = `$${price}.00`;
  modalCartBg.lastElementChild.innerHTML = ''
  alertMess('',false)
  } else {
    alert('Cart is empty!')
  }
  
});

// -----------------------------------------------------------


// ------------------- CART & HEART SCROLL ----------------------


window.addEventListener('scroll', function () {
  var x = window.pageYOffset;
  if (x > 100) {
    cart.classList.add('cartScroll');
    heart.classList.add('heartScroll')
  } else {
    cart.classList.remove('cartScroll');
    heart.classList.remove('heartScroll');
  }
});

// --------------------------------------------------------------