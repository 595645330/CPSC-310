/**
 * This is the main programmatic entry point for the project.
 */
import {IInsightFacade, InsightResponse, QueryRequest} from "./IInsightFacade";

import Log from "../Util";
import Helper from "./Helper";
import {isUndefined} from "util";
import {stringify} from "querystring";


export default class InsightFacade implements IInsightFacade {

    constructor() {
        Log.trace('InsightFacadeImpl::init()');
    }


    addDataset(id: string, content: string): Promise<InsightResponse> {
        return new Promise(function (fulfill, reject) {
            if(id==="courses") {
                var fs = require("fs");
                var JSZip = require("jszip");
                let processList: Promise<any>[] = [];
                let lists: any [] = [];
                let year: number;
                var new_zip = new JSZip();
                let response: InsightResponse;
                if (content === null || id === null || isUndefined(content) || isUndefined(id)) {
                    reject({"code": 400, "body": {"error": "my text"}});
                    throw new Error();
                }
                new_zip.loadAsync(content, {base64: true}).then(function (zip: JSZip) {
                    let files: any = zip.files;
                    for (let key of Object.keys(files)) {
                        let file: any = files[key];
                        processList.push(file.async("string"));
                    }
                    Promise.all(processList).then(function (nums: string[]) {
                        for (let num of nums) {
                            let parsedJson: {[id: string]: any;};
                            if (num !== undefined && num.length !== 0) {
                                parsedJson = JSON.parse(num);
                                let obs: any = parsedJson["result"]
                                if (obs !== undefined && obs.length !== 0) {
                                    for (let ob of obs) {
                                        if (ob["Section"] !== undefined && ob["Section"] === "overall"){year = 1900;}
                                        else {year = Number(ob["Year"]);}
                                        var tos = (ob["id"]).toString();
                                        var obj = {
                                            "courses_dept": ob["Subject"],
                                            "courses_id": ob["Course"],
                                            "courses_avg": ob["Avg"],
                                            "courses_instructor": ob["Professor"],
                                            "courses_title": ob["Title"],
                                            "courses_pass": ob["Pass"],
                                            "courses_fail": ob["Fail"],
                                            "courses_audit": ob["Audit"],
                                            "courses_uuid": tos,
                                            "courses_year": year
                                        };
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
                            response = {"code": 201, "body": {}};
                            fulfill(response)
                        } catch (err) {
                            response = {"code": 204, "body": {}};
                            fs.writeFile(id + '.txt', JSON.stringify(lists), (err: any) => {
                                if (err) {
                                    throw err;
                                }
                                fulfill(response);
                            });
                        }
                    }).catch(function (err: any) {
                        reject({
                            "code": 400,
                            "body": {"error": "the operation was unsuccessful because the delete was for a resource that was not previously added."}
                        })
                    });
                }).catch(function (err: any) {
                    reject({
                        "code": 400,
                        "body": {"error": "the operation was unsuccessful because the delete was for a resource that was not previously added."}
                    })
                });
            }
            else if(id==="rooms"){
                var fs = require("fs");
                var JSZip = require("jszip");
                let processList: Promise<any>[] = [];
                let lists: any [] = [];
                let listOfBoth: any [] = [];
                let listOfBuilding: any [] = [];
                let listOfAddress: any [] = [];
                let listOfFullName: any [] = [];
                let listOfType: any [] = [];
                let listOfFurniture: any [] = [];
                let listOfSeats: any [] = [];
                let listOfhref: any [] = [];
                let listOfLat: any [] = [];
                let listOfLon: any [] = [];
                let listOfRoom: any [] = [];
                let listOfRoomName: any [] = [];
                let listOfLatLon: any [] = [];
                var new_zip = new JSZip();
                let response: InsightResponse;
                if (content === null || id === null || isUndefined(content) || isUndefined(id)) {
                    reject({"code": 400, "body": {"error": "my text"}});
                    throw new Error();
                }
                new_zip.loadAsync(content, {base64: true}).then(function (zip: JSZip) {
                    let files: any = zip.files;
                    for (let key of Object.keys(files)) {
                        let file: any = files[key];
                        if(file["name"]==="index.htm") {
                            processList.push(file.async("string"));
                        }
                    }
                    Promise.all(processList).then(function (nums: string[]) {
                        const parse5 = require('parse5');
                        const document = parse5.parse(nums[0]);
                        var helper = new Helper();
                        listOfBoth = helper.findBuilding(document["childNodes"]);
                        for (let i = 0; i < listOfBoth.length; i++) {
                            if (i % 2) {
                                listOfAddress.push(listOfBoth[i]);
                            }
                            else {
                                listOfBuilding.push(listOfBoth[i]);
                            }
                        }
                        // console.log(listOfBuilding);
                        for (let build of listOfBuilding) {
                            for(let key of Object.keys(files)){
                                let file: any = files[key];
                                if(file["name"].slice(41, file["name"].length) === (build)){
                                    processList.push(file.async("string"));
                                    // console.log(file["name"]);
                                }
                            }
                        }
                        //----------------------------------------------------------------------------------------------------------
                        Promise.all(processList).then(function (nums: string[]) {

                            for (let num of nums) {
                                if (num !== undefined && num.length !== 0) {
                                    const parse5 = require('parse5');
                                    const document = parse5.parse(num);
                                    let a = helper.findFullName(document["childNodes"])
                                    if(a.length!==0){
                                        listOfFullName.push(helper.findFullName(document["childNodes"]));
                                        listOfRoom.push(helper.findRoomNumber(document["childNodes"]));
                                        listOfFurniture.push(helper.findFurniture(document["childNodes"]));
                                        listOfType.push(helper.findType(document["childNodes"]));
                                        listOfSeats.push(helper.findSeats(document["childNodes"]));
                                        listOfhref.push(helper.findhref(document["childNodes"]));
                                    }
                                }
                            }
                            // console.log(listOfFullName.length);
                            //--------------------------------------------------------------------------
                            for(let array of listOfhref){
                                if(array.length===0){
                                    listOfRoomName.push([]);
                                }
                                else{
                                    for(let array2 of array){
                                        listOfRoomName.push(array2.slice(69, array2.length));
                                    }
                                }
                            }
                            //---------------------------------------------------------------------------
                            for(let address of listOfAddress){
                                listOfLatLon.push(helper.GetLatLon("http://skaha.cs.ubc.ca:11316/api/v1/team80/".concat(address)));
                            }
                            Promise.all(listOfLatLon).then(function (kk: any) {
                                for(let element of kk){
                                    listOfLat.push(element["lat"]);
                                    listOfLon.push(element["lon"]);
                                }
                                // console.log(listOfFullName.length);
                                // console.log(listOfRoom.length);
                                // console.log(listOfType.length)
                                // console.log(listOfFurniture.length)
                                // console.log(listOfSeats.length)
                                // console.log(listOfAddress.length)

                                for (let i:any= 0;i<listOfBuilding.length;i++) {
                                    if(listOfRoom[i].length!==0){
                                        for(let j:any =0; j<listOfRoom[i].length;j++){
                                            var obj = {
                                                "rooms_fullname": listOfFullName[i][0],
                                                "rooms_shortname": listOfBuilding[i],
                                                "rooms_number": listOfRoom[i][j],
                                                "rooms_name": (listOfBuilding[i].concat('_')).concat(listOfRoom[i][j]),
                                                "rooms_address": listOfAddress[i],
                                                "rooms_lat": listOfLat[i],
                                                "rooms_lon": listOfLon[i],
                                                "rooms_seats": listOfSeats[i][j],
                                                "rooms_type": listOfType[i][j],
                                                "rooms_furniture":listOfFurniture[i][j],
                                                "rooms_href":listOfhref[i][j]
                                            };
                                            lists.push(obj);
                                        }}
                                }

                                if (lists.length === 0) {
                                    throw new Error();
                                }
                                try {
                                    fs.accessSync(id + '.txt');
                                    response = {"code": 201, "body": {}};
                                    fulfill(response)
                                } catch (err) {
                                    response = {"code": 204, "body": {}};
                                    fs.writeFile(id + '.txt', JSON.stringify(lists), (err: any) => {
                                        if (err) {
                                            throw err;
                                        }
                                        fulfill(response);
                                    });
                                }
                            }).catch(function (err: any) {
                                reject({
                                    "code": 400,
                                    "body": {"error": "the operation was unsuccessful because the delete was for a resource that was not previously added."}
                                })
                            });
                        }).catch(function (err: any) {
                            reject({
                                "code": 400,
                                "body": {"error": "the operation was unsuccessful because the delete was for a resource that was not previously added."}
                            })
                        });
                    }).catch(function (err: any) {
                        reject({
                            "code": 400,
                            "body": {"error": "the operation was unsuccessful because the delete was for a resource that was not previously added."}
                        })
                    });
                }).catch(function (err: any) {
                    reject({
                        "code": 400,
                        "body": {"error": "the operation was unsuccessful because the delete was for a resource that was not previously added."}
                    })
                });
            }
            else{
                reject({
                    "code": 400,
                    "body": {"error": "the operation was unsuccessful because the delete was for a resource that was not previously added."}
                })
            }
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
            let ifPass:any = true;
            let where1: any;
            let option1: any;
            let readfilename:any;
            let helpera = new Helper();

            if (JSON.stringify(query).includes("rooms_") && JSON.stringify(query).includes("courses_")) {
                reject({"code":400,"body":{"error": "2 sources in a query"}});
                ifPass=false;
            }

            if(ifPass &&!(Object.keys(query)[0] === 'WHERE' && Object.keys(query)[1] === 'OPTIONS' && (Object.keys(query)).length === 2)){
                reject({"code":400,"body":{"error": "invalid query, no WHERE or OPTIONS"}})
                ifPass=false;
            }
            if(ifPass){
                where1= query["WHERE"];
                option1= query["OPTIONS"];
            }

            //---------------------------------------------------------------
            if(ifPass &&!(where1 instanceof Object)){
                reject({"code":400,"body":{"error": "Where wrong"}});
                ifPass=false;
            }
            if (ifPass &&!(Object.keys(option1)[0] === "COLUMNS" && Object.keys(option1)[1] === "ORDER" && Object.keys(option1)[2] === "FORM" && (Object.keys(option1)).length === 3)
                && !(Object.keys(option1)[0] === "COLUMNS" &&  Object.keys(option1)[1] === "FORM" && (Object.keys(option1)).length === 2)){
                reject({"code":400,"body":{"error": "OPTIONS wrong"}});
                ifPass=false;
            }
            if (ifPass &&!((option1["COLUMNS"])instanceof Array) || ((option1["COLUMNS"]).length ===0)) {
                reject({"code":400,"body":{"error": "columns not a list or is empty"}});
                ifPass=false;
            }
            if(ifPass) {
                for (let a of option1["COLUMNS"]) {
                    listsOfColumn.push(a);
                }
                //------------------------------------------------------------------
                for (let loc of listsOfColumn) {
                    if (!(loc === "courses_dept") && !(loc === "courses_id")
                        && !(loc === "courses_avg") && !(loc === "courses_instructor") && !(loc === "courses_title") && !(loc === "courses_year")
                        && !(loc === "courses_pass") && !(loc === "courses_fail") && !(loc === "courses_audit") && !(loc === "courses_uuid")
                        && !(loc === "rooms_fullname") && !(loc === "rooms_shortname") && !(loc === "rooms_number") && !(loc === "rooms_name")
                        && !(loc === "rooms_address") && !(loc === "rooms_lat" ) && !(loc === "rooms_lon") && !(loc === "rooms_seats")
                        && !(loc === "rooms_type") && !(loc === "rooms_furniture") && !(loc === "rooms_href")) {
                        reject({"code": 400, "body": {"error": "wrong column"}});
                        ifPass=false;
                    }
                }
            }
            if (ifPass &&!(option1["FORM"] === "TABLE")) {
                reject({"code":400,"body":{"error": "FORM not TABLE"}});
                ifPass=false;
            }
            if(ifPass){
                output.render = option1["FORM"];
            }
            if(ifPass &&Object.keys(option1)[1] === "ORDER"){
                order = option1["ORDER"];
            }

            if (ifPass &&!(listsOfColumn.includes(order)) && (order!=="")) {
                reject({"code":400,"body":{"error": "order not in column"}});
                ifPass=false;
            }

            let helperb = new Helper();
            // console.log("checker number " + helperb.check(where1));
            let checknum:any=helpera.check(where1);
            if (ifPass && checknum=== 1) {
                try {
                    fs.readFileSync('courses.txt', "utf-8").toString()
                    readfilename = "courses.txt";
                }
                catch (err) {
                    reject({"code": 424, "body": {"missing": ["courses"]}});
                    ifPass = false;
                }
            }
            else if (ifPass &&checknum === 2) {
                try {
                    fs.readFileSync('rooms.txt', "utf-8").toString()
                    readfilename = "rooms.txt";
                }
                catch (err) {
                    reject({"code": 424, "body": {"missing": ["rooms"]}});
                    ifPass = false;
                }
            }
            else if (ifPass &&checknum === 3) {
                reject({"code":424,"body":{"missing": ["courses"]}});
                ifPass = false;
            }
            // console.log(readfilename);
            if(ifPass){
                try {
                    fs.readFile(readfilename, "utf-8", (err: any, data: any) => {
                        if (err) {
                            reject({"code": 424, "body": {"missing": ["courses"]}})
                        }
                        try {
                            data = JSON.parse(data);
                        } catch (err) {
                            console.log(err);
                            reject({"code": 400, "body": {"error": "parse error"}});
                        }
                        let helper = new Helper();

                        try {
                            listOfUUID = helper.CompareNum(where1, data);
                        } catch (err) {
                            reject({"code": 400, "body": {"error": "helper error"}});
                        }
                        let listOfCourses: any[] = [];
                        for (let uuid of listOfUUID) {
                            let course: any = {};
                            for (let column of listsOfColumn) {
                                course[column] = uuid[column];
                            }
                            listOfCourses.push(course);
                        }
                        if (order !== "") {
                            if ((option1["ORDER"] === "courses_avg") || (option1["ORDER"] === "courses_pass") || (option1["ORDER"] === "courses_fail") || (option1["ORDER"] === "courses_audit") || (option1["ORDER"] === "courses_year")
                                ||  (option1["ORDER"] === "rooms_lat") ||  (option1["ORDER"] === "rooms_lon") ||  (option1["ORDER"] === "rooms_seats")) {
                                listOfCourses.sort(function (a, b) {
                                    return a[order] - b[order];
                                });
                            }
                            else if ((option1["ORDER"] === "courses_dept") || (option1["ORDER"] === "courses_id") || (option1["ORDER"] === "courses_instructor") || (option1["ORDER"] === "courses_uuid") || (option1["ORDER"] === "courses_title")
                                ||  (option1["ORDER"] === "rooms_fullname") ||  (option1["ORDER"] === "rooms_shortname") ||  (option1["ORDER"] === "rooms_number") ||  (option1["ORDER"] === "rooms_name")
                                ||  (option1["ORDER"] === "rooms_address") ||  (option1["ORDER"] === "rooms_type") ||  (option1["ORDER"] === "rooms_furniture") ||  (option1["ORDER"] === "rooms_href")) {
                                listOfCourses.sort(function (a, b) {
                                    if (a[order] < b[order]) return -1;
                                    if (a[order] > b[order]) return 1;
                                    return 0;
                                })
                            }
                            else {
                                reject({"code": 400, "body": {"error": "order wrong"}});
                                throw new Error();
                            }
                        }
                        output.result = listOfCourses;
                        fulfill({"code": 200, "body": output});
                        console.log(output);
                    });
                } catch (err) {
                    reject({
                        "code": 424,
                        "body": {"code": 424, "body": {"missing": ["some"]}}
                    });
                }
            }
        });
    }
}
