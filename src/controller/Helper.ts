/**
 * Created by apple on 17-1-31.
 */
import Log from "../Util";
import {stringify} from "querystring";
import {error} from "util";
import {isNumber} from "util";

export default class helper{

    public helper(tofilt: any, courses: any): Promise<any>{


        return new Promise(function (fulfill, reject) {
            let results: any [] = [];
            // let rejec: boolean = false;
            // console.log("check");
            // console.log(Object.keys(tofilt)[0]);

            if (!(Object.keys(tofilt)[0] == "LT") && !(Object.keys(tofilt)[0] == "GT") && !(Object.keys(tofilt)[0] == "EQ") && !(Object.keys(tofilt)[0] == "IS") && !(Object.keys(tofilt)[0] == "AND") && !(Object.keys(tofilt)[0] == "OR") && !(Object.keys(tofilt)[0] == "NOT")) {
                reject("key invalid");
                // rejec = true;
            }

            else if ("LT" == Object.keys(tofilt)[0]) {
                if (!(tofilt["LT"] instanceof Object)) {
                    reject("LT content invalid");
                    // rejec = true;
                }
                var lt = tofilt["LT"];
                if (!(Object.keys(lt)[0] === "courses_avg") && !(Object.keys(lt)[0] === "courses_pass") && !(Object.keys(lt)[0] === "courses_fail") && !(Object.keys(lt)[0] === "courses_audit")) {
                    reject("LT key fail");
                    // rejec = true;
                }
                let ltkey: string = Object.keys(lt)[0];
                if (!((typeof(lt[ltkey])) === "number")) {
                    reject("LT value fail");
                    // rejec = true;
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
                    reject("GT content invalid");
                    // rejec = true;
                }
                var gt = tofilt["GT"];
                console.log(typeof gt);
                console.log(typeof Object.keys(gt)[0]);
                if (!(Object.keys(gt)[0] === "courses_avg") && !(Object.keys(gt)[0] === "courses_pass") && !(Object.keys(gt)[0] === "courses_fail") && !(Object.keys(gt)[0] === "courses_audit")) {
                    console.log("fgfghfhg");
                    reject("GT key fail");
                    // rejec = true;
                }
                let gtkey: string = Object.keys(gt)[0];
                console.log(gtkey);
                console.log(typeof Object.keys(gt)[0]);
                console.log(((gt[gtkey]) instanceof Number));
                console.log(typeof gt[gtkey]);
                console.log(typeof gt[gtkey]);
                console.log(typeof gt[gtkey] === "number");
                if (!((typeof(gt[gtkey])) === "number")) {
                    console.log("GT content invalid");
                    reject("GT value fail");
                    // rejec = true;
                }
                let numinsideGT: number = gt[gtkey];
                // console.log(numinsideGT);
                for (let i of courses) {

                    if (i[gtkey] > numinsideGT) {
                        results.push(i);
                    }
                }
            }

            else if ("EQ" == Object.keys(tofilt)[0]) {
                if (!(tofilt["EQ"] instanceof Object)) {
                    reject("EQ content invalid");
                    // rejec = true;
                }
                var eq = tofilt["EQ"];
                if (!(Object.keys(eq)[0] === "courses_avg") && !(Object.keys(eq)[0] === "courses_pass") && !(Object.keys(eq)[0] === "courses_fail") && !(Object.keys(eq)[0] === "courses_audit")) {
                    reject("EQ key fail");
                    // rejec = true;
                }
                let eqkey: string = Object.keys(eq)[0];
                if (!((typeof(eq[eqkey])) === "number")) {
                    reject("EQ value fail");
                    // rejec = true;
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
                    reject("IS content invalid");
                    // rejec = true;
                }
                var is = tofilt["IS"];
                // console.log("check couses_"+Object.keys(is)[0]);
                if (!((Object.keys(is)[0] === "courses_dept") || (Object.keys(is)[0] === "courses_id") || (Object.keys(is)[0] === "courses_title") || (Object.keys(is)[0] === "courses_instructor") || (Object.keys(is)[0] === "courses_uuid"))) {
                    console.log("not valid IS key not dept id etc");
                    reject("IS key fail");
                    // rejec = true;
                    return({"code":400,"body":{"error": "IS key fail"}});
                }
                let iskey: string = Object.keys(is)[0];
                if (!((typeof(is[iskey])) === "string")) {
                    reject("IS value fail");
                    // rejec = true;
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
                    reject("AND content fail");
                    // rejec = true;
                }
                let and: any[] = tofilt["AND"];
                let he = new helper();
                let temp: any[] = [];
                let newtemp: any[] = [];

                for (let h of and) {
                    he.helper(h, courses).then(function (eachandlist) {
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
                        }

                    }).catch(function (err: any) {
                        // console.log("AND Fail");
                        // console.log(err);
                        // rejec = true;
                        reject(err);
                    })
                }
                // console.log("checkand");
                //  console.log(results);
            }

            else if ("OR" == Object.keys(tofilt)[0]) {

                if (!(tofilt["OR"] instanceof Array) || ((tofilt["OR"]).length === 0)) {
                    reject("OR content fail");
                }
                let or: any[] = tofilt["OR"];
                for (let o of or) {
                    let he = new helper();
                    // console.log("check o");
                    // console.log(o);
                    he.helper(o, courses).then(function (eachorlist) {

                        for (let i of eachorlist) {
                            if (!results.includes(i)) {
                                results.push(i);
                            }
                        }
                    }).catch(function (err: any) {
                        // console.log("OR Fail");
                        // console.log(err);
                        reject(err);
                        // rejec = true;
                    })
                }
                // console.log("checkor");
                // console.log(results);
            }

            else if ("NOT" == Object.keys(tofilt)[0]) {
                if (!(tofilt["Not"] instanceof Object)) {
                    reject("NOT content invalid");
                    // rejec = true;
                }
                var not = tofilt["NOT"];
                let he = new helper();
                he.helper(not, courses).then(function (eachnotlist) {

                    for (let nt of courses) {
                        if (!eachnotlist.includes(nt)) {
                            results.push(nt);
                        }
                    }
                }).catch(function (err: any) {
                    // console.log("NOT Fail")
                    reject(err);
                    // rejec = true;
                })
            }

            else {
                // console.log("Invalid Query")
                reject("Invalid Query");
                // rejec = true;
            }


            // if (rejec) {throw ("helper fail");}
            console.log("this is result" + results);
            // console.log(results[1]);
            fulfill(results);
        });
    }
}