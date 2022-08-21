import { FC, useState } from 'react';

import { useAppDispatch } from 'hooks/redux';
import { changeAuthUserAction } from "store/slices/user-slice";
import { userApi } from 'api/search-api/index';
import { apiResponsesMessage } from "data/constants/api";
import { ISearchUser } from 'types/common';

import s from './style.module.scss';

interface IProps {
   setUsers: (arg: ISearchUser[]) => void,
   setIsLoading: (arg: boolean) => void,
}

export const Search: FC<IProps> = ({ setUsers, setIsLoading }) => {

   const dispatch = useAppDispatch();

   const [field, setField] = useState('');

   const findAllHandler = () => {
      //TODO: сделать поиск всех пользователей
   };

   const findOneHandler = async () => {
      setUsers([]);
      setIsLoading(true);

      const response: string | ISearchUser = await userApi.findUser(field);

      if (response === apiResponsesMessage.needAuth) {
         dispatch(changeAuthUserAction(false));
      } else if (typeof response !== 'string') {
         setUsers([response]);
      }

      setIsLoading(false);
   };

   return (
      <div className={ s.wrapper }>
         <button className={ s.buttonAll } onClick={ findAllHandler }>All</button>

         <input
            className={ s.field }
            onChange={ e => setField(e.target.value) }
            value={ field }
            type="text"
            placeholder="Write id"
         />

         <button className={ s.buttonOne } onClick={ findOneHandler }>Search</button>
      </div>
   );
};
