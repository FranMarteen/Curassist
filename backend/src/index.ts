import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Rota para buscar todos os curatelados
app.get('/api/curatelados', async (req, res) => {
  try {
    const curatelados = await prisma.curatelado.findMany();
    res.json(curatelados);
  } catch (error) {
    console.error('Erro ao buscar curatelados:', error);
    res.status(500).json({ error: 'Erro ao buscar curatelados' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
