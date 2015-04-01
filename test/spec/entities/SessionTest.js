describe("User entity", function () {
    "use strict";

    var mockSessionResource, $httpBackend;

    beforeEach(angular.mock.module("bluelatex"));

    beforeEach(function () {
        angular.mock.inject(function ($injector) {
            $httpBackend = $injector.get("$httpBackend");
            mockSessionResource = $injector.get("Session");
        });
    });

    describe("login user", function () {
        it("should call logi", inject(function () {
            $httpBackend.expectPOST("api/session")
                .respond("true");

            mockSessionResource.login({
                username: "username",
                password: "password"
            });

            $httpBackend.flush();
        }));
    });

    describe("get user session", function () {
        it("should call login", inject(function () {
            $httpBackend.expectGET("api/session")
                .respond("true");

            mockSessionResource.get();

            $httpBackend.flush();
        }));
    });

    describe("lougout user", function () {
        it("should call logout", inject(function () {
            $httpBackend.expectDELETE("api/session")
                .respond("true");

            mockSessionResource.logout();

            $httpBackend.flush();
        }));
    });
});
