import {
    getRepository,
    getRepositoryLanguages,
    getRepositoryTeams,
	getTopics,
    listRepositories,
	replaceTopics,
} from "./api/repository.js";

import {
    listTeams
} from "./api/organization.js";

export {
    // repository
    getRepository,
    getRepositoryLanguages,
    getRepositoryTeams,
	getTopics,
    listRepositories,
	replaceTopics,

    // organisation
    listTeams,
};
