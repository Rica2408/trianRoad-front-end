import { Box } from "@mui/material";
import FormAddCar from "./components/FormAddCar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OrderTrain from "./components/OrderTrain";
import { Provider } from "react-redux";
import { store } from './store'

const App = () => {
  return (
    <Provider store={store}>
      <Box style={{ width: '100%'}}>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<FormAddCar />}></Route>
          <Route path="/order" element={<OrderTrain />}></Route>
        </Routes>
      </BrowserRouter>
      </Box>
    </Provider>
  );
}

export default App;
