const Article = require('../models/Article');

const {
	createArticleImg,
	updateArticleImg,
	deleteArticleImg
} = require('../utils/articles');

class ArticleController {
	async getArticles(req, res) {
		try {
			const articles = await Article.find().sort({ _id: -1 });
			res.json(articles);
		} catch (e) {
			console.log(e);
		}
	}

	async createArticle(req, res) {
		try {
			const { files, body } = req;

			const newArticle = {
				title: body.title,
				text: body.text
			};

			const imageName = new Date().getTime() + '-' + files.image.name;
			newArticle.image = imageName;

			createArticleImg(imageName, files.image.data);

			const article = new Article(newArticle);
			await article.save();

			return res
				.status(200)
				.json({ message: 'Стаття успішно створена', article });
		} catch (e) {
			console.log(e);
		}
	}

	async updateArticle(req, res) {
		try {
			const article = await Article.findOne({ _id: req.params.id });
			const { files, body } = req;

			const updatedArticle = {
				title: body.title,
				text: body.text
			};

			if (files) {
				const imageName = new Date().getTime() + '-' + files.image.name;
				updatedArticle.image = imageName;
				updateArticleImg(imageName, files.image.data, article.image);
			}

			Object.assign(article, updatedArticle);
			await article.save();

			return res.status(200).json({ message: 'Стаття успішно змінена', article });
		} catch (e) {
			console.log(e);
		}
	}

	async deleteArticle(req, res) {
		try {
			const deletedArticle = await Article.findOneAndDelete({
				_id: req.params.id
			});

			deleteArticleImg(deletedArticle.image);

			return res.status(200).json({ message: 'Статья успешно удалена' });
		} catch (e) {
			console.log(e);
		}
	}
}

module.exports = new ArticleController();
