import React from "react";
import Calculator from "./containers/Calculator.jsx";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import examplesReducer from "./reducers/examples.js";

const store = createStore(examplesReducer);

const App = () => {
  return (
    <Provider store={store}>
      <Calculator />
    </Provider>
  )
};

export default App;