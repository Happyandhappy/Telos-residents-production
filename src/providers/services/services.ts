import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';


@Injectable()
export class ServicesProvider {
  public token: any;
  constructor(public http: Http, public storage: Storage) {
    console.log('Hello ServicesProvider Provider');
  }
  getPolls(){
    return new Promise((resolve, reject) => {
        //Load token if exists
          this.storage.get('token').then((value) => {
          this.token = value;
          console.log(this.token);
          let headers = new Headers();
          headers.append('Authorization', this.token);
          this.http.get('http://telos-residents.herokuapp.com/getPolls', {headers: headers})
                .subscribe(res => {
                  let data = res.json();
                  console.log(data);
                  resolve(data);
                }, (err) => {
                    reject(err);
                });
              })
            });

}
viewPoll(query){
  return new Promise((resolve, reject) => {
    //Load token if exists
      this.storage.get('token').then((value) => {
      this.token = value;
      let headers = new Headers();
      headers.append('Authorization', this.token);
      console.log(headers);
      var link = 'http://telos-residents.herokuapp.com/viewpoll?id='+ query;
      this.http.get(link, {headers: headers})
            .subscribe(res => {
              let data = res.json();
              console.log(data);
              resolve(data);
            }, (err) => {
              reject(err);
            });
          })
        });
     }
  getPastPolls(){
    return new Promise((resolve, reject) => {
      //Load token if exists
        this.storage.get('token').then((value) => {
        this.token = value;
        let headers = new Headers();
        headers.append('Authorization', this.token);
        this.http.get('http://telos-residents.herokuapp.com/pastPolls', {headers: headers})
              .subscribe(res => {
                let data = res.json();
                console.log(data);
                resolve(data);
              }, (err) => {
                  reject(err);
              });
            })
          });

  }
  vote(object){
    return new Promise((resolve, reject) => {
      //Load token if exists
        // console.log(object);
        // this.storage.get('token').then((value) => {
        //   this.token = value;
        //   let headers = new Headers();
        //   headers.append('Authorization', this.token);
        //   console.log(headers);
        //   //console.log(this.token);
        //   var link = "http://202.189.110.103:3000/viewpoll?id=" + object.id + "&choice=" + object.choice;
        //   //console.log(link);
        //   this.http.post(link, {headers: headers})
        //         .subscribe(res => {
        //           let data = res.json();
        //           //this.token = data.token;
        //           resolve(data);
        //         }, (err) => {
        //           reject(err);
        //         });
        // })
        this.storage.get('token').then((value) => {
          this.token = value;
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('Authorization', this.token);
          var link = "http://telos-residents.herokuapp.com/vote?id=" + object.id + "&choice=" + object.choice;
          this.http.post( link , JSON.stringify({}) ,{headers: headers})
          .subscribe(res => {
            let data = res.json();
            console.log(data);
            resolve(data);
          }, (err) => {
            reject(err);
          });
        })

    });
  }
}
