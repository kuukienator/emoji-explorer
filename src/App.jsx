import React, { Component } from 'react';
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
            <div className="container">
                <div className="header">
                    <h1>Emoji Explorer</h1>
                </div>

                {!this.state.activeGroup && (
                    <EmojiGroupButtons
                        groups={this.state.emojiData}
                        setGroupHandler={activeGroupName =>
                            this.setState({
                                activeGroupName,
                                activeGroup: this.state.emojiData.find(
                                    g => g.name === activeGroupName
                                )
                            })
                        }
                    />
                )}

                {!this.state.activeSubgroup &&
                    this.state.activeGroup && (
                        <EmojiSubgroupButtons
                            subgroups={this.state.activeGroup.subgroups}
                            setSubgroupHandler={activeSubgroupName =>
                                this.setState({
                                    activeSubgroupName,
                                    activeSubgroup: this.state.activeGroup.subgroups.find(
                                        sb => sb.name === activeSubgroupName
                                    )
                                })
                            }
                        />
                    )}

                {this.state.activeSubgroup && (
                    <EmojiSubgroup subgroup={this.state.activeSubgroup} />
                )}
            </div>
        );
    }
}

export default App;
