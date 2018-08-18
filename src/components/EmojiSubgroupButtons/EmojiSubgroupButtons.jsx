import React from 'react';
import { Link } from 'react-router-dom';

const EmojiSubgroupButtons = ({ subgroups, group, setSubgroupHandler }) => {
    return (
        <div className="emojiGroup-list">
            {subgroups.map(subgroup => (
                <Link
                    to={`/group/${group}/subgroup/${subgroup.name}`}
                    className="emojiGroup-button"
                    key={subgroup.name}
                >
                    <span>{subgroup.emojis[0].emoji}</span>
                    <span>{subgroup.name.split('-').join(' ')}</span>
                </Link>
            ))}
        </div>
    );
};

export default EmojiSubgroupButtons;
