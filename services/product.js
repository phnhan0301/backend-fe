let models = require("../models");
const getProduct = () => {
  const dataProduct = models.product.findAll();
  return dataProduct;
};
const deleteProduct = (id) => {
  const destroyProduct = models.product.destroy({
    where: {
      id: id,
    },
  });
  return destroyProduct;
};
const getProductById = (id) => {
  const dataById = models.product.findAll({
    where: {
      id: id,
    },
  });
  return dataById;
};
const insertProduct = (data) => {
  const result = models.product.create(data);
  return result;
};
const updateProduct = (id, data) => {
  const result = models.product.update(data,
    // { data },
    {
      where: {
        id: id,
      },
    }
  );
  return result;
};
module.exports = {
  getProduct: getProduct,
  deleteProduct: deleteProduct,
  getProductById: getProductById,
  insertProduct: insertProduct,
  updateProduct:updateProduct
};
