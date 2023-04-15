const BrandModel = require('../models/brand');
const {lowerCase} = require('lower-case');

module.exports.getBrandById = (req, res) => {
    try {   
        const { id } = req.params;
        if (id) {
            BrandModel.findOne({_id: id}).then((brand) => res.status(200).send({code: 0, message: 'Lấy thông tin thương hiệu thành công !', data: brand})).catch((error) => res.status(500).send({code: 0, message: 'Lấy thông tin thương hiệu thất bại !', error: error}))
        } else {
            return res.status(500).send({code: 0, message: 'Lấy thông tin thương hiệu thất bại do chưa đẩy ID brand !'});
        }
    } catch (error) {
        return res.status(500).send({code: 0, message: 'Lấy thông tin thương hiệu thất bại !', error: error});
    }
}

module.exports.getBrandList = (req, res) => {
    try { 
        BrandModel.find().then((brand) => res.status(200).send({code: 1, message: 'Lấy danh sách thương hiệu thành công !', data: brand})).catch((error) => res.status(500).send({code: 0, message: 'Lấy danh sách thương hiệu thất bại !', error: error}));
    } catch (error) {
        return res.status(500).send({code: 0, message: 'Lấy danh sách thương hiệu thất bại !', error: error});
    }
}

module.exports.createBrand = async(req, res) => {
    try { 
        const data = req.body;
        if (Object.keys(data).length !== 0) {
            const query = {$or: []};
            const brandName = data.name.trim().toLowerCase();
            query.$or.push({name: brandName});
            let existedBrand = await BrandModel.findOne(query).exec();
            if (existedBrand) {
                return res.status(200).send({code: 0, message: 'Thương hiệu này đã tồn tại !', data: null});
            } else {
                const _brand = {
                    name: brandName,
                    description: data.description,
                }
                const newBrand = new BrandModel(_brand);
                let result = await newBrand.save();
                return res.status(200).send({code: 1, message: 'Tạo thương hiệu thành công !', data: result});
            }

        } else {
            return res.status(500).send({code: 0, message: 'Tạo mới thương hiệu thất bại, chưa truyền dữ liệu lên request'});
        }
    } catch (error) {
        return res.status(500).send({code: 0, message: 'Tạo mới thương hiệu thất bại !', error: error});
    }
}