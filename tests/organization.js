import { listTeams } from "../main.js";

const organizationTeam = await listTeams('not-organisation');
console.log(organizationTeam.length)