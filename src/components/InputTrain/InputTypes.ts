import { Dispatch, SetStateAction } from "react"

export type TrainType = {
  nameOfCar: string
  destination: string
  receiver: string
  id?: string
}

export type InputTrainProps = {
  elements: TrainType[] | undefined
  setCarTrain: Dispatch<SetStateAction<TrainType[] | undefined>>
}