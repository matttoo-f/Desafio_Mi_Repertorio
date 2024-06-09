import express from 'express';
import { logger } from 'logger-express';
import path from 'path';
import fs from 'fs';

const PORT = 5000;
const app = express();
app.use(logger());
app.use(express.json()); 

const __dirname = path.resolve();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/canciones', (req, res) => {
    const canciones = JSON.parse(fs.readFileSync('repertorio.json'));
    res.json(canciones);
  });

app.post('/canciones', (req, res) => {
  const cancion = req.body;
  const canciones = JSON.parse(fs.readFileSync('repertorio.json'));
  canciones.push(cancion);
  fs.writeFileSync('repertorio.json', JSON.stringify(canciones));
  res.send('Canción agregada con éxito!!');
});

app.put('/canciones/:id', (req, res) => {
  const { id } = req.params;
  const cancion = req.body;
  const canciones = JSON.parse(fs.readFileSync('repertorio.json'));
  const index = canciones.findIndex(c => c.id === parseInt(id)); 
  canciones[index] = cancion;
  fs.writeFileSync('repertorio.json', JSON.stringify(canciones));
  res.send('Producto modificado con éxito');
});

app.delete('/canciones/:id', (req, res) => {
  const { id } = req.params;
  const canciones = JSON.parse(fs.readFileSync('repertorio.json'));
  const index = canciones.findIndex(c => c.id === parseInt(id)); 
  canciones.splice(index, 1);
  fs.writeFileSync('repertorio.json', JSON.stringify(canciones));
  res.send('Producto eliminado con éxito');
});

app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
