const CategoryModel = require('../models/category');

module.exports.createCategory = async (req, res) => {
    try {
        const data = req.body;
        if (Object.keys(data).length !== 0) {
            const name = data.name.trim().toLowerCase();
            let existedCategory = await CategoryModel.findOne({name: name});
            if (existedCategory) {
                return res.status(200).send({code: 0, message: 'Loại sản phẩm này đã tồn tại !'});
            } else {
                const _category = {
                    name: name,
                    description: data.description,
                    created_at: Date.now(),
                }
                const newCategory = new CategoryModel(_category);
                const result = await newCategory.save();
                return res.status(200).send({code: 1, message: 'Tạo mới loại sản phẩm thành công !'});
            }

        } else {
            return res.status(500).send({code: 0, message: 'Chưa đẩy dữ liệu lên'});
        }
    } catch (error) {
        return res.status(500).send({code: 0, message: 'Lấy danh sách loại sản phẩm thất bại !', error: error});
    }
}

module.exports.getCategory = (req, res) => {
    try {
        const {id} = req.params;
        if (id) {
            CategoryModel.findOne({_id: id}).then((category) => res.status(200).send({code: 0, message: 'Lấy thông tin loại sản phẩm thành công !', data: category})).catch((error) => res.status(500).send({code: 0, message: 'Lấy loại sản phẩm thất bại !', error: error}));
        } else {
            return res.status(500).send({code: 0, message: 'Chưa đẩy dữ liệu ID lên !'});
        }
    } catch (error) {
        return res.status(500).send({code: 0, message: 'Lấy loại sản phẩm thất bại !', error: error});
    }
}

module.exports.getCategoryList = (req, res) => {
    try {
        CategoryModel.find().then((category) => res.status(200).send({code: 0, message: 'Lấy danh sách loại sản phẩm thành công !', data: category})).catch((error) => res.status(500).send({code: 0, message: 'Lấy loại sản phẩm thất bại !', error: error}))
    } catch (error) {
        return res.status(500).send({code: 0, message: 'Lấy loại sản phẩm thất bại !', error: error})
    }
}

