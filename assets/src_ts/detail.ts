import 'reflect-metadata'
import 'zone.js'

import {bootstrap,Component,CORE_DIRECTIVES} from 'angular2/angular2'

import {Router, RouterLink } from 'angular2/router';
import TopicService from "./services/TopicService";

@Component({
    selector:'detail',
    directives:[],
    template: `
        <div>
            detail!!
        </div>
    `,

})
export default class List{
    constructor(topicService:TopicService){
    }
}
