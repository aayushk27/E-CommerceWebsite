const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const category = require("../models/category");

exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
        .populate("category")
        .exec((err, product) => {
        if (err) {
            return res.status(403).json({
                err:"Product id is  not  found in DB"
            })
        }
        req.product = product;
        next();
    })
}

//creating product
exports.createProduct = (req, res) => {
    let form = formidable.IncomingForm()
    form.keepExtensions = true;
    form.parse(req, (err, fields, file) =>{
        if (err) {
            return res.status(400).json({
                error:"error  with  image"
            })
        }
        //destructuring fields
        const { name, description, price, category, stock } = fields;
        if(!name || !description || !price ||!category || !stock) {
                return res.status(400).json({
                error:"Please includes all  fileds"
            })
        }
        let product = Product(fields);
        
        //hadling with file
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    err: "file size  is  hug"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }
        product.save((err, product) => {
            if (err) {
                return res.status(400).json({
                    err:"saving tshirt in DB  fail"
                })
            }
            res.json(product);
        })

    })
}