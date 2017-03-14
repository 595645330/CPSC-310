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

    performQuery(query: any): Promise <InsightResponse> {
        let that = this;
        return new Promise(function (fulfill, reject) {
            var fs = require("fs");
            let output: any = {};
            let order: any = "";
            let listsOfColumn: any [] = [];
            let listOfCourses: any [] = [];
            let listOfUUID: any [] = [];
            let listOfUnderscore: any [] = [];
            let listOfNounderscore: any [] = [];
            let ifPass:any = true;
            let where1: any;
            let option1: any;
            let trans1:any;
            let group1:any;
            let apply1:any;
            let ifTrans: any = false;
            let ifEmptyWhere: any = false;
            let ifOrderDir:any = false;
            let direction:any = "DOWN";
            let listOfOrder:any []=[];
            let listOfApplyKey:any [] =[];
            let listOfkeys1:any []= [];
            let listOfkeys2:any []= [];
            let listOfkeys3:any []= [];
            let readfilename:any;
            let helper = new Helper();

            //Check if the query has both rooms and courses inside, if so return 400
            if (JSON.stringify(query).includes("rooms_") && JSON.stringify(query).includes("courses_")) {
                reject({"code":400,"body":{"error": "2 sources in a query"}});
                ifPass=false;
            }
            //Check if the first key of query if is where and second if is options and total length if is 2
            if(ifPass){
                if(Object.keys(query)[0] === 'WHERE' && Object.keys(query)[1] === 'OPTIONS' && (Object.keys(query)).length === 2){
                    where1= query["WHERE"];
                    option1= query["OPTIONS"];
                }
                else if(Object.keys(query)[0] === 'WHERE' && Object.keys(query)[1] === 'OPTIONS'&& Object.keys(query)[2] === 'TRANSFORMATIONS' && (Object.keys(query)).length === 3){
                    where1= query["WHERE"];
                    option1= query["OPTIONS"];
                    trans1= query["TRANSFORMATIONS"];
                    ifTrans=true;
                    if(Object.keys(trans1)[0] !=="GROUP" || Object.keys(trans1)[1] !=="APPLY"){
                        reject({"code":400,"body":{"error":"Transformations needs to contains both GROUP and APPLY"}});
                        ifPass=false;
                    }
                    else{
                        group1=trans1["GROUP"];
                        apply1=trans1["APPLY"];
                        try{
                            for(let element of apply1){
                                let a1:any =Object.keys(element)[0];
                                listOfkeys1.push(a1);
                                let a2:any =Object.keys(element[a1])[0];
                                listOfkeys2.push(a2);
                                let a3:any =element[a1][a2];
                                listOfkeys3.push(a3)
                            }
                            if(!(group1 instanceof Array)||!(apply1 instanceof Array)||!helper.checkValid(group1)||!helper.checkApply(listOfkeys1,listOfkeys2,listOfkeys3)){
                                throw new Error();
                            }
                        }catch(e){
                            reject({"code":400,"body":{"error":"group and apply not valid"}});
                            ifPass=false;
                        }
                    }
                }
                else{
                    reject({"code":400,"body":{"error": "invalid query, no WHERE or OPTIONS"}})
                    ifPass=false;
                }
            }

            //------------------------------------------------------------------------------------------------------------------------------
            //Check if the where is type of Object
            if(ifPass &&!(where1 instanceof Object)){
                reject({"code":400,"body":{"error": "Where wrong"}});
                ifPass=false;
            }
            if(ifPass &&Object.keys(where1).length === 0){
                ifEmptyWhere=true;
            }
            //Check if the first key of Options is COLUMN and second is ORDER third is FORM, or first is COLUMNS and second is FORM
            if (ifPass &&helper.checkOption(Object.keys(option1))){
                reject({"code":400,"body":{"error": "OPTIONS wrong"}});
                ifPass=false;
            }
            //Check if the COLUMNS is type is Array
            if (ifPass &&!((option1["COLUMNS"])instanceof Array) || ((option1["COLUMNS"]).length ===0)) {
                reject({"code":400,"body":{"error": "columns not a list or is empty"}});
                ifPass=false;
            }
            //Check if Column is valid
            if(ifPass) {
                for (let a of option1["COLUMNS"]) {
                    if(a.indexOf("_") !== -1){
                        listOfUnderscore.push(a);
                    }
                    else{
                        listOfNounderscore.push(a);
                    }
                    listsOfColumn.push(a);
                }
                //------------------------------------------------------------------
                if(listOfUnderscore.length!==0){
                    if(!helper.checkValid(listOfUnderscore)) {
                        reject({"code": 400, "body": {"error": "wrong column"}});
                        ifPass=false;
                    }else{
                        if(ifTrans){
                            for(let b of listOfUnderscore){
                                if(!group1.includes(b)){
                                    reject({"code":400,"body":{"error":"All COLUMNS keys need to be either in GROUP or in APPLY"}});
                                    ifPass=false;
                                    break;
                                }
                            }
                        }
                    }
                }
                if(ifPass&&listOfNounderscore.length!==0){
                    for(let b of listOfNounderscore){
                        if(!listOfkeys1.includes(b)){
                            reject({"code":400,"body":{"error":"All COLUMNS keys need to be either in GROUP or in APPLY"}});
                            ifPass=false;
                            break;
                        }
                    }
                }

            }
            //Check if the Form is valid
            if (ifPass &&!(option1["FORM"] === "TABLE")) {
                reject({"code":400,"body":{"error": "FORM not TABLE"}});
                ifPass=false;
            }
            //Give the render value
            if(ifPass){
                output.render = option1["FORM"];
            }
            //define order
            if(ifPass &&Object.keys(option1)[1] === "ORDER"){
                order = option1["ORDER"];
                if(order instanceof Object ){
                    ifOrderDir=true;
                    direction=order["dir"];
                    listOfOrder=order["keys"];
                    if(direction!=="DOWN"&&direction!=="UP"){
                        reject({"code":400,"body":{"error": "direction is not valid"}});
                        ifPass=false;
                    }
                }
                else{
                    direction="DOWN";
                    listOfOrder=listOfOrder.concat(order);
                }
                if(ifPass){
                    for(let everyOrder of listOfOrder){
                        if(!(listsOfColumn.includes(everyOrder))){
                            reject({"code":400,"body":{"error": "order not in column"}});
                            ifPass=false;
                        }
                    }
                }
            }
            //----------------------------------------------------------------------------------------------------------

            //-------------------------------------------------------------------------------------------------------------------
            //Check if what dataset inside the query
            //course dataset
            if(ifPass && ifEmptyWhere===false){
                let checknum:any=helper.check(where1);
                if (checknum=== 1) {
                    try {
                        fs.readFileSync('courses.txt', "utf-8").toString()
                        readfilename = "courses.txt";
                    }
                    catch (err) {
                        reject({"code": 424, "body": {"missing321": ["courses"]}});
                        ifPass = false;
                    }
                }
                //rooms dataset
                else if (checknum === 2) {
                    try {
                        fs.readFileSync('rooms.txt', "utf-8").toString()
                        readfilename = "rooms.txt";
                    }
                    catch (err) {
                        reject({"code": 424, "body": {"missing": ["rooms"]}});
                        ifPass = false;
                    }
                }
                //not valid dataset
                else if (checknum === 3) {
                    reject({"code":424,"body":{"missing246": ["courses"]}});
                    ifPass = false;
                }
            }
            else if(ifPass && ifEmptyWhere===true){
                if(listOfUnderscore.toString().includes("rooms_")){
                    readfilename = "rooms.txt";
                }else if(listOfUnderscore.toString().includes("courses_")){
                    readfilename = "courses.txt";
                }
            }

            // run the query--------------------------------------------------------------------------------------------
            if(ifPass){
                try {
                    fs.readFile(readfilename, "utf-8", (err: any, data: any) => {
                        //if can not read
                        if (err) {
                            reject({"code": 424, "body": {"missing123": ["courses"]}})
                            ifPass=false;
                        }
                        if(ifPass){
                            try {
                                data = JSON.parse(data);
                            } catch (err) {
                                reject({"code": 400, "body": {"error": "parse error"}});
                                ifPass=false
                            }
                        }

                        //-------------------------------------------------------------
                        if(ifPass&&ifEmptyWhere===true){
                            listOfUUID=data;
                        }
                        else{
                            if(ifPass){
                                try {
                                    listOfUUID = helper.CompareNum(where1, data);
                                } catch (err) {
                                    reject({"code": 400, "body": {"error": "helper error"}});
                                    ifPass=false;
                                }
                            }
                        }

                        if(ifPass&&ifTrans){
                            let group2:any []=[];
                            for(let g=0;g<group1.length;g++){
                                group2.push(group1[group1.length-g-1]);
                            }
                            try{
                                listOfUUID=helper.Groupby(group2,listOfUUID,0,listOfkeys3,listOfkeys1,listOfkeys2,listsOfColumn);
                            }catch(e){
                                reject({"code": 400, "body": {"error": "invalid applytoken"}});
                                ifPass=false;
                            }
                        }

                        if(ifPass){
                            listOfCourses=helper.listTheColumn(listOfUUID,listsOfColumn,ifTrans);
                        }

                        if (ifPass&&order !== "") {
                            let cmp = function(a:any, b:any) {
                                if (a > b) return +1;
                                if (a < b) return -1;
                                return 0;
                            }
                            let num:any = 0;
                            listOfCourses.sort(function(a:any, b:any) {
                                let final:any = cmp(a[listOfOrder[num]],b[listOfOrder[num]]);
                                num=num+1;
                                while(listOfOrder.length>num){
                                    final= final || cmp(a[listOfOrder[num]],b[listOfOrder[num]]) ;
                                    num=num+1;
                                }
                                num=0;
                                return final;
                                //return cmp(a.Value,b.Value) || cmp(a.Task,b.Task);
                            })
                        }
                        if(ifPass){
                            output.result = listOfCourses;
                            fulfill({"code": 200, "body": output});
                            console.log(output);
                        }
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
