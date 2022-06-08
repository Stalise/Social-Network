//! этот тип расширяет выбранный interface, чтобы его ключами могли быть строки
export type KeyType<T> = { [key: string]: T }