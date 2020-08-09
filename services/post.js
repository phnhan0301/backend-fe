let models = require("../models");
const getPost = () => {
 try {
  const post = models.post.findAndCountAll({
    include:[
        {model:models.categoryPost,as:"cate",attributes:['name']},
        {model:models.user,as:"users",attributes:['name']}
    ]
  });
  return post;
 } catch (error) {
   console.log('anh');
 }
  
};
const deletePost = (id) => {
  const destroyPost = models.post.destroy({
    where: {
      id: id,
    },
  });
  return destroyPost;
};
const deletePostByCate = (id) => {
  const destroyPost = models.post.destroy({
    where: {
      cate_id: id,
    },
  });
  return destroyPost;
};
const getPostByCate = id =>{
  const data = models.post.findAll({
    where:{
      cate_id:id
    },
    include:[
        {model:models.categoryPost,as:"cate",attributes:['name']}
    ]
  })
  return data;
}
const getPostById = (id) => {
  const dataById = models.post.findAll({
    where: {
      id: id,
    },
    include:[
        {model:models.categoryPost,as:"cate",attributes:['name']},
        {model:models.user,as:"users",attributes:['name']}
    ]
  });
  return dataById;
};
const insertPost = (data) => {
  const result = models.post.create(data);
  return result;
};
const updatePost = (id, data) => {
  const result = models.post.update(data,
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
    getPost: getPost,
    deletePost: deletePost,
    deletePostByCate: deletePostByCate,
    getPostByCate: getPostByCate,
    getPostById:getPostById,
    insertPost:insertPost,
    updatePost:updatePost
};
