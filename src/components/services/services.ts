import axios from "axios";
import { TrainType } from "../InputTrain/InputTypes";

const URL = 'http://localhost:8080'

type ParametersType = {
  orderDestination: string[]
  orderReceiver: string[]
}

export const getOrderData = async (data: TrainType[], parameter: ParametersType) => {
  try {
   
    const response = await axios.post(`${URL}/test`, {
      data,
      parameter
    }, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
      }
    })
    console.log(response);
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