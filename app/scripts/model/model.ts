export class Model
{
    private static _instance: Model;

    private constructor()
    {
        //...
    }

    public static get Instance()
    {
        // Do you need arguments? Make it a regular method instead.
        return this._instance || (this._instance = new this());
    }

    public get myText():string{
        return "MyWorld"
    }
}