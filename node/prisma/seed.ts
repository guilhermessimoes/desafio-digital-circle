import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function run() {
  await prisma.tb01.deleteMany()

  // await Promise.all([
  //   prisma.tb01.create({
  //     data: {
  //       /** Wednesday */
  //       title: 'Teste 01',
  //       date: new Date('2023-01-04T03:00:00.000z'),        
  //     }
  //   }),
  // ])
}

run()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })