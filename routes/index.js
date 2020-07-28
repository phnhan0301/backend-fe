var express = require('express');
var router = express.Router();
const category = require("../services/category");
const product = require("../services/product");
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
module.exports = router;
