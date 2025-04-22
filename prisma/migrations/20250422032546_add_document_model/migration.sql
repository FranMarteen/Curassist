/*
  Warnings:

  - You are about to drop the column `subtarefas` on the `Tarefa` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tarefa" DROP COLUMN "subtarefas";

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "filepath" TEXT NOT NULL,
    "curateladoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_curateladoId_fkey" FOREIGN KEY ("curateladoId") REFERENCES "Curatelado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
