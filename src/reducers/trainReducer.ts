import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TrainType } from "../components/InputTrain/InputTypes"

type TrainState = {
  value: TrainType[]
}

const initialState: TrainState = {
  value: []
}

export const trainSlice = createSlice({
  name: 'train',
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<TrainType[]>) => {
      state.value = action.payload
    }
  }
})

export const { addData } = trainSlice.actions

export default trainSlice.reducer

