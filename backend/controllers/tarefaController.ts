import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// Controller for creating a new Tarefa
export const createTarefa = async (req: Request, res: Response) => {
  try {
    const { titulo, descricao, dataConclusao, status, prioridade, anotacoes, tags, subtarefas, arquivosAnexos } = req.body;

    const tarefa = await prisma.tarefa.create({
      data: {
        titulo,
        descricao,
        dataConclusao,
        status,
        prioridade,
        anotacoes,
        tags,
        subtarefas,
        arquivosAnexos,
      },
    });

    res.status(201).json(tarefa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create Tarefa' });
  }
};

// Controller for getting all Tarefas
export const getAllTarefas = async (req: Request, res: Response) => {
  try {
    const tarefas = await prisma.tarefa.findMany();
    res.status(200).json(tarefas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get Tarefas' });
  }
};

// Controller for getting a single Tarefa by ID
export const getTarefaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tarefa = await prisma.tarefa.findUnique({
      where: {
        id,
      },
    });

    if (!tarefa) {
      return res.status(404).json({ error: 'Tarefa not found' });
    }

    res.status(200).json(tarefa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get Tarefa' });
  }
};

// Controller for updating a Tarefa
export const updateTarefa = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, dataConclusao, status, prioridade, anotacoes, tags, subtarefas, arquivosAnexos } = req.body;

    const tarefa = await prisma.tarefa.update({
      where: {
        id,
      },
      data: {
        titulo,
        descricao,
        dataConclusao,
        status,
        prioridade,
        anotacoes,
        tags,
        subtarefas,
        arquivosAnexos,
      },
    });

    res.status(200).json(tarefa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update Tarefa' });
  }
};

// Controller for deleting a Tarefa
export const deleteTarefa = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.tarefa.delete({
      where: {
        id,
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete Tarefa' });
  }
};
