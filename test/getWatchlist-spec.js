var assert = require('assert');
var should = require('should');

describe("A Feature",function(){
    describe("A Scenario",function(){
       it("should return elements when present",function(){
           [].length.should.be.greaterThan(0);
       });
    });
});