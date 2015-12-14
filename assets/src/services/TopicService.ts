import {Injectable} from 'angular2/angular2';
import {Http} from 'angular2/http'
@Injectable()
export  default class TopicServices{

    _count:number
    http:Http;
    constructor(http:Http){
        this.http = http;
    }

    getTopics(){
        this.http.get('')
    }

    getTopicById(){

    }

    count(){
        this._count++;
        return this._count
    }

}