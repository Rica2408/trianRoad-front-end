import { Dispatch, SetStateAction } from "react"

export type TrainType = {
  carName: number
  destination: string
  receiver: string
}

export type InputTrainProps = {
  elements: TrainType[] | undefined
  setCarTrain: Dispatch<SetStateAction<TrainType[] | undefined>>
}