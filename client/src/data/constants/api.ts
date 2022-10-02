export enum Urls {
   // используется для доступа к картинкам которые хранятся в облаке cloudinary
   cloudinary_url = 'https://res.cloudinary.com/daggdfi3i/image/upload/',
   // урл сервера который развернут на heroku
   heroku_url = 'https://deploy-social.herokuapp.com/api/',
   // урл локального сервера который запускается из папки server
   local_url = 'http://localhost:8000/api/',
   // от этой переменной работают все апишки из папки client/src/api
   // по дефолту стоит heroku_url. при локальном запуске сервера нужно поставить local_url
   server_url = local_url,
   /*=======================================================================================*/
   user = 'user',
   userAuth = 'user/auth',
   userLogout = 'user/logout',
   post = 'post',
   like = 'post/like',
   friend = 'friend',
   chat = 'chat',
   person = 'person',
   person_posts = 'person/posts',
   person_friends = 'person/friends',
   person_photos = 'person/photos',
   photo = 'photo',
   message = 'chat/message',
   search = 'search',
   searchOne = 'search/one/',
};

export enum apiResponsesMessage {
   success = 'success',
   needAuth = 'Need authorization',
   notLogged = 'Not logged',
   unexpected = 'Unexpected error! Please try again later.',
   deleteFriend = 'User has been removed from friends.',
   requestExpired = 'The waiting time has expired, rejected by server. Please update the request.',
};
