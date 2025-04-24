import React from "react";
import { Provider } from 'react-redux';
import { store } from './store';
import Home from './pages/Home';
import "./styles/theme.css";
import "./styles/App.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

export default App;
