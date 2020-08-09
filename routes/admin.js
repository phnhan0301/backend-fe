var express = require("express");
var router = express.Router();

const bcrypt = require("bcrypt");
const authMiddleware = require("../middleware/authMiddleware");

const category = require("../services/category");
const product = require("../services/product");
const userService = require("../services/user");
//--------------------------------------------//
const categorypost = require("../services/catePost");
// --------------------------------------
const post = require("../services/post");
let multer = require("multer");
var upload = multer({ dest: "uploads/" });
const jwt = require("jsonwebtoken");
const moment = require("moment");
router.get("/cate", authMiddleware.isAuth, async function (req, res) {
  const listCate = await category.getCate();
  return res.json({ data: listCate });
});
router.post("/cate", authMiddleware.isAuth, async (req, res) => {
  const { name } = req.body;
  if (name) {
    const insertData = {
      name: req.body.name,
    };
    const data = await category.insertCate(insertData);
    return res.json({ data: data });
  } else {
    return res.json({ messages: "Thêm mới thất bại!" });
  }
});
router.get("/cate/:id", authMiddleware.isAuth, async (req, res) => {
  const { id } = req.params;
  const data = await category.getCateById(id);
  if (data.length > 0) {
    return res.json({ data: data });
  } else {
    return res.json({
      messages: "Không tìm thấy dữ liệu",
    });
  }
});
router.post("/updateCate", authMiddleware.isAuth, async (req, res) => {
  const { name, id } = req.body;
  const result = await category.updateCate(id, name);
  if (result) {
    return res.json({ data: result });
  } else {
    return res.json({
      messages: "Cập nhật thất bại!",
    });
  }
});
router.get("/deleteCategory/:id", authMiddleware.isAuth, async (req, res) => {
  const { id } = req.params;
  const result = await category.deleteCate(id);
  if (result) {
    await product.deleteProductByCate(id);
    return res.json({ data: result });
  } else {
    return res.json({
      messages: "Xóa thất bại!",
    });
  }
});
//product
router.get("/product", authMiddleware.isAuth, async (req, res) => {
  const listProduct = await product.getProduct();
  if (listProduct) {
    return res.json({ data: listProduct });
  } else {
    return res.json({ messages: "Không có dữ liệu!" });
  }
});
router.get("/deleteProduct/:id", authMiddleware.isAuth, async (req, res) => {
  const { id } = req.params;
  const resultDestroy = await product.deleteProduct(id);
  if (resultDestroy) {
    res.json({ data: resultDestroy });
  } else {
    res.json({ messages: "Xóa sản phẩm thất bại!" });
  }
});
router.get("/product/:id", authMiddleware.isAuth, async (req, res) => {
  const { id } = req.params;
  const dataProductById = await product.getProductById(id);
  if (dataProductById) {
    return res.json({ data: dataProductById });
  } else {
    return res.json({ messages: "Không tìm thấy sản phẩm!" });
  }
});
router.post(
  "/product",
  authMiddleware.isAuth,
  upload.single("image"),
  async (req, res) => {
    let { name, price, amount, cate_id, details, sale } = req.body;
    var data = {
      name: name,
      images: req.file.filename,
      price: price,
      details: details,
      cate_id: cate_id,
      sale: sale,
      amount: amount,
    };
    var addProduct = product.insertProduct(data);
    if (addProduct) {
      addProduct
        .then(() => {
          return res.json({ data: addProduct });
        })
        .catch((err) => {
          if (err) throw err;
        });
    }
  }
);
router.post(
  "/productUpdate",
  authMiddleware.isAuth,
  upload.single("image"),
  async (req, res) => {
    let { name, price, amount, cate_id, details, sale, id } = req.body;
    var data = {};
    if (req.file) {
      data = {
        name: name,
        price: price,
        details: details,
        cate_id: cate_id,
        sale: sale,
        amount: amount,
        images: req.file.filename,
      };
    } else {
      data = {
        name: name,
        price: price,
        details: details,
        cate_id: cate_id,
        sale: sale,
        amount: amount,
        // images: req.file.filename
      };
    }
    let updateProduct = await product.updateProduct(id, data);
    if (updateProduct) {
      return res.json({ data: updateProduct });
    } else {
      console.log("errr");
    }
  }
);

//-----------------------POST-CATEGORY--------------------//
router.get("/cate_post", async function (req, res) {
  const listCate = await categorypost.getCatePost();
  return res.json({ data: listCate });
});
router.post("/cate_post", authMiddleware.isAuth, async (req, res) => {
  const { name } = req.body;
  if (name) {
    const insertData = {
      name: req.body.name,
    };
    const data = await categorypost.insertCatePost(insertData);
    return res.json({ data: data });
  } else {
    return res.json({ messages: "Thêm mới thất bại!" });
  }
});
router.get("/cate_post/:id", authMiddleware.isAuth, async (req, res) => {
  const { id } = req.params;
  const data = await categorypost.getCatePostById(id);
  if (data.length > 0) {
    return res.json({ data: data });
  } else {
    return res.json({
      messages: "Không tìm thấy dữ liệu",
    });
  }
});
router.post("/updateCate_post", authMiddleware.isAuth, async (req, res) => {
  const { name, id } = req.body;
  const result = await categorypost.updateCatePost(id, name);
  if (result) {
    return res.json({ data: result });
  } else {
    return res.json({
      messages: "Cập nhật thất bại!",
    });
  }
});
router.get(
  "/deleteCategory_post/:id",
  authMiddleware.isAuth,
  async (req, res) => {
    const { id } = req.params;
    const result = await categorypost.deleteCatePost(id);
    if (result) {
      await product.deleteProductByCate(id);
      return res.json({ data: result });
    } else {
      return res.json({
        messages: "Xóa thất bại!",
      });
    }
  }
);
// END------------------------------------------//
// ------------POST-----------------//
router.get("/post", authMiddleware.isAuth, async (req, res) => {
  const listpost = await post.getPost();
  if (listpost) {
    return res.json({ data: listpost });
  } else {
    return res.json({ messages: "Không có dữ liệu!" });
  }
});
router.get("/delete-post/:id", authMiddleware.isAuth, async (req, res) => {
  const { id } = req.params;
  const resultDestroy = await post.deletePost(id);
  if (resultDestroy) {
    res.json({ data: resultDestroy });
  } else {
    res.json({ messages: "Xóa bài viết thất bại!" });
  }
});
router.get("/post/:id", authMiddleware.isAuth, async (req, res) => {
  const { id } = req.params;
  const dataPostId = await post.getPostById(id);
  if (dataPostId) {
    return res.json({ data: dataPostId });
  } else {
    return res.json({ messages: "Không tìm thấy bai viet!" });
  }
});
router.post(
  "/post",
  authMiddleware.isAuth,
  upload.single("image"),
  async (req, res) => {
    let { tittle, content, cate_id } = req.body;
    var data = {
      tittle: tittle,
      images: req.file.filename,
      content: content,
      cate_id: cate_id,
      user: 1,
    };
    var addPost = post.insertPost(data);
    if (addPost) {
      addPost
        .then(() => {
          return res.json({ data: addPost });
        })
        .catch((err) => {
          if (err) throw err;
        });
    }
  }
);
router.post(
  "/post-update",
  authMiddleware.isAuth,
  upload.single("image"),
  async (req, res) => {
    let { tittle, content, cate_id, id } = req.body;
    var data = {};
    if (req.file) {
      data = {
        tittle: tittle,
        content: content,
        cate_id: cate_id,
        user: 1,
        images: req.file.filename,
      };
    } else {
      data = {
        tittle: tittle,
        content: content,
        cate_id: cate_id,
        user: 1,
        // images: req.file.filename
      };
    }
    let updatePost = await post.updatePost(id, data);
    if (updatePost) {
      return res.json({ data: updatePost });
    } else {
      console.log("errr");
    }
  }
);
// ---------------END POST---------------//
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
    if (permisson === 2) {
      let passwordDatabase = userInfo[0].password;
      const match = await bcrypt.compare(password, passwordDatabase);
      if (match) {
        let input = {
          userInfo: userInfo[0],
          expiredAt: moment().add(1, "hour").toDate(),
        };
        let token = jwt.sign(input, "HS256");
        req.session.user = {
          email:userInfo[0].email
        }
        return res.json({ token,data:req.session.user });
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
