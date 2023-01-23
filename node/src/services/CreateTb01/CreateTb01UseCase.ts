import { prisma } from "../../lib/prismaClient"

interface ICreateTb01 {
  col_text: string
  col_dt: Date
}

export class CreateTb01UseCase  {
  async execute({col_text, col_dt}:ICreateTb01){
    if (!col_text) throw Error ("Preencher o campo texto."); 
    if (!col_dt) throw Error ("Preencher o campo data.");
    const newDate = new Date(col_dt)
    const data = await prisma.tb01.create({
      data: {
        col_text,
        col_dt: newDate
      }
    })

    return data;
  }
}