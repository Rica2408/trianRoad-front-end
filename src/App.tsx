import { Box } from "@mui/material";
import FormAddCar from "./components/FormAddCar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OrderTrain from "./components/OrderTrain";
import { Provider } from "react-redux";
import { store } from './store'
import Receiver from "./components/Receiver"
import Destination from "./components/Destination";
import LandingPage from "./pages/LandingPage";

const App = () => {
  return (
    <Provider store={store}>
      <Box style={{ width: '100%'}}>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/order" element={<OrderTrain />}></Route>
          <Route path="/destination" element={<Destination />}></Route>
          <Route path="/receiver" element={<Receiver />}></Route>
          <Route path="/cars" element={<FormAddCar />}></Route>
        </Routes>
      </BrowserRouter>
      </Box>
    </Provider>
  );
}

export default App;
