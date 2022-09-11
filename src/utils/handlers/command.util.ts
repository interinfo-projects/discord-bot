import {promisify} from "util";
import {glob} from "glob";
import {Client} from "discord.js";

const pGlob = promisify(glob);

export default async (client: Client) => {
    (await pGlob(`${process.cwd()}/src/commands/*/*.ts`)).map(async (cmdFile) => {
        const {default: cmd} = await import(cmdFile);
        console.log(cmd.name, cmd);
        client.commands.set(cmd.name, cmd);
    })
}