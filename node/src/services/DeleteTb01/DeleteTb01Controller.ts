import { Request, Response } from 'express'
import { DeleteTb01UseCase } from './DeleteTb01UseCase'


export class DeleteTb01Controller {
  async handle(request: Request, response: Response){
    const { id } = request.params
    const formatID = Number(id)
    const deleteTb01UseCase = new DeleteTb01UseCase()
    const result = await deleteTb01UseCase.execute(formatID)

    return response.json(result)
  }
}