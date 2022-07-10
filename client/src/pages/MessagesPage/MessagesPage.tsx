import { FC, useEffect } from "react";

import s from "./MessagesPage.module.scss";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { sagasConstantsChat, sagaActionCreator } from "mock/constants/saga";

import Chat from "components/MessagesPage/Chat/Chat";
import Empty from "components/MessagesPage/Empty/Empty";
import Loader from "components/Common/Loader/Loader";

const MessagesPage: FC = () => {

   const dispatch = useAppDispatch();
   const { chats, status } = useAppSelector(state => state.chatsSlice);

   useEffect(() => {
      dispatch(sagaActionCreator(sagasConstantsChat.SAGA_GET_CHATS));
   }, []);

   return (
      <div className={ s.wrapper }>
         <p className={ s.title }>My chats</p>

         { status === "pending" && <Loader /> }

         { status !== "pending" &&
            <div className={ s.container }>
               { !chats.length && <Empty /> }

               { chats.length > 0 &&
                  <>
                     { chats.map(elem => {
                        return <Chat data={ elem } key={ elem.id } />;
                     }) }
                  </>
               }
            </div>
         }
      </div>
   );
};

export default MessagesPage;
