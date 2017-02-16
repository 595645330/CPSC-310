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

    let server:Server = null;
    server = new Server(3000);

    it.only("server off", function () {
        return server.stop().then(function (torf: boolean) {
            console.log("torf"+torf);
            expect(torf === true);
        }).catch(function (err) {
            console.log(err);
        })
    });

    it.only("server on", function () {
        return server.start().then(function (torf: boolean) {
            console.log("torf"+torf);
            expect(torf === true);
        }).catch(function (err) {
            console.log(err);
        })
    });

    it.only("server off after on", function () {
        return server.stop().then(function (torf: boolean) {
            console.log("torf"+torf);
            expect(torf === true);
        }).catch(function (err) {
            console.log(err);
        })
    });

    it.only("server 400 for null echo", function () {
        var echo = Server.performEcho(null);
        sanityCheck(echo);
        expect(echo.code === 400);
    });

    it.only("Should be able to echo", function () {
        let out = Server.performEcho('echo');
        Log.test(JSON.stringify(out));
        sanityCheck(out);
        expect(out.code).to.equal(200);
        expect(out.body).to.deep.equal({message: 'echo...echo'});
    });

    it.only("Should be able to echo silence", function () {
        let out = Server.performEcho('');
        Log.test(JSON.stringify(out));
        sanityCheck(out);
        expect(out.code).to.equal(200);
        expect(out.body).to.deep.equal({message: '...'});
    });

    it.only("Should be able to handle a missing echo message sensibly", function () {
        let out = Server.performEcho(undefined);
        Log.test(JSON.stringify(out));
        sanityCheck(out);
        expect(out.code).to.equal(400);
        expect(out.body).to.deep.equal({error: 'Message not provided'});
    });

    it.only("Should be able to handle a null echo message sensibly", function () {
        let out = Server.performEcho(null);
        Log.test(JSON.stringify(out));
        sanityCheck(out);
        expect(out.code).to.equal(400);
        expect(out.body).to.have.property('error');
        expect(out.body).to.deep.equal({error: 'Message not provided'});
    });


    function getBase64() {
        var fs = require("fs");
        return new Buffer(fs.readFileSync('courses.zip')).toString('base64');
    }

    function getBase70(){
        var fs = require("fs");
        return new Buffer(fs.readFileSync('empty.zip')).toString('base64');
    }

    it.only("addDatasetNew204", function () {
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
    it.only("addDataset400 null content", function () {
        var f1 = new InsightFacade();
        return f1.addDataset("courses",null).then(function(response:InsightResponse) {
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

    it.only("line 400", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "AND" : [
                    {"EQ": {"courses_audit": 0}},
                    {"EQ": {"courses_avg": 90}},
                    {"EQ": {"courses_fail": 10}},
                    {"EQ": {"courses_pass": 100}},
                    {"GT": {"courses_audit": 0}},
                    {"GT": {"courses_avg": 90}},
                    {"GT": {"courses_fail": 10}},
                    {"GT": {"courses_pass": 100}},
                    {"LT": {"courses_audit": 0}},
                    {"LT": {"courses_avg": 90}},
                    {"LT": {"courses_fail": 10}},
                    {"LT": {"courses_pass": 100}},
                    {"IS": {"courses_dept": "adhe"}},
                    {"IS": {"courses_id": "101"}},
                    {"IS": {"courses_instructor": "*ave"}},
                    {"IS": {"courses_title": "blah"}},
                    {"IS": {"courses_uuid": "blah"}},
                    {"GT": 2121},
                    {"GT": {"courses_avg": "21"}}
        ]
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
            expect.fail();
        }).catch(function (err) {
            console.log(err);
            expect(err["code"]).to.equal(400);
        })
    });

    it.only("Dept 200", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {"courses_dept": "cpsc"}
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
    //             "NOT":[
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
    it.only("AND AND 200", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE":{
                "AND":[
                    {
                        "AND": [
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

    it.only("AND 200", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE":
                    {
                        "AND": [
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

    it.only("missing source 424", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE":{
                "OR":[
                    {
                        "OR": [
                            {
                                "GT": {
                                    "ty_avg": 78
                                }
                            },
                            {
                                "LT": {
                                    "ty_avg": 85
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
            expect.fail();
        }).catch(function (err) {
            console.log(err);
            expect(err["code"]).to.equal(424);
        })
    });

    it.only("nested AND 200", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE":{
                "AND":[
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

    it.only("complex 200", function () {
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

    it.only("not not 200", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {"NOT": {"NOT":
                {"LT":{
                    "courses_avg":97
                }}}
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

    it.only("not 400", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {"AND": [{"NOT":
                {"EQ":{
                    "courses_avg":97
                }}
            },
                {"NOT":
                    {"IS":{
                        "courses_dept":"adhe"
                    }}
                },
                {"NOT":
                    {"LT":{
                        "courses_avg":97
                    }}
                },
                {"NOT":
                    {"AND":
                        [{"LT":{
                            "courses_avg":97
                        }}]}
                },
                {"NOT":
                    {"OR":
                        [{"LT":{
                            "courses_avg":97
                        }}]}
                },
                {"NOT":
                    {"AND":
                        [{"LT":{
                            "courses_avg":"g"
                        }}]}
                }
                ]},
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
            expect.fail();
        }).catch(function (err) {
            Log.test(err);
            expect(err["code"]).to.equal(400);
        })
    });

    it.only("is 200", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {"OR": [
                {"IS":{
                    "courses_title":"*soc*"
                }},
                {"IS":{
                    "courses_uuid":"*306"
                }},
                {"IS":{
                    "courses_uuid":"306*"
                }},

                {"IS":{
                    "courses_id":"*510"
                }},
                {"IS":{
                    "courses_id":"510*"
                }},
                {"IS":{
                    "courses_uuid":"*06*"
                }}
            ]},
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
            expect.fail();
        }).catch(function (err) {
            expect(err["code"]).to.equal(400);
        })
    });

    it.only("is 200 second", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {"OR": [
                {"IS":{
                "courses_dept":"adhe"
            }},
                {"IS":{
                    "courses_id":"510"
                }},
                {"IS":{
                    "courses_instructor":"dave"
                }},
                {"IS":{
                    "courses_title":"iss"
                }},
                {"IS":{
                    "courses_uuid":"30668"
                }},
                {"IS":{
                    "courses_dept":"*adhe"
                }},
                {"IS":{
                    "courses_dept":"adhe*"
                }},
                {"IS":{
                    "courses_dept":"*dhe*"
                }},
                {"IS":{
                    "courses_instructor":"*dave"
                }},
                {"IS":{
                    "courses_instructor":"dave*"
                }},
                {"IS":{
                    "courses_instructor":"*ave*"
                }},
                {"IS":{
                    "courses_title":"*iss"
                }},
                {"IS":{
                    "courses_title":"fst*"
                }},
                // {"IS":{
                //     "courses_title":"*soc*"
                // }},
                // {"IS":{
                //     "courses_uuid":"*306"
                // }},
                // {"IS":{
                //     "courses_uuid":"306*"
                // }},
                // {"IS":{
                //     "courses_uuid":"*306*"
                // }},
                // {"IS":{
                //     "courses_id":"*510"
                // }},
                // {"IS":{
                //     "courses_id":"510*"
                // }},
                {"IS":{
                    "courses_id":"*510*"
                }}
            ]},
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
    it.only("not lt400", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {"NOT":
                {"GT":{
                    "courses_avg":"ss"
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
            expect.fail();
        }).catch(function (err) {
            Log.test(err);
            expect(err["code"]).to.equal(400);

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

