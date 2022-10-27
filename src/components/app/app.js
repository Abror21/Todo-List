import { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';

import './app.css';
import AddItem from '../add-item';

export default class App extends Component {

  idGenerate = 10;

  state = {
    todoData: [
      this.createItem('Bread'),
      this.createItem("Sugar"),
      this.createItem("Potato"),
    ],
    term: '',
    filter: 'all'
  }

  deleteItem = (itemId) => {
    this.setState(({ todoData }) => {
      const newData = todoData.filter(el => el.id !== itemId);
      return {
        todoData: newData
      }
    })
  }
  addItem = (label) => {
    this.setState(({todoData}) => {
      const newItem = this.createItem(label);
      const newData = [...todoData, newItem];
      return{
        todoData: newData
      }
    })
  }
  createItem(label){
    return {label, important: false, done: false, id: this.idGenerate++};
  }
  onToggleCreate = (itemId, data, changeItem) => {
    const idx = data.findIndex(el => el.id === itemId);
      const oldItem = data[idx];
      const newItem = {...oldItem, [changeItem]: !oldItem[changeItem]};
      const newData = [...data.slice(0, idx), newItem, ...data.slice(idx+1)];
      return newData;
  }

  onToggleDone = (itemId) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.onToggleCreate(itemId, todoData, 'done')
      }
    })
  }
  onToggleImportant = (itemId) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.onToggleCreate(itemId, todoData, 'important')
      }
    })
  }
  
  search = (items, piece) => {
    return items.filter(el => el.label.toLowerCase().indexOf(piece.toLowerCase()) > -1)
  }

  onSearchChange = (term) => {
    this.setState({ term })
  }
  filter = (filter, items) => {
    switch (filter) {
      case "all":
        return items;
      case "done":
        return items.filter(item => item.done);
      case "active":
        return items.filter(item => !item.done)
      default:
        return items;
    }
  }
  onChangeFilter = (filter) => {
    this.setState({filter})
  }

  render() {

    const { todoData, term, filter } = this.state;

    const searchData = this.filter(filter, this.search(todoData, term));
    const todoCount = todoData.filter(el => !el.done).length;
    const doneCount = todoData.length - todoCount;
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter onChangeFilter={this.onChangeFilter} filter={filter} />
        </div>
        <TodoList
          todos={searchData}
          onDeleteItem={this.deleteItem}
          onToggleDone={this.onToggleDone}
          onToggleImportant={this.onToggleImportant}
        />
        <AddItem addItem={this.addItem}/>
      </div>
    );
  }
};