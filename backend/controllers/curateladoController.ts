import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import { PrismaClient } from '@prisma/client';
import Joi from 'joi';

const prisma = new PrismaClient();

// Criar Curatelado
const criarCuratelado = asyncHandler(async (req: Request, res: Response) => {
  const { nome, dataNascimento, cpf, userId } = req.body;

  const schema = Joi.object({
    nome: Joi.string().required(),
    dataNascimento: Joi.date().required(),
    cpf: Joi.string().required(),
    userId: Joi.string().required(),
  });

  const { error } = schema.validate({ nome, dataNascimento, cpf, userId });

  if (error) {
    res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
    return;
  }

  const curatelado = await prisma.curatelado.create({
    data: {
      nome,
      dataNascimento: dataNascimento,
      cpf,
      User: {
        connect: {
          id: userId,
        },
      },
    },
  });

  res.status(201).json({
    success: true,
    message: 'Curatelado criado com sucesso',
    data: curatelado,
  });
});

// Obter Curatelado
const obterCuratelado = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const schema = Joi.object({
    id: Joi.string().required(),
  });

  const { error } = schema.validate({ id });

  if (error) {
    res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
    return;
  }

  const curatelado = await prisma.curatelado.findUnique({
    where: {
      id: id.toString(),
    },
  });

  if (!curatelado) {
    res.status(404).json({
      success: false,
      message: 'Curatelado não encontrado',
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: 'Curatelado obtido com sucesso',
    data: curatelado,
  });
});

// Atualizar Curatelado
const atualizarCuratelado = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, dataNascimento, cpf, userId } = req.body;

  const schema = Joi.object({
    id: Joi.string().required(),
    nome: Joi.string().min(3).max(100).required(),
    dataNascimento: Joi.date().max('now').required(),
    cpf: Joi.string().length(11).pattern(/^[0-9]+$/).required(),
    userId: Joi.string().required(),
  });

  const { error } = schema.validate({ id, nome, dataNascimento, cpf });

  if (error) {
    res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
    return;
  }

  const curatelado = await prisma.curatelado.update({
    where: {
      id: id.toString(),
    },
    data: {
      nome,
      dataNascimento,
      cpf,
      User: {
        connect: {
          id: userId,
        },
      },
    },
  });

  res.status(200).json({
    success: true,
    message: 'Curatelado atualizado com sucesso',
    data: curatelado,
  });
});

// Deletar Curatelado
const deletarCuratelado = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const schema = Joi.object({
    id: Joi.string().required(),
  });

  const { error } = schema.validate({ id });

  if (error) {
    res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
    return;
  }

  await prisma.curatelado.delete({
    where: {
      id: id.toString(),
    },
  });

  res.status(200).json({
    success: true,
    message: 'Curatelado deletado com sucesso',
  });
});

// Obter todos os Curatelados
const obterTodosCuratelados = asyncHandler(async (req: Request, res: Response) => {
  const curatelados = await prisma.curatelado.findMany();

  res.status(200).json({
    success: true,
    message: 'Curatelados obtidos com sucesso',
    data: curatelados,
  });
});

// Buscar Curatelados
const buscarCuratelados = asyncHandler(async (req: Request, res: Response) => {
  const { query } = req.query;

  const schema = Joi.object({
    query: Joi.string().required(),
  });

  const { error } = schema.validate({ query });

  if (error) {
    res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
    return;
  }

  const curatelados = await prisma.curatelado.findMany({
    where: {
      OR: [
        { nome: { contains: query as string, mode: 'insensitive' } },
        { cpf: { contains: query as string, mode: 'insensitive' } },
      ],
    },
  });

  res.status(200).json({
    success: true,
    message: 'Curatelados obtidos com sucesso',
    data: curatelados,
  });
});

export {
  criarCuratelado,
  obterCuratelado,
  atualizarCuratelado,
  deletarCuratelado,
  obterTodosCuratelados,
  buscarCuratelados,
};
