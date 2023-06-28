import { Button, Container, Grid } from '@mui/material';
import { useState } from 'react';
import './App.css'

function App() {
  const [started, setStarted] = useState(false);

  let send = async (id: number, msg: string) => {
    return await fetch(`http://localhost:8080/turtle/${id}/${msg}`);
  };

  let startSchematic = async (schematicName: string) => {
    let res = await fetch(`http://localhost:8080/build/start/${schematicName}`);
    setStarted(await res.text() == "true");
  };

  let stopSchematic = async () => {
    let res = await fetch(`http://localhost:8080/build/stop`);
    setStarted(!(await res.text() == "true"));
  };

  let startBtn = <Button variant="contained" sx={{ marginTop: "20px" }} onClick={() => { startSchematic("test_schem") }}>Start Schematic</Button>;
  let stopBtn = <Button variant="contained" sx={{ marginTop: "20px" }} onClick={() => { stopSchematic() }}>Stop Schematic</Button>;

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
      {started ? stopBtn : startBtn}
    </Container>
  )
}

export default App
