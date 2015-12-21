import 'reflect-metadata'
import 'zone.js'

import {bootstrap,Component,CORE_DIRECTIVES,Input} from 'angular2/angular2'

import {Http,HTTP_PROVIDERS} from 'angular2/http'
import {RouteData,Router, RouterLink ,OnActivate,OnDeactivate,ComponentInstruction} from 'angular2/router';
import TopicService from "./services/TopicService";
declare var TweenMax: any;


@Component({
    selector:'list',
    directives:[RouterLink],
    template: `<ul class="topics" id="topic-list">
            <li  *ngFor="#topic of topics">
                <a class="topic-item" [routerLink]="['detail']">

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
                </a>
            </li>
    </ul>`,

})
export default class List{
    topics:Array<any>;
    constructor(http:Http,topicService:TopicService){
        http.request('/api/v1/topics')
            .subscribe(e=>{
                var json =  e.json()
                this.topics = json['data']
            })
    }

}
