import { Box, Button, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { useState } from "react"
import InputTrain from "../InputTrain"
import { TrainType } from '../InputTrain/InputTypes'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addData } from '../../reducers/trainReducer'

type DestinationTypes = 'Houston' | 'LA' | 'Chicago' | ''
type ReceiversTypes = 'UPS' | 'Old Dominion' | 'Fedex' | ''

const FormAddCar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [destination, setDestination] = useState<DestinationTypes>('')
  const [receiver, setReceiver] = useState<ReceiversTypes>('')
  const [carTrain, setCarTrain] = useState<TrainType[]>()

  const handlerDestination = (event: SelectChangeEvent<DestinationTypes>): void => {
    setDestination(event.target.value as DestinationTypes)
  }

  const handlerReceiver = (event: SelectChangeEvent<ReceiversTypes>): void => {
    setReceiver(event.target.value as ReceiversTypes)
  }

  const handlerOnClick = () => {
    setCarTrain(value => {
      const newCar: TrainType = {
        carName: value ? value.length + 1 : 1,
        destination,
        receiver,
      } 
      if (value) {
        return [...value, newCar]
      } else {
        return [newCar]
      }
    })
    setDestination('')
    setReceiver('')
  }

  const goToOrder = () => {
    if (carTrain) {
      dispatch(addData(carTrain))
    }
    navigate('/order')
  }

  return (
    <Box>
      <Box display='flex' flexDirection='row' justifyContent='center'>
        <Box style={{width: 300}}>
          <InputLabel id="select-label">Destination</InputLabel>
          <Select
            style={{width: 250}}
            labelId="select-label"
            id="demo-simple-select-helper"
            onChange={handlerDestination}
            value={destination}
          >
            <MenuItem value='Houston'>Houston</MenuItem>
            <MenuItem value='LA'>LA</MenuItem>
            <MenuItem value='Chicago'>Chicago</MenuItem>
          </Select>
        </Box>
        <Box style={{width: 300}}>
          <InputLabel id="select-label">Receiver</InputLabel>
          <Select
            style={{width: 250}}
            labelId="select-label"
            id="demo-simple-select-helper"
            onChange={handlerReceiver}
            value={receiver}
          >
            <MenuItem value='UPS'>UPS</MenuItem>
            <MenuItem value='Old Dominion'>Old Dominion</MenuItem>
            <MenuItem value='Fedex'>Fedex</MenuItem>
          </Select>
        </Box>
        <Button disabled={!destination || !receiver} onClick={handlerOnClick} >Add Car</Button>
      </Box>
      <InputTrain elements={carTrain} setCarTrain={setCarTrain} />
      <Button onClick={goToOrder}>Finish package</Button>
    </Box>
  )
}

export default FormAddCar
