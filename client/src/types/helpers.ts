//! этот тип расширяет выбранный interface, чтобы его ключами могли быть строки
export type KeyType<T> = { [key: string]: T }

//! общий тип для аргумента data в функциях воркерах
export interface IWorker<T> {
   type: string,
   payload: T,
};
