import React from 'react';

const EmojiGroupButtons = ({ groups, setGroupHandler }) => {
    return (
        <div className="emojiGroup-list">
            {groups.map(group => (
                <button
                    className="emojiGroup-button"
                    key={group.name}
                    onClick={e => setGroupHandler(group.name)}
                >
                    <span>{group.subgroups[0].emojis[0].emoji}</span>
                    <span>{group.name}</span>
                </button>
            ))}
        </div>
    );
};

export default EmojiGroupButtons;
