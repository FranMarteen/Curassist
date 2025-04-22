/*
  Warnings:

  - The primary key for the `Curatelado` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `dataNasc` on the `Curatelado` table. All the data in the column will be lost.
  - You are about to drop the column `rg` on the `Curatelado` table. All the data in the column will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Curatelado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Curatelado" DROP CONSTRAINT "Curatelado_pkey",
DROP COLUMN "dataNasc",
DROP COLUMN "rg",
ADD COLUMN     "dataNascimento" TIMESTAMP(3),
ADD COLUMN     "email" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Curatelado_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Curatelado_id_seq";

-- DropTable
DROP TABLE "Usuario";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tarefa" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataConclusao" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'Pendente',
    "prioridade" TEXT,
    "anotacoes" TEXT,
    "tags" TEXT,
    "subtarefas" TEXT,
    "arquivosAnexos" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tarefa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Obrigacao" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataConclusao" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'Pendente',
    "prioridade" TEXT,
    "anotacoes" TEXT,
    "tags" TEXT,
    "arquivosAnexos" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Obrigacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Curatelado" ADD CONSTRAINT "Curatelado_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
