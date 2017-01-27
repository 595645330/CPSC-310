/**
 * Created by Siyuan on 2017-01-25.
 */

import Server from "../src/rest/Server";
import {expect} from 'chai';
import Log from "../src/Util";
import {InsightResponse} from "../src/controller/IInsightFacade";
import InsightFacade from "../src/controller/InsightFacade";

describe("Test1", function () {


    function sanityCheck(response: InsightResponse) {
        expect(response).to.have.property('code');
        expect(response).to.have.property('body');
        expect(response.code).to.be.a('number');
    }

    before(function () {
        Log.test('Before: ' + (<any>this).test.parent.title);
    });

    beforeEach(function () {
        Log.test('BeforeTest: ' + (<any>this).currentTest.title);
    });

    after(function () {
        Log.test('After: ' + (<any>this).test.parent.title);
    });

    afterEach(function () {
        Log.test('AfterTest: ' + (<any>this).currentTest.title);
    });

    function getBase64() {
        var fs = require("fs");
        return new Buffer(fs.readFileSync('courses.zip')).toString('base64');
    }

    // var file = document.querySelector('#files > input[type="file"]').files[0];
    // prints the base64 string

    // it.only("addDataset", function (done) {
    //     var fs = require("fs");
    //     var JSZip = require("jszip");
    //     let s1:string = "";
    //     s1=getBase64();
    //     var f1 = new InsightFacade();
    //
    //     f1.addDataset("D1", s1).then(function(response:InsightResponse){
    //         console.log(response);
    //     }).catch(function(err:any){
    //         console.log("Error1231231");
    //     });
    // });

    it.only("addDataset201", function () {
        var f1 = new InsightFacade();
        return f1.addDataset("D1",getBase64()).then(function(response:InsightResponse) {
            Log.test('Value: ' + response);
            expect(response["code"]).to.equal(201);
        }).catch(function (err) {
            Log.test(err);
            expect.fail();
        })
    });

    // it.only("addDataset204", function () {
    //     var f1 = new InsightFacade();
    //     return f1.addDataset("D1",getBase64()).then(function(response:InsightResponse) {
    //         Log.test('Value: ' + response);
    //         expect(response["code"]).to.equal(204);
    //     }).catch(function (err) {
    //         Log.test(err);
    //         expect.fail();
    //     })
    // });


});
