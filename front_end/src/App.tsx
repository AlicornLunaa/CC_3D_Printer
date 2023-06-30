import { Button, Container, Grid } from '@mui/material';
import { useState } from 'react';
import { ISchematic, SchematicComponent } from './components/SchematicComponent';
import './App.css'

function App() {
  const [started, setStarted] = useState(false);
  const [schematic, setSchematic] = useState<ISchematic>();

  let send = async (id: number, msg: string) => {
    return await fetch(`http://localhost:8080/turtle/${id}/${msg}`);
  };

  let startSchematic = async (schematicName: string) => {
    let res = await fetch(`http://localhost:8080/build/start/${schematicName}`);
    let data = await res.json();

    setSchematic(data);
    setStarted(data !== false);
  };

  let stopSchematic = async () => {
    let res = await fetch(`http://localhost:8080/build/stop`);
    setStarted(!(await res.text() == "true"));
  };

  let startBtn = <Button variant="contained" sx={{ marginTop: "20px" }} onClick={() => { startSchematic("test_schem") }}>Start Schematic</Button>;
  let stopBtn = <Button variant="contained" sx={{ marginTop: "20px" }} onClick={() => { stopSchematic() }}>Stop Schematic</Button>;

  return (
    <Container sx={{ display: "flex" }}>
      <Container sx={{ verticalAlign: "center" }}>
        <Grid container spacing={2}>
          <Grid item xs={4}><Button variant="contained" fullWidth onClick={() => { send(0, "up"); }}>Up</Button></Grid>
          <Grid item xs={4}><Button variant="contained" fullWidth onClick={() => { send(0, "forward"); }}>Forward</Button></Grid>
          <Grid item xs={4}><Button variant="contained" fullWidth onClick={() => { send(0, "down"); }}>Down</Button></Grid>
          <Grid item xs={4}><Button variant="contained" fullWidth onClick={() => { send(0, "turnLeft"); }}>Left</Button></Grid>
          <Grid item xs={4}><Button variant="contained" fullWidth onClick={() => { send(0, "back"); }}>Back</Button></Grid>
          <Grid item xs={4}><Button variant="contained" fullWidth onClick={() => { send(0, "turnRight"); }}>Right</Button></Grid>
        </Grid>
        {started ? stopBtn : startBtn}
      </Container>
      {schematic && <SchematicComponent schematic={schematic} />}
    </Container>
  )
}

export default App
