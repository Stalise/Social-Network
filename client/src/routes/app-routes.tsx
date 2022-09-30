import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAppSelector } from 'hooks/redux';

import { AuthPage } from 'pages/auth-page';
import { ChatPage } from 'pages/chat-page';
import { FriendsPage } from 'pages/friends-page';
import { Layout } from 'pages/layout';
import { MainPage } from 'pages/main-page';
import { MessagesPage } from 'pages/messages-page';
import { PersonPage } from 'pages/person-page';
import { PhotosPage } from 'pages/photos-page';
import { SearchPage } from 'pages/search-page';

export const AppRoutes: FC = () => {

   const { isAuth } = useAppSelector(state => state.userSlice);

   return (
      <Routes>
         { isAuth
            ?
            <Route path="/" element={ <Layout /> }>
               <Route index element={ <MainPage /> } />
               <Route path="/messages" element={ <MessagesPage /> } />
               <Route path="/chat/:id" element={ <ChatPage /> } />
               <Route path="/friends" element={ <FriendsPage /> } />
               <Route path="/photos" element={ <PhotosPage /> } />
               <Route path="/search" element={ <SearchPage /> } />
               <Route path="/person/:username" element={ <PersonPage /> } />
               <Route path="*" element={ <Navigate to="/" replace /> } />
            </Route>
            :
            <Route path="/" element={ <AuthPage /> } />
         }
      </Routes>
   );
};
