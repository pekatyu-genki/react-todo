import React from 'react';

import Form from './Form';
import Todo from './Todo';


// class App extends React.Component {
//     render() {
//         return <div>App</div>;
//     }
// }

// 　↑上も ↓も下も　同じ　function（アロー関数が使われ始めている？）

class App extends React.Component {
    render() {
        return (
            <div>
            
                <Form />

                <label>
                    <input type="checkbox" />
                    全て完了にする
                </label>

                <select>
                    <option>全て</option>
                    <option>未完了</option>
                    <option>完了済み</option>
                </select>

                <ul>
                    <li>
                        <Todo id={0} text="洗濯する" />
                    </li>
                    <li>
                        <Todo id={0} text="掃除する" />
                    </li>
                    <li>
                        <Todo id={0} text="料理する" />
                    </li>
                </ul>

                <button>完了済みをすべて削除</button>
            </div>
        )
    }
}

export default App;