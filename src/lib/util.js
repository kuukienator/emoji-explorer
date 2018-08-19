export const getActiveGroupByName = (name, data) =>
    data.find(g => g.name === name) || null;

export const getActiveSubgroupByName = (name, group) =>
    group ? group.subgroups.find(sb => sb.name === name) : null;

export const generateNumericalUrlFromState = state => {
    let baseUrl = '';

    if (state.activeGroupName.length) {
        baseUrl += `/${state.emojiData.findIndex(
        g => g.name === state.activeGroupName
    ) + 1}`;
    }

    if (state.activeSubgroupName.length) {
        baseUrl += `/${state.activeGroup.subgroups.findIndex(
        g => g.name === state.activeSubgroupName
    ) + 1}`;
    }

    return baseUrl;
};

export const getStateFromPath = (path, emojiData) => {
    const [groupId, subgroupId] = path
        .split('/')
        .filter(segment => segment !== '')
        .map(Number)
        .filter(segment => !Number.isNaN(segment))
        .map(segment => segment - 1);

    let groupState = {};
    let subgroupState = {};

    if (groupId !== undefined) {
        const group = emojiData[groupId];
        groupState = {
            activeGroupName: group.name || '',
            activeGroup: group || null
        };

        if (group && subgroupId !== undefined) {
            const subgroup = group.subgroups[subgroupId];
            subgroupState = {
                activeSubgroupName: subgroup.name || '',
                activeSubgroup: subgroup || null
            };
        }
    }

    return Object.assign({}, groupState, subgroupState);
};