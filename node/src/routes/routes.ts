import { Router } from 'express'
import { CreateTb01Controller } from '../services/CreateTb01/CreateTb01Controller'
import { DeleteTb01Controller } from '../services/DeleteTb01/DeleteTb01Controller'
import { FindAllTb01Controller } from '../services/FindTb01/FindAllTb01Controller'

const routes = Router()

const findAllTb01Controller = new FindAllTb01Controller()
const createTb01Controller = new CreateTb01Controller()
const deleteTb01Controller = new DeleteTb01Controller()

routes.get('/tb01', findAllTb01Controller.handle)
routes.post('/tb01', createTb01Controller.handle)
routes.delete('/tb01/:id', deleteTb01Controller.handle)

export { routes }