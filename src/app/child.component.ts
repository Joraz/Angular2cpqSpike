import {Component} from "@angular/core";
import {globalTemplateCache} from "../app/TemplateCache";

@Component({
               moduleId: module.id,
               selector: "my-child-element",
               template: globalTemplateCache.getTemplate("ChildComponent")
           })
export class ChildComponent
{
    public childContent: string = "It really works!";

    constructor()
    {
        console.log("ChildComponent::constructor().");
    }
}
