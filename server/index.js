const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileupload = require('express-fileupload');
const helmet = require("helmet");
const compression = require("compression");
const app = express();
const petRouter = require('./routes/petRouter');
const authRouter = require('./routes/authRouter');
const articleRouter = require('./routes/articleRouter');
const appointmentRouter = require('./routes/appointmentRouter');
const { mongoURI } = require('./config');

const PORT = process.env.PORT || 8889;

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet())  //Пакет добавляет хедеры
app.use(compression())  //Сжимает статические файлы
app.use(fileupload());

app.use('/api', petRouter);
app.use('/api/articles', articleRouter);
app.use('/api/auth', authRouter);
app.use('/api/appointments', appointmentRouter);

const start = () => {
	try {
		mongoose.connect(mongoURI, {
			useUnifiedTopology: true,
			useNewUrlParser: true
		});

		const connection = mongoose.connection;

		connection.once('open', function () {
			console.log('MongoDB database connection established successfully');
		});

		app.listen(PORT, () => {
			console.log(`server started on port ${PORT}`);
		});
	} catch (e) {
		console.log(e);
	}
};

start();
