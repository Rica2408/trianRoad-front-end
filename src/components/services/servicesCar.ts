import axios from "axios"
import { TrainType } from "../InputTrain/InputTypes"

const URL = 'http://localhost:8080/car'

type GetDestinationsType = {
  items: TrainType[]
}

export const getCarsService = async (): Promise<TrainType[] | null> => {
  try {
    const response = await axios.get<GetDestinationsType>(URL)
    return response.data.items
  } catch (error) {
    console.log(error)
    return null
  }
}

export const addCarService =  async (car: TrainType): Promise<TrainType | null> => {
  try {
    const response = await axios.post<TrainType>(URL, {
      nameOfCar: car.nameOfCar,
      receiver: car.receiver,
      destination: car.destination,
      id: car.id
    })

    return response.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const updateCarService = async (id: string, car: TrainType): Promise<TrainType | null> => {
  try {
    const response = await axios.put<TrainType>(`${URL}/${id}`, {
      nameOfCar: car.nameOfCar,
      receiver: car.receiver,
      destination: car.destination,
    })

    return response.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const deleteCarService = async (id: string): Promise<TrainType | null> => {
  try {
    const response = await axios.delete<TrainType>(`${URL}/${id}`)
    return response.data

  } catch (error) {
    console.log(error)
    return null
  }
}
