import {bootstrapStatic} from '@angular/platform-browser';
import {bootstrap} from "@angular/platform-browser-dynamic";
import {
    ComponentFactory,
    enableProdMode,
    provide,
    Type,
    ViewMetadata,
    ComponentMetadata
} from '@angular/core';
import {ReflectorComponentResolver, ComponentResolver} from "@angular/core/src/linker/component_resolver";
import {PromiseWrapper} from "@angular/core/src/facade/async";
import {Map} from "@angular/core/src/facade/collection";
import {ViewResolver} from "@angular/compiler";
import {PlatformReflectionCapabilities} from "@angular/core/src/reflection/platform_reflection_capabilities";
import {reflector} from "@angular/core/src/reflection/reflection";

import {Angular2CpqSpikeAppComponent, environment} from './app/index';
import {globalTemplateCache} from "./app/TemplateCache";

if (environment.production)
{
    enableProdMode();
}

class CpqViewResolver extends ViewResolver
{
    _cache = new Map<Type, ViewMetadata>();

    public resolve(component: Type): ViewMetadata
    {
        let view = this._cache.get(component);

        if (!view)
        {
            view = this.createViewMeta(component);
            this._cache.set(component, view);
        }

        return view;
    }

    private createViewMeta(component: Type): ViewMetadata
    {
        let compMeta: ComponentMetadata;
        let viewMeta: ViewMetadata;

        reflector.annotations(component).forEach(m =>
                                                 {
                                                     if (m instanceof ViewMetadata)
                                                     {
                                                         viewMeta = m;
                                                     }
                                                     if (m instanceof ComponentMetadata)
                                                     {
                                                         compMeta = m;
                                                     }
                                                 });

        if (compMeta)
        {
            return new ViewMetadata({
                templateUrl:   compMeta.templateUrl,
                template:      compMeta.template,
                directives:    compMeta.directives,
                pipes:         compMeta.pipes,
                encapsulation: compMeta.encapsulation,
                styles:        compMeta.styles,
                styleUrls:     compMeta.styleUrls
            });
        }
        else
        {
            return viewMeta;
        }

    }
}

class CpqComponentResolver extends ReflectorComponentResolver
{
    resolveComponent(component: Type): Promise<ComponentFactory<any>>
    {
        console.log("In CpqComponentResolver::resolveComponent");
        console.log("The component is: ");
        console.dir(component);
        console.log("The reflector is: ");
        console.dir(reflector);

        var metadatas = reflector.annotations(<Type>component);
        console.log("The metadata is: ");
        console.log(metadatas);
        var componentFactory = metadatas.find(_isComponentFactory);
        console.log("The componentFactory is");
        console.dir(componentFactory);
        if (componentFactory)
        {
            componentFactory.template = "<p>hello</p>";
        }
        return PromiseWrapper.resolve(componentFactory);
    }

    clearCache(): void
    {
        super.clearCache();
    }
}

function _isComponentFactory(type: any): boolean
{
    return type instanceof ComponentFactory;
}


class CpqReflector implements PlatformReflectionCapabilities
{

}

bootstrapStatic(Angular2CpqSpikeAppComponent, [provide(ViewResolver, {useClass: CpqViewResolver}), provide(ComponentResolver, {useClass: CpqComponentResolver})], CpqReflector);

bootstrap(Angular2CpqSpikeAppComponent/**, [provide(ComponentResolver, {useClass: CpqComponentResolver})]**/);

globalTemplateCache.whenReady().then(() =>
                                     {
                                         console.log("time to bootstrap");
                                         bootstrap(Angular2CpqSpikeAppComponent);
                                     });

