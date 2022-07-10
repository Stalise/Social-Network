export enum Urls {
   cloudinary_url = "https://res.cloudinary.com/daggdfi3i/image/upload/",
   server_url = "http://localhost:8000/api/",
   user = "user",
   userAuth = "user/auth",
   userLogout = "user/logout",
   post = "post",
   like = "post/like",
   friend = "friend",
   chat = "chat",
   message = "chat/message"
};

export enum apiResponsesMessage {
   success = "success",
   needAuth = "Need authorization",
   notLogged = "Not logged",
   unexpected = "Unexpected error! Please try again later.",
   deleteFriend = "User has been removed from friends.",
   requestExpired = "The waiting time has expired, rejected by server. Please update the request.",
};
