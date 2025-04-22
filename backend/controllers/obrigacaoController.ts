import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// Controller for creating a new Obrigacao
export const createObrigacao = async (req: Request, res: Response) => {
  try {
    const { titulo, descricao, dataConclusao, status, prioridade, anotacoes, tags, arquivosAnexos } = req.body;

    const obrigacao = await prisma.obrigacao.create({
      data: {
        titulo,
        descricao,
        dataConclusao,
        status,
        prioridade,
        anotacoes,
        tags,
        arquivosAnexos,
      },
    });

    res.status(201).json(obrigacao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create Obrigacao' });
  }
};

// Controller for getting all Obrigacoes
export const getAllObrigacoes = async (req: Request, res: Response) => {
  try {
    const obrigacoes = await prisma.obrigacao.findMany();
    res.status(200).json(obrigacoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get Obrigacoes' });
  }
};

// Controller for getting a single Obrigacao by ID
export const getObrigacaoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const obrigacao = await prisma.obrigacao.findUnique({
      where: {
        id,
      },
    });

    if (!obrigacao) {
      return res.status(404).json({ error: 'Obrigacao not found' });
    }

    res.status(200).json(obrigacao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get Obrigacao' });
  }
};

// Controller for updating a Obrigacao
export const updateObrigacao = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, dataConclusao, status, prioridade, anotacoes, tags, arquivosAnexos } = req.body;

    const obrigacao = await prisma.obrigacao.update({
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
        arquivosAnexos,
      },
    });

    res.status(200).json(obrigacao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update Obrigacao' });
  }
};

// Controller for deleting a Obrigacao
export const deleteObrigacao = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.obrigacao.delete({
      where: {
        id,
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete Obrigacao' });
  }
};
