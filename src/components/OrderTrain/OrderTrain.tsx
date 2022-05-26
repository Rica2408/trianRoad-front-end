import { Button } from "@mui/material"
import { Box } from "@mui/system"
import { Dispatch, SetStateAction, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store"

type ButtonType = {
  name: string
  disable: boolean
}

const OrderTrain = () => {
  const train = useSelector((state: RootState) => state.train)

  const [finalOrderDestination, setFinalOrderDestination] = useState<string[]>([])
  const [finalOrderReceiver, setFinalOrderReceiver] = useState<string[]>([])

  const [orderDestination, setOrderDestination] = useState<ButtonType[]>([
    {
      name: 'Houston',
      disable: false
    },
    {
      name: 'LA',
      disable: false
    },
    {
      name: 'Chicago',
      disable: false
    }
  ])

  const [orderReceiver, setOrderReceiver] = useState<ButtonType[]>([
    {
      name: 'UPS',
      disable: false
    },
    {
      name: 'Old Dominion',
      disable: false
    },
    {
      name: 'Fedex',
      disable: false
    }
  ])

  const handlerDisabled = (name: string, setOrderDestination: Dispatch<SetStateAction<ButtonType[]>>, setFinalOrder: Dispatch<SetStateAction<string[]>>) => {
    setOrderDestination(value => {
      const aux = [...value]
      aux.forEach(x => {
        if (x.name === name) {
          x.disable = true
        }
      })
      return aux
    })
    setFinalOrder(value => [...value, name])
  }

  const cleanFilter = (setOrder: Dispatch<SetStateAction<ButtonType[]>>, setFinalOrder: Dispatch<SetStateAction<string[]>>) => {
    setFinalOrder([])
    setOrder(value => {
      const aux = [...value]
      aux.forEach(x => {
        x.disable = false
      })

      return aux
    })
  }
  
  return (
    <Box style={{display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
      <Box style={{display: 'flex', width: '90%', height: 125, justifyContent: 'space-around', marginTop: 50, borderStyle: 'solid', borderWidth: 2, borderRadius: 10}}>
        <Box width='45%'>
          <Box style={{padding: 5, display: 'flex'}}>
            <Box style={{width: 200}}>Order Destination: </Box>
            <Box style={{width: '100%', display: 'flex', flexDirection: 'row'}}>{finalOrderDestination.map(x => (
              <Box key={x} style={{marginLeft: 10, borderStyle: 'solid', borderWidth: 2, borderRadius: 10, alignSelf: 'center', padding: 2}}>{x}</Box>
              ))}
              {finalOrderDestination.length ? <Button onClick={() => cleanFilter(setOrderDestination, setFinalOrderDestination)}>Clean</Button> : <></>}
            </Box>
          </Box>
          {orderDestination.map(button => (
            <Button disabled={button.disable} key={button.name} onClick={() => handlerDisabled(button.name, setOrderDestination, setFinalOrderDestination)}>{button.name}</Button>
          ))}
        </Box>

        <Box width='45%'>
        <Box style={{padding: 5, display: 'flex'}}>
            <Box style={{width: 200}}>Order Receiver: </Box>
            <Box style={{width: '100%', display: 'flex', flexDirection: 'row'}}>{finalOrderReceiver.map(x => (
              <Box key={x} style={{marginLeft: 10, borderStyle: 'solid', borderWidth: 2, borderRadius: 10, alignSelf: 'center', padding: 2}}>{x}</Box>
              ))}
              {finalOrderReceiver.length ? <Button onClick={() => cleanFilter(setOrderReceiver, setFinalOrderReceiver)}>Clean</Button> : <></>}
              
            </Box>
          </Box>
          {orderReceiver.map(button => (
            <Button disabled={button.disable} key={button.name}onClick={() => handlerDisabled(button.name, setOrderReceiver, setFinalOrderReceiver)}>{button.name}</Button>
          ))}
        </Box>
      </Box>
      <Button>Order</Button>
    </Box>
  )
}

export default OrderTrain