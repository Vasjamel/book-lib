import types from './types/index.js';
import unions from './unions/index.js';
import enums from './enums/index.js';
import inputs from './inputs/index.js'
import queries from './queries.js'
import mutations from './mutations.js'

const typeDefs = `
    ${types}
    ${unions}
    ${enums}
    ${inputs}
    ${queries}
    ${mutations}
`;

export default typeDefs;