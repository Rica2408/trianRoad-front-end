import { Box, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

const LandingPage = () => {

  const navigate = useNavigate()

  return(
    <Box>
      <Button onClick={() => navigate('destination')}>Destination</Button>
      <Button onClick={() => navigate('receiver')}>Receiver</Button>
      <Button onClick={() => navigate('cars')}>Train Cars</Button>
    </Box>
  )
}

export default LandingPage