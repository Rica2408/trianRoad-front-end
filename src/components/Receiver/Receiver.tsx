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
import { addReceiverService, deleteReceiverService, getReceiversService, updateReceiverService } from "../services/servicesReceiver";

type ReceiverType = {
  id: string
  receiver: string
  readOnly?: boolean
}

const Receiver = () => {
  const [receivers, setReceivers] = useState<ReceiverType[]>([])
  const [auxReceivers, setAuxReceivers] =  useState<ReceiverType[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [newReceiver, setNewReceiver] = useState('')
  const navigate = useNavigate()

  const getDataOfDataBase = async (): Promise<ReceiverType[] | []> => {
    const response = await getReceiversService()
    response?.forEach(x => {
      x.readOnly = true
    })
    return response ?? []
  }

  const updateReceiver = (e: ChangeEvent<HTMLInputElement>, receiver: string) => {
    setReceivers(value => {
      const auxValue = [...value]
      const findReceiver = auxValue.find(x => x.receiver === receiver)
      if (findReceiver) {
        findReceiver.receiver = e.target.value
      }
      return [...auxValue]
    })
  }

  const enabledInput = (receiver: string) => {
    setReceivers(value => {
      setAuxReceivers(clone(value))
      const input = document.getElementById(receiver)
      if (input) {
        input.focus()
      }
      const auxReceiver = [...value]
      const findReceiver = auxReceiver.find(x => x.receiver === receiver)
      if (findReceiver) {
        findReceiver.readOnly = false
      }

      return auxReceiver
    })
  }

  const addNewReceiver = async() => {
    const data = await addReceiverService(newReceiver)
    if (data) {
      setOpenDialog(false)
      setReceivers(value => [...value, { receiver: data?.receiver, readOnly: true, id: data.id ? data.id : ''}])
    }
    setNewReceiver('')
  }

  const cancelReceiver = () => {
    setReceivers(auxReceivers)
  }

  const saveUpdateReceiver = async (id: string) => {
    const receiver = receivers.find(x => !x.readOnly)?.receiver
    const res =  await updateReceiverService(id, receiver as string)

    if(res) {
      setReceivers(value => {
        const auxValue = [...value]
        auxValue.forEach(x => {
          if (!x.readOnly) {
            x.readOnly = true
          }
        })
  
        return auxValue
      })
    } else {
      setReceivers([...auxReceivers])
    }
  }

  const deleteReceiver = async (id: string) => {
    const res = await deleteReceiverService(id)
    if (res) {
      setReceivers(value => {
        const auxValue = [...value]
        const indexDelete = auxValue.findIndex(x => x.id === id)
        auxValue.splice(indexDelete, 1)
  
        return auxValue
      })
    }
  }

  useEffect(() => {
    const fetchGetReceiver = async () => {
      const res = await getDataOfDataBase()
      setReceivers(res)
    
    }
    fetchGetReceiver()
    
  },[])

  return(
    <Box>
      <Dialog
        open={openDialog}
      >
        <DialogContent>
          <TextField 
            label='Receiver'
            value={newReceiver}
            onChange={e => setNewReceiver(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={() => addNewReceiver()}>add receiver</Button>
        </DialogActions>
      </Dialog>
      <Box>
        <Box display='flex' justifyContent='space-around' marginTop={5}>
          <Button onClick={() => navigate('/')}>Go back</Button>
          <Button onClick={() => setOpenDialog(true)}>Add new receiver</Button>
        </Box>
        <TableContainer style={{display: 'flex', justifyContent: 'center'}}>
          <Table sx={{ width: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Receiver</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {receivers.map((element, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, width: 650 }}
                >
                  <TableCell component="th" scope="row">
                    <input 
                      id={element.receiver}
                      onChange={e => updateReceiver(e, element.receiver)}
                      style={{border: element.readOnly ? 0 : 'solid'}}
                      value={element.receiver}
                      readOnly={element.readOnly}>
                    </input>
                  </TableCell>
                  <TableCell align="right">
                    {element.readOnly ?
                      <Box display='flex' justifyContent='right'>
                        <Button disabled={receivers.some(x => x.readOnly === false)} onClick={() => enabledInput(element.receiver)}>
                          <Edit/>
                        </Button>
                        <Button disabled={receivers.some(x => x.readOnly === false)} onClick={() => deleteReceiver(element.id) }>
                          <HighlightOff />
                        </Button>
                      </Box> :
                      <Box display='flex' justifyContent='right'>
                        <Button onClick={() => saveUpdateReceiver(element.id)}>
                          <Check />
                        </Button>
                        <Button onClick={() => cancelReceiver()}>
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

export default Receiver