import * as Rx from 'rxjs'

import {Injectable} from 'angular2/core';
import {Http,URLSearchParams} from 'angular2/http'

@Injectable()
export default class TopicService {

    //http:Http;

    limit = 40;

    page = 1;

    topicsSub = new Rx.ReplaySubject();

    isLoading = false;

    currentTopicSub = new Rx.BehaviorSubject(null)


    constructor(http:Http) {
        this.http = http;
        this.reqNextPage()
    }

    reqNextPage() {
        this.isLoading = true;

        var search = new URLSearchParams()
        search.append('page', this.page)
        search.append('limit', this.limit)
        this.http.get('/api/v1/topics', {
                search: search
            })
            .map(e=>e.json())
            .map(e=>e['data'])
            .do(()=> {
                this.page++
            })
            .subscribe(item=> {
                this.topicsSub.next(item)
                if (this.currentTopicSub.value == null) {
                    this.currentTopicSub.next(item[0])
                }
            })
    }

    setCurrentTopic(topic) {
        this.currentTopicSub.next(topic)
    }

    getTopicsSub() {
        return this.topicsSub;
    }

    getTopicById() {
        return this.currentTopicSub
    }

}
