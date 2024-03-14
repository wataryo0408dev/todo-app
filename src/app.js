
import { TodoListModel }    from "./model/todoListModel.js";
import { TodoItemModel }    from "./model/todoItemModel.js";
import { element, render }  from "./view/util.js";

export class App{

  // TodoListmodelの初期化
  #todoListModel = new TodoListModel();

  mount(){
    const formElement           = document.querySelector('#js-form');
    const inputElement          = document.querySelector('#js-form-input');
    const containerElement      = document.querySelector('#js-todo-list');
    const todoItemCountElement  = document.querySelector('#js-todo-count');

    // TodoListModelの状態が更新されたら表示を更新する。
    this.#todoListModel.onChange(() => {
      const todoListElement = element`<ul></ul>`;
      const todoItems = this.#todoListModel.getTodoItems();
      todoItems.forEach(item => {
        const todoItemElement = element`<li>${item.title}</li>`;
        todoListElement.appendChild(todoItemElement);
      });
      render(todoListElement, containerElement);
      todoItemCountElement.textContent = `Todoアイテム数: ${this.#todoListModel.getTotalCount()}`;
    });
    
    // フォームを送信したら、新しいTodoItemModelを追加する
    // let todoItemCount = 0;
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this.#todoListModel.addTodo(new TodoItemModel({
        title: inputElement.value,
        completed: false
      }));
      inputElement.value = '';
    });
  }
}