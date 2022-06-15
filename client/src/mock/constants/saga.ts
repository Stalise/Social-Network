export enum sagasConstantsUser {
   SAGA_CHECK_AUTH = "SAGA_CHECK_AUTH",
   SAGA_AUTH_USER = "SAGA_AUTH_USER",
   SAGA_REG_USER = "SAGA_REG_USER",
   SAGA_LOGOUT_USER = "SAGA_LOGOUT_USER",
   SAGA_GET_USER_DATA = "SAGA_GET_USER_DATA",
   SAGA_GET_ALL_PARAMS_USER = "SAGA_GET_ALL_PARAMS_USER",
};

export enum sagasConstantsPosts {
   SAGA_GET_USER_POSTS = "SAGA_GET_USER_POSTS",
   SAGA_USER_CREATE_POST = "SAGA_CREATE_POST",
   SAGA_USER_DELETE_POST = "SAGA_USER_DELETE_POST",
   SAGA_USER_POST_CREATE_LIKE = "SAGA_USER_POST_CREATE_LIKE",
   SAGA_USER_POST_DELETE_LIKE = "SAGA_USER_POST_DELETE_LIKE",
};

export enum sagasConstantsFriend {
   SAGA_GET_FRIENDS = "SAGA_GET_FRIENDS",
   SAGA_CREATE_FRIEND = "SAGA_CREATE_FRIEND",
   SAGA_ACCEPT_FRIEND = "SAGA_ACCEPT_FRIEND",
   SAGA_DELETE_FRIEND = "SAGA_DELETE_FRIEND",
}

export enum sagasConstantsChat {
   SAGA_CREATE_CHAT = "SAGA_CREATE_CHAT",
   SAGA_GET_CHATS = "SAGA_GET_CHATS",
   SAGA_DELETE_CHAT = "SAGA_DELETE_CHAT",
}

export enum sagasConstantsPerson {
   SAGA_GET_PERSON_DATA = "SAGA_GET_PERSON_DATA",
   SAGA_GET_PERSON_POSTS = "SAGA_GET_PERSON_POSTS",
   SAGA_GET_ALL_PARAMS_PERSON = "SAGA_GET_ALL_PARAMS_PERSON",
   SAGA_PERSON_POST_CREATE_LIKE = "SAGA_POST_CREATE_LIKE",
   SAGA_PERSON_POST_DELETE_LIKE = "SAGA_POST_DELETE_LIKE",
};

export const sagaActionCreator = <T>(type: string, payload?: T): { type: string, payload?: T } => {
   return { type, payload };
};