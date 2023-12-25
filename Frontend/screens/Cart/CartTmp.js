useEffect(() => {
  if (isFocused) {
    route.params ? setFirstCheckedIndex(route.params.firstCheckedIndex) : null;
    console.log('Màn hình MyTabScreen đã được focus.', firstCheckedIndex);
  } else {
    setFirstCheckedIndex(null);
    console.log('Màn hình MyTabScreen đã mất focus.', firstCheckedIndex);
  }
}, [isFocused]);

const setRenderData = () => {
  var totalPrice = 0;
  var cartProducts = [];
  var totalProduct = 0;
  cartData.cart.products?.forEach((item, index) => {
    const product = products.find((product) => product._id == item.productId);
    const productPackingInfo = product.packing.find((element) => element.unit == item.packing);

    const productPrice =
      parseFloat(productPackingInfo.discount) != 0 ? (parseFloat(productPackingInfo.price) * (100 - parseFloat(productPackingInfo.discount))) / 100 : parseFloat(productPackingInfo.price);

    totalPrice = totalPrice + productPrice * parseFloat(item.quantity);
    totalProduct += parseInt(item.quantity);

    cartProducts.push({
      product: product,
      finalPrice: productPrice,
      packing: item.packing,
      quantity: item.quantity,
      discount: productPackingInfo.discount,
      price: productPackingInfo.price,
      isInOrder: false,
    });
  });

  setCartInfo({
    cartProducts: cartProducts,
    totalPrice: totalPrice,
    totalProduct: totalProduct,
  });
};
useEffect(() => {
  setRenderData();
}, [cartData]);

const decreaseQuantity = (item) => {
  cartData.cart.products.forEach((element, index) => {
    if (element.productId == item.product._id && element.packing == item.packing) {
      tmp = cartData.cart;
      tmp.products[index].quantity--;

      setCartData({
        cart: tmp,
        totalProduct: cartData.totalProduct - 1,
        isLoadingCart: 'false',
      });
      setRenderData();
    }
  });
  updateCart(tmp);
};
const increaseQuantity = (item) => {
  cartData.cart.products.forEach((element, index) => {
    if (element.productId == item.product._id && element.packing == item.packing) {
      tmp = cartData.cart;
      tmp.products[index].quantity++;

      setCartData({
        cart: tmp,
        totalProduct: cartData.totalProduct + 1,
        isLoadingCart: 'false',
      });

      setRenderData();
    }
  });
  updateCart(tmp);
};
const deleteItem = (item) => {
  cartData.cart.products.forEach((element, index) => {
    if (element.productId == item.product._id && element.packing == item.packing) {
      tmp = cartData.cart;
      const quantity = tmp.products[index].quantity;
      tmp.products.splice(index, 1);
      setCartData({
        cart: tmp,
        totalProduct: cartData.totalProduct - quantity,
        isLoadingCart: 'false',
      });
      setRenderData();
    }
  });
  updateCart(tmp);
  setAlertVisible(false);
};
const handleDelete = (item) => {
  setAlertParams(item);
  setAlertVisible(true);
};
const updateCart = async (item) => {
  axios
    .put(`http://${Ip}:3000/api/cart/update-cart/${userId}`, {
      newCart: item,
    })
    .then((response) => {})
    .catch((error) => {
      console.log('Cart error: ', error);
    });
};
const setAddToOrder = (item, index) => {
  console.log('adding to order');
  var newProductsList = orderInfo.products ? [...orderInfo.products] : [];
  var totalPrice = orderInfo.totalPrice ? orderInfo.totalPrice : 0;
  var totalProducts = orderInfo.totalProducts ? orderInfo.totalProducts : 0;
  var isExisted = false;
  newProductsList.forEach((element, index) => {
    if (element.productId == item.product._id && element.packing == item.packing) {
      newProductsList.splice(index, 1);
      totalProducts = totalProducts - item.quantity;
      totalPrice = totalPrice - parseFloat(item.finalPrice) * parseFloat(item.quantity);
      isExisted = true;
      var newCartProducts = [...cartInfo.cartProducts];
      newCartProducts[index].isInOrder = false;
      setCartInfo({
        ...cartInfo,
        cartProducts: newCartProducts,
      });
    }
  });
  if (!isExisted) {
    var newCartProducts = [...cartInfo.cartProducts];
    newCartProducts[index].isInOrder = true;
    setCartInfo({
      ...cartInfo,
      cartProducts: newCartProducts,
    });
    newProductsList.push({
      productId: item.product._id,
      title: item.product.title,
      price: item.finalPrice,
      quantity: item.quantity,
      packing: item.packing,
    });

    totalPrice = totalPrice + parseFloat(item.finalPrice) * parseFloat(item.quantity);
    totalProducts = totalProducts + item.quantity;
  }

  const newOrder = {
    products: newProductsList,
    totalProducts: totalProducts,
    totalPrice: totalPrice,
  };
  console.log('order line 210: ', newOrder);
  setOrderInfo(newOrder);
};
const updateOrder = (itemIndex) => {
  let newOrderInfo = [...orderInfo];
  let newProductsList = [...orderInfo.products];
  newProductsList[cartInfo.cartProducts[itemIndex].inOrderIndex].quantity -= 1;
  newOrderInfo.totalPrice -= parseFloat(newProductsList[cartInfo.cartProducts[itemIndex].inOrderIndex].price);
  newOrderInfo.totalProducts -= 1;
};
/////////////////////////////////////
const setRenderData = () => {
  var totalPrice = 0;
  var newCartProducts = [];
  var totalProduct = 0;
  let totalIncart = 0;

  cartData.cart.products?.forEach((item, index) => {
    const product = products.find((product) => product._id == item.productId);
    const productPackingInfo = product.packing.find((element) => element.unit == item.packing);

    const productFinalPrice =
      Math.round(
        parseFloat(productPackingInfo.discount) != 0
          ? ((parseFloat(productPackingInfo.price) * (100 - parseFloat(productPackingInfo.discount))) / 100) * 100
          : parseFloat(productPackingInfo.price) * 100,
      ) / 100;

    totalPrice = totalPrice + productFinalPrice * parseInt(item.quantity);
    totalProduct += parseInt(item.quantity);
    console.log('before: ', product.title, cartInfo.cartProducts[index]?.inOrderIndex);
    if (cartInfo.cartProducts[index]?.inOrderIndex == undefined || cartInfo.cartProducts[index]?.inOrderIndex == null) {
      newCartProducts.push({
        product: product,
        finalPrice: productFinalPrice,
        packing: item.packing,
        quantity: item.quantity,
        discount: productPackingInfo.discount,
        price: productPackingInfo.price,
        inOrderIndex: null,
      });
    } else {
      newCartProducts.push({
        product: product,
        finalPrice: productFinalPrice,
        packing: item.packing,
        quantity: item.quantity,
        discount: productPackingInfo.discount,
        price: productPackingInfo.price,
        inOrderIndex: totalIncart,
      });
      totalIncart += 1;
    }
    console.log('after: ', product.title, newCartProducts[index]?.inOrderIndex);
    console.log('----');
  });
  console.log('-------------------------------------------//-------------------------------------------------------');
  setCartInfo({
    cartProducts: newCartProducts,
    totalPrice: Math.round(totalPrice * 100) / 100,
    totalProduct: totalProduct,
  });
};

//------------------------------------------------//

const setAddToOrder = (item, itemIndex) => {
  var newProductsList = orderInfo.products ? [...orderInfo.products] : [];
  var totalPrice = orderInfo.totalPrice ? orderInfo.totalPrice : 0;
  var totalProducts = orderInfo.totalProducts ? orderInfo.totalProducts : 0;
  var isExisted = false;
  var totalIncart = 0;
  newProductsList?.forEach((element, index) => {
    if (element.productId == item.product._id && element.packing == item.packing) {
      newProductsList.splice(index, 1);
      totalProducts = totalProducts - item.quantity;
      totalPrice = totalPrice - parseFloat(item.finalPrice) * parseFloat(item.quantity);
      isExisted = true;
      let newCartProducts = [...cartInfo.cartProducts];
      newCartProducts[itemIndex].inOrderIndex = null;
      setCartInfo({
        ...cartInfo,
        cartProducts: newCartProducts,
      });
    }
    totalIncart += 1;
  });
  console.log('totalIncart: ', totalIncart);
  if (!isExisted) {
    let newCartProducts = [...cartInfo.cartProducts];
    newCartProducts[itemIndex].inOrderIndex = totalIncart;
    // totalIncart += 1;
    setCartInfo({
      ...cartInfo,
      cartProducts: newCartProducts,
    });
    newProductsList.push({
      productId: item.product._id,
      title: item.product.title,
      price: item.finalPrice,
      quantity: item.quantity,
      packing: item.packing,
    });

    totalPrice = totalPrice + parseFloat(item.finalPrice) * parseFloat(item.quantity);
    totalProducts = totalProducts + item.quantity;
  }

  const newOrder = {
    products: newProductsList,
    totalProducts: totalProducts,
    totalPrice: Math.round(totalPrice * 100) / 100,
  };
  // console.log('order line 210: ', newOrder);
  setOrderInfo(newOrder);
};

//------------------------------------------------//

const decreaseQuantity = (item, itemIndex) => {
  let tmp = {...cartData.cart};
  tmp.products[itemIndex].quantity--;

  if (cartInfo.cartProducts[itemIndex].inOrderIndex != null) {
    let newOrderInfo = {...orderInfo};
    let newProductsList = [...orderInfo.products];
    newProductsList[cartInfo.cartProducts[itemIndex].inOrderIndex].quantity -= 1;
    newOrderInfo.totalPrice -= parseFloat(item.price);
    newOrderInfo.totalProducts -= 1;
    newOrderInfo.products = newProductsList;
    setOrderInfo(newOrderInfo);
  }
  setCartData({
    cart: tmp,
    totalProduct: cartData.totalProduct - 1,
    isLoadingCart: 'false',
  });
  updateCart(tmp);
};
const increaseQuantity = (item, itemIndex) => {
  let tmp = {...cartData.cart};
  tmp.products[itemIndex].quantity++;

  if (cartInfo.cartProducts[itemIndex].inOrderIndex != null) {
    let newOrderInfo = {...orderInfo};

    let newProductsList = [...orderInfo.products];

    newProductsList[cartInfo.cartProducts[itemIndex].inOrderIndex].quantity += 1;
    newOrderInfo.totalPrice += parseFloat(item.price);
    newOrderInfo.totalProducts += 1;
    newOrderInfo.products = newProductsList;
    setOrderInfo(newOrderInfo);
  }
  setCartData({
    cart: tmp,
    totalProduct: cartData.totalProduct + 1,
    isLoadingCart: 'false',
  });
  updateCart(tmp);
};
const deleteItem = (item, itemIndex) => {
  let tmp = {...cartData.cart};

  const quantity = tmp.products[itemIndex].quantity;

  tmp.products.splice(itemIndex, 1);

  if (cartInfo.cartProducts[itemIndex].inOrderIndex != null) {
    console.log('delete true');
    let newOrderInfo = {...orderInfo};
    let newProductsList = [...orderInfo.products];

    newOrderInfo.totalProducts -= newProductsList[cartInfo.cartProducts[itemIndex].inOrderIndex].quantity;
    console.log(newOrderInfo.totalPrice);

    newOrderInfo.totalPrice = newOrderInfo.totalPrice - newProductsList[cartInfo.cartProducts[itemIndex].inOrderIndex].price * cartInfo.cartProducts[itemIndex].quantity;

    newProductsList.splice(cartInfo.cartProducts[itemIndex].inOrderIndex, 1);

    newOrderInfo.products = newProductsList;
    console.log(newOrderInfo);
    setOrderInfo(newOrderInfo);
  }
  setCartData({
    cart: tmp,
    totalProduct: cartData.totalProduct - quantity,
    isLoadingCart: 'false',
  });
  updateCart(tmp);

  setAlertVisible(false);
};
