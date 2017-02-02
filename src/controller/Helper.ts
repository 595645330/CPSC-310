/**
 * Created by Siyuan on 2017-02-01.
 */
import Log from "../Util";
export default class Helper{
    Greater(key1:any,data:any):any{
        let listOfUUID:any [] = [];
        if(Object.keys(key1)[0]==='courses_avg'){
            let key2:any = key1["courses_avg"];
            for(let i of data){
                if(i["courses_avg"]>key2){
                    listOfUUID.push(i["courses_uuid"]);
                }
            }
        }
        else if(Object.keys(key1)[0]==='courses_pass'){
            let key2:any = key1["courses_pass"];
            for(let i of data){
                if(i["courses_pass"]>key2){
                    listOfUUID.push(i["courses_uuid"]);
                }
            }
        }
        else if(Object.keys(key1)[0]==='courses_fail'){
            let key2:any = key1["courses_fail"];
            for(let i of data){
                if(i["courses_fail"]>key2){
                    listOfUUID.push(i["courses_uuid"]);
                }
            }
        }
        else if(Object.keys(key1)[0]==='courses_audit'){
            let key2:any = key1["courses_audit"];
            for(let i of data){
                if(i["courses_audit"]>key2){
                    listOfUUID.push(i["courses_uuid"]);
                }
            }
        }
        return listOfUUID;
    }

    Lessthan(key1:any,data:any):any{
        let listOfUUID:any [] = [];
        if(Object.keys(key1)[0]==='courses_avg'){
            let key2:any = key1["courses_avg"];
            for(let i of data){
                if(i["courses_avg"]<key2){
                    listOfUUID.push(i["courses_uuid"]);
                }
            }
        }
        else if(Object.keys(key1)[0]==='courses_pass'){
            let key2:any = key1["courses_pass"];
            for(let i of data){
                if(i["courses_pass"]<key2){
                    listOfUUID.push(i["courses_uuid"]);
                }
            }
        }
        else if(Object.keys(key1)[0]==='courses_fail'){
            let key2:any = key1["courses_fail"];
            for(let i of data){
                if(i["courses_fail"]<key2){
                    listOfUUID.push(i["courses_uuid"]);
                }
            }
        }
        else if(Object.keys(key1)[0]==='courses_audit'){
            let key2:any = key1["courses_audit"];
            for(let i of data){
                if(i["courses_audit"]<key2){
                    listOfUUID.push(i["courses_uuid"]);
                }
            }
        }
        return listOfUUID;
    }

    Equalto(key1:any,data:any):any{
        let listOfUUID:any [] = [];
        if(Object.keys(key1)[0]==='courses_avg'){
            let key2:any = key1["courses_avg"];
            for(let i of data){
                if(i["courses_avg"]===key2){
                    listOfUUID.push(i["courses_uuid"]);
                }
            }
        }
        else if(Object.keys(key1)[0]==='courses_pass'){
            let key2:any = key1["courses_pass"];
            for(let i of data){
                if(i["courses_pass"]===key2){
                    listOfUUID.push(i["courses_uuid"]);
                }
            }
        }
        else if(Object.keys(key1)[0]==='courses_fail'){
            let key2:any = key1["courses_fail"];
            for(let i of data){
                if(i["courses_fail"]===key2){
                    listOfUUID.push(i["courses_uuid"]);
                }
            }
        }
        else if(Object.keys(key1)[0]==='courses_audit'){
            let key2:any = key1["courses_audit"];
            for(let i of data){
                if(i["courses_audit"]===key2){
                    listOfUUID.push(i["courses_uuid"]);
                }
            }
        }
        return listOfUUID;
    }

    Isto(key1:any,data:any):any{
        let listOfUUID:any [] = [];
        if(Object.keys(key1)[0]==='courses_dept'){
            let key2:any = key1["courses_dept"];
            for(let i of data){
                if(i["courses_dept"]===key2){
                    listOfUUID.push(i["courses_uuid"]);
                }
            }
        }
        else if(Object.keys(key1)[0]==='courses_id'){
            let key2:any = key1["courses_id"];
            for(let i of data){
                if(i["courses_id"]===key2){
                    listOfUUID.push(i["courses_uuid"]);
                }
            }
        }
        else if(Object.keys(key1)[0]==='courses_instructor'){
            let key2:any = key1["courses_instructor"];
            for(let i of data){
                if(i["courses_instructor"]===key2){
                    listOfUUID.push(i["courses_uuid"]);
                }
            }
        }
        else if(Object.keys(key1)[0]==='courses_title'){
            let key2:any = key1["courses_title"];
            for(let i of data){
                if(i["courses_title"]===key2){
                    listOfUUID.push(i["courses_uuid"]);
                }
            }
        }
        else if(Object.keys(key1)[0]==='courses_uuid'){
            let key2:any = key1["courses_uuid"];
            for(let i of data){
                if(i["courses_uuid"]===key2){
                    listOfUUID.push(i["courses_uuid"]);
                }
            }
        }
        return listOfUUID;
    }

    Notto(key1:any,data:any):any{
        let listOfUUID:any [] = [];
        if(Object.keys(key1)[0]==='courses_dept'){
            let key2:any = key1["courses_dept"];
            for(let i of data){
                if(i["courses_dept"]!==key2){
                    listOfUUID.push(i["courses_uuid"]);
                }
            }
        }
        else if(Object.keys(key1)[0]==='courses_id'){
            let key2:any = key1["courses_id"];
            for(let i of data){
                if(i["courses_id"]!==key2){
                    listOfUUID.push(i["courses_uuid"]);
                }
            }
        }
        else if(Object.keys(key1)[0]==='courses_instructor'){
            let key2:any = key1["courses_instructor"];
            for(let i of data){
                if(i["courses_instructor"]!==key2){
                    listOfUUID.push(i["courses_uuid"]);
                }
            }
        }
        else if(Object.keys(key1)[0]==='courses_title'){
            let key2:any = key1["courses_title"];
            for(let i of data){
                if(i["courses_title"]!==key2){
                    listOfUUID.push(i["courses_uuid"]);
                }
            }
        }
        else if(Object.keys(key1)[0]==='courses_uuid'){
            let key2:any = key1["courses_uuid"];
            for(let i of data){
                if(i["courses_uuid"]!==key2){
                    listOfUUID.push(i["courses_uuid"]);
                }
            }
        }
        return listOfUUID;
    }

    CompareNum(where1:any,data:any):any {
        let listOfUUID: any [] = [];
        if (Object.keys(where1)[0] === 'GT') {
            let key1: any = where1["GT"];
            var helper = new Helper();
            listOfUUID = helper.Greater(key1, data);
        }
        //--------------------------------------------------------------
        else if (Object.keys(where1)[0] === 'LT') {
            let key1: any = where1["LT"];
            var helper = new Helper();
            listOfUUID = helper.Lessthan(key1, data);
        }
        //-------------------------------------------------------------
        else if (Object.keys(where1)[0] === 'EQ') {
            let key1: any = where1["EQ"];
            var helper = new Helper();
            listOfUUID = helper.Equalto(key1, data);
        }
        //------------------------------------------------------------
        else if (Object.keys(where1)[0] === 'IS') {
            let key1: any = where1["IS"];
            var helper = new Helper();
            listOfUUID = helper.Isto(key1, data);
        }
        //-------------------------------------------------------------
        else if (Object.keys(where1)[0] === 'NOT') {
            let key1: any = where1["EQ"];
            var helper = new Helper();
            listOfUUID = helper.Notto(key1, data);
        }
        else if (Object.keys(where1)[0]==='AND'){
            let key1:any=where1["AND"];
            var helper = new Helper();
            for(let k of key1){
                listOfUUID.push(helper.CompareNum(k,data));
            }
            listOfUUID = listOfUUID.shift().filter(function(v:any) {
                return listOfUUID.every(function(a) {
                    return a.indexOf(v) !== -1;
                });
            });
        }
        else if (Object.keys(where1)[0]==='OR'){
            let key1:any=where1["OR"];
            var helper = new Helper();
            for(let k of key1){
                listOfUUID=listOfUUID.concat(helper.CompareNum(k,data));
            }
            listOfUUID = listOfUUID.filter(function(elem, index, self) {
                return index == self.indexOf(elem);
            })
        }

        return listOfUUID;
    }



}
