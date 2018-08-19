'use strict';

const https = require('https');
const fs = require('fs');

/**
 *
 * @type {string}
 */
const EMOJI_URL = 'https://unicode.org/Public/emoji/11.0/emoji-test.txt';

/**
 *
 * @param {string} line
 * @returns {string}
 */
const getEmojiNameFromLine = line =>
    line
        .split('#')[1]
        .trim()
        .split(' ')
        .splice(1)
        .join(' ');

/**
 *
 * @param {string} line
 * @returns {string}
 */
const getEmojiCodePointFromLine = line => line.split(';')[0].trim();

/**
 *
 * @param {string} codepoints
 * @returns {string}
 */
const getEmojiFromCodePoins = codepoints =>
    String.fromCodePoint(...codepoints.split(' ').map(cp => parseInt(cp, 16)));

/**
 *
 * @param {string} name
 * @param {Object} data
 * @returns {Promise}
 */
const writeFile = (name, data) =>
    new Promise((resolve, reject) =>
        fs.writeFile(
            name + '.json',
            JSON.stringify(data),
            err => (err ? reject(err) : resolve())
        )
    );

/**
 *
 * @param {string} line
 * @returns {string}
 */
const getGroupNameFromLine = line => line.split(':')[1].trim();

/**
 *
 * @param {string} line
 * @returns {boolean}
 */
const filterNonQualifiedEmoji = line => !line.includes('non-fully-qualified');

/**
 *
 * @param {string} url
 * @returns {Promise<string>}
 */
const getTextFile = url =>
    new Promise((resolve, reject) => {
        https
            .get(url, resp => {
                let data = '';

                resp.on('data', chunk => (data += chunk));
                resp.on('end', () => resolve(data));
            })
            .on('error', reject);
    });

/**
 *
 * @param {string} data
 * @returns {Promise<Array>}
 */
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
                };
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
};

getTextFile(EMOJI_URL)
    .then(parseTextFile)
    .then(writeFile.bind(null, 'emoji-full'));
