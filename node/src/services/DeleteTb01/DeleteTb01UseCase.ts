import { prisma } from "../../lib/prismaClient"

export class DeleteTb01UseCase  {
  async execute(id){
    if (!id) throw new Error("Id inmcorreto.");    
    const data = await prisma.tb01.delete({
     where: {
      id
     }
    })

    return data;
  }
}