
/**
 * This is the main programmatic entry point for the project.
 */
import {IInsightFacade, InsightResponse, QueryRequest} from "./IInsightFacade";

import Log from "../Util";
import Helper from "./Helper";
import {isUndefined} from "util";

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
            if (content === null || id === null || isUndefined(content) || isUndefined(id)){
                reject({"code":400,"body":{"error": "my text"}});
                throw new Error();
            }

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
                    if (lists.length === 0) {
                        throw new Error();
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
                    reject({"code":400,"body":{"error":"the operation was unsuccessful because the delete was for a resource that was not previously added."}})
                });
            }).catch(function(err:any){
                reject({"code":400,"body":{"error":"the operation was unsuccessful because the delete was for a resource that was not previously added."}})
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
            let order: any = "";
            let listsOfColumn: any [] = [];
            let listOfCourses: any [] = [];
            let listOfUUID: any [] = [];

            try {fs.readFileSync('courses.txt',"utf-8").toString()}
            catch(err) {reject({"code":424,"body":{"missing": ["courses"]}});}

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
            if (!(Object.keys(option1)[0] === "COLUMNS" && Object.keys(option1)[1] === "ORDER" && Object.keys(option1)[2] === "FORM" && (Object.keys(option1)).length === 3)
                && !(Object.keys(option1)[0] === "COLUMNS" &&  Object.keys(option1)[1] === "FORM" && (Object.keys(option1)).length === 2)){
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
            //------------------------------------------------------------------
            for (let loc of listsOfColumn) {
                if (!(loc==="courses_dept") && !(loc==="courses_id")
                    && !(loc ==="courses_avg") && !(loc === "courses_instructor") && !(loc==="courses_title")
                    && ! (loc === "courses_pass") && !(loc === "courses_fail") && !(loc === "courses_audit") && !(loc === "courses_uuid")){
                    reject({"code":400,"body":{"error": "wrong column"}});
                    throw new Error();
                }
            }
            if (!(option1["FORM"] === "TABLE")) {
                reject({"code":400,"body":{"error": "FORM not TABLE"}});
                throw new Error();
            }
            output.render = option1["FORM"];
            if(Object.keys(option1)[1] === "ORDER"){
                order = option1["ORDER"];
            }

            if (!(listsOfColumn.includes(order)) && (order!=="")) {
                reject({"code":400,"body":{"error": "order not in column"}});
                throw new Error();
            }
            //--------------------------------------------------------------------
            try{
                fs.readFile("courses.txt", "utf-8", (err: any, data: any) => {
                    if (err) {
                        reject({"code":424,"body":{"missing": ["courses"]}})
                        throw new Error();
                    }
                    try {
                        data = JSON.parse(data);
                    }catch(err) {
                        reject({"code": 400, "body": {"missing": ["courses"]}});
                    }
                    let helper = new Helper();

                    try{
                        listOfUUID = helper.CompareNum(where1, data);
                    } catch (err){
                        reject({"code":400,"body":{"error": ["courses"]}});
                    }
                    let listOfCourses: any[] = [];
                    for(let uuid of listOfUUID){
                        let course:any = {};
                        for (let column of listsOfColumn) {
                            course[column] = uuid[column];
                        }
                        listOfCourses.push(course);
                    }
                    if(order!==""){
                        if((option1["ORDER"] ==="courses_avg") ||(option1["ORDER"] ==="courses_pass") ||(option1["ORDER"] ==="courses_fail") ||(option1["ORDER"] ==="courses_audit")) {
                            listOfCourses.sort(function (a, b) {
                                return a[order] - b[order];
                            });
                        }
                        else if((option1["ORDER"] ==="courses_dept") ||(option1["ORDER"] ==="courses_id") ||(option1["ORDER"] ==="courses_instructor") ||(option1["ORDER"] ==="courses_uuid")||(option1["ORDER"] ==="courses_title")){
                            listOfCourses.sort(function(a, b){
                                if(a[order] < b[order]) return -1;
                                if(a[order] > b[order]) return 1;
                                return 0;
                            })
                        }
                        else{
                            reject({"code":400,"body":{"error": "order wrong"}});
                            throw new Error();
                        }
                    }
                    output.result = listOfCourses;
                    fulfill({"code": 200, "body": output});
                    console.log(output);
                });
            }catch(err) {
                reject({"code":424,"body":{"error":"the operation was unsuccessful because the delete was for a resource that was not previously added."}});
            }
        });
    }
}
