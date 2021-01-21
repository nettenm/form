import React from "react";
import Provider from "react-redux/es/components/Provider";
import AddSupplier from "./components/Supplier/AddSupplier";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <AddSupplier />
    </Provider>
  );
}

export default App;
