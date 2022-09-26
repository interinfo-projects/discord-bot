import { promisify } from 'util'
import { glob } from 'glob'
import type { MySuperClient } from '../../index'

const pGlob = promisify(glob)

export default async (client: MySuperClient) => {
  (await pGlob(`${process.cwd()}/src/buttons/*/*.ts`)).map(async (btnFile) => {
    const { default: btn } = await import(btnFile)

    if (!btn.name)
      return console.error(`Error : No button name provided in ${btnFile}.`)

    client.buttons.set(btn.name, btn)
  })
}
