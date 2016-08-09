import {Component, ComponentResolver, ViewContainerRef} from '@angular/core';
import {globalTemplateCache} from "../app/TemplateCache";
import {ChildComponent} from "./child.component";

@Component({
               moduleId:   module.id,
               selector:   'angular2-cpq-spike-app',
               template:   `<h1>This is the App Component</h1>
                            <my-child-element></my-child-element>`,
               styleUrls:  ['angular2-cpq-spike.component.css'],
               directives: [ChildComponent]
           })
export class Angular2CpqSpikeAppComponent
{
    constructor()
    {
        console.log("Angular2CpqSpikeAppComponent::constructor().");
    }
}

