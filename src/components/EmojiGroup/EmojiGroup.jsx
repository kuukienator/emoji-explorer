import React from 'react';

import EmojiGrid from '../EmojiGrid/EmojiGrid';

const EmojiGroup = ({ group }) => {
    return (
        <div>
            <div className="emojiGroup">{group.name}</div>
            {group.subgroups.map(subgroup => (
                <div key={subgroup.name}>
                    <div className="emojiSubgroup">{subgroup.name}</div>
                    <EmojiGrid subgroup={subgroup} />
                </div>
            ))}
        </div>
    );
};

export default EmojiGroup;
