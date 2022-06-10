import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useAppSelector } from 'hooks/redux';

import Layout from 'pages/Layout/Layout';
import MainPage from 'pages/MainPage/MainPage';
import AuthPage from 'pages/AuthPage/AuthPage';


const AppRoutes: FC = () => {

   const { isAuth } = useAppSelector(state => state.personSlice);

   return (
      <Routes>
         {isAuth
            ?
            <Route path="/" element={<Layout />}>
               <Route index element={<MainPage />} />
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