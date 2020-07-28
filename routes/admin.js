var express = require("express");
var router = express.Router();
const category = require("../services/category");
const product = require("../services/product");
let multer = require("multer");
router.get("/cate", async function (req, res) {
  const listCate = await category.getCate();
  return res.json({ data: listCate });
});
router.post("/cate", async (req, res) => {
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
router.get("/cate/:id", async (req, res) => {
  const { id } = req.params;
  const data = await category.getCateById(id);
  if (data.length>0) {
    return res.json({ data: data });
  } else {
    return res.json({
      messages: "Không tìm thấy dữ liệu",
    });
  }
});
router.post("/updateCate", async (req, res) => {
  const {name,id } = req.body;
  const result = await category.updateCate(id,name);
  if (result) {
    return res.json({ data: result });
  } else {
    return res.json({
      messages: "Cập nhật thất bại!",
    });
  }
});
router.get("/deleteCategory/:id", async (req, res) => {
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
router.get("/product", async (req, res) => {
  const listProduct = await product.getProduct();
  if (listProduct) {
    return res.json({ data: listProduct });
  } else {
    return res.json({ messages: "Không có dữ liệu!" });
  }
});
router.get("/deleteProduct/:id", async (req, res) => {
  const { id } = req.params;
  const resultDestroy = await product.deleteProduct(id);
  if (resultDestroy) {
    res.json({ data: resultDestroy });
  } else {
    res.json({ messages: "Xóa sản phẩm thất bại!" });
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
router.post("/product", async (req, res) => {
  console.log(req.body.images)
  var filename = "";
  let diskStogare = multer.diskStorage({
    destination: (req, res, callback) => {
      callback(null, "public/images/products");
    },
    filename: (req, file, callback) => {
      let math = ["image/png", "image/jpg", "image/jpeg"];
      if (math.indexOf(file.mimetype) == -1) {
        var err = {
          err: "Chỉ được upload ảnh đuôi png, jpg, jpeg !"
        };
        res.render("admin/productAdd", { err: err });
      }
      filename = `${Date.now()}-product-${file.originalname}`;
      callback(null, filename);
    }
  });
  let uploadFile = multer({ storage: diskStogare }).single("images");
  const { name, price, details, amount, sale, cate_id } = req.body;
  uploadFile(req, res, (err) => {
    if (err) {
      console.log(err);
      console.log(__dirname);
    } else {
      var data = {
        name: name,
        images: filename,
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
  });
});
router.post("/productUpdate", async (req, res) => {
  const { id, name, price, details, amount, sale, cate_id } = req.body;
  var filename = "";
  let diskStogare = multer.diskStorage({
    destination: (req, res, callback) => {
      callback(null, "public/images/products");
    },
    filename: (req, file, callback) => {
      let math = ["image/png", "image/jpg", "image/jpeg"];
      if (math.indexOf(file.mimetype) == -1) {
        var err = {
          err: "Chỉ được upload ảnh đuôi png, jpg, jpeg !",
        };
        return res.json({ messages: err });
      }
      filename = `${Date.now()}-product-${file.originalname}`;
      callback(null, filename);
    },
  });
  if (filename) {
    let uploadFile = multer({ storage: diskStogare }).single("files");
    uploadFile(req, res, (err) => {
      if (err) {
        console.log(err);
        console.log(__dirname);
      } else {
        var data = {
          name: name,
          images: filename,
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
    });
  } else {
    var data = {
      name: name,
      price: price,
      details: details,
      cate_id: cate_id,
      sale: sale,
      amount: amount,
    };
    let updateProduct = await product.updateProduct(id, data);
    if (updateProduct) {
      return res.json({ data: updateProduct });
    } else {
      console.log("errr");
    }
  }
});
module.exports = router;
