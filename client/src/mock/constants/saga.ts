export const sagasConstants = {
   SAGA_CHECK_AUTH: "SAGA_CHECK_AUTH",
   SAGA_AUTH_USER: "SAGA_AUTH_USER",
   SAGA_REG_USER: "SAGA_REG_USER",
   SAGA_LOGOUT_USER: "SAGA_LOGOUT_USER",
   SAGA_GET_USER_DATA: "SAGA_GET_USER_DATA",
   SAGA_GET_USER_POSTS: "SAGA_GET_USER_POSTS",
   SAGA_CREATE_POST: "SAGA_CREATE_POST",
   SAGA_DELETE_POST: "SAGA_DELETE_POST",
   SAGA_POST_CREATE_LIKE: "SAGA_POST_CREATE_LIKE",
   SAGA_POST_DELETE_LIKE: "SAGA_POST_DELETE_LIKE",
};

export const sagaActionCreator = <T>(type: string, payload?: T): { type: string, payload?: T } => {
   return { type, payload };
};