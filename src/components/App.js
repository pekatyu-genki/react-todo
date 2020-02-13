import React from 'react';

import Form from './Form';
import CheckAll from './CheckAll';
import Filter from './Filter';
import EditTodo from './EditTodo';
import Todo from './Todo';

let currentId = 0

// class App extends React.Component {
//     render() {
//         return <div>App</div>;
//     }
// }

// 　↑上も ↓も下も　同じ　function（アロー関数が使われ始めている？）

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: 'all',
            todos: []
        };
    }
    render() {
        const { todos, filter } = this.state
        const filteredTodos = todos.filter(({ completed }) => {
            switch (filter) {
                case 'all':
                    return true;

                case 'uncompleted':
                    return !completed;

                case 'completed':
                    return completed;

                default:
                    return true;
            }
        });

        return (
            <div>
            
                <Form onSubmit= { this.handleSubmit } />

                <CheckAll 
                allCompleted= { 
                    todos.length > 0 && todos.every (({ completed }) => completed )
                    }
                    onChange= { this.handleChangeAllCompleted }
                />

                <Filter filter= { filter } onChange= { this.handleChangeFilter } />

                <ul>
                    { filteredTodos.map(({ id, text, completed, editing }) => (
                    <li key= { id }>
                        {editing ? (
                            <EditTodo 
                                id= { id } 
                                text= { text } 
                                onCancel= { this.handleChangeTodoAttribute } 
                                onSubmit= { this.handleUpdateTodoText }
                            />
                        ): ( 
                        <Todo
                            id= { id }
                            text= { text }
                            completed= { completed } 
                            onChange= { this.handleChangeTodoAttribute }
                            onDelete= { this.handleClickDelete }
                        /> 
                        )}
                    </li>
                    ))}
                </ul>

                <button onClick= { this.handleChangeDeleteCompleted }>
                    完了済みをすべて削除
                </button>
            </div>
        )
    }

    handleSubmit = text => {
        const newTodo = {
            id: currentId,
            text,
            completed: false,
            editing: false
        };
        const newTodos = [...this.state.todos, newTodo]
        this.setState({ todos: newTodos });
        currentId++;
    };

    handleChangeAllCompleted = completed => {
        const newTodos = this.state.todos.map( todo => {
            return {
                ...todo,
                completed,
            }
        });

        this.setState({ todos: newTodos });
    };

    handleUpdateTodoText = ( id, text ) => {
        const newTodos = this.state.todos.map( todo => {
            if ( todo.id === id) {
                return {
                    ...todo,
                    text,
                    editing: false
                };
            }

            return todo;
        });

        this.setState({ todos: newTodos });
    };

    handleChangeFilter = filter => {
        this.setState({ filter })
    };

    handleChangeTodoAttribute = ( id, key, value ) => {
        const newTodos = this.state.todos.map( todo => {
            if ( todo.id === id ) {
                return {
                    ...todo,
                    [key]: value
                };
            }

            return todo
        });

        this.setState({ todos: newTodos });
    };

    handleClickDelete = id => {
        const newTodos = this.state.todos.filter( todo => todo.id !== id )
        this.setState({ todos: newTodos });
    };

    handleChangeDeleteCompleted = () => {
        const newTodos = this.state.todos.filter(({ completed }) => !completed )
        this.setState({ todos: newTodos});
    };
}

export default App;