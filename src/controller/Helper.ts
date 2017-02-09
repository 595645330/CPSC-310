/**
 * Created by Siyuan on 2017-02-01.
 */
import Log from "../Util";
export default class Helper{
    Greater(key1:any,data:any):any{
        let listOfUUID:any [] = [];
        if (!(key1 instanceof Object)) {
            console.log("GT content invalid");
            throw new Error();
        }
        if(Object.keys(key1)[0]==='courses_avg'){
            let key2:any = key1["courses_avg"];
            if (!((typeof(key2)) === "number")) {
                console.log("GT content invalid");
                throw new Error();
            }
            for(let i of data){
                if(i["courses_avg"]>key2){
                    listOfUUID.push(i);
                }
            }
        }
        else if(Object.keys(key1)[0]==='courses_pass'){
            let key2:any = key1["courses_pass"];
            if (!((typeof(key2)) === "number")) {
                console.log("GT content invalid");
                throw new Error();
            }
            for(let i of data){
                if(i["courses_pass"]>key2){
                    listOfUUID.push(i);
                }
            }
        }
        else if(Object.keys(key1)[0]==='courses_fail'){
            let key2:any = key1["courses_fail"];
            if (!((typeof(key2)) === "number")) {
                console.log("GT content invalid");
                throw new Error();
            }
            for(let i of data){
                if(i["courses_fail"]>key2){
                    listOfUUID.push(i);
                }
            }
        }//
        else if(Object.keys(key1)[0]==='courses_audit'){
            let key2:any = key1["courses_audit"];
            if (!((typeof(key2)) === "number")) {
                console.log("GT content invalid");
                throw new Error();
            }
            for(let i of data){
                if(i["courses_audit"]>key2){
                    listOfUUID.push(i);
                }
            }
        }
        else{
            throw new Error();
        }
        return listOfUUID;
    }

    Lessthan(key1:any,data:any):any{
        let listOfUUID:any [] = [];
        if (!(key1 instanceof Object)) {
            console.log("LT content invalid");
            throw new Error();
        }
        if(Object.keys(key1)[0]==='courses_avg'){
            let key2:any = key1["courses_avg"];
            if (!((typeof(key2)) === "number")) {
                console.log("GT content invalid");
                throw new Error();
            }
            for(let i of data){
                if(i["courses_avg"]<key2){
                    listOfUUID.push(i);
                }
            }
        }
        else if(Object.keys(key1)[0]==='courses_pass'){
            let key2:any = key1["courses_pass"];
            if (!((typeof(key2)) === "number")) {
                console.log("GT content invalid");
                throw new Error();
            }
            for(let i of data){
                if(i["courses_pass"]<key2){
                    listOfUUID.push(i);
                }
            }
        }
        else if(Object.keys(key1)[0]==='courses_fail'){
            let key2:any = key1["courses_fail"];
            if (!((typeof(key2)) === "number")) {
                console.log("GT content invalid");
                throw new Error();
            }
            for(let i of data){
                if(i["courses_fail"]<key2){
                    listOfUUID.push(i);
                }
            }
        }
        else if(Object.keys(key1)[0]==='courses_audit'){
            let key2:any = key1["courses_audit"];
            if (!((typeof(key2)) === "number")) {
                console.log("GT content invalid");
                throw new Error();
            }
            for(let i of data){
                if(i["courses_audit"]<key2){
                    listOfUUID.push(i);
                }
            }
        }
        else{
            throw new Error();
        }
        return listOfUUID;
    }

    Equalto(key1:any,data:any):any{
        let listOfUUID:any [] = [];
        if (!(key1 instanceof Object)) {
            console.log("EQ content invalid");
            throw new Error();
        }
        if(Object.keys(key1)[0]==='courses_avg'){
            let key2:any = key1["courses_avg"];
            if (!((typeof(key2)) === "number")) {
                console.log("EQ content invalid");
                throw new Error();
            }
            for(let i of data){
                if(i["courses_avg"]===key2){
                    listOfUUID.push(i);
                }
            }
        }
        else if(Object.keys(key1)[0]==='courses_pass'){
            let key2:any = key1["courses_pass"];
            if (!((typeof(key2)) === "number")) {
                console.log("GT content invalid");
                throw new Error();
            }
            for(let i of data){
                if(i["courses_pass"]===key2){
                    listOfUUID.push(i);
                }
            }
        }
        else if(Object.keys(key1)[0]==='courses_fail'){
            let key2:any = key1["courses_fail"];
            if (!((typeof(key2)) === "number")) {
                console.log("GT content invalid");
                throw new Error();
            }
            for(let i of data){
                if(i["courses_fail"]===key2){
                    listOfUUID.push(i);
                }
            }
        }
        else if(Object.keys(key1)[0]==='courses_audit'){
            let key2:any = key1["courses_audit"];
            if (!((typeof(key2)) === "number")) {
                console.log("GT content invalid");
                throw new Error();
            }
            for(let i of data){
                if(i["courses_audit"]===key2){
                    listOfUUID.push(i);
                }
            }
        }
        else{
            throw new Error();
        }
        return listOfUUID;
    }


    Isto(key1:any,data:any):any{
        let listOfUUID:any [] = [];
        if (!(key1 instanceof Object)) {
            throw new Error();
        }

        if(Object.keys(key1)[0]==='courses_dept'){
            let key2:any = key1["courses_dept"];
            if (!((typeof(key2)) === "string")) {
                throw new Error();
            }
            for(let i of data){
                if (!(key2.charAt(0) === "*") && !(key2.charAt(key2.length - 1) === "*") && key2 === i['courses_dept']) {
                    listOfUUID.push(i);
                }
                else if ((key2.charAt(0) === "*") && !(key2.charAt(key2.length - 1) === "*") && key2.slice(1, key2.length) === i['courses_dept'].slice(0, key2.length - 1)) {
                    listOfUUID.push(i);
                }
                else if (!(key2.charAt(0) === "*") && (key2.charAt(key2.length - 1) === "*") && key2.slice(0, key2.length - 1) === i['courses_dept'].slice(i['courses_dept'].length - key2.length + 1, i['courses_dept'].length)) {
                    listOfUUID.push(i);
                }
                else if ((key2.charAt(0) === "*") && (key2.charAt(key2.length - 1) === "*") && i['courses_dept'].includes(key2.slice(1, key2.length - 1))) {
                    listOfUUID.push(i);
                }
            }
        }
        else if(Object.keys(key1)[0]==='courses_id'){
            let key2:any = key1["courses_id"];
            if (!((typeof(key2)) === "string")) {
                throw new Error();
            }
            for(let i of data){
                if (!(key2.charAt(0) === "*") && !(key2.charAt(key2.length - 1) === "*") && key2 === i['courses_id']) {
                    listOfUUID.push(i);
                }
                else if ((key2.charAt(0) === "*") && !(key2.charAt(key2.length - 1) === "*") && key2.slice(1, key2.length) === i['courses_id'].slice(0, key2.length - 1)) {
                    listOfUUID.push(i);
                }
                else if (!(key2.charAt(0) === "*") && (key2.charAt(key2.length - 1) === "*") && key2.slice(0, key2.length - 1) === i['courses_id'].slice(i['courses_id'].length - key2.length + 1, i['courses_id'].length)) {
                    listOfUUID.push(i);
                }
                else if ((key2.charAt(0) === "*") && (key2.charAt(key2.length - 1) === "*") && i['courses_id'].includes(key2.slice(1, key2.length - 1))) {
                    listOfUUID.push(i);
                }
            }
        }
        else if(Object.keys(key1)[0]==='courses_instructor'){
            let key2:any = key1["courses_instructor"];
            if (!((typeof(key2)) === "string")) {
                throw new Error();
            }
            for(let i of data){
                if (!(key2.charAt(0) === "*") && !(key2.charAt(key2.length - 1) === "*") && key2 === i['courses_instructor']) {
                    listOfUUID.push(i);
                }
                else if ((key2.charAt(0) === "*") && !(key2.charAt(key2.length - 1) === "*") && key2.slice(1, key2.length) === i['courses_instructor'].slice(0, key2.length - 1)) {
                    listOfUUID.push(i);
                }
                else if (!(key2.charAt(0) === "*") && (key2.charAt(key2.length - 1) === "*") && key2.slice(0, key2.length - 1) === i['courses_instructor'].slice(i['courses_instructor'].length - key2.length + 1, i['courses_instructor'].length)) {
                    listOfUUID.push(i);
                }
                else if ((key2.charAt(0) === "*") && (key2.charAt(key2.length - 1) === "*") && i['courses_instructor'].includes(key2.slice(1, key2.length - 1))) {
                    listOfUUID.push(i);
                }
            }
        }
        else if(Object.keys(key1)[0]==='courses_title'){
            let key2:any = key1["courses_title"];
            if (!((typeof(key2)) === "string")) {
                throw new Error();
            }
            for(let i of data){
                if (!(key2.charAt(0) === "*") && !(key2.charAt(key2.length - 1) === "*") && key2 === i['courses_title']) {
                    listOfUUID.push(i);
                }
                else if ((key2.charAt(0) === "*") && !(key2.charAt(key2.length - 1) === "*") && key2.slice(1, key2.length) === i['courses_title'].slice(0, key2.length - 1)) {
                    listOfUUID.push(i);
                }
                else if (!(key2.charAt(0) === "*") && (key2.charAt(key2.length - 1) === "*") && key2.slice(0, key2.length - 1) === i['courses_title'].slice(i['courses_title'].length - key2.length + 1, i['courses_title'].length)) {
                    listOfUUID.push(i);
                }
                else if ((key2.charAt(0) === "*") && (key2.charAt(key2.length - 1) === "*") && i['courses_title'].includes(key2.slice(1, key2.length - 1))) {
                    listOfUUID.push(i);
                }
            }
        }
        else if(Object.keys(key1)[0]==='courses_uuid'){
            let key2:any = key1["courses_uuid"];
            if (!((typeof(key2)) === "string")) {
                throw new Error();
            }
            for(let i of data){
                if (!(key2.charAt(0) === "*") && !(key2.charAt(key2.length - 1) === "*") && key2 === i['courses_uuid']) {
                    listOfUUID.push(i);
                }
                else if ((key2.charAt(0) === "*") && !(key2.charAt(key2.length - 1) === "*") && key2.slice(1, key2.length) === i['courses_uuid'].slice(0, key2.length - 1)) {
                    listOfUUID.push(i);
                }
                else if (!(key2.charAt(0) === "*") && (key2.charAt(key2.length - 1) === "*") && key2.slice(0, key2.length - 1) === i['courses_uuid'].slice(i['courses_uuid'].length - key2.length + 1, i['courses_uuid'].length)) {
                    listOfUUID.push(i);
                }
                else if ((key2.charAt(0) === "*") && (key2.charAt(key2.length - 1) === "*") && i['courses_uuid'].includes(key2.slice(1, key2.length - 1))) {
                    listOfUUID.push(i);
                }
            }
        }
        else{
            throw new Error();
        }
        return listOfUUID;
    }

    Notto(key1:any,data:any):any{
        let listOfUUID: any [] = [];
        var helper = new Helper();
        if(Object.keys(key1)[0] === 'LT'){
            try{
            listOfUUID=listOfUUID.concat(helper.Greater(key1["LT"],data));
            listOfUUID=listOfUUID.concat(helper.Equalto(key1["LT"],data));
        }catch (err){
            throw new Error();
        }
            listOfUUID = listOfUUID.filter(function(elem, index, self) {
                return index == self.indexOf(elem);
            })
        }
        else if(Object.keys(key1)[0] === 'GT'){
            try{
            listOfUUID=listOfUUID.concat(helper.Lessthan(key1["GT"],data));
            listOfUUID=listOfUUID.concat(helper.Equalto(key1["GT"],data));
        }catch (err){
            throw new Error();
        }
            listOfUUID = listOfUUID.filter(function(elem, index, self) {
                return index == self.indexOf(elem);
            })
        }
        else if(Object.keys(key1)[0] === 'EQ'){
            try{
            listOfUUID=listOfUUID.concat(helper.Greater(key1["EQ"],data));
            listOfUUID=listOfUUID.concat(helper.Lessthan(key1["EQ"],data));
        }catch (err){
            throw new Error();
        }
            listOfUUID = listOfUUID.filter(function(elem, index, self) {
                return index == self.indexOf(elem);
            })
        }
        else if(Object.keys(key1)[0] === 'NOT'){
            try{
            listOfUUID=helper.CompareNum(key1['NOT'],data);
        }catch (err){
            throw new Error();
        }
        }
        else if(Object.keys(key1)[0] === 'AND'){
            for(let k of key1["AND"]){
                try{
                listOfUUID=listOfUUID.concat(helper.Notto(k,data));
            }catch (err){
                throw new Error();
            }
            }
            listOfUUID = listOfUUID.filter(function(elem, index, self) {
                return index == self.indexOf(elem);
            })
        }
        else if(Object.keys(key1)[0] === 'OR'){
            for(let k of key1["OR"]){
                try{
                listOfUUID.push(helper.Notto(k,data));
            }catch (err){
                throw new Error();
            }
            }
            listOfUUID = listOfUUID.shift().filter(function(v:any) {
                return listOfUUID.every(function(a) {
                    return a.indexOf(v) !== -1;
                });
            });
        }
        else if(Object.keys(key1)[0] === 'IS') {
            let list123: any [] = [];
            try {
                listOfUUID = helper.CompareNum(key1, data);
            }catch (err){
                throw new Error();
            }
            for(let i of data){
                list123.push(i)
            }
            listOfUUID = list123.filter( function( el ) {
                return !listOfUUID.includes( el );
            } );
        }
        else{
            throw new Error();
        }
        return listOfUUID;
    }

    CompareNum(where1:any,data:any):any {
        let listOfUUID: any [] = [];
        if (Object.keys(where1)[0] === 'GT') {
            let key1: any = where1["GT"];
            var helper = new Helper();
            try{
                listOfUUID = helper.Greater(key1, data);
            }catch(err) {
                throw err;
            }
        }
        //--------------------------------------------------------------
        else if (Object.keys(where1)[0] === 'LT') {
            let key1: any = where1["LT"];
            var helper = new Helper();
            try{
                listOfUUID = helper.Lessthan(key1, data);
            }catch(err) {
                throw err;
            }
        }
        //-------------------------------------------------------------
        else if (Object.keys(where1)[0] === 'EQ') {
            let key1: any = where1["EQ"];
            var helper = new Helper();
            try{
                listOfUUID = helper.Equalto(key1, data);
            }catch(err) {
                throw err;
            }
        }
        //------------------------------------------------------------
        else if (Object.keys(where1)[0] === 'IS') {
            let key1: any = where1["IS"];
            var helper = new Helper();
            try{
                listOfUUID = helper.Isto(key1, data);
            }catch(err) {
                throw err;
            }
        }
        //-------------------------------------------------------------
        else if (Object.keys(where1)[0] === 'NOT') {
            let key1: any = where1["NOT"];
            var helper = new Helper();
            try{
                listOfUUID=helper.Notto(key1,data);
            }catch(err) {
                throw err;
            }
        }
        else if (Object.keys(where1)[0]==='AND'){
            let key1:any=where1["AND"];
            if (!(key1 instanceof Array) || ((key1).length === 0)) {
                throw new Error();
            }
            var helper = new Helper();
            for(let k of key1){
                try{
                    listOfUUID.push(helper.CompareNum(k,data));
                }catch (err){
                    throw new Error();
                }
            }
            listOfUUID = listOfUUID.shift().filter(function(v:any) {
                return listOfUUID.every(function(a) {
                    return a.indexOf(v) !== -1;
                });
            });
        }
        else if (Object.keys(where1)[0]==='OR'){
            let key1:any=where1["OR"];
            if (!(key1 instanceof Array) || ((key1).length === 0)) {
                throw new Error();
            }
            var helper = new Helper();
            for(let k of key1){
                try {
                    listOfUUID = listOfUUID.concat(helper.CompareNum(k, data));
                }catch (err){
                    throw new Error();
                }
            }
            listOfUUID = listOfUUID.filter(function(elem, index, self) {
                return index == self.indexOf(elem);
            })
        }
        else{
            throw new Error();
        }

        return listOfUUID;
    }



}
