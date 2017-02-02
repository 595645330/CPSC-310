/**
 * This is the main programmatic entry point for the project.
 */
import {IInsightFacade, InsightResponse, QueryRequest} from "./IInsightFacade";

import Log from "../Util";
import Helper from "./Helper";

export default class InsightFacade implements IInsightFacade {

    constructor() {
        Log.trace('InsightFacadeImpl::init()');
    }


    addDataset(id: string, content: string): Promise<InsightResponse> {

        return new Promise(function (fulfill, reject) {
            var fs = require("fs");
            var JSZip = require("jszip");
            let processList:Promise<any>[] = [];
            let lists:any [] = [];
            var new_zip = new JSZip();
            let response:InsightResponse;

            new_zip.loadAsync(content, {base64: true}).then(function(zip:JSZip){
                let files:any= zip.files;
                for(let key of Object.keys(files)){
                    let file:any =files[key];
                    processList.push(file.async("string"));
                }
                Promise.all(processList).then(function(nums:string[]){
                    for(let num of nums) {
                        let parsedJson: {[id: string]: any;};
                        if(num!== undefined && num.length !== 0){
                            parsedJson = JSON.parse(num);
                            let obs:any = parsedJson["result"]
                            if (obs!== undefined && obs.length !== 0) {
                                for(let ob of obs){
                                    //console.log(ob);
                                    var obj={"courses_dept":ob["Subject"],
                                        "courses_id":ob["Course"],
                                        "courses_avg":ob["Avg"],
                                        "courses_instructor":ob["Professor"],
                                        "courses_title":ob["Title"],
                                        "course_pass":ob["Pass"],
                                        "courses_fail":ob["Fail"],
                                        "courses_audit":ob["Audit"],
                                        "courses_uuid":ob["id"] };
                                    lists.push(obj);
                                }
                            }
                        }
                    }
                    try {
                        fs.accessSync(id + '.txt');
                        response={"code":201,"body":{}};
                    }catch(err){
                        response={"code":204,"body":{}};
                        fs.writeFile(id+'.txt', JSON.stringify(lists), (err: any) => {
                            if (err) {
                                throw err;
                            }
                            fulfill(response);
                        });
                    }
                    fulfill(response)
                }).catch(function(err:any) {
                    reject({"code":400,"body":{}})
                });
            }).catch(function(err:any){
                reject({"code":400,"body":{}})
            });
        });
    }

    removeDataset(id: string): Promise<InsightResponse> {
        return new Promise(function (fulfill, reject) {
            var fs = require("fs");
            var JSZip = require("jszip");
            let response:InsightResponse;
            try {
                fs.accessSync(id + '.txt');
                fs.unlinkSync(id + '.txt');
                response={"code":204,"body":{}};
            }catch(err){
                response={"code":404,"body":{"error":"the operation was unsuccessful because the delete was for a resource that was not previously added."}};
                reject(response);
            }
            fulfill(response);
        });
    }

    performQuery(query: QueryRequest): Promise <InsightResponse> {
        let that = this;
        return new Promise(function (fulfill, reject) {
            var fs = require("fs");
            var JSZip = require("jszip");
            let output:any={};
            let listsOfColumn:any [] = [];
            let listOfCourses:any [] = [];
            let listOfUUID:any [] = [];
            let response:InsightResponse;
            fs.readFile('D1.txt',"utf-8", (err:any, data:any) => {
                if (err){
                    throw err;
                }
                data=JSON.parse(data);
                let where1:any=query["WHERE"];
                let option1:any=query["OPTIONS"];
                for(let a of option1["COLUMNS"]){
                    listsOfColumn.push(a);
                }
                output.render=option1["FORM"];
                let order:any= option1["ORDER"];
                let helper2=new Helper();
                listOfUUID=helper2.CompareNum(where1,data);
                for(let uuid of listOfUUID){
                      for(let d of data){
                          if(d["courses_uuid"]===uuid){
                              let object1:any={};
                              for(let z of listsOfColumn){
                                  object1[z]=d[z];
                              }
                              listOfCourses.push(object1);
                          }
                      }
                }
                listOfCourses.sort(function(a, b){
                    return a[order] - b[order];
                });
                console.log(listOfCourses);
                fulfill({"code":200,"body":output});
            });
        });
    }




}
