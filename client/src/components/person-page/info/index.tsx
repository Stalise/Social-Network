import { FC, useMemo } from "react";

import s from "./style.module.scss";
import { useAppSelector } from "hooks/redux";

import { Images } from './images';

export const Info: FC = () => {

   const { name, surname, username, birth, city } = useAppSelector(state => state.personSlice.data);
   const { posts, friends, photos } = useAppSelector(state => state.personSlice);

   const friendsCount = useMemo(() => {
      return friends.filter(elem => elem.status === "friend").length;
   }, [friends]);

   return (
      <div className={ s.wrapper }>
         <div className={ s.row1 }>
            <div className={ s.fullname }>
               <p className={ s.forename }>{ name }</p>
               <p className={ s.surname }>{ surname }</p>
            </div>
            <div className={ s.id }>id: { username }</div>
         </div>
         <div className={ s.row2 }>
            <div className={ s.age }>
               <p className={ s.ageTitle }>Date of birth: </p>
               <div className={ s.ageData }>
                  <p className={ s.ageDataNumber }>{ birth ? birth.slice(0, 4) : '' } /&nbsp;</p>
                  <p className={ s.ageDataNumber }>{ birth ? birth.slice(5, 7) : '' } /&nbsp;</p>
                  <p className={ s.ageDataNumber }>{ birth ? birth.slice(8, 10) : '' }</p>
               </div>
            </div>
            <div className={ s.city }>
               <p className={ s.cityTitle }>City: </p>
               <p className={ s.cityName }>{ city }</p>
            </div>
         </div>
         <div className={ s.row3 }>
            <div className={ s.infoItem }>
               <p className={ s.infoItemValue }>{ posts.length }</p>
               <p className={ s.infoItemTitle }>posts</p>
            </div>

            <div className={ s.infoItem }>
               <p className={ s.infoItemValue }>{ friendsCount }</p>
               <p className={ s.infoItemTitle }>friends</p>
            </div>

            <div className={ s.infoItem }>
               <p className={ s.infoItemValue }>{ photos.length }</p>
               <p className={ s.infoItemTitle }>photos</p>
            </div>
         </div>
         <Images />
      </div>
   );
};
