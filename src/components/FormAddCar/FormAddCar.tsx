import { Box, Button, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { useEffect, useState } from "react"
import InputTrain from "../InputTrain"
import { TrainType } from '../InputTrain/InputTypes'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addData } from '../../reducers/trainReducer'
import { getDestinationsService } from "../services/servicesDestination";
import { getReceiversService } from "../services/servicesReceiver";
import { addCarService, getCarsService } from "../services/servicesCar";

const FormAddCar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [destination, setDestination] = useState('')
  const [receiver, setReceiver] = useState('')
  const [carTrain, setCarTrain] = useState<TrainType[]>()
  const [listDestination, setLisDestination] = useState<string[]>([])
  const [listReceiver, setLisReceiver] = useState<string[]>([])

  const handlerDestination = (event: SelectChangeEvent<string>): void => {
    setDestination(event.target.value)
  }

  const handlerReceiver = (event: SelectChangeEvent<string>): void => {
    setReceiver(event.target.value)
  }

  const handlerOnClick = async () => {
    const res = await addCarService({
      nameOfCar: carTrain ? (carTrain.length + 1).toString() : '0',
      destination: destination,
      receiver: receiver
    })

    if (res) {
      setCarTrain(value => {
        const newCar: TrainType = {
          nameOfCar: value ? (value.length + 1).toString() : '1',
          destination,
          receiver,
          id: res.id
        } 
        if (value) {
          return [...value, newCar]
        } else {
          return [newCar]
        }
      })
    }
    setDestination('')
    setReceiver('')
  }

  const goToOrder = () => {
    if (carTrain) {
      dispatch(addData(carTrain))
    }
    navigate('/order')
  }

  useEffect(() => {
    const resCars = async () => {
      const dataCars = await getCarsService()
      if (dataCars) {
        setCarTrain(dataCars)
      }
    }
    const resDestination = async() => {
      const dataDestination = await getDestinationsService()
      if (dataDestination) {
        const transformDestiantion = dataDestination.map(x => {
          return x.destination
        })
        setLisDestination(transformDestiantion)
      }
    }

    const resReceiver = async() => {
      const dataReceiver = await getReceiversService()
      if (dataReceiver) {
        const transformReceiver = dataReceiver.map(x => {
          return x.receiver
        })
        setLisReceiver(transformReceiver)
      }
    }

    resCars()
    resDestination()
    resReceiver()
  },[])

  return (
    <Box>
      <Box display='flex' flexDirection='row' justifyContent='center' marginTop={10}>
        <Box style={{width: 300}}>
          <InputLabel id="select-label">Destination</InputLabel>
          <Select
            style={{width: 250}}
            labelId="select-label"
            id="demo-simple-select-helper"
            onChange={handlerDestination}
            value={destination}
          >
            {listDestination.map(x => (
              <MenuItem key={x} value={x}>{x}</MenuItem>
            ))}
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
            {listReceiver.map(x => (
              <MenuItem key={x} value={x}>{x}</MenuItem>
            ))}
          </Select>
        </Box>
        <Button disabled={!destination || !receiver} onClick={handlerOnClick} >Add Car</Button>
      </Box>
      <InputTrain elements={carTrain} setCarTrain={setCarTrain} />
      <Box display='flex' justifyContent='center'>
        <Button onClick={goToOrder}>Finish package</Button>
      </Box>
    </Box>
  )
}

export default FormAddCar
