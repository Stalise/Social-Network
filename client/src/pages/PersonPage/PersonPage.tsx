import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";

import s from "./PersonPage.module.scss";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { sagasConstantsPerson, sagaActionCreator } from "mock/constants/saga";

import Avatar from "components/PersonPage/Avatar/Avatar";
import Actions from "components/PersonPage/Actions/Actions";
import UserInfo from "components/PersonPage/PersonInfo/PersonInfo";
import Posts from "components/PersonPage/Posts/Posts";
import Loader from "components/Common/Loader/Loader";

const PersonPage: FC = () => {

   const params = useParams();
   const dispatch = useAppDispatch();
   const { status } = useAppSelector(state => state.personSlice);

   useEffect(() => {
      dispatch(sagaActionCreator<string>(sagasConstantsPerson.SAGA_GET_ALL_PARAMS_PERSON, params.username));
   }, [params]);

   if (status === "data") return <Loader />;

   return (
      <div className={ s.wrapper }>
         <div className={ s.info }>
            <div className={ s.actions }>
               <Avatar />
               <Actions />
            </div>
            <UserInfo />
         </div>
         <div>
            <Posts />
         </div>
      </div>
   );
};

export default PersonPage;
