import { Slide } from 'react-toastify';

export const defaultToast = {
   autoClose: 7000,
   hideProgressBar: true,
   pauseOnHover: true,
   transition: Slide,
};

export const toastOrder = {
   autoClose: 7000,
   hideProgressBar: true,
   pauseOnHover: true,
   transition: Slide,
};

export enum messages {
   wrongEmail = 'Пользователя с таким email не существует.',
   wrongPassword = 'Введён неверный пароль.',
   orderFail = 'Чтобы оформить заказ нужно авторизоваться.',
   orderSuccess = 'Ваш заказ успешно принят и находится в обработке. Наш менеджер в скором времени свяжется с вами по телефону.',
}
