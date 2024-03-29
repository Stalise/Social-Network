### [Social-network - Fullstack SPA приложение на React/TS/NodeJs/PostgreSQL.](https://stalise-social-network.netlify.app)
[![Netlify Status](https://api.netlify.com/api/v1/badges/a968a3d3-00be-4277-96e7-dfcfc429a724/deploy-status?branch=main)](https://app.netlify.com/sites/stalise-social-network/deploys)

Приложение предоставляет функционал социальной сети. Разработан: дизайн, фронтенд, бекенд, архитектура таблиц в базе данных. Деплой фронтенда на Netlify, а бекенда на Heroku.
Верстка адаптивно-отзывчивая до 320px.

##### Функционал включает в себя:
* Страницы пользователей и своя.
* Регистрация/вход пользователя (jwt access + refresh).
* Редактирование профиля.
* Добавление в друзья (имеет несколько стадий).
* Создание/удаление постов.
* Добавление картинок в профиль или к постам.
* Лайки.
* Отправка и принятие сообщений в реальном времени (long polling).
* Показ новостей (постов людей которые у вас в друзьях).
* Поиск пользователей по id.

##### Стек фронтенда:
* HTML
* SCSS(modules)
* TS
* React, Formik
* Redux Toolkit, Redux-saga
* Husky, Eslint, Stylelint

##### Стек бекенда:
* NodeJs
* ExpressJs
* JWT
* PostgreSQL
* Cloudinary (облачное хранилище изображений)
* RESTfull API

##### Обзор:
![screenshots](./client/public/images/SOCIAL_FON.png)

Кто досмотрел до конца - тот молодец 👍
Если нет желания регистрироваться, тестовые данные для входа:
username - testacc
password - checkwork5
