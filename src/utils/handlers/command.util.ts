import {promisify} from "util";
import {glob} from "glob";
import {MySuperClient} from "../../index";

const pGlob = promisify(glob);

export default async (client: MySuperClient) => {
    (await pGlob(`${process.cwd()}/src/commands/*/*.ts`)).map(async (cmdFile) => {
        const {default: cmd} = await import(cmdFile);

        if (!cmd.name) return console.log(`Error : No command name provided in ${cmdFile}.`)
        if (!cmd.description) return console.log(`Error : No command description provided in ${cmdFile}.`)

        client.commands.set(cmd.name, cmd);

        console.log(`Command loaded: ${cmd.name}`);
    })
}