import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo;
  @Output() remove = new EventEmitter<Todo>();
  editable = false;
  constructor() { }

  ngOnInit(): void {
  }
  saveTodo(text: string): void {
    this.editable = false;
    this.todo.text = text;
  }
}
