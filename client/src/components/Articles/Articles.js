import React, { useEffect, useState, useContext } from 'react';
import axios from '../../axios-pets';
import styles from './Articles.module.css';
import Loader from '../UI/Loader/Loader';
import Article from './Article/Article';
import EditedArticle from './EditedArticle/EditedArticle';
import AddImg from '../../assets/icons/add.svg';
import { AuthContext } from '../../context/auth/authContext';

const Articles = () => {
	const { roles } = useContext(AuthContext);
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(false);
	const [editedArticle, setEditedArticle] = useState(null);

	useEffect(async () => {
		const articleList = await getArticles();

		setArticles(articleList);
		setLoading(false);
	}, []);

	const getArticles = async () => {
		setLoading(true);

		const { data } = await axios.get('/articles', {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('token')
			}
		});
		return data;
	};

	const deleteArticle = async (id) => {
		try {
			await axios.delete(`/articles/${id}`, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token')
				}
			});
			const articlesToKeep = articles.filter((article) => article._id !== id);

			if (articles.length > articlesToKeep.length) {
				setArticles(articlesToKeep);
			}
		} catch (e) {
			throw new Error('Не вдалося видалити статтю');
		}
	};

	const startEditArticle = (id) => {
		window.scrollTo(0, 0);
		
		const activeArticle = articles.find((article) => article._id == id);

		if (activeArticle) {
			setEditedArticle(activeArticle);
		}
	};

	const createArticle = () => {
		setEditedArticle({ title: 'Назва', text: `Текст`, image: '' });
	};

	const edit = async (id, title, text, image) => {
		const formData = new FormData();

		formData.append('title', title);
		formData.append('text', text);
		formData.append('image', image);

		try {
			const { data } = await axios.put(`/articles/${id}`, formData, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token')
				}
			});

			const activeArticles = JSON.parse(JSON.stringify(articles));
			const activeArticle = activeArticles.find((article) => article._id == id);

			if (activeArticle) {
				activeArticle.title = data.article.title;
				activeArticle.text = data.article.text;
				activeArticle.image = data.article.image;

				setArticles(activeArticles);
				setEditedArticle(null);
			}
		} catch (e) {
			throw new Error('Не вдалося змінити статтю');
		}
	};

	const create = async (title, text, image) => {
		if (!image) return;

		const formData = new FormData();

		formData.append('title', title);
		formData.append('text', text);
		formData.append('image', image);

		try {
			const { data } = await axios.post(`/articles/create`, formData, {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token')
				}
			});

			const activeArticles = JSON.parse(JSON.stringify(articles));
			activeArticles.unshift(data.article);

			setArticles(activeArticles);
			setEditedArticle(null);
		} catch (e) {
			throw new Error('Не вдалося додати статтю');
		}
	};

	const saveArticle = (id, title, text, image) => {
		if (!title || !text) return;

		if (id) {
			edit(id, title, text, image);
		} else {
			create(title, text, image);
		}
	};

	const adminAddBtn = (
		<button className={styles.AdminAddBtn} onClick={createArticle}>
			<img className={styles.AddBtnImg} src={AddImg} alt="Створити" />
		</button>
	);

	if (loading) {
		return <Loader />;
	}

	return (
		<div className={styles.Articles}>
			{editedArticle ? (
				<EditedArticle
					title={editedArticle.title}
					image={editedArticle.image}
					id={editedArticle._id ? editedArticle._id.toString() : ''}
					saveArticle={saveArticle}
				>
					{editedArticle.text}
				</EditedArticle>
			) : articles.length ? (
				articles.map((article) => (
					<Article
						key={article._id}
						title={article.title}
						image={article.image}
						id={article._id.toString()}
						isAdmin={roles.includes('ADMIN')}
						deleteArticle={deleteArticle}
						startEditArticle={startEditArticle}
					>
						{article.text}
					</Article>
				))
			) : (
				<span>Ничего нет</span>
			)}

			{roles.includes('ADMIN') && !editedArticle && adminAddBtn}
		</div>
	);
};

export default Articles;
