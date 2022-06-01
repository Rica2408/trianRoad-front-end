import axios from "axios";
import { TrainType } from "../InputTrain/InputTypes";

const URL = 'http://localhost:8080'

export const getOrderData = async (cars: TrainType[], destinations: string[], receivers: string[]) => {
  try {
    const response = await axios.post(`${URL}/operations`, {
      cars,
      destinations,
      receivers
    })
    console.log(response);

    return response.data
  } catch (error) {
    console.error(error);
  }
}

export async function getUser() {
  try {
    const response = await axios.get(`${URL}/test`);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}