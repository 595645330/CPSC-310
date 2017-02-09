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
                                        "courses_pass":ob["Pass"],
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
                    reject({"code":400,"body":{"error":"error"}})
                });
            }).catch(function(err:any){
                reject({"code":400,"body":{"error":"error"}})
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
            let output: any = {};
            let listsOfColumn: any [] = [];
            let listOfCourses: any [] = [];
            let listOfUUID: any [] = [];

            let response: InsightResponse;
            //--------------------------------------------------

            if(!(Object.keys(query)[0] === 'WHERE' && Object.keys(query)[1] === 'OPTIONS' && (Object.keys(query)).length === 2)){
                reject({"code":400,"body":{"error": "invalid query, no WHERE or OPTIONS"}})
                throw new Error();
            }

            let where1: any = query["WHERE"];
            let option1: any = query["OPTIONS"];
            //---------------------------------------------------------------
            if(!(where1 instanceof Object)){
                reject({"code":400,"body":{"error": "Where wrong"}});
                throw new Error();
            }
            if (!(Object.keys(option1)[0] === "COLUMNS" && Object.keys(option1)[1] === "ORDER" && Object.keys(option1)[2] === "FORM" && (Object.keys(option1)).length === 3)){
                reject({"code":400,"body":{"error": "OPTIONS wrong"}});
                throw new Error();
            }

            if (!((option1["COLUMNS"])instanceof Array) || ((option1["COLUMNS"]).length ===0)) {
                reject({"code":400,"body":{"error": "columns not a list or is empty"}});
                throw new Error();
            }
            for (let a of option1["COLUMNS"]) {
                listsOfColumn.push(a);
            }
            for (let czx of listsOfColumn) {
                if (!(czx==="courses_dept") && !(czx==="courses_id") && !(czx ==="courses_avg") && !(czx === "courses_instructor") && !(czx==="courses_title") && ! (czx === "courses_pass") && !(czx === "courses_fail") && !(czx === "courses_audit") && !(czx === "courses_uuid")) {   listsOfColumn=[];
                    reject({"code":400,"body":{"error": "wrong column"}});
                    throw new Error();
                }
            }
            if (!(option1["FORM"] === "TABLE")) {
                reject({"code":400,"body":{"error": "FORM not TABLE"}});
                throw new Error();
            }
            if (!(option1["ORDER"] ==="courses_avg") && !(option1["ORDER"] ==="courses_pass") && !(option1["ORDER"] ==="courses_fail") &&!(option1["ORDER"] ==="courses_audit")){
                reject({"code":400,"body":{"error": "Invalid ORDER"}});
                throw new Error();
            }

            output.render = option1["FORM"];
            let order: any = option1["ORDER"];
            if (!(listsOfColumn.includes(order))) {
                reject({"code":400,"body":{"error": "order not in column"}});
                throw new Error();
            }
//
            try{
                fs.readFile("courses.txt", "utf-8", (err: any, data: any) => {
                    if (err) {
                        throw err;
                    }
                    try {
                        data = JSON.parse(data);
                    }catch(err) {
                        reject({"code": 424, "body": {"missing": ["courses"]}});
                    }
                    let helper2 = new Helper();

                    try{
                        listOfUUID = helper2.CompareNum(where1, data);}
                    catch (err){
                        reject({"code":400,"body":{"error": ["courses"]}});
                    }

                    let listOfabc: any[] = [];
                    for(let course of listOfUUID){
                        let asd:any = {};
                        for (let z of listsOfColumn) {
                            asd[z] = course[z];
                        }
                       listOfabc.push(asd);
                    }
                    listOfabc.sort(function (a, b) {
                        return a[order] - b[order];
                    });
                    output.result = listOfabc;
                    fulfill({"code": 200, "body": output});
                    console.log(output);
                });
            }catch(err) {
                reject({"code":424,"body":{"missing": ["courses"]}});
            }
        });
    }
}
