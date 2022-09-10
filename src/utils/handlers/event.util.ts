import {promisify} from "util";
import {glob} from "glob";
import {Client} from "discord.js";

const pGlob = promisify(glob);

export default async (client: Client) => {
    (await pGlob(`${process.cwd()}/src/events/*/*.ts`)).map(async (eventFile) => {
        const {default: event} = await import(eventFile);

        event.once ?
            client.once(event.name, (...args) => {
                event.execute(client, ...args);

            }) :
            client.on(event.name, (...args) => event.execute(client, ...args));
    })
}