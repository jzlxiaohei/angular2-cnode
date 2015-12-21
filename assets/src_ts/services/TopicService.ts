import {Injectable} from 'angular2/angular2';
import {Http} from 'angular2/http'
import * as Rx from 'rxjs'

@Injectable()
export  default class TopicService{

    http:Http;

    limit:number;

    page:number;

    topics:Array<any>;

    isLoading = false;

    currentTopic:Rx.Subject<any> = new Rx.BehaviorSubject(null)

    constructor(http:Http,page=0,limit=20){
        this.http = http;
        this.page = page;
        this.limit = limit
    }

    requestNextPage(){
        this.isLoading = true;
        this.http.get('/api/v1/topics',{
            page:this.page,
            limit:this.limit
        })
            .map(e=>e.json())
            .subscribe(e=>{
                this.isLoading = false;
                this.topics = e['data']
                this.page++;
            })
    }

    setCurrentTopicById(id:number){
        let topic = this.topics
            .find(item=>{
                return item['id'] == id
            })
        this.currentTopic.onNext(topic)
    }

    getTopics(){
        return this.topics;
    }

    getTopicById(){

    }



}