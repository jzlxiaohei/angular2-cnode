import 'reflect-metadata'
import 'zone.js'

import './css/topics.scss'
import {bootstrap,Component,CORE_DIRECTIVES,provide} from 'angular2/angular2'
import {HTTP_PROVIDERS} from 'angular2/http'
import {ROUTER_DIRECTIVES,ROUTER_PROVIDERS ,RouteConfig,LocationStrategy,HashLocationStrategy} from 'angular2/router';
//import list from './list.ts'
import List from   './list.ts'
import Detail from './detail'
import TopicService from './services/TopicService.ts'
@Component({
    selector:'app',
    directives:[ROUTER_DIRECTIVES],
    template: `
        <router-outlet></router-outlet>
    `,
    providers:[TopicService]
})
@RouteConfig([
    { path:'/', as:'List' ,component:List},
    {path:'/Detail', as:'Detail', component:Detail}
])
class App{
    constructor(){

    }
}

bootstrap(App,[CORE_DIRECTIVES,HTTP_PROVIDERS,ROUTER_PROVIDERS,provide(LocationStrategy,{useClass:HashLocationStrategy})]);