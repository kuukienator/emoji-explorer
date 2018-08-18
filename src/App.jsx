import React, { Component } from 'react';
import './App.css';

// import EmojiGroup from './components/EmojiGroup/EmojiGroup';
import EmojiSubgroup from './components/EmojiSubgroup/EmojiSubgroup';
import EmojiGroupButtons from './components/EmojiGroupButtons/EmojiGroupButtons';
import EmojiSubgroupButtons from './components/EmojiSubgroupButtons/EmojiSubgroupButtons';
import EmojiData from './data/emoji-full.json';

// const GROUP_WHITELIST = ['Smileys & People'];
// const filterEmojiData = data => data.filter(entry => GROUP_WHITELIST.includes(entry.name));

const getActiveGroupByName = (name, data) =>
    data.find(g => g.name === name) || null;

const getActiveSubgroupByName = (name, group) =>
    group ? group.subgroups.find(sb => sb.name === name) : null;

const generateUrlFromState = state => {
    let baseUrl = '';

    if (state.activeGroupName.length) {
        baseUrl += `/groups/${formatNameForUrl(state.activeGroupName)}`;
    }

    if (state.activeSubgroupName.length) {
        baseUrl += `/subgroups/${formatNameForUrl(state.activeSubgroupName)}`;
    }

    return baseUrl;
};

const generateNumericalUrlFromState = state => {
    let baseUrl = '';

    if (state.activeGroupName.length) {
        baseUrl += `/groups/${state.emojiData.findIndex(
            g => g.name === state.activeGroupName
        ) + 1}`;
    }

    if (state.activeSubgroupName.length) {
        baseUrl += `/subgroups/${state.activeGroup.subgroups.findIndex(
            g => g.name === state.activeSubgroupName
        ) + 1}`;
    }

    return baseUrl;
};

const formatNameForUrl = name => name.replace(/\s/g, '-').toLowerCase();

const getStateFromPath = path => {
    const segments = path.split('/').filter(segment => segment.length);

    console.log(segments);
};

class App extends Component {
    constructor(props) {
        super(props);

        getStateFromPath(window.location.pathname);

        this.state = {
            emojiData: EmojiData,
            activeGroupName: '',
            activeGroup: null,
            activeSubgroupName: '',
            activeSubgroup: null
        };

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

    render() {
        return (
            <div className="container">
                <div className="header">
                    <h1>Emoji Explorer</h1>
                </div>

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
        );
    }
}

export default App;
