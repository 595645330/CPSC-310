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

    function getBase70(){
        var fs = require("fs");
        return new Buffer(fs.readFileSync('empty.zip')).toString('base64');
    }

    it.only("addDatasetNew200", function () {
        var f1 = new InsightFacade();
        return f1.addDataset("courses",getBase64()).then(function(response:InsightResponse) {
            Log.test('Value: ' + response.code);
            expect(response["code"]).to.equal(204);
        }).catch(function (err) {
            console.log(err);
            expect.fail();
        })
    });

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

    it.only("addDataset400", function () {
        var f1 = new InsightFacade();
        return f1.addDataset("courses",getBase70()).then(function(response:InsightResponse) {
            Log.test('Value: ' + response.code);
            expect.fail();
        }).catch(function (err) {
            console.log(err);
            expect(err["code"]).to.equal(400);
        })
    });

    it.only("EQ audit 200", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "EQ": {"courses_audit": 0}
            },
            "OPTIONS": {
                "COLUMNS": [
                    "courses_audit",
                    "courses_avg"
                ],
                "ORDER": "courses_avg",
                "FORM": "TABLE"
            }

        }
        return f1.performQuery(q1).then(function(response:InsightResponse) {
            Log.test('Value: ' + response);
            expect(response["code"]).to.equal(200);
        }).catch(function (err) {
            console.log(err);
            expect.fail();
        })
    });

    it.only("EQ avg 200", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE":{
                "EQ":{
                    "courses_avg":97
                }
            },
            "OPTIONS":{
                "COLUMNS":[
                    "courses_dept",
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
            console.log(err);
            expect.fail();
        })
    });

    it.only("No order 200", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE":{
                "IS":{
                    "courses_dept":"cpsc"
                }
            },
            "OPTIONS":{
                "COLUMNS":[
                    "courses_dept",
                    "courses_avg"
                ],
                "FORM":"TABLE"
            }
        }

        return f1.performQuery(q1).then(function(response:InsightResponse) {
            Log.test('Value: ' + response);
            expect(response["code"]).to.equal(200);
        }).catch(function (err) {
            console.log(err);
            expect.fail();
        })
    });

    it.only("Sort string 200", function () {
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
                "ORDER":"courses_dept",
                "FORM":"TABLE"
            }
        }
        return f1.performQuery(q1).then(function(response:InsightResponse) {
            Log.test('Value: ' + response);
            //console.log(response);
            expect(response["code"]).to.equal(200);

        }).catch(function (err) {
            console.log(err);
            expect.fail();
        })
    });

    it.only("Instructor Partial String content 200", function () {
        var f1 = new InsightFacade();
        var q1 = {
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
            //console.log(response);
            expect(response["code"]).to.equal(200);
        }).catch(function (err) {
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
            expect.fail();
        }).catch(function (err) {
            console.log(err);
            expect(err["code"]).to.equal(400);
        })
    });

    it.only("Partial instructor *ave* 200(no order)", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {"courses_instructor": "*ave*"}
            },
            "OPTIONS": {
                "COLUMNS": [
                    "courses_instructor",
                    "courses_avg"
                ],
                "FORM": "TABLE"
            }
        }
        return f1.performQuery(q1).then(function(response:InsightResponse) {
            Log.test('Value: ' + response);
            expect(response["code"]).to.equal(200);
        }).catch(function (err) {
            console.log(err);
            expect.fail();
        })
    });

    it.only("partial dept *ad 200", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {"courses_dept": "*ad"}
            },
            "OPTIONS": {
                "COLUMNS": [
                    "courses_dept",
                    "courses_avg"
                ],
                "ORDER": "courses_avg",
                "FORM": "TABLE"
            }
        }
        return f1.performQuery(q1).then(function(response:InsightResponse) {
            Log.test('Value: ' + response);
            expect(response["code"]).to.equal(200);
        }).catch(function (err) {
            console.log(err);
            expect.fail();
        })
    });

    it.only("partial dept st* 200", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {"courses_dept": "st*"}
            },
            "OPTIONS": {
                "COLUMNS": [
                    "courses_dept",
                    "courses_avg"
                ],
                "ORDER": "courses_avg",
                "FORM": "TABLE"
            }
        }
        return f1.performQuery(q1).then(function(response:InsightResponse) {
            Log.test('Value: ' + response);
            expect(response["code"]).to.equal(200);
        }).catch(function (err) {
            console.log(err);
            expect.fail();
        })
    });

    it.only("wrong key 400", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {"courses_kkk": "*ave*"}
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
            expect.fail();
        }).catch(function (err) {
            console.log(err);
            expect(err["code"]).to.equal(400);
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
            expect.fail();
        }).catch(function (err) {
            console.log(err);
            expect(err["code"]).to.equal(400);
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
            expect.fail();
        }).catch(function (err) {
            Log.test(err.code);
            console.log(err);
            expect(err["code"]).to.equal(400);
        })
    });

    it.only("invalid order ", function () {
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
                    "courses_avgasdjkal"
                ],
                "ORDER":"courses_avgasdjkal",
                "FORM":"TABLE"
            }
        }
        return f1.performQuery(q1).then(function(response:InsightResponse) {
            Log.test('Value: ' + response);
            console.log(response);
            expect.fail();
        }).catch(function (err) {
            console.log(err);
            expect(err["code"]).to.equal(400);
        })
    });

    //
    // it.only("complex200", function () {
    //     var f1 = new InsightFacade();
    //     var q1 = {
    //         "WHERE":{
    //             "OR":[
    //                 {
    //                     "AND":[
    //                         {
    //                             "GT":{
    //                                 "courses_avg":90
    //                             }
    //                         },
    //                         {
    //                             "IS":{
    //                                 "courses_dept":"adhe"
    //                             }
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "EQ":{
    //                         "courses_avg":95
    //                     }
    //                 }
    //             ]
    //         },
    //         "OPTIONS":{
    //             "COLUMNS":[
    //                 "courses_dept",
    //                 "courses_id",
    //                 "courses_avg"
    //             ],
    //             "ORDER":"courses_avg",
    //             "FORM":"TABLE"
    //         }
    //     }
    //     return f1.performQuery(q1).then(function(response:InsightResponse) {
    //         Log.test('Value: ' + response);
    //         expect(response["code"]).to.equal(200);
    //     }).catch(function (err) {
    //         Log.test(err);
    //         console.log(err);
    //         expect.fail();//
    //     })
    // });
    //
    it.only("not not 200", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "EQ": {
                    "courses_avg": 90
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "courses_dept",
                    "courses_id",
                    "courses_avg"
                ],
                "ORDER": "courses_avg",
                "FORM": "TABLE"
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

    // it.only("not not200", function () {
    //     var f1 = new InsightFacade();
    //     var q1 = {
    //         "WHERE": {
    //             "NOT": {
    //                 "OR": [
    //                     {
    //                         "IS": {
    //                             "courses_dept": "cpsc"
    //                         }
    //                     },
    //                     {
    //                         "LT": {
    //                             "courses_avg": 90
    //                         }
    //                     },
    //                     {
    //                         "LT": {
    //                             "courses_pass": 50
    //                         }
    //                     }
    //                 ]
    //             }},
    //         "OPTIONS": {
    //             "COLUMNS": [
    //                 "courses_dept",
    //                 "courses_id",
    //                 "courses_avg"
    //             ],
    //             "ORDER": "courses_avg",
    //             "FORM": "TABLE"
    //         }
    //
    //     }
    //     return f1.performQuery(q1).then(function(response:InsightResponse) {
    //         Log.test('Value: ' + response);
    //         expect(response["code"]).to.equal(200);
    //     }).catch(function (err) {
    //         Log.test(err);
    //         console.log(err);
    //         expect.fail();
    //     })
    // });
    // it.only("AND AND 200", function () {
    //     var f1 = new InsightFacade();
    //     var q1 = {
    //         "WHERE":{
    //             "AND":[
    //                 {
    //                     "AND": [
    //                         {
    //                             "GT": {
    //                                 "courses_avg": 78
    //                             }
    //                         },
    //                         {
    //                             "LT": {
    //                                 "courses_avg": 85
    //                             }
    //                         }]
    //                 },
    //                 {
    //                     "LT":{
    //                         "courses_avg":80
    //                     }
    //                 }
    //             ]
    //         },
    //         "OPTIONS":{
    //             "COLUMNS":[
    //                 "courses_dept",
    //                 "courses_id",
    //                 "courses_avg"
    //             ],
    //             "ORDER":"courses_avg",
    //             "FORM":"TABLE"
    //         }
    //     }
    //     return f1.performQuery(q1).then(function(response:InsightResponse) {
    //         Log.test('Value: ' + response);
    //         expect(response["code"]).to.equal(200);
    //     }).catch(function (err) {
    //         console.log(err);
    //         expect.fail();
    //     })
    // });
    //
    // it.only("AND 200", function () {
    //     var f1 = new InsightFacade();
    //     var q1 = {
    //         "WHERE":
    //                 {
    //                     "AND": [
    //                         {
    //                             "GT": {
    //                                 "courses_avg": 78
    //                             }
    //                         },
    //                         {
    //                             "LT": {
    //                                 "courses_avg": 85
    //                             }
    //                         }]
    //                 },
    //         "OPTIONS":{
    //             "COLUMNS":[
    //                 "courses_dept",
    //                 "courses_id",
    //                 "courses_avg"
    //             ],
    //             "ORDER":"courses_avg",
    //             "FORM":"TABLE"
    //         }
    //     }
    //     return f1.performQuery(q1).then(function(response:InsightResponse) {
    //         Log.test('Value: ' + response);
    //         expect(response["code"]).to.equal(200);
    //     }).catch(function (err) {
    //         console.log(err);
    //         expect.fail();
    //     })
    // });

    it.only("OR OR 200", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE":{
                "OR":[
                    {
                        "OR": [
                            {
                                "GT": {
                                    "courses_avg": 78
                                }
                            },
                            {
                                "LT": {
                                    "courses_avg": 85
                                }
                            }]
                    },
                    {
                        "LT":{
                            "courses_avg":80
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
            console.log(err);
            expect.fail();
        })
    });

    it.only("nested AND 200", function () {
        var f1 = new InsightFacade();
        var q1 = {
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
            console.log(err);
            expect.fail();
        })
    });

    it.only("not 200", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {"NOT":
                {"LT":{
                    "courses_avg":97
                }}
            },
            "OPTIONS":{
                "COLUMNS":[
                    "courses_dept",
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

    it.only("removeDataset404", function () {
        var f1 = new InsightFacade();
        return f1.removeDataset("courses").then(function(response:InsightResponse) {
            Log.test('Value: ' + response);
            expect.fail();
        }).catch(function (err) {
            console.log(err);
            expect(err["code"]).to.equal(404);
        })
    });

    it.only("no source 424", function () {
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
            expect.fail();
        }).catch(function (err) {
            console.log(err);
            expect(err["code"]).to.equal(424);

        })
    });


});

