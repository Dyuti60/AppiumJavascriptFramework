import GenericActions from "./GenericActions";
import KeyboardActions from "./KeyboardActions";
import TouchActions from "./TouchActions";

export default class ActionManager{
    public generic: GenericActions
    public keyboard: KeyboardActions
    public touch: TouchActions

    constructor(){
        this.generic = new GenericActions()
        this.keyboard = new KeyboardActions()
        this.touch = new TouchActions()
    }
}