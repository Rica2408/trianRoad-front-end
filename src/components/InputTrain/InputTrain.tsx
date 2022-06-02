import { FC } from "react"
import { InputTrainProps } from "./InputTypes"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { HighlightOff} from '@mui/icons-material';
import { deleteCarService } from "../services/servicesCar";

const InputTrain: FC<InputTrainProps> = ({elements, setCarTrain}) => {

  const deleteItem = async (id: string, index: number): Promise<void> => {
    const res = await deleteCarService(id)
    if (res) {
      setCarTrain(value => {
        if (value) {
            const aux = [...value]
            aux.splice(index, 1)
            return aux
          
        }
        return undefined
      })
    }
  }

  return(
    <TableContainer style={{display: 'flex', justifyContent: 'center'}}>
    <Table sx={{ width: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Name of Car</TableCell>
          <TableCell align="right">Destination</TableCell>
          <TableCell align="right">Receiver</TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {elements?.map((element, index) => (
          <TableRow
            key={index}
            sx={{ '&:last-child td, &:last-child th': { border: 0 }, width: 650 }}
          >
            <TableCell component="th" scope="row">{index + 1}</TableCell>
            <TableCell align="right">{element.destination}</TableCell>
            <TableCell align="right">{element.receiver}</TableCell>
            <TableCell onClick={() => deleteItem(element.id ?? '', index)} align="right"><HighlightOff /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default InputTrain