import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';

// import EmojiGroup from './components/EmojiGroup/EmojiGroup';
import EmojiSubgroup from './components/EmojiSubgroup/EmojiSubgroup';
import EmojiGroupButtons from './components/EmojiGroupButtons/EmojiGroupButtons';
import EmojiSubgroupButtons from './components/EmojiSubgroupButtons/EmojiSubgroupButtons';
import EmojiData from './data/emoji-full.json';

// const GROUP_WHITELIST = ['Smileys & People'];
// const filterEmojiData = data => data.filter(entry => GROUP_WHITELIST.includes(entry.name));

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emojiData: EmojiData,
            activeGroupName: '',
            activeGroup: null,
            activeSubgroupName: '',
            activeSubgroup: null
        };
    }

    render() {
        return (
            <Router>
                <div className="container">
                    <div className="header">
                        <h1>Emoji Explorer</h1>
                    </div>

                    <Route
                        exact
                        path="/"
                        render={props => (
                            <EmojiGroupButtons
                                {...props}
                                groups={this.state.emojiData}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/group/:groupName"
                        render={props => (
                            <EmojiSubgroupButtons
                                {...props}
                                group={props.match.params.groupName}
                                subgroups={
                                    this.state.emojiData.find(
                                        e =>
                                            e.name ===
                                            props.match.params.groupName
                                    ).subgroups
                                }
                            />
                        )}
                    />

                    <Route
                        exact
                        path="/group/:groupName/subgroup/:subgroupName"
                        render={props => (
                            <EmojiSubgroup
                                {...props}
                                subgroup={this.state.emojiData
                                    .find(
                                        e =>
                                            e.name ===
                                            props.match.params.groupName
                                    )
                                    .subgroups.find(
                                        e =>
                                            e.name ===
                                            props.match.params.subgroupName
                                    )}
                            />
                        )}
                    />
                </div>
            </Router>
        );
    }
}

export default App;
