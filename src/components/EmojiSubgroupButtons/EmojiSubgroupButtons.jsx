import React from 'react';

const EmojiSubgroupButtons = ({ subgroups, setSubgroupHandler }) => {
    return (
        <div className="emojiGroup-list">
            {subgroups.map(subgroup => (
                <button
                    className="emojiGroup-button"
                    key={subgroup.name}
                    onClick={e => setSubgroupHandler(subgroup.name)}
                >
                    <span>{subgroup.emojis[0].emoji}</span>
                    <span>{subgroup.name.split('-').join(' ')}</span>
                </button>
            ))}
        </div>
    );
};

export default EmojiSubgroupButtons;
