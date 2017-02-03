/**
 * This is the main programmatic entry point for the project.
 */
import {IInsightFacade, InsightResponse, QueryRequest} from "./IInsightFacade";

import Log from "../Util";

import helper from "./Helper";
import {isArray} from "util";
import keys = require("core-js/fn/array/keys");
import {isUndefined} from "util";
import {isString} from "util";

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



            //my change
            if (content === null || id === null || isUndefined(content) || isUndefined(id)){reject({"code":400,"body":{"error": "my text"}})}



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
                    reject({"code":400,"body":{"error": "my text"}})
                });
            }).catch(function(err:any){
                reject({"code":400,"body":{"error": "my text"}})
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
                response={"code":404,"body":{"error": "my text"}};
                reject(response);
            }
            fulfill(response);
        });
    }


    performQuery(query: QueryRequest): Promise <InsightResponse> {
        return new Promise(function (fulfill, reject) {
            var fs = require("fs");
            var JSZip = require("jszip");
            var obj = new Object();
            let response:InsightResponse;
            let uuids : any[] = [];
            let tosort : any[] = [];
            fs.readFile('courses.txt',"utf-8", (err:any, data:any) => {

                if (err){
                    reject({"code":424,"body":{"missing": ["courses"]}})
                }
                try {JSON.parse(data)}
                catch (err) {reject({"code":400,"body":{"error": "cannot parse JSON"}})}
                obj=JSON.parse(data);
                //console.log("WHERE");
                //console.log(query["WHERE"]);
                let c1:any=query["WHERE"];

                let h = new helper();

                // try {h.helper(c1,obj)}
                // catch (err) {reject({"code":400,"body":{"error": "helper function failed"}})}

                h.helper(c1,obj).then(function (list: any[]) {
                    var options = query["OPTIONS"];
                    let columns: string[] = options["COLUMNS"];
                    var sortaccordto = options["ORDER"];
                    let form: string = options["FORM"];

                    // if (!(isArray(options))) {reject({"code":400,"body":{"error": "columns not a list"}})}
                    //
                    // if (!(sortaccordto instanceof String) || !(form === "TABLE")){
                    //     reject({"code":400,"body":{"error": "render or form wrong"}})
                    // }

                    for (let zk of list) {
                        let save:any={};
                        for (let eachcol of columns){
                            save[eachcol] = zk[eachcol];
                        }
                        tosort.push(save);
                    }
                    tosort.sort((function(a, b){
                        return a[sortaccordto] - b[sortaccordto];
                    }));

                    //console.log("tosort");
                    // console.log(tosort);

                    let resultbody: any = {};
                    resultbody = {render: form,result: tosort};
                    // console.log(resultbody);
                    fulfill({"code":200,"body":resultbody});
                }).catch(function (err) {
                    // console.log(err);
                    reject({"code":400,"body":{"error": err}});
                });
            });




        });

    }
}