import 'reflect-metadata'
import 'zone.js'

import {bootstrap,Component,CORE_DIRECTIVES} from 'angular2/angular2'

import {Http,HTTP_PROVIDERS} from 'angular2/http'
import {Router, RouterLink } from 'angular2/router';
import TopicService from "./services/TopicService";

@Component({
    selector:'list',
    directives:[RouterLink],
    template: `<ul class="topics">
        <a style="display: block;" [routerLink]="['Detail']">
            <li class="topic-item" *ngFor="#topic of topics">
                    <div class="avatar">
                       <img src="{{topic.author.avatar_url}}">
                    </div>
                    <div class="content">
                        <div class="title">
                            <span class="hot-tag" *ngIf="topic.top">置顶</span>
                            {{topic.title}}
                        </div>
                        <div class="extra-info">
                            <div class="author pull-left">
                                {{topic.author.loginname}}
                            </div>
                            <div class="rv-count pull-right">

                                <span class="r-count">{{topic.reply_count}}</span>
                                 / {{topic.visit_count}}
                            </div>
                        </div>
                    </div>
            </li>
        </a>

    </ul>`,

})
export default class List{
    topics:Array<any>;
    constructor(http:Http,topicService:TopicService){
        topicService.count();

        http.request('/api/v1/topics')
            .subscribe(e=>{
                var json =  e.json()
                this.topics = json['data']
            })
    }
}
