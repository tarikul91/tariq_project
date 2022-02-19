const multer = require("multer");
const fs = require('fs');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		let filePath = 'upload'
		if (!fs.existsSync(filePath)) {
			fs.mkdirSync(filePath);
		}
		cb(null, filePath)
	},
	filename: function (req, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
	}
});

const upload = multer({ storage: storage });
module.exports = upload 
  