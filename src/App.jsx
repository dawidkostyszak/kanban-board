import React from 'react';

import List from './List.jsx';

class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            name: '',
            lists: [],
        };
    }

    addList = () => {
        this.setState((oldState) => ({
            name: '',
            lists: [
                ...oldState.lists,
                oldState.name,
            ],
        }));
    }

    saveName = (input) => {
        this.setState({ name: input.target.value });
    }

    render () {
        return (
            <div>
                <input
                    onBlur={this.addList}
                    onChange={this.saveName}
                    placeholder="Add list"
                    value={this.state.name}
                />
                {this.state.lists.map((name, index) => <List key={index} name={name}/>)}
            </div>
        );
    }
}

export default App;
