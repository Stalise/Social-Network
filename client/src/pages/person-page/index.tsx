import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";

import s from "./style.module.scss";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { sagasConstantsPerson, sagaActionCreator } from "data/constants/saga";

import { Avatar } from "components/person-page/avatar";
import { Actions } from "components/person-page/actions";
import { Info } from "components/person-page/info";
import { Posts } from "components/person-page/posts";
import { Loader } from "components/common/loader";

export const PersonPage: FC = () => {

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
            <Info />
         </div>
         <div>
            <Posts />
         </div>
      </div>
   );
};
