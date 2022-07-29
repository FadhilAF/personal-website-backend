const multer = require("multer");
const uuid = require("uuid").v4;
const path = require("path");

const imageUpload = multer({
  storage: multer.diskStorage({
    destination: "./assets",
    filename: (req: unknown, file: {originalname: string}, cb: Function) => {
      cb(null, "image_" + uuid() + "-" + file.originalname);
    },
  }),
	fileFilter: (req: unknown, file: {size: number, originalname: string}, cb: Function) => {
		//limit file size to 1MB
		// if (file.size > 1048576) {
			// return cb(new Error("File is too large"));
		// }
		let ext = path.extname(file.originalname);
		if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg" && ext !== ".pdf") {
			return cb(new Error("Only images, pdf and docs are allowed"));
		}
		cb(null, true);
	},
});

const audioUpload = multer({
	storage: multer.diskStorage({
		destination: "./problem-data/files",
		filename: (req: unknown, file: {originalname: string}, cb: Function) => {
			cb(null, "problem_" + uuid() + "_" + file.originalname);
		},
	}),
	fileFilter: (req: unknown, file: {size: number, originalname: string}, cb: Function) => {
		//limit file size to 1MB
		// if (file.size > 1048576) {
			// return cb(new Error("File size exceeded"));
		// }
		let ext = path.extname(file.originalname);
		if (ext !== ".mp3") {
			return cb(new Error("Only .mp3 are allowed"));
		}
		cb(null, true);
	},
});

module.exports = {
  imageUpload,
  audioUpload,
}
