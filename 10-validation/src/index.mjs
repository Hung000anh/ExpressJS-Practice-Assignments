import express, { request } from 'express';
import {body, validationResult } from 'express-validator'
import { userValidationRules } from './userValidator.mjs'

const app = express();
const PORT = process.env.PORT || 3000;
const users = [
    { id: 1, name: 'Alice' , age: 30 , isEmployed: true },
    { id: 2, name: 'Bob' , age: 25 , isEmployed: false },
    { id: 3, name: 'Charlie' , age: 35 , isEmployed: true },
    { id: 4, name: 'Diana' , age: 28 , isEmployed: false },
    { id: 5, name: 'Eve' , age: 22 , isEmployed: true },
    { id: 6, name: 'Frank' , age: 40 , isEmployed: false },
    { id: 7, name: 'Grace' , age: 32 , isEmployed: true },
    { id: 8, name: 'Hank' , age: 29 , isEmployed: false },
    { id: 9, name: 'Ivy' , age: 27 , isEmployed: true },
    { id: 10, name: 'Jack' , age: 31 , isEmployed: false }
];

app.use(express.json());

app.get('/', (request, response) =>{
    response.send("Hello world");
})

app.get('/users', (request, response) =>{
    response.send(users);
})

app.post('/users', 
    // Validation
    userValidationRules,
    // Request, response
    (request, response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        const newUser = {
            id: users.length + 1,
            name: request.body.name,
            age: request.body.age,
            isEmployed: request.body.isEmployed
        }

        users.push(newUser);
        response.status(201).json(newUser);
    }
);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
