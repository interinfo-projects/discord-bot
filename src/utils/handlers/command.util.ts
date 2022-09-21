import {promisify} from "util";
import {glob} from "glob";
import {MySuperClient} from "../../index";

const pGlob = promisify(glob);

export default async (client: MySuperClient) => {
    (await pGlob(`${process.cwd()}/src/commands/*/*.ts`)).map(async (cmdFile) => {
        const {default: cmd} = await import(cmdFile);

        client.commands.set(cmd.name, cmd);
    })
}