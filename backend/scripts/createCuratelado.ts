import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const nome = 'francisco';
  const cpf = '00487221117';
  const dataNascimento = new Date('1983-10-19');
  const userId = '46184e13-eb94-4327-8e57-35a061bbe98f';

  const curatelado = await prisma.curatelado.create({
    data: {
      nome: nome,
      cpf: cpf,
      dataNascimento: dataNascimento,
      User: {
        connect: {
          id: userId,
        },
      },
    },
  });

  console.log('Curatelado created:', curatelado);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
