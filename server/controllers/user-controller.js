const UserModel = require('../models/users');
const Bcrypt = require('bcryptjs');
const {lowerCase} = require('lower-case');
const Jwt = require('jsonwebtoken');
const config = require('../config/config');
// encrypt password by Bcrypt
const _hashPassword = async(password) => {
    const salt = await Bcrypt.genSalt();
    let hash = await Bcrypt.hash(password, salt);
    return hash;
}

// tạo token đăng nhập
const userLogin = (user) => {
    const tokenData = {
        id: user._id,
        user_name: user.user_name,
        full_name: user.full_name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        birth_date: user.birth_date,
        avatar: user.avatar,
        banned: user.banned
    }
    return tokenData;
}
// Lấy token đăng nhập
const getToken = (tokenData) => {
    return Jwt.sign(tokenData, config.privateKey, {
        expiresIn: 86400 // 24hours
    });
}
// Lấy danh sách người dùng có sẵn trong database.
module.exports.getUserList = (req, res) => {
    try {
        UserModel.find().then((user) => res.status(200).send({code: 1, message: "Lấy danh sách User thành công", data: user}).end()).catch((error) => res.status(404).send({code: 0, message: `Không lấy được danh sách người dùng`, error: error}).end());
    } catch (error) {
        return res.status(500).send({code: 0, message: `Không lấy được danh sách do lỗi: ${error}`}).end();
    }
}
// Lấy người dùng thông qua ID
module.exports.getUserByID = (req, res) => {
    try {
        const id = req.userId;
        UserModel.findOne({_id: id}).select('-password').then((user) => {
            return res.status(200).send({code: 1, message: 'Lấy thông tin người dùng thành công', data: user}).end()
        }).catch((error) => res.status(404).send({code: 0, message: `Không lấy được người dùng`, error: error}).end());
    } catch (error) {
        return res.status(500).send({code: 0, message: `Lỗi không lấy được thông tin người dùng`, error: error});
    }
}
// Tạo mới người dùng tương ứng chức năng đăng ký
module.exports.createUser = async (req, res) => {
    try {
        const data = req.body;
            // Đầu tiên check xem số điện thoại hoặc email đã có tồn tại trong database hay chưa nếu có thì gửi về mã lỗi 404.
            if (Object.keys(data).length !== 0) {
                const query = {$or: []}
            if (data.email || data.phone || data.user_name) {
                let _user_name = data.user_name;
                if (_user_name) {
                    _user_name = _user_name.trim();
                    _user_name = lowerCase(_user_name);
                    query.$or.push({ user_name: _user_name });
                }
                let email = data.email;
                if (email) {
                    email = email.trim();
                    email = lowerCase(email);
                    query.$or.push({ email: email });
                }
                let phone = data.phone;
                if (phone) {
                    phone = phone.trim();
                    phone = lowerCase(phone);
                    query.$or.push({ phone: phone });
                }

                let existedPhoneOrEmail = await UserModel.findOne(query).exec();
                if (existedPhoneOrEmail) {
                    // Nếu đã tồn tại số điện thoại hoặc email thì trả về mã lỗi 404.
                    return res.status(404).send({code: 0, message: `Tên tài khoản hoặc email hoặc số điện thoại đã tồn tại`, error: `existed`}).end();
                } else {
                    // Tại đây tiến hành mã hóa mật khẩu của người dùng đẩy lên qua request.
                    const password = await _hashPassword(data.password);
                    const user_name = lowerCase(data.user_name);
                    const user = {
                        user_name: user_name,
                        password: password,
                        email: email,
                        phone: phone,
                        address: data.address,
                        first_name: data.first_name,
                        last_name: data.last_name,
                        full_name: data.first_name + ' ' + data.last_name,
                        gender: data.gender,
                        role: data.role || 'client',
                        banned: false,
                        birth_date: data.birth_date,
                        created_at: Date.now(),
                        created_by: email,
                    }
                    const userModel = new UserModel(user);
                    let result = await userModel.save();
                    return res.status(200).send({code: 1, message: 'Tạo người dùng thành công', data: result}).end();
                }
            }
            } else {
                return res.status(401).send({code: 1, message: 'Chưa nhận được data trong request!'});
            }
    } catch (error) {
        return res.status(500).send({ code: 0, message: "Lỗi thêm người dùng mới", error: error }).end();
    }
}

module.exports.login = (req, res) => {
    try {
        let user_name = req.body.user_name;
            user_name = `${user_name.trim()}`;
        let password = req.body.password;
            password = `${password.trim()}`;
            
        return UserModel.findOne({user_name: user_name}).then((user) => {
            if (!user) {
                return res.status(200).send({code: 0, message: 'Tài khoản không tồn tại'}).end();
            }
            if (user) {
                if (user.banned) {
                    return res.status(200).send({code: 0, message: 'Tài khoản của bạn đã bị khóa ! Vui lòng liên hệ quản trị viên !'}).end();
                } 
                if (user.banned !== true) {
                    Bcrypt.compare(password, user.password, async(err, result) => {
                        if (err) {
                            return res.status(200).send({ code: 0, message: "Mật khẩu không chính xác.", data: null});
                        }
                        if (result) {
                            const userData = userLogin(user);
                            const token = getToken(userData);
                            return res.status(200).send({code: 1, message: 'Đăng nhập thành công !', data: {user: userData, token: token}});
                        } else {
                            res.status(200).send({code: 0, message: 'Mật khẩu không chính xác !', data: null});
                        }
                    });
                }
            }  
        }).catch((error) => res.status(401).send({code: 0, message: 'Xảy ra lỗi phía database', error: error}));
    } catch (error) {
        return res.status(403).send({code: 0, message: `Tài khoản hoăc mật khẩu không chính xác. !!`, error: error });
    }
} 