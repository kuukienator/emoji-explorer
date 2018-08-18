import React, { Component } from 'react';
import './App.css';
import EmojiData from './data/emoji-full.json';

const GROUP_WHITELIST = ['Smileys & People'];

const filterEmojiData = data =>
    data.filter(entry => GROUP_WHITELIST.includes(entry.name));

class App extends Component {
    render() {
        return (
            <div className="container">
                <div className="header">
                    <h1>Emoji Explorer</h1>
                </div>
                {filterEmojiData(EmojiData).map(group => (
                    <div key={group.name}>
                        <div className="emojiGroup">{group.name}</div>
                        {group.subgroups.map(subgroup => (
                            <div key={subgroup.name}>
                                <div className="emojiSubgroup">
                                    {subgroup.name}
                                </div>
                                <div className="emojiGrid">
                                    {subgroup.emojis.map(emoji => (
                                        <div
                                            className="emojiEntry"
                                            key={emoji.name}
                                        >
                                            <div className="emojiEntry-emoji">
                                                {emoji.emoji}
                                            </div>
                                            <div className="emojiEntry-text">
                                                {emoji.name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    }
}

export default App;
