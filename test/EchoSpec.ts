/**
 * Created by rtholmes on 2016-10-31.
 */

import Server from "../src/rest/Server";
import {expect} from 'chai';
import Log from "../src/Util";
import {InsightResponse} from "../src/controller/IInsightFacade";

describe("EchoSpec", function () {


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
    server = new Server(4321);
    var chai = require('chai'), chaiHttp = require('chai-http')
    chai.use(chaiHttp);

    var fs = require("fs");
    it.only("echo courses 200", function () {
        server.start();
        return chai.request('http://localhost:4321')
            .get('/echo/msg')
            .then(function (res: any) {
                Log.trace('then:');
                console.log(res);
                console.log(res.status);
                expect(res.status).to.equal(200);
                // some assertions
                server.stop();
            })
            .catch(function (err: any) {
                Log.trace('catch:');
                console.log(err.response.body);
                expect.fail();
                // some assertions
            });
    });
    var fs = require("fs");
    it.only("get/ 200", function () {
        server.start();
        return chai.request('http://localhost:4321')
            .get('/')
            .then(function (res: any) {
                Log.trace('then:');
                console.log(res);
                console.log(res.status);
                expect(res.status).to.equal(200);
                // some assertions
                server.stop();
            })
            .catch(function (err: any) {
                Log.trace('catch:');
                console.log(err.response.body);
                expect.fail();
                // some assertions
                server.stop();
            });
    });


    var fs = require("fs");
    it.only("PUT new 204", function () {
        server.start();
        return chai.request('http://localhost:4321')
            .put('/dataset/courses')
            .attach("body", fs.readFileSync("./courses.zip"), "courses.zip")
            .then(function (res: any) {
                Log.trace('then:');
                console.log(res);
                console.log(res.body);
                expect(res.status).to.equal(204);
                // some assertions
                server.stop();
            })
            .catch(function (err: any) {
                Log.trace('catch:');
                console.log(err);
                // some assertions
                expect.fail();
                server.stop();
            });
    });

    it.only("PUT old 201", function () {
        server.start();
        return chai.request('http://localhost:4321')
            .put('/dataset/courses')
            .attach("body", fs.readFileSync("./courses.zip"), "courses.zip")
            .then(function (res: any) {
                Log.trace('then:');
                console.log(res);
                console.log(res.body);
                expect(res.status).to.equal(201);
                // some assertions
                server.stop();
            })
            .catch(function (err: any) {
                Log.trace('catch:');
                console.log(err);
                // some assertions
                expect.fail();
                server.stop();
            });
    });
    it.only("Post description rooms", function () {
        server.start();
        var q = {
            "WHERE":{
                "GT":{
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
        };
        return chai.request('http://localhost:4321')
            .post('/query')
            .send(q)
            .then(function (res: any) {
                Log.trace('then:');
                console.log(res.body);
                expect(res.status).to.equal(200);
                // some assertions
                server.stop();
            })
            .catch(function (err: any) {
                Log.trace('catch:');
                console.log(err);
                // some assertions
                expect.fail();
            });
    });
    it.only("Post description rooms 400", function () {
        server.start();
        var q = {
            "WHERE":{
                "GT":{
                    "courses_avg":"sds"
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
        };
        return chai.request('http://localhost:4321')
            .post('/query')
            .send(q)
            .then(function (res: any) {
                Log.trace('then:');
                console.log(res.body);
                expect.fail();
                // some assertions
                server.stop();
            })
            .catch(function (err: any) {
                Log.trace('catch:');
                expect(err.status).to.equal(400);
                // some assertions

            });
    });
    it.only("Post description rooms 424", function () {
        server.start();
        var q = {
            "WHERE":{
                "GT":{
                    "ty_avg":97
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
        };
        return chai.request('http://localhost:4321')
            .post('/query')
            .send(q)
            .then(function (res: any) {
                Log.trace('then:');
                console.log(res.body);
                expect.fail();
                // some assertions
                server.stop();
            })
            .catch(function (err: any) {
                Log.trace('catch:');
                expect(err.status).to.equal(424);
                // some assertions

            });
    });
    var fs = require("fs");
    it.only("del courses 204", function () {
        server.start();
        return chai.request('http://localhost:4321')
            .del('/dataset/courses')
            .then(function (res: any) {
                Log.trace('then:');
                console.log(res);
                console.log(res.body);
                expect(res.status).to.equal(204);
                // some assertions
                server.stop();
            })
            .catch(function (err: any) {
                Log.trace('catch:');
                console.log(err);
                // some assertions
                expect.fail();
            });
    });

    var fs = require("fs");
    it.only("del courses 404", function () {
        server.start();
        return chai.request('http://localhost:4321')
            .del('/dataset/courses')
            .then(function (res: any) {
                Log.trace('then:');
                console.log(res);
                console.log(res.body);
                expect.fail();
                // some assertions
                server.stop();
            })
            .catch(function (err: any) {
                Log.trace('catch:');
                console.log(err.response.body);
                expect(err.status).to.equal(404);
                // some assertions
            });
    });
    var fs = require("fs");
    it.only("empty 400 PUT", function () {
        server.start();
        return chai.request('http://localhost:4321')
            .put('/dataset/empty')
            .attach("body", fs.readFileSync("./empty.zip"), "empty.zip")
            .then(function (res: any) {
                Log.trace('then:');
                console.log(res);
                expect.fail();
                // some assertions
                server.stop();
            })
            .catch(function (err: any) {
                Log.trace('catch:');
                console.log(err.response.body);
                expect(err.status).to.equal(400);
                // some assertions
                server.stop();
            });
    });



    it("Should be able to echo", function () {
        let out = Server.performEcho('echo');
        Log.test(JSON.stringify(out));
        sanityCheck(out);
        expect(out.code).to.equal(200);
        expect(out.body).to.deep.equal({message: 'echo...echo'});
    });

    it("Should be able to echo silence", function () {
        let out = Server.performEcho('');
        Log.test(JSON.stringify(out));
        sanityCheck(out);
        expect(out.code).to.equal(200);
        expect(out.body).to.deep.equal({message: '...'});
    });

    it("Should be able to handle a missing echo message sensibly", function () {
        let out = Server.performEcho(undefined);
        Log.test(JSON.stringify(out));
        sanityCheck(out);
        expect(out.code).to.equal(400);
        expect(out.body).to.deep.equal({error: 'Message not provided'});
    });

    it("Should be able to handle a null echo message sensibly", function () {
        let out = Server.performEcho(null);
        Log.test(JSON.stringify(out));
        sanityCheck(out);
        expect(out.code).to.equal(400);
        expect(out.body).to.have.property('error');
        expect(out.body).to.deep.equal({error: 'Message not provided'});
    });

});
