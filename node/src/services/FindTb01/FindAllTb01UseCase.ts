import { prisma } from "../../lib/prismaClient"

export class FindAllTb01 {
  async execute(){
    const data = await prisma.tb01.findMany()
    if (!data) throw new Error("Não foi possível localizar os registros.");
    
    return data
  }
}