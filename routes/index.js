var express = require('express');
var router = express.Router();
const category = require("../services/category");
const product = require("../services/product");
const catePost = require("../services/catePost");
const post = require("../services/post")
const userService = require("../services/user");
const bcrypt = require('bcrypt');
/* GET home page. */
router.get("/cate", async function (req, res) {
  const listCate = await category.getCate();
  return res.json({ data: listCate });
});
router.get("/product", async (req, res) => {
  const listProduct = await product.getProduct();
  if (listProduct) {
    return res.json({ data: listProduct });
  } else {
    return res.json({ messages: "Không có dữ liệu!" });
  }
});
router.get("/product/:id", async (req, res) => {
  const { id } = req.params;
  const dataProductById = await product.getProductById(id);
  if (dataProductById) {
    return res.json({ data: dataProductById });
  } else {
    return res.json({ messages: "Không tìm thấy sản phẩm!" });
  }
});
router.get("/product/cate/:id", async (req,res) =>{
  const {id} = req.params;
  const dataProductByCate = await product.getProductByCate(id);
  if(dataProductByCate){
    return res.json({data:dataProductByCate})
  }else{
    res.json({messages:'Không tìm thấy sản phẩm!'})
  }
})
//Post
router.get("/cate-post", async function (req, res) {
  const listCate = await catePost.getCatePost();
  return res.json({ data: listCate });
});
router.get("/post", async (req, res) => {
  const listPost = await post.getPost();
  if (listPost) {
    return res.json({ data: listPost });
  } else {
    return res.json({ messages: "Không có dữ liệu!" });
  }
});
router.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const dataPosttById = await post.getPostById(id);
  if (dataPosttById) {
    return res.json({ data: dataPosttById });
  } else {
    return res.json({ messages: "Không tìm thấy sản phẩm!" });
  }
});
router.get("/post/cate/:id", async (req,res) =>{
  const {id} = req.params;
  const dataPostByCate = await post.getPostByCate(id);
  if(dataPostByCate){
    return res.json({data:dataPostByCate})
  }else{
    res.json({messages:'Không tìm thấy sản phẩm!'})
  }
})
router.post("/register", async (req, res) => {
  const { name, email, password, phone } = req.body;
  const permission = 1;
  if (!name || !email || !password || !phone) {
    return res.json({ messages: "Vui lòng nhập đầy đủ!" });
  } else {
    let userInfo = await userService.findUserByPhoneOrEmail(email);
    if (userInfo.length === 0) {
      const saltRound = 10;
      bcrypt.genSalt(saltRound, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hassPassword) => {
          if (err) throw err;
          const insertUser = await userService.registerUser({
            name,
            email,
            phone,
            permission,
            password: hassPassword,
          });
          if (insertUser) {
            return res.json({ data: insertUser });
          } else {
            return res.json({ messages: "Đăng ký thất bại! Thử lại sau." });
          }
        });
      });
    } else {
      return res.json({ messages: "Email đã tồn tại!" });
    }
  }
});
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password)
      return res.json({ messages: "Vui lòng nhập email hoặc password!" });

    let userInfo = await userService.findUserByPhoneOrEmail(email);
    if (userInfo.length === 0)
      return res.json({ messages: "Email không tồn tại!" });
    let permisson = userInfo[0].permission;
    if (permisson === 1) {
      let passwordDatabase = userInfo[0].password;
      const match = await bcrypt.compare(password, passwordDatabase);
      if (match) {
        req.session.user = {
          email:userInfo[0].email
        }
        return res.json({data:req.session.user });
      } else {
        return res.json({ messages: "Sai mật khẩu!" });
      }
    }else{
      return res.json({ messages: "Sai mật khẩu!" });
    }
  } catch (e) {
    return res.json({ messages: "Lỗi hệ thống!" });
  }
});
module.exports = router;
