import {PromiseWrapper} from "@angular/core/src/facade/async";

class TemplateCache
{
    private cache = new Map<string, string>();

    private _isInitialised: boolean = false;

    constructor()
    {
        console.log("Template Cache created");
        setTimeout(() =>
                   {
                       this.cache.set("ChildComponent", `<p>Here is the child content</p><p>{{childContent}}</p>`);
                       this._isInitialised = true;
                   }, 2000);
    }

    public getTemplate(key): string
    {
        console.log("getting it");
        return this.cache.get(key);
    }

    public whenReady(): Promise<any>
    {
        console.log("In whenReady().");
        return new Promise((resolve, reject) =>
        {
            var intervalId = setInterval(() =>
                                         {
                                             if (this._isInitialised)
                                             {
                                                 clearInterval(intervalId);
                                                 return resolve();
                                             }
                                         }, 100);
        });
    }
}

export var globalTemplateCache = new TemplateCache();
