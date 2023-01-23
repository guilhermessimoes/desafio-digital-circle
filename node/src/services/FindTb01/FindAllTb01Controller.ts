import { Request, Response } from 'express'

import { FindAllTb01 } from './FindAllTb01UseCase'

export class FindAllTb01Controller{
  async handle(request: Request, response: Response){
    const findAllTb01UseCase = new FindAllTb01()
    const data = await findAllTb01UseCase.execute()

    return response.json(data)
  }
}