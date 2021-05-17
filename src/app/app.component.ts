import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  constructor(private http:HttpClient){
  }
  ngOnInit(): void {
    this.http.get('/todo', {responseType: 'json', observe:'body'}).subscribe((data: Array<Todo>)=> {
      console.log(data);
      this.Todos = data;
    })
  }
  title = 'Todo';
  filter: 'all' | 'active' | 'completed' = 'all';
  Todos: Array<Todo>;
  get todos(): Array<Todo> {
    if (this.filter === 'all'){
      return this.Todos;
    }
    return this.Todos.filter(todo => this.filter === 'completed' ? todo.completed : !todo.completed );
  }
  addTodo(text: string): void{
    this.http.post<Array<Todo>>('/todo', {
      text,
      completed: false
    }).subscribe((data)=> {
      this.Todos = data;
    })
  }
  remove(todo: Todo): void{
    console.log(todo._id);
    this.http.delete(`/todo/${todo._id}`).subscribe((data: Array<Todo>)=> {
      console.log(data);
      this.Todos = data
    })
  }
}
