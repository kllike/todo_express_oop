import { Todo } from '../models/todo.js' 
import { fileManager } from '../files.js'

class todoController {
    constructor(){
        this.TODOS = []  
        this.initTodos() 
    }  
        async createTodo(req, res) {
        const task = req.body.task
        const newTodo = new Todo(Math.random().toString(), task)
        this.TODOS.push(newTodo)
        await fileManager.writeFile('./data/todos.json', this.TODOS)
        res.json({
            message: 'created new todo object',
            newTask: newTodo
        })
    } 

    async initTodos(){
        const todosData = await fileManager.readFile('./data/todos.json')
        if(todosData !== null){
            this.TODOS = todosData
        } else {
            this.TODOS = []  
        } 
    } 

    updateTodo(req, res){
        const todoId = req.params.id;
        console.log("Received todoId from URL:", todoId);
        
        const updatedTask = req.body.task;
        
        const todoIndex = this.TODOS.findIndex((todo) => todo.id === todoId);
        console.log("PATCH received for id:", todoId);
        console.log("Updated task:", updatedTask);
        console.log("todo array before update:", this.TODOS);
    
        if (todoIndex === -1) {
            return res.status(404).json({ message: 'Could not find todo' });
        }
    
        console.log("Found todo at index:", todoIndex);
        
        this.TODOS[todoIndex] = new Todo(this.TODOS[todoIndex].id, updatedTask);
        
        res.json({
            message: 'Updated todo',
            updatedTask: this.TODOS[todoIndex] 
        });
    }  
     
    
    getTodos(req, res) {
        res.json({tasks: this.TODOS})
    }
    
    deleteTodo(req, res) {
        const todoId = req.params.id;
        
        const todoIndex = this.TODOS.findIndex((todo) => todo.id === todoId);
        
        if (todoIndex === -1) {
            return res.status(404).json({ message: 'Could not find todo to delete' });
        }
    
        this.TODOS.splice(todoIndex, 1) 
    
        res.json({ message: 'Todo deleted successfully' });
    }
    
} 

export const TodoController = new todoController()