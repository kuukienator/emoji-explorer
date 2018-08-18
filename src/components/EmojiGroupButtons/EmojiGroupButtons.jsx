import React from 'react';
import { Link } from 'react-router-dom';

const EmojiGroupButtons = ({ groups, setGroupHandler }) => {
    return (
        <div className="emojiGroup-list">
            {groups.map(group => (
                <Link
                    to={`/group/${group.name}`}
                    className="emojiGroup-button"
                    key={group.name}
                >
                    <span>{group.subgroups[0].emojis[0].emoji}</span>
                    <span>{group.name}</span>
                </Link>
            ))}
        </div>
    );
};

export default EmojiGroupButtons;
