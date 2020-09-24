import {ObjectDiv} from "ObjectDiv"
import {Model} from "model/model"

export class Controller{
    private $container:JQuery;
    private modelRef = Model.Instance;
    private oObjectDiv1:ObjectDiv;
    private oObjectDiv2:ObjectDiv;
    private oObjectDiv3:ObjectDiv;
    public constructor($container:JQuery){
        this.$container = $container;
        this.bootStrapComponents();
    }

    private bootStrapComponents(){
        this.oObjectDiv1 = new ObjectDiv("Hello sunil!!");
        this.oObjectDiv1.addEventListener(ObjectDiv.CREATED,this.fnCallback) // Listen to events
        this.oObjectDiv2 = new ObjectDiv(this.modelRef.myText); //singleton model ref
        this.oObjectDiv2.addEventListener(ObjectDiv.CREATED,this.fnCallback)
        this.oObjectDiv3 = new ObjectDiv("My Name is amit ");
        this.oObjectDiv3.addEventListener(ObjectDiv.CREATED,this.fnCallback) // Listen to events
        this.render();
    }

    private fnCallback(e,eType,eData)
    {
        console.log(eData);
    }

    private render(){
        this.$container.append(this.oObjectDiv1.getHTML())
        this.$container.append(this.oObjectDiv2.getHTML())
        this.$container.append(this.oObjectDiv3.getHTML())
    }

}