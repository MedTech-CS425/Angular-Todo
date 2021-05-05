import { Component } from '@angular/core';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Todo';
  filter: 'all' | 'active' | 'completed' = 'all';
  Todos: Array<Todo> = [
    {text: 'Eat', completed: false},
    {text: 'Sleep', completed: false},
    {text: 'Work', completed: false}
  ];
  get todos(): Array<Todo> {
    if (this.filter === 'all'){
      return this.Todos;
    }
    return this.Todos.filter(todo => this.filter === 'completed' ? todo.completed : !todo.completed );
  }
  addTodo(text: string): void{
    this.Todos.unshift({
      text,
      completed: false
    });
  }
  remove(todo: Todo): void{
    this.Todos.splice(this.Todos.indexOf(todo), 1);
  }
}
