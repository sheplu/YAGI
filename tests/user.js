import { userCreateRepository } from "../main.js";

const createRepo = await userCreateRepository('sheplu', {
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
