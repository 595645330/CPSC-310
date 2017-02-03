/**
 * Created by apple on 17-1-31.
 */
import Log from "../Util";
import {stringify} from "querystring";
import {error} from "util";

export default class helper{
    public helper(tofilt: any, courses: any): Promise<any[]>{


        return new Promise(function (fulfill, reject) {
            let results: any[] = [];
            //console.log("check");
            //console.log(Object.keys(tofilt)[0]);

            if ("LT" == Object.keys(tofilt)[0]) {
                var lt = tofilt["LT"];
                let ltkey: string = Object.keys(lt)[0];
                var numinsideLT = lt[ltkey];


                for (let i of courses) {
                    if (i[ltkey] < numinsideLT) {
                        results.push(i);
                    }
                }
            }

            else if ("GT" == Object.keys(tofilt)[0]) {
                var gt = tofilt["GT"];
                let gtkey: string = Object.keys(gt)[0];
                var numinsideGT = gt[gtkey];
                for (let i of courses) {

                    if (i[gtkey] > numinsideGT) {
                        results.push(i);
                    }
                }
            }

            else if ("EQ" == Object.keys(tofilt)[0]) {
                var eq = tofilt["EQ"];
                let eqkey: string = Object.keys(eq)[0];
                var numinsideeq = eq[eqkey];
                for (let i of courses) {

                    if (i[eqkey] === numinsideeq) {
                        results.push(i);
                    }
                }
            }

            else if ("IS" == Object.keys(tofilt)[0]) {
                var is = tofilt["IS"];
                let iskey: string = Object.keys(is)[0];
                var nameinsideis = is[iskey];
                for (let i of courses) {
                    var isstring = i[iskey];
                    if (isstring.includes(nameinsideis)) {
                        results.push(i);
                    }
                }
            }

            else if ("AND" == Object.keys(tofilt)[0]) {
                console.log("andrun");
                let and: any[] = tofilt["AND"];
                let he = new helper();
                let temp: any[] = [];
                let newtemp: any[] = [];
                for (let h of and){
                    he.helper(h,courses).then(function (eachandlist){
                        if (temp.length === 0){temp = eachandlist;}
                        else {
                            for (let i of eachandlist){
                                if (temp.includes(i) && !results.includes(i)){
                                    results.push(i)
                                }
                            }
                            for (let z of temp){
                                if (eachandlist.includes(z)){
                                    newtemp.push(z);
                                }
                            }
                            temp = newtemp;
                        }

                    }).catch(function(err){
                        // console.log("AND Fail");
                        // console.log(err);
                        reject("AND fail");})
                }
                // console.log("checkand");
                // console.log(results);
            }

            else if ("OR" == Object.keys(tofilt)[0]) {
                let or: any[] = tofilt["OR"];
                for (let o of or){
                    let he = new helper();
                    // console.log("check o");
                    // console.log(o);
                    he.helper(o,courses).then(function (eachorlist){

                        for (let i of eachorlist){
                            if (!results.includes(i)){
                                results.push(i);
                            }
                        }
                    }).catch(function(err){
                        // console.log("OR Fail");
                        // console.log(err);
                        reject("OR fail");})
                }
                // console.log("checkor");
                // console.log(results);
            }

            else if ("NOT" == Object.keys(tofilt)[0]){
                var not = tofilt["NOT"];
                let he = new helper();
                he.helper(not,courses).then(function (eachnotlist) {

                    for (let nt of courses){
                        if (!eachnotlist.includes(nt)){
                            results.push(nt);
                        }
                    }
                }).catch(function(err){
                    // console.log("NOT Fail")
                    reject("NOT fail");
                })
            }

            else {
                // console.log("Invalid Query")
                reject("Invalid Query");
            }
            fulfill(results);
        })
    }
}
