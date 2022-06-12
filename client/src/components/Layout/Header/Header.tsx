import { FC } from "react";
import { Link } from 'react-router-dom';

import s from "./Header.module.scss";
import { useAppDispatch } from "hooks/redux";
import { sagasConstantsUser, sagaActionCreator } from "mock/constants/saga";

import Editing from "./EditingForm/EditingForm";

const Header: FC = () => {

   const dispatch = useAppDispatch();

   return (
      <div className={s.header}>
         <div className={s.container}>
            <div className={s.exit}>
               <button
                  onClick={() => dispatch(sagaActionCreator(sagasConstantsUser.SAGA_LOGOUT_USER))}
                  type="button"
                  className={s.exitButton}
               >
                  Exit
               </button>
            </div>

            <Link to="/" className={s.logo}>
               <div className={s.logoIcon}></div>
               <p className={s.logoText}>Social network</p>
            </Link>

            <Editing />
         </div>
      </div>
   );
};

export default Header;