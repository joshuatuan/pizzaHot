import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* react setup step 3: use the provider component to provide the stuff through out the whole app  */}
      <App />
    </Provider>
  </React.StrictMode>
);
