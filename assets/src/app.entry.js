import 'reflect-metadata'
import './css/topics.scss'
//import {bootstrap,Component,CORE_DIRECTIVES,provide,inspectElement} from 'angular2'
import {Component,provide} from 'angular2/core';

import {CORE_DIRECTIVES} from 'angular2/common'
import {bootstrap} from 'angular2/platform/browser';
import {ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/common_dom';


import {HTTP_PROVIDERS,Http} from 'angular2/http'
import {ROUTER_DIRECTIVES,ROUTER_PROVIDERS ,RouteConfig,LocationStrategy,HashLocationStrategy} from 'angular2/router';
//import list from './list.ts'
import TopicService from './services/TopicService'
import zone from  'zone.js/dist/zone-microtask.js'

@Component({
    selector:'app',
    host:{
        id:'angular2-cnode-app'
    },
    directives:[ROUTER_DIRECTIVES],
    template: `<div class="container">
        <ul class="topics" id="topic-list">
            <li class="topic-item"  *ngFor="#topic of topics" (click)="onSelectTopic(topic)">
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
            <div class="load-more-wrapper">
                <div class="btn-load-more">加载更多</div>
            </div>
        </ul>
        <div class="current-topic" >
            <div class="content" [innerHTML]="curTopic==null?'话题内容':curTopic.content"></div>
            <div class="splitter"></div>
            <div class="comment">
                <textarea name="" id="" class="my-comment"></textarea>
            </div>
        </div>
    </div>`,
    providers: [TopicService]
})
//@RouteConfig([
//    { path:'/', as:'List' ,component:List},
//    {path:'/detail', as:'Detail', component:Detail}
//])
class App{
    topics=[]
    curTopic=null
    constructor(topicService:TopicService){
        //this.topics =[]
        this.topicService =topicService
        topicService.topicsSub.subscribe(topics=>{
            if(topics==null){return;}
            //console.log(topics)
            for(var i = 0;i<topics.length;i++){
                this.topics.push(topics[i])
            }
        })

        topicService.currentTopicSub.subscribe(topic=>{
            this.curTopic = topic
        })
    }

    onSelectTopic(topic){
        this.topicService.setCurrentTopic(topic)
    }
}

bootstrap(App,[TopicService,CORE_DIRECTIVES,HTTP_PROVIDERS,ROUTER_PROVIDERS,provide(LocationStrategy,{useClass:HashLocationStrategy})]);