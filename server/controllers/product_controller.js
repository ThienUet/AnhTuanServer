const ProductModel = require('../models/product');
const BrandModel = require('../models/brand');
const CategoryModel = require('../models/category');
// Lấy thông tin sản phẩm theo id sản phẩm
module.exports.getProductById = (req, res) => {
    try {
        const {id} = req.params;
        if (id) {
            ProductModel.findOne({_id: id}).then((product) => res.status(200).send({code: 0, message: 'Lấy sản phẩm thành công !', data: product})).catch((error) =>  res.status(500).send({code: 1, message: 'Lấy sản phẩm thất bại !', error: error}));
        } else {
            return res.status(400).send({code: 0, message: 'Chưa đẩy id qua request !'});
        }
    } catch (error) {
        return res.status(500).send({code: 0, message: 'Lỗi không lấy được thông tin của sản phẩm !', error: error})
    }
}

// Lấy danh sách sản phẩm
module.exports.getProductList = (req, res) => {
    try {
        ProductModel.find().then((productList) => res.status(200).send({code: 1, message: 'Lấy danh sách sản phẩm thành công !', data: productList})).catch((error) => res.status(500).send({code: 0, message: 'Lấy danh sách sản phẩm thất bại !', error: error}));
    } catch (error) {
        return res.status(500).send({code: 0, message: 'Lấy danh sách sản phẩm thất bại !', error: error});
    }
}

// Thêm sản phẩm
module.exports.createProduct = async (req, res) => {
    try {
        const data = req.body;
        if (Object.keys(data).length !== 0) {
            let query = {$or: []};
            const name = data.name.trim().toLowerCase();
            query.$or.push({name: name});
            const brand = data.brand.trim().toLowerCase();
            const category = data.category.trim().toLowerCase();
            let getBrand = await BrandModel.findOne({name: brand});
            query.$or.push({brand_id: getBrand._id});
            let getCategory = await CategoryModel.findOne({name: category});
            query.$or.push({category_id: getCategory._id});

            let existedProduct = await ProductModel.findOne(query).exec();
            if (existedProduct) {
                return response.status(200).send({code: 0, message: 'Sản phẩm này đã tồn tại'});
            } else {
                const _product = {
                    name: name,
                    description: data.description,
                    price: data.price,
                    price_sale: data.price_sale,
                    quantity: data.quantity,
                    image: data.image || null,
                    brand_id: getBrand._id,
                    category_id: getCategory._id,
                }
                const newProduct = new ProductModel(_product);
                let result = await newProduct.save();
                return res.status(200).send({code: 0, message: 'Tạo sản phẩm mới thành công !', data: result});
            }
        } else {
            return res.status(500).send({code: 0, message: 'Thêm mới sản phẩm thất bại do chưa đầy đủ thông tin !'});
        }
    } catch (error) {
        return res.status(500).send({code: 0, message: 'Thêm mới sản phẩm thất bại !', error: error}); 
    }
}