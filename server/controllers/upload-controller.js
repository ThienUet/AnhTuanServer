const moment = require('moment');
const {uploadSingle} = require('../config/multerConfig');
const ImageModel = require('../models/image');
const ObjectId = require("mongodb").ObjectId;
let folder = moment().format("DD-MM-YYYY");

module.exports.uploadAvatar = (req, res) => {
    try {
        if (req.query.folder) {
            folder = req.query.folder;
        }
        const upload = uploadSingle(`/avatar/${folder}`);
        upload((req, res, err) => {
            if (err) {
                return res.status(400).send({code: 0, message: 'Đã xảy ra lỗi', err: err});
            }
            if (req.file === undefined) {
                return res.status(400).send({code: 0, message: "File không xác định !"});
            }
            const {type} = req.body;
            const fileName = req.file.filename;
            const url = `/avatar/${folder}/${fileName}`;

            new ImageModel({
                type: type || "commons",
                path: url,
                name: fileName,
                size: req.file.size,
                status: true,
                create_by: req.userId ? ObjectId(req.userId) : null
            }).save(err => {
                const data = {
                    name: fileName,
                    status: 'done',
                    thumbUrl: url,
                    url: url
                };
                if (err) {
                    return res.status(400).send({code: 0, message: "Lỗi xảy ra !", error: err});
                }
                return res.status(200).send({code: 1, message: "Lưu ảnh thành công !", data: data});
            })
        })
    } catch (err) {
        return res.status(400).send({code: 0, message: 'Không hợp lệ hoặc thiếu thông tin bắt buộc !'})
    }
}
