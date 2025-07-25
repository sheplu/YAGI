import { getRepository } from "../main.js";

const repo = await getRepository('sheplu', 'aws-safe-modules');
console.log(repo)