const express = require('express');
const router = express.Router();

require("./routes/user-routes").connect(router);
require("./routes/brand-route").connect(router);
require("./routes/category-router").connect(router);
module.exports = router;