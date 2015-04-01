describe("Role entity", function () {
    "use strict";

    var mockRoleResource, $httpBackend;

    beforeEach(angular.mock.module("bluelatex"));

    beforeEach(function () {
        angular.mock.inject(function ($injector) {
            $httpBackend = $injector.get("$httpBackend");
            mockRoleResource = $injector.get("Role");
        });
    });

    describe("get paper roles", function () {
        it("should call getRoles with id", inject(function () {
            $httpBackend.expectGET("api/papers/123/roles")
                .respond({
                    "authors": ["username"],
                    "reviewers": []
                });

            var result = mockRoleResource.get({
                paperId: "123"
            });

            $httpBackend.flush();

            expect(result.authors[0]).toEqual("username");
        }));
    });

    describe("patch paper roles", function () {
        it("should call save with id", inject(function () {
            $httpBackend.expectPATCH("api/papers/123/roles")
                .respond("true", {
                    "If-Match": "V2"
                });

            var result = mockRoleResource.save({
                paperId: "123"
            }, {

            });

            $httpBackend.flush();

            expect(result["if-match"]).toEqual("V2");
        }));
    });
});
