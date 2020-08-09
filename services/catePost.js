let models = require("../models");
const getCatePost = () => {
  const dataCate = models.categoryPost.findAll();
  return dataCate;
};
const insertCatePost = (data) => {
  const result = models.categoryPost.create(data);
  return result;
};
const getCatePostById = (id) => {
  const result = models.categoryPost.findAll({
    where: {
      id: id,
    },
  });
  return result;
};
const updateCatePost = (id, data) => {
  const result = models.categoryPost.update(
    { name: data },
    {
      where: {
        id: id,
      },
    }
  );
  return result;
};
const deleteCatePost = (id) => {
  const result = models.categoryPost.destroy({
    where: {
      id: id,
    },
  });
  return result;
};
module.exports = {
  getCatePost: getCatePost,
  insertCatePost: insertCatePost,
  getCatePostById: getCatePostById,
  updateCatePost: updateCatePost,
  deleteCatePost: deleteCatePost,
};
