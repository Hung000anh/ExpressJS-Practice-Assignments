import { request, response, Router } from 'express'
import users from '../utils/constants.mjs'

const usersRouter = Router();

usersRouter.get("/users", (request, response) =>{
    response.send(users)
})

export default usersRouter;
