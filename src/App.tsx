import React from 'react';
import { HashRouter } from 'react-router-dom';
import Router from './router';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import store from '@/store';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#00ABBD',
            },
          }}
        >
          <Router />
        </ConfigProvider>
      </HashRouter>
    </Provider>
  );
}

export default App;
