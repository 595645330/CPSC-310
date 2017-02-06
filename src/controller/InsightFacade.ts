/**
 * This is the main programmatic entry point for the project.
 */
import {IInsightFacade, InsightResponse, QueryRequest} from "./IInsightFacade";

import Log from "../Util";

import {isArray} from "util";
import keys = require("core-js/fn/array/keys");
import {isUndefined} from "util";
import {isString} from "util";
import {throws} from "assert";

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
                    reject({"code":400,"body":{"error": "my text"}})
                });
            }).catch(function(err:any){
                reject({"code":400,"body":{"error": "my text"}})
            });
        });
    }

    removeDataset(id: string): Promise<InsightResponse> {
        let response:InsightResponse;
        return new Promise(function (fulfill, reject) {
            var fs = require("fs");
            var JSZip = require("jszip");
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
        let that = this;
        return new Promise(function (fulfill, reject){
            var fs = require("fs");
            var obj = new Object();
            let tosort : any[] = [];
            let result:any = {};
            let rejec: any ={};
            let ftosort : any[] = [];
            try {fs.readFileSync('courses.txt',"utf-8").toString()}
            catch(err) {reject({"code":424,"body":{"missing": ["courses"]}});}
            var global_data = fs.readFileSync('courses.txt',"utf-8").toString();


            try {JSON.parse(global_data)}
            catch (err) {reject({"code":400,"body":{"error": "cannot parse JSON"}})}
            obj=JSON.parse(global_data);

            console.log((Object.keys(query)).length);
            if(!(Object.keys(query)[0] === 'WHERE' && Object.keys(query)[1] === 'OPTIONS' && (Object.keys(query)).length === 2)){
                reject({"code":400,"body":{"error": "invalid query, no WHERE or OPTIONS"}})
            }
            let c1:any=query["WHERE"];


            try {      var list = that.helper(c1,obj);
                if (list instanceof Array) {

                    console.log("check list here" + list);

                    let options: any = query["OPTIONS"];
                    if (!(Object.keys(options)[0] === "COLUMNS" && Object.keys(options)[1] === "ORDER" && Object.keys(options)[2] === "FORM" && (Object.keys(options)).length === 3)){reject({"code":400,"body":{"error": "OPTIONS wrong"}})}
                    if (!(isArray(options["COLUMNS"])) || ((options["COLUMNS"]).length ===0)) {reject({"code":400,"body":{"error": "columns not a list or is empty"}});}
                    let columns: string[] = options["COLUMNS"];
                    for (let czx of columns) {
                        if (!(czx==="courses_dept") && !(czx==="courses_id") && !(czx==="courses_id") && !(czx ==="courses_avg") && !(czx === "courses_instructor") && !(czx==="courses_title") && ! (czx === "courses_pass") && !(czx === "courses_fail") && !(czx === "courses_audit") && !(czx === "courses_uuid"))
                        {reject({"code":400,"body":{"error": "wrong column"}});}
                    }


                    if (!(options["FORM"] === "TABLE")) {
                        reject({"code":400,"body":{"error": "FORM not TABLE"}});
                    }
                    if (!(options["ORDER"] ==="courses_avg") && !(options["ORDER"] ==="courses_pass") && !(options["ORDER"] ==="courses_fail") &&!(options["ORDER"] ==="courses_audit")){
                        reject({"code":400,"body":{"error": "Invalid ORDER"}});}

                    var sortaccordto = options["ORDER"];

                    if (!(columns.includes(sortaccordto))) {reject({"code":400,"body":{"error": "order not in column"}});}
                    let form: string = options["FORM"];
                    for (let zk of list) {
                        let save: any = {};
                        for (let eachcol of columns) {
                            save[eachcol] = zk[eachcol];
                        }
                        tosort.push(save);
                    }
                    tosort.sort((function (a, b) {
                        return a[sortaccordto] - b[sortaccordto];
                    }));
                    result["code"] = 200;
                    result["body"] = {"render": form, "result": tosort};
                    console.log("final tosort");
                    for (let b of tosort) {
                        console.log(b);
                    }
                }
            }
            catch(err) {
                console.log("I am Here");

                rejec["code"]= 400;
                rejec["body"]= {"error": "mytext"};
                reject(rejec);

            }
            console.log("fulfilled");
            fulfill(result);
        });
    }



    helper(tofilt: any, courses: any): any {
        let that = this;
        let results: any [] = [];

        if (!(Object.keys(tofilt)[0] == "LT") && !(Object.keys(tofilt)[0] == "GT") && !(Object.keys(tofilt)[0] == "EQ") && !(Object.keys(tofilt)[0] == "IS") && !(Object.keys(tofilt)[0] == "AND") && !(Object.keys(tofilt)[0] == "OR") && !(Object.keys(tofilt)[0] == "NOT")) {
            throw new Error();
        }

        else if ("LT" == Object.keys(tofilt)[0]) {
            if (!(tofilt["LT"] instanceof Object)) {
                throw new Error();
            }
            var lt = tofilt["LT"];
            if (!(Object.keys(lt)[0] === "courses_avg") && !(Object.keys(lt)[0] === "courses_pass") && !(Object.keys(lt)[0] === "courses_fail") && !(Object.keys(lt)[0] === "courses_audit")) {
                throw new Error();
            }
            let ltkey: string = Object.keys(lt)[0];
            if (!((typeof(lt[ltkey])) === "number")) {
                throw new Error();
            }
            var numinsideLT = lt[ltkey];

            for (let i of courses) {
                if (i[ltkey] < numinsideLT) {
                    results.push(i);
                }
            }
        }

        else if ("GT" == Object.keys(tofilt)[0]) {
            if (!(tofilt["GT"] instanceof Object)) {
                console.log("GT content invalid");
                throw new Error();
            }
            var gt = tofilt["GT"];
            if (!(Object.keys(gt)[0] === "courses_avg") && !(Object.keys(gt)[0] === "courses_pass") && !(Object.keys(gt)[0] === "courses_fail") && !(Object.keys(gt)[0] === "courses_audit")) {
                throw new Error();
            }
            let gtkey: string = Object.keys(gt)[0];

            if (!((typeof(gt[gtkey])) === "number")) {
                console.log("GT content invalid");
                throw new Error();
            }
            let numinsideGT: number = gt[gtkey];
            for (let i of courses) {

                if (i[gtkey] > numinsideGT) {
                    results.push(i);
                }
            }
        }

        else if ("EQ" == Object.keys(tofilt)[0]) {
            if (!(tofilt["EQ"] instanceof Object)) {
                throw new Error();
            }
            var eq = tofilt["EQ"];
            if (!(Object.keys(eq)[0] === "courses_avg") && !(Object.keys(eq)[0] === "courses_pass") && !(Object.keys(eq)[0] === "courses_fail") && !(Object.keys(eq)[0] === "courses_audit")) {
                throw new Error();
            }
            let eqkey: string = Object.keys(eq)[0];
            if (!((typeof(eq[eqkey])) === "number")) {
                throw new Error();
            }
            var numinsideeq = eq[eqkey];


            for (let i of courses) {

                if (i[eqkey] === numinsideeq) {
                    results.push(i);
                }
            }
        }

        else if ("IS" == Object.keys(tofilt)[0]) {
            // console.log("is running");
            if (!(tofilt["IS"] instanceof Object)) {
                throw new Error();
            }
            var is = tofilt["IS"];
            // console.log("check couses_"+Object.keys(is)[0]);
            if (!((Object.keys(is)[0] === "courses_dept") || (Object.keys(is)[0] === "courses_id") || (Object.keys(is)[0] === "courses_title") || (Object.keys(is)[0] === "courses_instructor") || (Object.keys(is)[0] === "courses_uuid"))) {
                console.log("not valid IS key not dept id etc");
                // reject("IS key fail");
                // rejec = true;
                throw new Error();
            }
            let iskey: string = Object.keys(is)[0];
            if (!((typeof(is[iskey])) === "string")) {
                throw new Error();
            }
            var nameinsideis = is[iskey];

            for (let i of courses) {
                var isstring = i[iskey];
                if (!(nameinsideis.charAt(0) === "*") && !(nameinsideis.charAt(nameinsideis.length - 1) === "*") && nameinsideis === isstring) {
                    results.push(i);
                }
                else if ((nameinsideis.charAt(0) === "*") && !(nameinsideis.charAt(nameinsideis.length - 1) === "*") && nameinsideis.slice(1, nameinsideis.length) === isstring.slice(0, nameinsideis.length - 1)) {
                    results.push(i);
                }
                else if (!(nameinsideis.charAt(0) === "*") && (nameinsideis.charAt(nameinsideis.length - 1) === "*") && nameinsideis.slice(0, nameinsideis.length - 1) === isstring.slice(isstring.length - nameinsideis.length + 1, isstring.length)) {
                    results.push(i);
                }
                else if ((nameinsideis.charAt(0) === "*") && (nameinsideis.charAt(nameinsideis.length - 1) === "*") && isstring.includes(nameinsideis.slice(1, nameinsideis.length - 1))) {
                    results.push(i);
                }
            }
        }

        else if ("AND" == Object.keys(tofilt)[0]) {
            // console.log("and array"+tofilt["AND"]);
            if (!(tofilt["AND"] instanceof Array) || ((tofilt["AND"]).length === 0)) {
                // reject("AND content fail");
                // rejec = true;
                throw new Error();
            }
            let and: any[] = tofilt["AND"];
            let temp: any[] = [];
            let newtemp: any[] = [];

            try {
                for (let h of and) {
                    var eachandlist = that.helper(h,courses);
                    if (eachandlist instanceof Array){
                        if (temp.length === 0) {
                            temp = eachandlist;
                        }
                        else {
                            for (let i of eachandlist) {
                                if (temp.includes(i) && !results.includes(i)) {
                                    results.push(i)
                                }
                            }
                            for (let z of temp) {
                                if (eachandlist.includes(z)) {
                                    newtemp.push(z);
                                }
                            }
                            temp = newtemp;
                        }}

                }}
            catch(err) {
                throw err;
            }
        }

        // console.log("checkand");
        //  console.log(results);


        else if ("OR" == Object.keys(tofilt)[0]) {

            if (!(tofilt["OR"] instanceof Array) || ((tofilt["OR"]).length === 0)) {
                throw new Error();}
            let or: any[] = tofilt["OR"];

            try{
                for (let o of or) {
                    // console.log("check o");
                    // console.log(o);
                    var eachorlist = that.helper(o, courses);
                    if (eachorlist instanceof Array) {
                        for (let i of eachorlist) {
                            if (!results.includes(i)) {
                                results.push(i);
                            }
                        }
                    }
                }}
            catch(err){
                throw err;
            }

        }
        // console.log("checkor");
        // console.log(results);


        else if ("NOT" == Object.keys(tofilt)[0]) {
            if (!(tofilt["Not"] instanceof Object)) {
                throw new Error();
            }
            var not = tofilt["NOT"];
            try {
                var eachnotlist = that.helper(not, courses);

                for (let nt of courses) {
                    if (!eachnotlist.includes(nt)) {
                        results.push(nt);
                    }
                }}
            catch(err) {
                throw err;
            }}

        else {
            throw new Error();
        }


// if (rejec) {throw ("helper fail");}
        console.log("this is result" + results);
// console.log(results[1]);
        return results;
    }
}
