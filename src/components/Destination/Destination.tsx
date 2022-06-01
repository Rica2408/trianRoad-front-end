import { HighlightOff, Edit, Check, Close } from "@mui/icons-material"
import { 
  Box,
  Button,
  DialogActions,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from "@mui/material"

import { ChangeEvent, useEffect, useState } from "react"
import { clone } from 'ramda'
import { Dialog } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { addDestiantionService, deleteDestinationService, getDestinationsService, updateDestinationService } from "../services/servicesDestination";

type DestinationType = {
  id: string
  destination: string
  readOnly?: boolean
}

const Destiantion = () => {
  const [destinations, setDestinations] = useState<DestinationType[]>([])
  const [auxDestinations, setAuxDestinations] =  useState<DestinationType[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [newDestination, setNewDestination] = useState('')
  const navigate = useNavigate()

  const getDataOfDataBase = async (): Promise<DestinationType[] | []> => {
    const response = await getDestinationsService()
    response?.forEach(x => {
      x.readOnly = true
    })
    return response ?? []
  }

  const updateDestination = (e: ChangeEvent<HTMLInputElement>, destination: string) => {
    setDestinations(value => {
      const auxValue = [...value]
      const findDestination = auxValue.find(x => x.destination === destination)
      if (findDestination) {
        findDestination.destination = e.target.value
      }
      return [...auxValue]
    })
  }

  const enabledInput = (destination: string) => {
    setDestinations(value => {
      setAuxDestinations(clone(value))
      const input = document.getElementById(destination)
      if (input) {
        input.focus()
      }
      const auxDestination = [...value]
      const findDestination = auxDestination.find(x => x.destination === destination)
      if (findDestination) {
        findDestination.readOnly = false
      }

      return auxDestination
    })
  }

  const addNewDestination = async() => {
    const data = await addDestiantionService(newDestination)
    if (data) {
      setOpenDialog(false)
      setDestinations(value => [...value, { destination: data?.destination, readOnly: true, id: data.id ? data.id : ''}])
    }
    setNewDestination('')
  }

  const cancelDestination = () => {
    setDestinations(auxDestinations)
  }

  const saveUpdateDestination = async (id: string) => {
    const destination = destinations.find(x => !x.readOnly)?.destination
    const res =  await updateDestinationService(id, destination as string)

    if(res) {
      setDestinations(value => {
        const auxValue = [...value]
        auxValue.forEach(x => {
          if (!x.readOnly) {
            x.readOnly = true
          }
        })
  
        return auxValue
      })
    } else {
      setDestinations([...auxDestinations])
    }
  }

  const deleteDestination = async (id: string) => {
    const res = await deleteDestinationService(id)
    if (res) {
      setDestinations(value => {
        const auxValue = [...value]
        const indexDelete = auxValue.findIndex(x => x.id === id)
        auxValue.splice(indexDelete, 1)
  
        return auxValue
      })
    }
  }

  useEffect(() => {
    const fetchGetDestination = async () => {
      const res = await getDataOfDataBase()
      setDestinations(res)
    
    }
    fetchGetDestination()
    
  },[])

  return(
    <Box>
      <Dialog
        open={openDialog}
      >
        <DialogContent>
          <TextField 
            label='Destination'
            value={newDestination}
            onChange={e => setNewDestination(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={() => addNewDestination()}>add destination</Button>
        </DialogActions>
      </Dialog>
      <Box>
        <Box display='flex' justifyContent='space-around' marginTop={5}>
          <Button onClick={() => navigate('/')}>Go back</Button>
          <Button onClick={() => setOpenDialog(true)}>Add new destination</Button>
        </Box>
        <TableContainer style={{display: 'flex', justifyContent: 'center'}}>
          <Table sx={{ width: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Destination</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {destinations.map((element, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, width: 650 }}
                >
                  <TableCell component="th" scope="row">
                    <input 
                      id={element.destination}
                      onChange={e => updateDestination(e, element.destination)}
                      style={{border: element.readOnly ? 0 : 'solid'}}
                      value={element.destination}
                      readOnly={element.readOnly}>
                    </input>
                  </TableCell>
                  <TableCell align="right">
                    {element.readOnly ?
                      <Box display='flex' justifyContent='right'>
                        <Button disabled={destinations.some(x => x.readOnly === false)} onClick={() => enabledInput(element.destination)}>
                          <Edit/>
                        </Button>
                        <Button disabled={destinations.some(x => x.readOnly === false)} onClick={() => deleteDestination(element.id) }>
                          <HighlightOff />
                        </Button>
                      </Box> :
                      <Box display='flex' justifyContent='right'>
                        <Button onClick={() => saveUpdateDestination(element.id)}>
                          <Check />
                        </Button>
                        <Button onClick={() => cancelDestination()}>
                          <Close />
                        </Button>
                      </Box>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default Destiantion