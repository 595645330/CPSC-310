/**
 * Created by Siyuan on 2017-01-25.
 */

import Server from "../src/rest/Server";
import {expect} from 'chai';
import Log from "../src/Util";
import {InsightResponse, QueryRequest} from "../src/controller/IInsightFacade";
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

    it.only("addDatasetOld201", function () {
        var f1 = new InsightFacade();
        return f1.addDataset("courses",getBase64()).then(function(response:InsightResponse) {
            Log.test('Value: ' + response.code);
            expect(response["code"]).to.equal(201);
        }).catch(function (err) {
            console.log(err);
            expect.fail();
        })
    });

    it.only("nested is 200", function () {
        var f1 = new InsightFacade();
        let q1:QueryRequest = {
            "WHERE": {
                "IS": {"courses_instructor": "*ave*"}
            },
            "OPTIONS": {
                "COLUMNS": [
                    "courses_instructor",
                    "courses_avg"
                ],
                "ORDER": "courses_avg",
                "FORM": "TABLE"
            }

        }

        return f1.performQuery(q1).then(function(response:InsightResponse) {
            Log.test('Value: ' + response);
            console.log(response);
            expect(response["code"]).to.equal(200);
        }).catch(function (err) {
            console.log(err);
            expect.fail();
        })
    });

    it.only("wrong query 400", function () {
        var f1 = new InsightFacade();
        let q1:QueryRequest = {
            "WHERE": {
                "shih": []
            },
            "OPTIONS": {
                "COLUMNS": [
                    "courses_instructor",
                    "courses_avg"
                ],
                "ORDER": "courses_avg",
                "FORM": "TABLE"
            }

        }

        return f1.performQuery(q1).then(function(response:InsightResponse) {
            Log.test('Value: ' + response);
            console.log(response);
            expect(response["code"]).to.equal(400);
        }).catch(function (err) {
            console.log(err);
            expect.fail();
        })
    });


    it.only("empty or 400", function () {
        var f1 = new InsightFacade();
        let q1:QueryRequest = {
            "WHERE": {
                "OR": []
            },
            "OPTIONS": {
                "COLUMNS": [
                    "courses_instructor",
                    "courses_avg"
                ],
                "ORDER": "courses_avg",
                "FORM": "TABLE"
            }

        }

        return f1.performQuery(q1).then(function(response:InsightResponse) {
            Log.test('Value: ' + response);
            console.log(response);
            expect(response["code"]).to.equal(400);
        }).catch(function (err) {
            console.log(err);
            expect.fail();
        })
    });
    it.only("wrongQuery400", function () {
        var f1 = new InsightFacade();
        let q1:QueryRequest = {
            "WHERE":21,
            "OPTIONS":5656
        }
        return f1.performQuery(q1).then(function(response:InsightResponse) {
            Log.test('Value: ' + response);
            expect(response["code"]).to.equal(400);
        }).catch(function (err) {
            Log.test(err.code);
            console.log(err);
            expect.fail();
        })
    });

    it.only("order not in colum 400", function () {
        var f1 = new InsightFacade();
        let q1:QueryRequest = {
            "WHERE":{
                "GT":{
                    "courses_avg":97.6
                }
            },
            "OPTIONS":{
                "COLUMNS":[
                    "courses_dept",
                    "courses_fail"
                ],
                "ORDER":"courses_avg",
                "FORM":"TABLE"
            }
        }

        return f1.performQuery(q1).then(function(response:InsightResponse) {
            Log.test('Value: ' + response);
            console.log(response);
            expect(response["code"]).to.equal(400);
        }).catch(function (err) {
            console.log(err);
            expect.fail();
        })
    });

    it.only("performQuery200complex", function () {
        var f1 = new InsightFacade();
        let q1:QueryRequest = {
            "WHERE":{
                "OR":[
                    {
                        "AND":[
                            {
                                "GT":{
                                    "courses_avg":90
                                }
                            },
                            {
                                "IS":{
                                    "courses_dept":"adhe"
                                }
                            }
                        ]
                    },
                    {
                        "EQ":{
                            "courses_avg":95
                        }
                    }
                ]
            },
            "OPTIONS":{
                "COLUMNS":[
                    "courses_dept",
                    "courses_id",
                    "courses_avg"
                ],
                "ORDER":"courses_avg",
                "FORM":"TABLE"
            }
        }
        return f1.performQuery(q1).then(function(response:InsightResponse) {
            Log.test('Value: ' + response);
            expect(response["code"]).to.equal(200);
        }).catch(function (err) {
            Log.test(err);
            console.log(err);
            expect.fail();
        })
    });

    // it.only("removeDataset201", function () {
    //     var f1 = new InsightFacade();
    //     return f1.removeDataset("D2").then(function(response:InsightResponse) {
    //         Log.test('Value: ' + response);
    //         expect(response["code"]).to.equal(201);
    //     }).catch(function (err) {
    //         Log.test(err);
    //         expect.fail();
    //     })
    // });

    it.only("removeDataset201", function () {
        var f1 = new InsightFacade();
        return f1.removeDataset("courses").then(function(response:InsightResponse) {
            Log.test('Value: ' + response);
            expect(response["code"]).to.equal(204);
        }).catch(function (err) {
            console.log(err);
            expect.fail();
        })
    });
    it.only("removeDataset201", function () {
        var f1 = new InsightFacade();
        return f1.removeDataset("courses").then(function(response:InsightResponse) {
            Log.test('Value: ' + response);
            expect(response["code"]).to.equal(404);
        }).catch(function (err) {
            console.log(err);
            expect.fail();
        })
    });




});
