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

    function getBase85() {
        var fs = require("fs");
        return new Buffer(fs.readFileSync('rooms.zip')).toString('base64');
    }




    it.only("addDatasetNew204", function () {
        var f1 = new InsightFacade();
        return f1.addDataset("rooms",getBase85()).then(function(response:InsightResponse) {
            Log.test('Value: ' + response.code);
            expect(response["code"]).to.equal(204);
        }).catch(function (err) {
            console.log(err);
            expect.fail();
        })
    });

    it.only("addDatasetOld201", function () {
        var f1 = new InsightFacade();
        return f1.addDataset("rooms",getBase85()).then(function(response:InsightResponse) {
            Log.test('Value: ' + response.code);
            expect(response["code"]).to.equal(201);
        }).catch(function (err) {
            console.log(err);
            expect.fail();
        })
    });

    it.only("addDataset400", function () {
        var f1 = new InsightFacade();
        return f1.addDataset("rooms",getBase70()).then(function(response:InsightResponse) {
            Log.test('Value: ' + response.code);
            expect.fail();
        }).catch(function (err) {
            console.log(err);
            expect(err["code"]).to.equal(400);
        })
    });

    it.only("addDataset400 null content", function () {
        var f1 = new InsightFacade();
        return f1.addDataset("rooms",null).then(function(response:InsightResponse) {
            Log.test('Value: ' + response.code);
            expect.fail();
        }).catch(function (err) {
            console.log(err);
            expect(err["code"]).to.equal(400);
        })
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

    it.only("addDatasetNew204 cour", function () {
        var f1 = new InsightFacade();
        return f1.addDataset("courses",getBase64()).then(function(response:InsightResponse) {
            Log.test('Value: ' + response.code);
            expect(response["code"]).to.equal(204);
        }).catch(function (err) {
            console.log(err);
            expect.fail();
        })
    });

    it.only("addDatasetOld201 cour", function () {
        var f1 = new InsightFacade();
        return f1.addDataset("courses",getBase64()).then(function(response:InsightResponse) {
            Log.test('Value: ' + response.code);
            expect(response["code"]).to.equal(201);
        }).catch(function (err) {
            console.log(err);
            expect.fail();
        })
    });

    it.only("addDataset400 cour", function () {
        var f1 = new InsightFacade();
        return f1.addDataset("courses",getBase70()).then(function(response:InsightResponse) {
            Log.test('Value: ' + response.code);
            expect.fail();
        }).catch(function (err) {
            console.log(err);
            expect(err["code"]).to.equal(400);
        })
    });
    it.only("addDataset400 null content cour", function () {
        var f1 = new InsightFacade();
        return f1.addDataset("courses",null).then(function(response:InsightResponse) {
            Log.test('Value: ' + response.code);
            expect.fail();
        }).catch(function (err) {
            console.log(err);
            expect(err["code"]).to.equal(400);
        })
    });
    //---------------
    it.only("where option 400", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "LT": {"courses_fail": 12}
            },
            "OPTIONS": {
                "COLUMNS": [
                    "courses_audit",
                    "courses_avg"
                ],
                "ORDER": "courses_avg",
                "FORM": "TABLE"
            },
            "s":1
        }
        return f1.performQuery(q1).then(function(response:InsightResponse) {
            Log.test('Value: ' + response);
            expect.fail();
        }).catch(function (err) {
            console.log(err);
            expect(err["code"]).to.equal(400);
        })
    });

    it.only("option wrong 400", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "LT": {"courses_fail": 12}
            },
            "OPTIONS": {
                "COLUMNS": [
                    "courses_audit",
                    "courses_avg"
                ],
                "ORDER": "courses_avg",
                "FORM": "TABLE",
                "s":1
            }
        }
        return f1.performQuery(q1).then(function(response:InsightResponse) {
            Log.test('Value: ' + response);
            expect.fail();
        }).catch(function (err) {
            Log.warn("error happened");
            expect(err["code"]).to.equal(400);
        })
    });

    it.only("column not array wrong 400", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "LT": {"courses_fail": 12}
            },
            "OPTIONS": {
                "COLUMNS": "courses_audit",
                "ORDER": "courses_avg",
                "FORM": "TABLE",
            }
        }
        return f1.performQuery(q1).then(function(response:InsightResponse) {
            Log.test('Value: ' + response);
            expect.fail();
        }).catch(function (err) {
            console.log(err);
            Log.error("error here");
            expect(err["code"]).to.equal(400);
        })
    });

    it.only("form not table 400", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "LT": {"courses_fail": 12}
            },
            "OPTIONS": {
                "COLUMNS": [
                    "courses_audit",
                    "courses_avg"
                ],
                "ORDER": "courses_avg",
                "FORM": "s",
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

    it.only("order wrong 400", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "LT": {"courses_fail": 12}
            },
            "OPTIONS": {
                "COLUMNS": [
                    "courses_audit",
                    "courses_avg"
                ],
                "ORDER": "s",
                "FORM": "TABLE",
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
    //-------------
    it.only("LT 424", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "LT": {"ty_fail": 12}
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
            expect(err["code"]).to.equal(424);
        })
    });

    it.only("EQ 424", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "EQ": {"ty_fail": 12}
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
            expect(err["code"]).to.equal(424);
        })
    });

    it.only("IS 424", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {"ty_dept": "adhe"}
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
            expect(err["code"]).to.equal(424);
        })
    });

    it.only("AND 424", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {"AND":[
                {"LT": {"ty_fail": 12}}]
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
            expect(err["code"]).to.equal(424);
        })
    });

    it.only("OR 424", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {"OR":[
                {"LT": {"ty_fail": 12}}]
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
            expect(err["code"]).to.equal(424);
        })
    });

    it.only("NOT 424", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {"NOT":
                {"LT": {"ty_fail": 12}}
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
            expect(err["code"]).to.equal(424);
        })
    });

//-----------
    it.only("GT pass 400", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "GT": {"courses_pass": "s"}
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

    it.only("GT pass 200", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "GT": {"courses_pass": 0}
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

    it.only("GT fail 400", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "GT": {"courses_fail": "s"}
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

    it.only("GT fail 200", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "GT": {"courses_fail": 0}
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

    it.only("GT audit 400", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "GT": {"courses_audit": "s"}
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

    it.only("GT audit 200", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "GT": {"courses_audit": 0}
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

    it.only("GT course key 400", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "GT": {"courses_asdas": 0}
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
    //--------------------
    it.only("LT not object 400", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "LT": 12
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

    it.only("LT pass 400", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "LT": {"courses_pass": "s"}
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

    it.only("LT pass 200", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "LT": {"courses_pass": 100}
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

    it.only("LT fail 400", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "LT": {"courses_fail": "s"}
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

    it.only("LT fail 200", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "LT": {"courses_fail": 100}
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


    it.only("LT audit 400", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "LT": {"courses_audit": "s"}
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

    it.only("LT audit 200", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "LT": {"courses_audit": 100}
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

    it.only("LT course key 400", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "LT": {"courses_asdas": 0}
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
    //--------------------

    it.only("EQ not object 400", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "EQ": 12
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

    it.only("EQ avg 400", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "EQ": {"courses_avg": "s"}
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

    it.only("EQ pass 400", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "EQ": {"courses_pass": "s"}
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

    it.only("EQ pass 200", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "EQ": {"courses_pass": 90}
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

    it.only("EQ fail 400", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "EQ": {"courses_fail": "s"}
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

    it.only("EQ fail 200", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "EQ": {"courses_fail": 10}
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

    it.only("EQ audit 400", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "EQ": {"courses_audit": "s"}
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

    it.only("EQ wrong key 400", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "EQ": {"courses_ausadas": 12}
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
    // ------------------
    it.only("is not obj 400", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": 23
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

    it.only("is dept 400", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {"courses_dept": 12}
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

    it.only("is id 400", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {"courses_id": 12}
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

    it.only("is *id 200", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {"courses_id": "*203"}
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

    it.only("is id* 200", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {"courses_id": "203*"}
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

    it.only("is instr 400", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {"courses_instructor": 12}
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

    it.only("is instr 200", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {"courses_instructor": "johnson, shelly"}
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


    it.only("is instr 200*", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {"courses_instructor": "johnso*"}
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

    it.only("is title 400", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {"courses_title": 12}
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

    it.only("is title 200", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {"courses_title": "fst ntns soc iss"}
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

    it.only("is uuid 400", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {"courses_uuid": 12}
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

    it.only("is uuid 200", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {"courses_uuid": "71674"}
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

    it.only("is uuid *200", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {"courses_uuid": "*1674"}
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


    it.only("is uuid 200*", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {"courses_uuid": "7167*"}
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

    it.only("is uuid *200*", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {"courses_uuid": "*167*"}
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
    //--------------------
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
    //--------------

    it.only("not GT 200", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {"NOT":
                {"GT":{
                    "courses_avg":1
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

    it.only("not EQ 400", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {"NOT":
                {"EQ":{
                    "courses_avg":"ghg"
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
            console.log(err);
            expect(err["code"]).to.equal(400);
        })
    });

    it.only("not OR 400", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {"NOT":
                {"OR":[3]}
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
            console.log(err);
            expect(err["code"]).to.equal(400);
        })
    });

    it.only("not wrong key 400", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {"NOT":
                {"asd":90}
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
            console.log(err);
            expect(err["code"]).to.equal(400);
        })
    });

    it.only("and not an array followed 400", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {"AND":1231
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
            console.log(err);
            expect(err["code"]).to.equal(400);
        })
    });

    it.only("OR catch err 400", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {"OR":[{"as":"as"}]
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
            console.log(err);
            expect(err["code"]).to.equal(400);
        })
    });
    it.only("where wrong key 400", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {"asd":12
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
            console.log(err);
            expect(err["code"]).to.equal(400);
        })
    });

    it.only("not wrong course key 400", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {"NOT":
                {"IS":{"courses_deptsadas":"adhe"}}
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
            console.log(err);
            expect(err["code"]).to.equal(400);
        })
    });

    it.only("not OR 200", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {"NOT":
                {
                    "OR":[
                        {
                            "AND":[
                                {
                                    "LT":{
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
                            "LT":{
                                "courses_avg":98
                            }
                        }
                    ]
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
            Log.test(err);
            console.log(err);
            expect.fail();
        })
    });

    it.only("not not 400", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {"NOT": {"NOT":
                {"LT":{
                    "courses_avg":"hj"
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
            expect.fail();
        }).catch(function (err) {
            Log.test(err);
            console.log(err);
            expect(err["code"]).to.equal(400);
        })
    });
    //--------------
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
            expect(response["code"]).to.equal(200);
        }).catch(function (err) {
            expect.fail();
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


    it.only("courses year gt200 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "GT": {
                    "courses_year": 1900
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "courses_year"
                ],
                "ORDER": "courses_year",
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
    it.only("courses year gt400 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "GT": {
                    "courses_year": "2"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "courses_year"
                ],
                "ORDER": "courses_year",
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

    it.only("courses year lt200 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "LT": {
                    "courses_year": 2000
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "courses_year"
                ],
                "ORDER": "courses_year",
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
    it.only("courses year LT400 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "LT": {
                    "courses_year": "2"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "courses_year"
                ],
                "ORDER": "courses_year",
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
    it.only("courses year eq200 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "EQ": {
                    "courses_year": 1900
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "courses_year"
                ],
                "ORDER": "courses_year",
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
    it.only("courses year eq400 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "EQ": {
                    "courses_year": "2"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "courses_year"
                ],
                "ORDER": "courses_year",
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
    //-----------------------------------------------------------
    it.only("400 2 sources ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "AND": [
                    {
                        "IS": {
                            "rooms_name": "DMP_*"
                        }
                    },
                    {
                        "IS": {
                            "courses_dept": "cpsc"
                        }
                    }
                ]
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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
    it.only("Room_address(IS) pass *200* ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_address": "*Agrono*"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_address", "rooms_name"
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
    it.only("Room_address(IS) pass 200 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_address": "1984 West Mall"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_address", "rooms_name"
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
    it.only("Room_address(IS) pass *200 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_address": "*1984 West Mall"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_address", "rooms_name"
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
    it.only("Room_address(IS) pass 200* ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_address": "1984 West Mall*"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_address", "rooms_name"
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

    it.only("Room_name(IS) pass 200* ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_name": "DMP_*"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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
    it.only("Room_name(IS) pass 200 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_name": "DMP_110"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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

    it.only("Room_name(IS) pass *200 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_name": "*DMP_110"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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
    it.only("Room_name(IS) pass *200* ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_name": "*DMP_110*"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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
    it.only("Room_furniture(IS) pass 200 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_furniture": "Classroom-Fixed Tablets"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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
    it.only("Room_furniture(IS) pass *200 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_furniture": "*Classroom-Fixed Tablets"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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
    it.only("Room_furniture(IS) pass 200* ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_furniture": "Classroom-Fixed Tablets*"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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
    it.only("Room_furniture(IS) pass *200* ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_furniture": "*Classroom-Fixed Tablets*"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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

    it.only("Room_Type(IS) pass 200 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_type": "Tiered Large Group"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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
    it.only("Room_Type(IS) pass *200 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_type": "*Tiered Large Group"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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
    it.only("Room_Type(IS) pass 200* ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_type": "Tiered Large Group*"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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

    it.only("Room_Type(IS) pass *200* ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_type": "*Tiered Large Group*"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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
    it.only("Room_fullname(IS) pass 200 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_fullname": "Hugh Dempster Pavilion"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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
    it.only("Room_fullname(IS) pass *200 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_fullname": "*Hugh Dempster Pavilion"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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

    it.only("Room_fullname(IS) pass 200* ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_fullname": "Hugh Dempster Pavilion*"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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
    it.only("Room_fullname(IS) pass *200* ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_fullname": "*Hugh Dempster Pavilion*"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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
    it.only("Room_number(IS) pass 200 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_number": "201"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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
    it.only("Room_number(IS) pass *200 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_number": "*201"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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
    it.only("Room_number(IS) pass 200* ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_number": "201*"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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
    it.only("Room_number(IS) pass *200* ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_number": "*201*"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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
    it.only("Room_shortname(IS) pass *200 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_shortname": "*DMP"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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

    it.only("Room_shortname(IS) pass 200* ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_shortname": "DMP*"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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
    it.only("Room_shortname(IS) pass *200* ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_shortname": "*DMP*"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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
    it.only("Room_shortname(IS) pass 200 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_shortname": "DMP"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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
    it.only("Room_shortname(IS) is400 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_shortname": 123
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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

    it.only("Room_fullname(IS) is400 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_fullname": 123
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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

    it.only("rooms_number(IS) is400 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_number": 123
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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
    it.only("rooms_name(IS) is400 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_name": 123
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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
    it.only("rooms_address(IS) is400 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_address": 123
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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
    it.only("rooms_type(IS) is400 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_type": 123
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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
    it.only("rooms_furniture(IS) is400 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_furniture": 123
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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
    it.only("rooms_href(IS) is400 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_href": 123
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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
    it.only("Room_href(IS) pass 200 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_href": "http://students.ubc.ca/campus/discover/buildings-and-classrooms/room/DMP-201"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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
    it.only("Room_href(IS) pass *200 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_href": "*http://students.ubc.ca/campus/discover/buildings-and-classrooms/room/DMP-201"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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
    it.only("Room_href(IS) pass 200* ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_href": "http://students.ubc.ca/campus/discover/buildings-and-classrooms/room/DMP-201*"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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
    it.only("Room_href(IS) pass *200* ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "IS": {
                    "rooms_href": "*http://students.ubc.ca/campus/discover/buildings-and-classrooms/room/DMP-201*"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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
    //------------------
    it.only("Room_lat eq200 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "EQ": {
                    "rooms_lat": 49.26541
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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

    it.only("Room_lat eq400 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "EQ": {
                    "rooms_lat": "ssa"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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
//----------------------
    it.only("Room_lat lt200 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "LT": {
                    "rooms_lat": 100
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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

    it.only("Room_lat lt400 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "LT": {
                    "rooms_lat": "ssa"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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
//----------
    it.only("Room_lat gt200 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "GT": {
                    "rooms_lat": 30
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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

    it.only("Room_lat gt400 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "GT": {
                    "rooms_lat": "ssa"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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
    //------------
    it.only("Room_lon eq200 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "EQ": {
                    "rooms_lon": -123.25623
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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

    it.only("Room_lon eq400 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "EQ": {
                    "rooms_lon": "ssa"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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
    //-----------
    it.only("Room_lon lt200 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "LT": {
                    "rooms_lon": -100
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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

    it.only("Room_lon lt400 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "LT": {
                    "rooms_lon": "ssa"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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
    //-------------

    it.only("Room_lon gt200 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "GT": {
                    "rooms_lon": -127
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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

    it.only("Room_lon gt400 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "GT": {
                    "rooms_lon": "ssa"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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
    //--------------
    it.only("Room_seats eq200 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "EQ": {
                    "rooms_seats": 100
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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

    it.only("Room_seats eq400 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "EQ": {
                    "rooms_seats": "ssa"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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
//--------------
    it.only("Room_seats lt200 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "LT": {
                    "rooms_seats": 1000
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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

    it.only("Room_seats lt400 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "LT": {
                    "rooms_seats": "ssa"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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
    //--------------------
    it.only("Room_seats gt200 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "GT": {
                    "rooms_seats": 30
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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

    it.only("Room_seats gt400 ", function () {
        var f1 = new InsightFacade();
        var q1 = {
            "WHERE": {
                "GT": {
                    "rooms_seats": "ssa"
                }
            },
            "OPTIONS": {
                "COLUMNS": [
                    "rooms_name"
                ],
                "ORDER": "rooms_name",
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

//---------------
    it.only("removeDataset204", function () {
        var f1 = new InsightFacade();
        return f1.removeDataset("rooms").then(function(response:InsightResponse) {
            Log.test('Value: ' + response);
            expect(response["code"]).to.equal(204);
        }).catch(function (err) {
            console.log(err);
            expect.fail();
        })
    });

    it.only("removeDataset404", function () {
        var f1 = new InsightFacade();
        return f1.removeDataset("rooms").then(function(response:InsightResponse) {
            Log.test('Value: ' + response);
            expect.fail();
        }).catch(function (err) {
            console.log(err);
            expect(err["code"]).to.equal(404);
        })
    });
    it.only("removeDataset204", function () {
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
    it.only("rooms no source 424", function () {
        var f1 = new InsightFacade();
        let q1:QueryRequest = {
            "WHERE":{
                "GT":{
                    "rooms_seats":40
                }
            },
            "OPTIONS":{
                "COLUMNS":[
                    "rooms_seats",
                    "rooms_name"
                ],
                "ORDER":"rooms_seats",
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
