import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useAppSelector } from 'hooks/redux';

import Layout from 'pages/Layout/Layout';
import MainPage from 'pages/MainPage/MainPage';
import AuthPage from 'pages/AuthPage/AuthPage';
import FriendsPage from 'pages/FriendsPage/FriendsPage';
import PersonPage from 'pages/PersonPage/PersonPage';


const AppRoutes: FC = () => {

   const { isAuth } = useAppSelector(state => state.userSlice);

   return (
      <Routes>
         {isAuth
            ?
            <Route path="/" element={<Layout />}>
               <Route index element={<MainPage />} />
               <Route path="/friends" element={<FriendsPage />} />
               <Route path="/:username" element={<PersonPage />} />
               <Route path="*" element={<MainPage />} />
            </Route>
            :
            <Route path="/" element={<AuthPage />}>
               <Route path="*" element={<AuthPage />} />
            </Route>
         }
      </Routes >
   );
};

export default AppRoutes;