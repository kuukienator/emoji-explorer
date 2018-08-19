import React, { Component } from 'react';
import './App.css';

import EmojiSubgroup from './components/EmojiSubgroup/EmojiSubgroup';
import EmojiGroupButtons from './components/EmojiGroupButtons/EmojiGroupButtons';
import EmojiSubgroupButtons from './components/EmojiSubgroupButtons/EmojiSubgroupButtons';
import EmojiData from './data/emoji-full.json';
import {
    getStateFromPath,
    getActiveGroupByName,
    generateNumericalUrlFromState,
    getActiveSubgroupByName
} from './lib/util';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = Object.assign(
            {},
            {
                emojiData: EmojiData,
                activeGroupName: '',
                activeGroup: null,
                activeSubgroupName: '',
                activeSubgroup: null
            },
            getStateFromPath(window.location.pathname, EmojiData)
        );

        this.updateHistory = this.updateHistory.bind(this);
        this.historyPopHandler = this.historyPopHandler.bind(this);

        this.updateHistory();
        window.onpopstate = this.historyPopHandler;
    }

    updateHistory() {
        window.scrollTo({ top: 0 });
        window.history.pushState(
            {
                activeGroupName: this.state.activeGroupName,
                activeSubgroupName: this.state.activeSubgroupName
            },
            '',
            generateNumericalUrlFromState(this.state)
        );
    }

    historyPopHandler(event) {
        if (event.state) {
            const activeGroup = getActiveGroupByName(
                event.state.activeGroupName,
                this.state.emojiData
            );

            const activeSubgroup = getActiveSubgroupByName(
                event.state.activeSubgroupName,
                activeGroup
            );

            this.setState(
                Object.assign({}, event.state, {
                    activeGroup,
                    activeSubgroup
                })
            );
        }
    }

    getActiveHeadline() {
        if (this.state.activeSubgroup) {
            return this.state.activeSubgroupName.split('-').join(' ');
        } else if (this.state.activeGroup) {
            return this.state.activeGroupName;
        } else {
            return 'Emoji Explorer';
        }
    }

    render() {
        return (
            <div className="container">
                <div className="header">
                    <h1>{this.getActiveHeadline()}</h1>
                </div>

                <div className="content">
                    {!this.state.activeGroup && (
                        <EmojiGroupButtons
                            groups={this.state.emojiData}
                            setGroupHandler={activeGroupName => {
                                this.setState(
                                    {
                                        activeGroupName,
                                        activeGroup: getActiveGroupByName(
                                            activeGroupName,
                                            this.state.emojiData
                                        )
                                    },
                                    this.updateHistory
                                );
                            }}
                        />
                    )}

                    {!this.state.activeSubgroup &&
                        this.state.activeGroup && (
                            <EmojiSubgroupButtons
                                subgroups={this.state.activeGroup.subgroups}
                                setSubgroupHandler={activeSubgroupName =>
                                    this.setState(
                                        {
                                            activeSubgroupName,
                                            activeSubgroup: getActiveSubgroupByName(
                                                activeSubgroupName,
                                                this.state.activeGroup
                                            )
                                        },
                                        this.updateHistory
                                    )
                                }
                            />
                        )}

                    {this.state.activeSubgroup && (
                        <EmojiSubgroup subgroup={this.state.activeSubgroup} />
                    )}
                </div>
            </div>
        );
    }
}

export default App;
