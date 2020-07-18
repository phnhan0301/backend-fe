let models = require("../models");
const getCate = () => {
  const dataCate = models.category.findAll();
  return dataCate;
};
const insertCate = (data) => {
  const result = models.category.create(data);
  return result;
};
const getCateById = (id) => {
  const result = models.category.findAll({
    where: {
      id: id,
    },
  });
  return result;
};
const updateCate = (id,data) => {
  const result = models.category.update(
    { name:data },
    {
      where: {
        id: id,
      },
    }
  );
    return result;
};
const deleteCate = id =>{
  const result = models.category.destroy({
    where:{
      id:id
    }
  })
  return result;
}
module.exports = {
  getCate: getCate,
  insertCate: insertCate,
  getCateById: getCateById,
  updateCate:updateCate,
  deleteCate:deleteCate
};
