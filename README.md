1. Скачать NodeJS - https://nodejs.org/uk/

2. Проверить, что он успешно установился. Для этого:
	- Открыть Командную строку (на винде слева снизу в поиске ввести "cmd" или "Командная строка");
	- Ввести "node -v", потом "npm -v" (просто проверить версии. Если вылазят - значит все работает).

3. Открыть два консольных окна рядом (в одном перейти в папку client, во втором - в папку server).

4. Чтобы перейти в папку на винде - "cd /Название_папки" - вот так переходить;

5. В первом окне (в папке client) ввести:
	- npm i (ждать загрузку);
	- npm run start (ждать запуск. Фронт должен открыться во вкладке браузера. Если не открылся, в url строку вписать "localhost:8080").

6. Во втором окне (в папке server) ввести:
	- npm i (ждать загрузку);
	- npm run dev (ждать запуск. Должно отобразиться, что сервер запущен).

7. Готово !!!
