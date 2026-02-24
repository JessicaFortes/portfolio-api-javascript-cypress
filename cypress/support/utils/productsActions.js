function getProductsByCategory(listProducts, category) {
  return listProducts.filter((product) => product.category === category);
}

function countProductsByCategory(listProducts, category) {
  return listProducts.reduce((total, product) => {
    return product.category === category ? total + 1 : total;
  }, 0);
}

module.exports = { getProductsByCategory, countProductsByCategory }
