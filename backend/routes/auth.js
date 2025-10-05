import { Router } from "express";

const authRouter = Router()

authRouter.get('/signup', (req, res) => {res.send('signup')})
authRouter.get('/signin', (req, res) => {res.send('signin')})
authRouter.get('/signout', (req, res) => {res.send('signuot')})

export default authRouter