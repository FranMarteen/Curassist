// backend/index.ts
import express from 'express';
import path from 'path';
import authRoutes from './routes/auth';
import documentRoutes from './routes/documentRoutes';
import tarefaRoutes from './routes/tarefaRoutes';
import obrigacaoRoutes from './routes/obrigacaoRoutes';
import curateladoRoutes from './routes/curateladoRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Rotas
app.use('/auth', authRoutes);
app.use('/tarefas', tarefaRoutes);
app.use('/obrigacoes', obrigacaoRoutes);
app.use('/curatelados', curateladoRoutes);
app.use('/api/documents', documentRoutes);


// Start server
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated');
  });
});

export default app;
