import 'discord.js';

declare module 'discord.js' {


    interface Client {

        getData(find: object, model: string, createifnoexists: boolean): Promise<Object>
        updateData(find: object, value: object, model: string): Promise<Object>

    }


}