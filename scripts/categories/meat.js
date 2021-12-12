export default function categories(
  type,
  app,
  heartArr,
  cartArr,
  countHeart,
  countBag,
  price,
  alertMess,
  priceResult
) {
  fetch(
    `https://api.edamam.com/api/recipes/v2?type=public&q=${type}&app_id=ada0f029&app_key=0710b882a14596c936a8d17857916c5a&random=true`
  )
    .then((response) => response.json())
    .then((json) => {
      let arr = json.hits.map((key) => {
        return key.recipe;
      });
      console.log(arr, type);
      arr = arr.splice(0, 12);
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
          price = 0;
          cartArr.forEach((el) => {
            price += el.price;
          });
          cartArr.push(elem);
          price += elem.price;
          console.log(price);
          priceResult.innerHTML = `$${price}.00`;
          countBag.innerHTML = `${cartArr.length}`;
          alertMess('cart');
          console.log(cartArr);
        });

        app.append(block);
      });
    });
}
