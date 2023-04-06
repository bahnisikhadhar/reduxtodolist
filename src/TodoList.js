import React from 'react';
import { connect } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo, editTodo } from './actions';

class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newTodo: '',
      editingTodoId: null,
      editingTodoTitle: ''
    };
  }

  handleInputChange = event => {
    this.setState({ newTodo: event.target.value });
  };

  handleAddTodo = () => {
    const { newTodo } = this.state;

    if (newTodo.trim() !== '') {
      const todo = {
        id: Date.now(),
        title: newTodo,
        completed: false
      };

      this.props.addNewTodoToList(todo);

      this.setState({ newTodo: '' });
    }
  };

  handleToggleTodo = id => {
    this.props.toggleTodoStatus(id);
  };

  handleDeleteTodo = id => {
    this.props.deleteTodoFromList(id);
  };

  handleEditTodo = () => {
    const { editingTodoId, editingTodoTitle } = this.state;

    if (editingTodoId !== null && editingTodoTitle.trim() !== '') {
      const updatedTodo = {
        id: editingTodoId,
        title: editingTodoTitle,
        completed: this.props.todos.find(todo => todo.id === editingTodoId).completed
      };

      this.props.editExistingTodoInList(updatedTodo);

      this.setState({
        editingTodoId: null,
        editingTodoTitle: ''
      });
    }
  };

  handleCancelEditTodo = () => {
    this.setState({
      editingTodoId: null,
      editingTodoTitle: ''
    });
  };

  handleStartEditTodo = id => {
    const { title } = this.props.todos.find(todo => todo.id === id);

    this.setState({
      editingTodoId: id,
      editingTodoTitle: title
    });
  };

  handleEditingTodoInputChange = event => {
    this.setState({ editingTodoTitle: event.target.value });
  };

  render() {
    const { todos } = this.props;
    const { newTodo, editingTodoId, editingTodoTitle } = this.state;

    return (
      
      <div className='todo-list-container'>
        
        <input type="text" value={newTodo} onChange={this.handleInputChange} className='input_text'/>
        <button onClick={this.handleAddTodo} className='addBtn'>Add Todo</button>
       
        <ul >
          {todos.map(todo => (
            <li key={todo.id} className='todo-item'>
              {editingTodoId === todo.id ? (
                <>
                  <input type="text" value={editingTodoTitle} onChange={this.handleEditingTodoInputChange} />
                  <button onClick={this.handleEditTodo}>Save</button>
                  <button onClick={this.handleCancelEditTodo}>Cancel</button>
                </>
              ) : (
                <>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => this.handleToggleTodo(todo.id)}
                  />
                  <span>{todo.title}</span>
                  <button onClick={() => this.handleDeleteTodo(todo.id)}>Delete</button>
                  <button onClick={() => this.handleStartEditTodo(todo.id)}>Edit</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
     
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos
});

const mapDispatchToProps = dispatch => ({
  addNewTodoToList: todo => dispatch(addTodo(todo)),
  toggleTodoStatus: id => dispatch(toggleTodo(id)),
  deleteTodoFromList: id => dispatch(deleteTodo(id)),
  editExistingTodoInList: todo => dispatch(editTodo(todo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
