import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useAppSelector } from 'hooks/redux';

import { Layout } from 'pages/layout';
import { MainPage } from 'pages/main-page';
import { AuthPage } from 'pages/auth-page';
import { FriendsPage } from 'pages/friends-page';
import { PersonPage } from 'pages/person-page';
import { MessagesPage } from 'pages/messages-page';
import { ChatPage } from 'pages/chat-page';
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
               <Route path="/:username" element={ <PersonPage /> } />
               <Route path="*" element={ <MainPage /> } />
            </Route>
            :
            <Route path="/" element={ <AuthPage /> } />
         }
      </Routes >
   );
};
