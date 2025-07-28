import { deleteRepository, updateRepository } from "../api/repository.js";
import { archiveRepository, createRepository, listTeams, unarchiveRepository } from "../main.js";

const organizationTeam = await listTeams('not-organisation');
console.log(organizationTeam.length);

const createRepo = await createRepository('not-organisation', {
            "name": 'My-new-repo',
            "description": "This is your first repository",
            "homepage": "https://github.com",
            "private": true,
            "has_issues": true,
            "has_projects": true,
            "has_wiki": true,
            "allow_squash_merge": false,
            "allow_merge_commit": false,
            "delete_branch_on_merge": true,
            "auto_init": true
        });
console.log(createRepo);

const updateRepo = await updateRepository('not-organisation', 'My-new-repo', {
            "description": "This is your second repository",
            "homepage": "https://google.com"
        });
console.log(updateRepo);

const archive = await archiveRepository('not-organisation', 'My-new-repo')
console.log(archive)

const unarchive = await unarchiveRepository('not-organisation', 'My-new-repo')
console.log(unarchive)

const deleteRepo = await deleteRepository('not-organisation', 'My-new-repo')
console.log(deleteRepo)
