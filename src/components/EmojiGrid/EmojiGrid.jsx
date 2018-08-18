import React from 'react';

const EmojiGrid = ({ emojis }) => {
    return (
        <div className="emojiGrid">
            {emojis.map(emoji => (
                <div className="emojiEntry" key={emoji.name}>
                    <div className="emojiEntry-emoji">{emoji.emoji}</div>
                    <div className="emojiEntry-text">{emoji.name}</div>
                </div>
            ))}
        </div>
    );
};

export default EmojiGrid;
