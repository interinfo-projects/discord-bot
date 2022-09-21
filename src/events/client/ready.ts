import {MySuperClient} from "../../index";

export default {
  name: 'ready',
  once: true,
  execute(client: MySuperClient) {
    console.log(`I'm ready!`);
  }
};