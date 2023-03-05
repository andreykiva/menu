const path = require('path');
const fs = require('fs');

const PATH_TO_IMAGES = path.join(__dirname, '..', 'images', 'articles');

const createArticleImg = (imageName, data) => {
	fs.writeFileSync(path.join(PATH_TO_IMAGES, imageName), data);
};

const updateArticleImg = (imageName, data, oldImg) => {
	createArticleImg(imageName, data);
	deleteArticleImg(oldImg);
};

const deleteArticleImg = (imageName) => {
	if (fs.existsSync(path.join(PATH_TO_IMAGES, imageName))) {
		fs.unlink(path.join(PATH_TO_IMAGES, imageName), (err) => {
			if (err) throw err;
		});
	}
};

module.exports = { createArticleImg, updateArticleImg, deleteArticleImg };
