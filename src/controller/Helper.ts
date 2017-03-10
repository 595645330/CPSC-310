/**
 * Created by Siyuan on 2017-02-01.
 */
import Log from "../Util";
export default class Helper{
    Greater(key1:any,data:any):any{
        let listOfUUID:any [] = [];
        if (!(key1 instanceof Object)) {
            throw new Error();
        }
        if(Object.keys(key1)[0]==='courses_avg'){
            let key2:any = key1["courses_avg"];
            if (!((typeof(key2)) === "number")) {
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
                throw new Error();
            }
            for(let i of data){
                if(i["courses_audit"]>key2){
                    listOfUUID.push(i);
                }
            }
        }
        else if(Object.keys(key1)[0]==='courses_year'){
            let key2:any = key1["courses_year"];
            if (!((typeof(key2)) === "number")) {
                throw new Error();
            }
            for(let i of data){
                if(i["courses_year"]>key2){
                    listOfUUID.push(i);
                }
            }
        }
        else if(Object.keys(key1)[0]==='rooms_lat'){
            let key2:any = key1["rooms_lat"];
            if (!((typeof(key2)) === "number")) {
                throw new Error();
            }
            for(let i of data){
                if(i["rooms_lat"]>key2){
                    listOfUUID.push(i);
                }
            }
        }
        else if(Object.keys(key1)[0]==='rooms_lon'){
            let key2:any = key1["rooms_lon"];
            if (!((typeof(key2)) === "number")) {
                throw new Error();
            }
            for(let i of data){
                if(i["rooms_lon"]>key2){
                    listOfUUID.push(i);
                }
            }
        }
        else if(Object.keys(key1)[0]==='rooms_seats'){
            let key2:any = key1["rooms_seats"];
            if (!((typeof(key2)) === "number")) {
                throw new Error();
            }
            for(let i of data){
                if(i["rooms_seats"]>key2){
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
            throw new Error();
        }
        if(Object.keys(key1)[0]==='courses_avg'){
            let key2:any = key1["courses_avg"];
            if (!((typeof(key2)) === "number")) {
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
                throw new Error();
            }
            for(let i of data){
                if(i["courses_audit"]<key2){
                    listOfUUID.push(i);
                }
            }
        }
        else if(Object.keys(key1)[0]==='courses_year'){
            let key2:any = key1["courses_year"];
            if (!((typeof(key2)) === "number")) {
                throw new Error();
            }
            for(let i of data){
                if(i["courses_year"]<key2){
                    listOfUUID.push(i);
                }
            }
        }
        else if(Object.keys(key1)[0]==='rooms_lat'){
            let key2:any = key1["rooms_lat"];
            if (!((typeof(key2)) === "number")) {
                throw new Error();
            }
            for(let i of data){
                if(i["rooms_lat"]<key2){
                    listOfUUID.push(i);
                }
            }
        }
        else if(Object.keys(key1)[0]==='rooms_lon'){
            let key2:any = key1["rooms_lon"];
            if (!((typeof(key2)) === "number")) {
                throw new Error();
            }
            for(let i of data){
                if(i["rooms_lon"]<key2){
                    listOfUUID.push(i);
                }
            }
        }
        else if(Object.keys(key1)[0]==='rooms_seats'){
            let key2:any = key1["rooms_seats"];
            if (!((typeof(key2)) === "number")) {
                throw new Error();
            }
            for(let i of data){
                if(i["rooms_seats"]<key2){
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
            throw new Error();
        }
        if(Object.keys(key1)[0]==='courses_avg'){
            let key2:any = key1["courses_avg"];
            if (!((typeof(key2)) === "number")) {
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
                throw new Error();
            }
            for(let i of data){
                if(i["courses_audit"]===key2){
                    listOfUUID.push(i);
                }
            }
        }
        else if(Object.keys(key1)[0]==='courses_year'){
            let key2:any = key1["courses_year"];
            if (!((typeof(key2)) === "number")) {
                throw new Error();
            }
            for(let i of data){
                if(i["courses_year"]===key2){
                    listOfUUID.push(i);
                }
            }
        }
        else if(Object.keys(key1)[0]==='rooms_lat'){
            let key2:any = key1["rooms_lat"];
            if (!((typeof(key2)) === "number")) {
                throw new Error();
            }
            for(let i of data){
                if(i["rooms_lat"]===key2){
                    listOfUUID.push(i);
                }
            }
        }
        else if(Object.keys(key1)[0]==='rooms_lon'){
            let key2:any = key1["rooms_lon"];
            if (!((typeof(key2)) === "number")) {
                throw new Error();
            }
            for(let i of data){
                if(i["rooms_lon"]===key2){
                    listOfUUID.push(i);
                }
            }
        }
        else if(Object.keys(key1)[0]==='rooms_seats'){
            let key2:any = key1["rooms_seats"];
            if (!((typeof(key2)) === "number")) {
                throw new Error();
            }
            for(let i of data){
                if(i["rooms_seats"]===key2){
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
                else if (!(key2.charAt(0) === "*") && (key2.charAt(key2.length - 1) === "*") && key2.slice(0, key2.length - 1) === i['courses_dept'].slice(0, key2.length - 1)) {
                    listOfUUID.push(i);
                }
                else if ((key2.charAt(0) === "*") && !(key2.charAt(key2.length - 1) === "*") && key2.slice(1, key2.length) === i['courses_dept'].slice(i['courses_dept'].length - key2.length + 1, i['courses_dept'].length)) {
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
                else if (!(key2.charAt(0) === "*") && (key2.charAt(key2.length - 1) === "*") && key2.slice(0, key2.length - 1) === i['courses_id'].slice(0, key2.length - 1)) {
                    listOfUUID.push(i);
                }
                else if ((key2.charAt(0) === "*") && !(key2.charAt(key2.length - 1) === "*") && key2.slice(1, key2.length) === i['courses_id'].slice(i['courses_id'].length - key2.length + 1, i['courses_id'].length)) {
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
                else if (!(key2.charAt(0) === "*") && (key2.charAt(key2.length - 1) === "*") && key2.slice(0, key2.length - 1) === i['courses_instructor'].slice(0, key2.length - 1)) {
                    listOfUUID.push(i);
                }
                else if ((key2.charAt(0) === "*") && !(key2.charAt(key2.length - 1) === "*") && key2.slice(1, key2.length) === i['courses_instructor'].slice(i['courses_instructor'].length - key2.length + 1, i['courses_instructor'].length)) {
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
                else if (!(key2.charAt(0) === "*") && (key2.charAt(key2.length - 1) === "*") && key2.slice(0, key2.length -1) === i['courses_title'].slice(0, key2.length - 1)) {
                    listOfUUID.push(i);
                }
                else if ((key2.charAt(0) === "*") && !(key2.charAt(key2.length - 1) === "*") && key2.slice(1, key2.length) === i['courses_title'].slice(i['courses_title'].length - key2.length + 1, i['courses_title'].length)) {
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
                else if (!(key2.charAt(0) === "*") && (key2.charAt(key2.length - 1) === "*") && key2.slice(0, key2.length - 1) === i['courses_uuid'].slice(0, key2.length - 1)) {
                    listOfUUID.push(i);
                }
                else if ((key2.charAt(0) === "*") && !(key2.charAt(key2.length - 1) === "*") && key2.slice(1, key2.length) === i['courses_uuid'].slice(i['courses_uuid'].length - key2.length + 1, i['courses_uuid'].length)) {
                    listOfUUID.push(i);
                }
                else if ((key2.charAt(0) === "*") && (key2.charAt(key2.length - 1) === "*") && i['courses_uuid'].includes(key2.slice(1, key2.length - 1))) {
                    listOfUUID.push(i);
                }
            }
        }
        else if(Object.keys(key1)[0]==='rooms_fullname'){
            let key2:any = key1["rooms_fullname"];
            if (!((typeof(key2)) === "string")) {
                throw new Error();
            }
            for(let i of data){
                if (!(key2.charAt(0) === "*") && !(key2.charAt(key2.length - 1) === "*") && key2 === i['rooms_fullname']) {
                    listOfUUID.push(i);
                }
                else if (!(key2.charAt(0) === "*") && (key2.charAt(key2.length - 1) === "*") && key2.slice(0, key2.length - 1) === i['rooms_fullname'].slice(0, key2.length - 1)) {
                    listOfUUID.push(i);
                }
                else if ((key2.charAt(0) === "*") && !(key2.charAt(key2.length - 1) === "*") && key2.slice(1, key2.length) === i['rooms_fullname'].slice(i['rooms_fullname'].length - key2.length + 1, i['rooms_fullname'].length)) {
                    listOfUUID.push(i);
                }
                else if ((key2.charAt(0) === "*") && (key2.charAt(key2.length - 1) === "*") && i['rooms_fullname'].includes(key2.slice(1, key2.length - 1))) {
                    listOfUUID.push(i);
                }
            }
        }
        else if(Object.keys(key1)[0]==='rooms_shortname'){
            let key2:any = key1["rooms_shortname"];
            if (!((typeof(key2)) === "string")) {
                throw new Error();
            }
            for(let i of data){
                if (!(key2.charAt(0) === "*") && !(key2.charAt(key2.length - 1) === "*") && key2 === i['rooms_shortname']) {
                    listOfUUID.push(i);
                }
                else if (!(key2.charAt(0) === "*") && (key2.charAt(key2.length - 1) === "*") && key2.slice(0, key2.length - 1) === i['rooms_shortname'].slice(0, key2.length - 1)) {
                    listOfUUID.push(i);
                }
                else if ((key2.charAt(0) === "*") && !(key2.charAt(key2.length - 1) === "*") && key2.slice(1, key2.length) === i['rooms_shortname'].slice(i['rooms_shortname'].length - key2.length + 1, i['rooms_shortname'].length)) {
                    listOfUUID.push(i);
                }
                else if ((key2.charAt(0) === "*") && (key2.charAt(key2.length - 1) === "*") && i['rooms_shortname'].includes(key2.slice(1, key2.length - 1))) {
                    listOfUUID.push(i);
                }
            }
        }
        else if(Object.keys(key1)[0]==='rooms_number'){
            let key2:any = key1["rooms_number"];
            if (!((typeof(key2)) === "string")) {
                throw new Error();
            }
            for(let i of data){
                if (!(key2.charAt(0) === "*") && !(key2.charAt(key2.length - 1) === "*") && key2 === i['rooms_number']) {
                    listOfUUID.push(i);
                }
                else if (!(key2.charAt(0) === "*") && (key2.charAt(key2.length - 1) === "*") && key2.slice(0, key2.length - 1) === i['rooms_number'].slice(0, key2.length - 1)) {
                    listOfUUID.push(i);
                }
                else if ((key2.charAt(0) === "*") && !(key2.charAt(key2.length - 1) === "*") && key2.slice(1, key2.length) === i['rooms_number'].slice(i['rooms_number'].length - key2.length + 1, i['rooms_number'].length)) {
                    listOfUUID.push(i);
                }
                else if ((key2.charAt(0) === "*") && (key2.charAt(key2.length - 1) === "*") && i['rooms_number'].includes(key2.slice(1, key2.length - 1))) {
                    listOfUUID.push(i);
                }
            }
        }
        else if(Object.keys(key1)[0]==='rooms_name'){
            let key2:any = key1["rooms_name"];
            if (!((typeof(key2)) === "string")) {
                throw new Error();
            }
            for(let i of data){
                if (!(key2.charAt(0) === "*") && !(key2.charAt(key2.length - 1) === "*") && key2 === i['rooms_name']) {
                    listOfUUID.push(i);
                }
                else if (!(key2.charAt(0) === "*") && (key2.charAt(key2.length - 1) === "*") && key2.slice(0, key2.length - 1) === i['rooms_name'].slice(0, key2.length - 1)) {
                    listOfUUID.push(i);
                }
                else if ((key2.charAt(0) === "*") && !(key2.charAt(key2.length - 1) === "*") && key2.slice(1, key2.length) === i['rooms_name'].slice(i['rooms_name'].length - key2.length + 1, i['rooms_name'].length)) {
                    listOfUUID.push(i);
                }
                else if ((key2.charAt(0) === "*") && (key2.charAt(key2.length - 1) === "*") && i['rooms_name'].includes(key2.slice(1, key2.length - 1))) {
                    listOfUUID.push(i);
                }
            }
        }
        else if(Object.keys(key1)[0]==='rooms_address'){
            let key2:any = key1["rooms_address"];
            if (!((typeof(key2)) === "string")) {
                throw new Error();
            }
            for(let i of data){
                if (!(key2.charAt(0) === "*") && !(key2.charAt(key2.length - 1) === "*") && key2 === i['rooms_address']) {
                    listOfUUID.push(i);
                }
                else if (!(key2.charAt(0) === "*") && (key2.charAt(key2.length - 1) === "*") && key2.slice(0, key2.length - 1) === i['rooms_address'].slice(0, key2.length - 1)) {
                    listOfUUID.push(i);
                }
                else if ((key2.charAt(0) === "*") && !(key2.charAt(key2.length - 1) === "*") && key2.slice(1, key2.length) === i['rooms_address'].slice(i['rooms_address'].length - key2.length + 1, i['rooms_address'].length)) {
                    listOfUUID.push(i);
                }
                else if ((key2.charAt(0) === "*") && (key2.charAt(key2.length - 1) === "*") && i['rooms_address'].includes(key2.slice(1, key2.length - 1))) {
                    listOfUUID.push(i);
                }
            }
        }
        else if(Object.keys(key1)[0]==='rooms_type'){
            let key2:any = key1["rooms_type"];
            if (!((typeof(key2)) === "string")) {
                throw new Error();
            }
            for(let i of data){
                if (!(key2.charAt(0) === "*") && !(key2.charAt(key2.length - 1) === "*") && key2 === i['rooms_type']) {
                    listOfUUID.push(i);
                }
                else if (!(key2.charAt(0) === "*") && (key2.charAt(key2.length - 1) === "*") && key2.slice(0, key2.length - 1) === i['rooms_type'].slice(0, key2.length - 1)) {
                    listOfUUID.push(i);
                }
                else if ((key2.charAt(0) === "*") && !(key2.charAt(key2.length - 1) === "*") && key2.slice(1, key2.length) === i['rooms_type'].slice(i['rooms_type'].length - key2.length + 1, i['rooms_type'].length)) {
                    listOfUUID.push(i);
                }
                else if ((key2.charAt(0) === "*") && (key2.charAt(key2.length - 1) === "*") && i['rooms_type'].includes(key2.slice(1, key2.length - 1))) {
                    listOfUUID.push(i);
                }
            }
        }
        else if(Object.keys(key1)[0]==='rooms_furniture'){
            let key2:any = key1["rooms_furniture"];
            if (!((typeof(key2)) === "string")) {
                throw new Error();
            }
            for(let i of data){
                if (!(key2.charAt(0) === "*") && !(key2.charAt(key2.length - 1) === "*") && key2 === i['rooms_furniture']) {
                    listOfUUID.push(i);
                }
                else if (!(key2.charAt(0) === "*") && (key2.charAt(key2.length - 1) === "*") && key2.slice(0, key2.length - 1) === i['rooms_furniture'].slice(0, key2.length - 1)) {
                    listOfUUID.push(i);
                }
                else if ((key2.charAt(0) === "*") && !(key2.charAt(key2.length - 1) === "*") && key2.slice(1, key2.length) === i['rooms_furniture'].slice(i['rooms_furniture'].length - key2.length + 1, i['rooms_furniture'].length)) {
                    listOfUUID.push(i);
                }
                else if ((key2.charAt(0) === "*") && (key2.charAt(key2.length - 1) === "*") && i['rooms_furniture'].includes(key2.slice(1, key2.length - 1))) {
                    listOfUUID.push(i);
                }
            }
        }
        else if(Object.keys(key1)[0]==='rooms_href'){
            let key2:any = key1["rooms_href"];
            if (!((typeof(key2)) === "string")) {
                throw new Error();
            }
            for(let i of data){
                if (!(key2.charAt(0) === "*") && !(key2.charAt(key2.length - 1) === "*") && key2 === i['rooms_href']) {
                    listOfUUID.push(i);
                }
                else if (!(key2.charAt(0) === "*") && (key2.charAt(key2.length - 1) === "*") && key2.slice(0, key2.length - 1) === i['rooms_href'].slice(0, key2.length - 1)) {
                    listOfUUID.push(i);
                }
                else if ((key2.charAt(0) === "*") && !(key2.charAt(key2.length - 1) === "*") && key2.slice(1, key2.length) === i['rooms_href'].slice(i['rooms_href'].length - key2.length + 1, i['rooms_href'].length)) {
                    listOfUUID.push(i);
                }
                else if ((key2.charAt(0) === "*") && (key2.charAt(key2.length - 1) === "*") && i['rooms_href'].includes(key2.slice(1, key2.length - 1))) {
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
        let listOfUUID2: any [] = data;
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
                    listOfUUID2=helper.CompareNum(k,listOfUUID2)
                }catch (err){
                    throw new Error();
                }
            }
            listOfUUID=listOfUUID2;
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

    check(tofilt: any): any {
        let that = this;
        let result: number = 1;
        if ("LT" == Object.keys(tofilt)[0]) {
            var lt = tofilt["LT"];
            let ltkey: string = Object.keys(lt)[0];
            if (typeof(ltkey) === "string" && !(ltkey.slice(0, 8) === "courses_") && !(ltkey.slice(0, 6) === "rooms_")) {return 3;}
            else if (typeof(ltkey) === "string" && (ltkey.slice(0, 8) === "courses_")) {result = 1;}
            else if (typeof(ltkey) === "string" && (ltkey.slice(0, 6) === "rooms_")) {result = 2;}
        }

        else if ("GT" == Object.keys(tofilt)[0]) {
            var gt = tofilt["GT"];
            let gtkey: string = Object.keys(gt)[0];
            if (typeof(gtkey) === "string" && !(gtkey.slice(0, 8) === "courses_") && !(gtkey.slice(0, 6) === "rooms_")) {return 3;}
            else if (typeof(gtkey) === "string" && (gtkey.slice(0, 8) === "courses_")) {result = 1;}
            else if (typeof(gtkey) === "string" && (gtkey.slice(0, 6) === "rooms_")) {result = 2;}
        }

        else if ("EQ" == Object.keys(tofilt)[0]) {
            var eq = tofilt["EQ"];
            let eqkey: string = Object.keys(eq)[0];
            if (typeof(eqkey) === "string" && !(eqkey.slice(0, 8) === "courses_") && !(eqkey.slice(0, 6) === "rooms_")) {return 3;}
            else if (typeof(eqkey) === "string" && (eqkey.slice(0, 8) === "courses_")) {result = 1;}
            else if (typeof(eqkey) === "string" && (eqkey.slice(0, 6) === "rooms_")) {result = 2;}
        }

        else if ("IS" == Object.keys(tofilt)[0]) {
            var is = tofilt["IS"];
            let iskey: string = Object.keys(is)[0];
            if (typeof(iskey) === "string" && !(iskey.slice(0, 8) === "courses_") && !(iskey.slice(0, 6) === "rooms_")) {return 3;}
            else if (typeof(iskey) === "string" && (iskey.slice(0, 8) === "courses_")) {result = 1;}
            else if (typeof(iskey) === "string" && (iskey.slice(0, 6) === "rooms_")) {result = 2;}
        }

        else if ("AND" == Object.keys(tofilt)[0]) {
            if (tofilt["AND"] instanceof Array) {
                let and: any[] = tofilt["AND"];
                for (let i of and) {
                    result = that.check(i);
                    if (result === 3) {return 3;}
                }
            }
        }
        else if ("OR" == Object.keys(tofilt)[0]) {
            if (tofilt["OR"] instanceof Array) {
                let or: any[] = tofilt["OR"];
                for (let i of or) {
                    result = that.check(i);
                    if (result === 3) {return 3;}
                }
            }
        }

        else if ("NOT" == Object.keys(tofilt)[0]) {
            if (tofilt["NOT"] instanceof Object) {
                var not = tofilt["NOT"];
                result = that.check(not);
                if (result === 3) {return 3;}
            }
        }
        return result;
    }

    findBuilding(arrays: any): any {
        var helper = new Helper();
        let listOfBuilding: any [] = [];
        for(let array of arrays){
            for(let key of Object.keys(array)){
                if(key==="nodeName"){
                    if(array["nodeName"]==="td"){
                        let buildName:any = array["childNodes"][0]["value"].replace(/(^[\s]+|[\s]+$)/g, '');
                        if(buildName!==""){
                            // console.log(array["childNodes"][0]["value"].replace(/(^[\s]+|[\s]+$)/g, ''));
                            listOfBuilding.push(array["childNodes"][0]["value"].replace(/(^[\s]+|[\s]+$)/g, ''));
                        }
                    }
                }
                else if(key==="childNodes"){
                    listOfBuilding=listOfBuilding.concat(helper.findBuilding(array["childNodes"]));
                }
            }
        }
        return listOfBuilding;
    }

    findFullName(arrays: any): any {
        var helper = new Helper();
        let listOfFullName: any [] = [];
        for(let element of arrays){
            for(let key of Object.keys(element)){
                if(key==="attrs"&&element[key].length!==0&&element[key][0]["value"]==="building-info"){
                    listOfFullName.push(element["childNodes"][1]["childNodes"][0]["childNodes"][0]["value"]);
                }
                else if(element[key] instanceof Array){
                    listOfFullName=listOfFullName.concat(helper.findFullName(element[key]));
                }
            }
        }
        return listOfFullName;
    }

    findRoomNumber(arrays: any): any{
        var helper = new Helper();
        let listOfRoomNumber: any [] = [];
        for (let element of arrays) {
            for (let key of Object.keys(element)) {
                if (key === "attrs" && element[key][0] !== undefined && element[key][0]["name"] !== undefined && element[key][0]["name"] === "href" && element[key][1] !== undefined && element[key][1]["value"] !== undefined && element[key][1]["value"] === "Room Details") {
                    // console.log(element["childNodes"][0]["value"]);
                    listOfRoomNumber.push(element["childNodes"][0]["value"]);
                    // console.log(element["childNodes"][0]["value"]);
                }
                else if (element[key] instanceof Array) {
                    listOfRoomNumber=listOfRoomNumber.concat(helper.findRoomNumber(element[key]));
                }
            }
        }
        return listOfRoomNumber;
    }

    findhref(arrays: any): any {
        var helper = new Helper();
        let listOfhref: any [] = [];
        for(let element of arrays){
            for(let key of Object.keys(element)){
                if(key==="attrs"&&element[key][0]!== undefined && element[key][0]["name"]!== undefined&&element[key][0]["name"]==="href"&&element[key][1]!== undefined && element[key][1]["value"]!== undefined&&element[key][1]["value"]==="Room Details"){
                    listOfhref.push(element[key][0]["value"]);
                }
                else if(element[key] instanceof Array){
                    listOfhref=listOfhref.concat(helper.findhref(element[key]));
                }
            }
        }
        return listOfhref;
    }

    findSeats(arrays: any): any {
        var helper = new Helper();
        let listOfSeats: any [] = [];
        for(let element of arrays){
            for(let key of Object.keys(element)){
                if(key==="attrs"&&element[key][0]!== undefined && element[key][0]["name"]!== undefined&&element[key][0]["name"]==="class"&&element[key][0]["value"]!== undefined&&element[key][0]["value"]==="views-field views-field-field-room-capacity"){
                    let numberOfseat =Number(element["childNodes"][0]["value"].replace(/(^[\s]+|[\s]+$)/g, ''));
                    if( !isNaN(numberOfseat) ){
                        listOfSeats.push(numberOfseat);
                    }
                }
                else if(element[key] instanceof Array){
                    listOfSeats=listOfSeats.concat(helper.findSeats(element[key]));
                }
            }
        }
        return listOfSeats;
    }

    findType(arrays: any): any {
        var helper = new Helper();
        let listOfType: any [] = [];
        for(let element of arrays){
            for(let key of Object.keys(element)){
                if(key==="attrs"&&element[key][0]!== undefined && element[key][0]["name"]!== undefined&&element[key][0]["name"]==="class"&&element[key][0]["value"]!== undefined&&element[key][0]["value"]==="views-field views-field-field-room-type"){
                    let typeOfRoom =element["childNodes"][0]["value"].replace(/(^[\s]+|[\s]+$)/g, '');
                    if(typeOfRoom!=="Room type"){
                        listOfType.push(typeOfRoom);
                    }
                }
                else if(element[key] instanceof Array){
                    listOfType=listOfType.concat(helper.findType(element[key]));
                }
            }
        }
        return listOfType;
    }

    findFurniture(arrays: any): any {
        var helper = new Helper();
        let listOfFurniture: any [] = [];
        for(let element of arrays){
            for(let key of Object.keys(element)){
                if(key==="attrs"&&element[key][0]!== undefined && element[key][0]["name"]!== undefined&&element[key][0]["name"]==="class"&&element[key][0]["value"]!== undefined&&element[key][0]["value"]==="views-field views-field-field-room-furniture"){
                    let typeOfRoom =element["childNodes"][0]["value"].replace(/(^[\s]+|[\s]+$)/g, '');
                    if(typeOfRoom!=="Furniture type"){
                        listOfFurniture.push(typeOfRoom);
                    }
                }
                else if(element[key] instanceof Array){
                    listOfFurniture=listOfFurniture.concat(helper.findFurniture(element[key]));
                }
            }
        }
        return listOfFurniture;
    }

    GetLatLon(url: any): Promise<any> {
        return new Promise(function (fulfill, reject) {
            var http = require('http');
            let listOfLatLon: any [] = [];
            http.get(url, (res: any) => {
                const statusCode = res.statusCode;
                const contentType = res.headers['content-type'];
                // let parsedData:any;
                let error: any;
                if (statusCode !== 200) {
                    error = new Error(`Request Failed.\n` +
                        `Status Code: ${statusCode}`);
                } else if (!/^application\/json/.test(contentType)) {
                    error = new Error(`Invalid content-type.\n` +
                        `Expected application/json but received ${contentType}`);
                }
                if (error) {
                    console.log(error.message);
                    res.resume();
                    return;
                }

                res.setEncoding('utf8');
                let rawData = '';
                res.on('data', (chunk: any) => rawData += chunk);
                res.on('end', () => {
                    try {
                        // console.log(rawData);
                        let parsedData = JSON.parse(rawData);
                        // if (parsedData["error"] !== undefined || parsedData === {}){console.log("duke did this")}
                        fulfill(parsedData);
                    } catch (e) {
                        console.log(e.message);
                        reject(e);
                    }
                });
            }).on('error', (e: any) => {
                console.log(`Got error: ${e.message}`);
            });
        });
    }

    listTheColumn(listOfUUID:any,listsOfColumn:any):any{
        let listOfCourses:any [] = [];
        var helper = new Helper();
        for (let uuid of listOfUUID) {
            let course: any = {};
            //console.log(listsOfColumn);
            for (let column of listsOfColumn) {
                course[column] = uuid[column];
            }
            listOfCourses.push(course);
        }
        listOfCourses=helper.remove_duplicates(listOfCourses);
        return listOfCourses;
    }

    Groupby(group1: any,listOfUUID:any,num:any,applyKey:any,keyName:any,applytoken:any,listsOfColumn:any): any {
        let abc: any [] = [];
        var helper = new Helper();
        var groupBy = function(xs:any, key:any) {
            return xs.reduce(function(rv:any, x:any) {
                (rv[x[key]] = rv[x[key]] || []).push(x);
                return rv;
            }, {});
        };
        let ppp:any=groupBy(listOfUUID,group1[num]);
        //console.log(ppp);
        num=num+1;
        for(let p of Object.keys(ppp)){
            if(group1.length>num){
                abc=abc.concat(helper.Groupby(group1,ppp[p],num,applyKey,keyName,applytoken,listsOfColumn));
            }
            else{
                abc.push(ppp[p]);
                for(let i=0;i<applyKey.length;i++){
                    if(applytoken[i]==="MAX"){
                        let templist:any []=[];
                        if(helper.checkString(applyKey[i])){
                            throw new Error();
                        }
                        else{
                            for(let pp of ppp[p]){
                                templist.push(pp[applyKey[i]]);
                            }
                            for(let pp of ppp[p]){
                                pp[keyName[i]]=Math.max.apply(Math,templist);
                            }
                        }
                    }
                    else if(applytoken[i]==="MIN"){
                        let templist:any []=[];
                        if(helper.checkString(applyKey[i])){
                            throw new Error();
                        }else{
                            for(let pp of ppp[p]){
                                templist.push(pp[applyKey[i]]);
                            }
                            for(let pp of ppp[p]){
                                pp[keyName[i]]=Math.min.apply(Math,templist);
                            }
                        }
                    }
                    else if(applytoken[i]==="AVG"){
                        let templist:any []=[];
                        if(helper.checkString(applyKey[i])){
                            throw new Error();
                        }
                        else{
                            for(let pp of ppp[p]){
                                templist.push(pp[applyKey[i]]);
                            }
                            templist=templist.map(function(x:any){
                                x = x * 10;
                                x = Number(x.toFixed(0));
                                return x;
                            });
                            var sum = templist.reduce((a, b) => a + b, 0);
                            var avg = sum / templist.length;
                            avg = avg / 10;
                            var res = Number(avg.toFixed(2))
                            for(let pp of ppp[p]){
                                pp[keyName[i]]=res;
                            }
                        }
                    }
                    else if(applytoken[i]==="COUNT"){
                        let templist:any []=[];
                        for(let pp of ppp[p]){
                            if(!templist.includes(pp[applyKey[i]])){
                                templist.push(pp[applyKey[i]]);
                            }
                        }
                        for(let pp of ppp[p]){
                            pp[keyName[i]]=templist.length;
                        }
                    }
                    else if(applytoken[i]==="SUM"){
                        let templist:any []=[];
                        if(helper.checkString(applyKey[i])){
                           throw new Error();
                        }
                        else{
                            for(let pp of ppp[p]){
                                templist.push(pp[applyKey[i]]);
                            }
                            var sum = templist.reduce((a, b) => a + b, 0);
                            for(let pp of ppp[p]){
                                pp[keyName[i]]=sum;
                            }
                        }
                    }
                }
            }
        }
        abc= [].concat.apply([], abc);
        return abc;
    }

    checkString(order:any):any{
        if ((order === "courses_avg") || (order === "courses_pass") || (order === "courses_fail") || (order=== "courses_audit") || (order=== "courses_year")
                || (order === "rooms_lat") ||  (order === "rooms_lon") ||  (order === "rooms_seats")){
            return false;
        }
        else{
            return true;
        }
    }

    remove_duplicates(objectsArray:any):any{
        var usedObjects:any = {};
        for (var i=objectsArray.length - 1;i>=0;i--) {
            var so:any = JSON.stringify(objectsArray[i]);
            if (usedObjects[so]) {
                objectsArray.splice(i, 1);
            } else {
                usedObjects[so] = true;
            }
        }
        return objectsArray;
    }

    checkValid(elements:any):any{
        for(let element of elements){
            if(!(element === "courses_dept") && !(element === "courses_id")
                && !(element === "courses_avg") && !(element === "courses_instructor") && !(element === "courses_title") && !(element === "courses_year")
                && !(element === "courses_pass") && !(element === "courses_fail") && !(element === "courses_audit") && !(element === "courses_uuid")
                && !(element === "rooms_fullname") && !(element === "rooms_shortname") && !(element === "rooms_number") && !(element === "rooms_name")
                && !(element === "rooms_address") && !(element === "rooms_lat" ) && !(element === "rooms_lon") && !(element === "rooms_seats")
                && !(element === "rooms_type") && !(element === "rooms_furniture") && !(element === "rooms_href")){
                return false;
            }
        }
        return true;
    }

    checkApply(listOfkeys1:any,listOfkeys2:any,listOfkeys3:any):any{
        var helper = new Helper();
        if(!(listOfkeys1.length === new Set(listOfkeys1).size)||!helper.checkValid(listOfkeys3)){
            return false;
        }
        for(let e1 of listOfkeys2){
            if(e1!=="MAX"&&e1!=="MIN"&&e1!=="COUNT"&&e1!=="AVG"&&e1!=="SUM"){
                return false;
            }
        }
        return true;
    }

    checkOption(options:any):any{
        for(let option of options){
            if(option!=="COLUMNS"&&option!=="ORDER"&&option!=="FORM"){
                return true;
            }
        }
        if(options.includes("COLUMNS")&&options.includes("FORM")){
            return false
        }else{
            return true
        }
    }



    // orderArray(order:any,listOfCourses:any,dir:any):any{
    //     if ((order === "courses_avg") || (order === "courses_pass") || (order === "courses_fail") || (order=== "courses_audit") || (order=== "courses_year")
    //         ||  (order === "rooms_lat") ||  (order === "rooms_lon") ||  (order === "rooms_seats")) {
    //         if(dir==="DOWN"){
    //             listOfCourses.sort(function (a:any, b:any) {
    //                 return a[order]-b[order] ;
    //             });
    //         }
    //         else{
    //             listOfCourses.sort(function (a:any, b:any) {
    //                 return b[order]-a[order] ;
    //             });
    //         }
    //     }
    //     else if ((order === "courses_dept") || (order === "courses_id") || (order === "courses_instructor") || (order === "courses_uuid") || (order === "courses_title")
    //         ||  (order === "rooms_fullname") ||  (order === "rooms_shortname") ||  (order === "rooms_number") ||  (order === "rooms_name")
    //         ||  (order=== "rooms_address") ||  (order=== "rooms_type") ||  (order === "rooms_furniture") ||  (order === "rooms_href")) {
    //         listOfCourses.sort(function (a:any, b:any) {
    //             if (a[order] < b[order]) return -1;
    //             if (a[order] > b[order]) return 1;
    //             return 0;
    //         })
    //     }
    //     else {
    //         //reject({"code": 400, "body": {"error": "order wrong"}});
    //         throw new Error();
    //     }
    // }

}
