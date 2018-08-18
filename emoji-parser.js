const https = require('https');
const fs = require('fs');

const URL = 'https://unicode.org/Public/emoji/11.0/emoji-test.txt';

const getEmojiNameFromLine = line => line.split('#')[1].trim().split(' ').splice(1).join(' ');
const getEmojiCodePointFromLine = line => line.split(';')[0].trim();
const getEmojiFromCodePoins = codepoints => String.fromCodePoint(...(codepoints.split(' ').map(cp => parseInt(cp, 16))));
const writeFile = (name, data) => new Promise((resolve, reject) => fs.writeFile(name + '.json', JSON.stringify(data), err => err ? reject(err) : resolve()))
const getGroupNameFromLine = line => line.split(':')[1].trim();
const filterNonQualifiedEmoji = line => !line.includes('non-fully-qualified');

const getTextFile = url => new Promise((resolve, reject) => {
    https.get(url, resp => {
        let data = '';

        resp.on('data', chunk => data += chunk);
        resp.on('end', () => resolve(data));
    }).on("error", reject);
});

const parseTextFile = data => {
    const lines = data.split('\n').filter(filterNonQualifiedEmoji);

    let currentGroup;
    let currentSubGroup;

    const groups = [];

    lines.forEach(line => {
        if (!line.length) {
            return;
        }

        if (line.startsWith('#')) {
            if (line.includes('subgroup:')) {
                if (currentSubGroup) {
                    currentGroup.subgroups.push(currentSubGroup);
                }

                currentSubGroup = {
                    name: getGroupNameFromLine(line),
                    emojis: []
                }
            } else if (line.includes('group:')) {
                if (currentGroup && currentSubGroup) {
                    currentGroup.subgroups.push(currentSubGroup);
                    currentSubGroup = null;
                }

                if (currentGroup) {
                    groups.push(currentGroup);
                }

                currentGroup = {
                    name: getGroupNameFromLine(line),
                    subgroups: []
                };
            } else if (line.includes('EOF')) {
                currentGroup.subgroups.push(currentSubGroup);
                groups.push(currentGroup);
            }
        } else {
            currentSubGroup.emojis.push({
                name: getEmojiNameFromLine(line),
                emoji: getEmojiFromCodePoins(getEmojiCodePointFromLine(line))
            });
        }


    });

    return Promise.resolve(groups);
}

getTextFile(URL)
    .then(parseTextFile)
    .then(writeFile.bind(null, 'emoji-full'));