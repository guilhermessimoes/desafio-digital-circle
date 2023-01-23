import { Request, Response } from 'express'
import { CreateTb01UseCase } from './CreateTb01UseCase'


export class CreateTb01Controller {
  async handle(request: Request, response: Response){
    const{ col_text, col_dt} = request.body    
    const createTb01UseCase = new CreateTb01UseCase()
    const result = await createTb01UseCase.execute({
      col_text,
      col_dt
    })

    return response.json(result)
  }
}