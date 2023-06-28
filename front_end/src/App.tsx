import { Button, Container, Grid } from '@mui/material';
import './App.css'

function App() {
  let send = async (id: number, msg: string) => {
    return await fetch(`http://localhost:8080/turtle/${id}/${msg}`);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={4}><Button variant="contained" fullWidth onClick={() => { send(0, "up"); }}>Up</Button></Grid>
        <Grid item xs={4}><Button variant="contained" fullWidth onClick={() => { send(0, "forward"); }}>Forward</Button></Grid>
        <Grid item xs={4}><Button variant="contained" fullWidth onClick={() => { send(0, "down"); }}>Down</Button></Grid>
        <Grid item xs={4}><Button variant="contained" fullWidth onClick={() => { send(0, "turnLeft"); }}>Turn Left</Button></Grid>
        <Grid item xs={4}><Button variant="contained" fullWidth onClick={() => { send(0, "back"); }}>Back</Button></Grid>
        <Grid item xs={4}><Button variant="contained" fullWidth onClick={() => { send(0, "turnRight"); }}>Turn Right</Button></Grid>
      </Grid>
    </Container>
  )
}

export default App
