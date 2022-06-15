//! этот тип расширяет выбранный interface, чтобы его ключами могли быть строки
export type KeyType<T> = { [key: string]: T }

export interface IWorker<T> {
   type: string,
   payload: T
};

// interface IApi<T> {
//    [key: string]: T;
// }

// export type ApiType<T> = IApi<T> & {
//    message: string,
// }