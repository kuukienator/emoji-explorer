import React from 'react';

import EmojiGrid from '../EmojiGrid/EmojiGrid';

const EmojiSubgroup = ({ subgroup }) => {
    return (
        <div>
            <EmojiGrid emojis={subgroup.emojis} />
        </div>
    );
};

export default EmojiSubgroup;
