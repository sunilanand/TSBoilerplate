
import { EventDispatcher } from "events/eventdispatcher";
export class ObjectDiv extends EventDispatcher{
    private objHTML = $("<div>");
    public static CREATED = "ObjectsCreated";
    private myStr = "";
    constructor(str:string){
        super();
        this.myStr = str;
        this.createObject();
    }

    private createObject(){
        this.objHTML.append(this.myStr);
        this.objHTML.draggable();
        this.addEvents()
    }
    private onClick(e)
    {
        console.log( e.data.myStr,this.myStr,"on click");
        e.data.dispatchEvent(ObjectDiv.CREATED,{'obj':e.data.myStr}); // example dispatch event to emit
    }
    private addEvents(){
        console.log(this.myStr);
        this.objHTML.bind('click',this,this.onClick); // example to add events
    }
    public getHTML():JQuery{
        return this.objHTML;
    }

}