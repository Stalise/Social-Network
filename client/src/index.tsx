import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { store } from 'store/store';

import { App } from 'components/common/app';

import './assest/styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);

root.render(
   <Provider store={ store }>
      <Router>
         <App />
         <ToastContainer limit={ 3 } />
      </Router>
   </Provider>,
);

