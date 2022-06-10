export enum Urls {
   cloudinary_url = "https://res.cloudinary.com/daggdfi3i/image/upload/",
   server_url = "http://localhost:8000/api/",
   user = "user",
   userAuth = "user/auth",
   userLogout = "user/logout",
   post = "post",
   like = "post/like"
};

export enum apiResponsesMessage {
   success = "success",
   needAuth = "Need authorization",
   notLogged = "Not logged",
   unexpected = "Unexpected error! Please try again later.",
};