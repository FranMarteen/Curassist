// backend/index.ts
import express from 'express';
import authRoutes from './routes/auth';
import tarefaRoutes from './routes/tarefaRoutes';
import obrigacaoRoutes from './routes/obrigacaoRoutes';
import curateladoRoutes from './routes/curateladoRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Rotas
app.use('/auth', authRoutes);
app.use('/tarefas', tarefaRoutes);
app.use('/obrigacoes', obrigacaoRoutes);
app.use('/curatelados', curateladoRoutes);

// Test route
app.get('/', (_req, res) => {
  res.send('API working!');
});

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
