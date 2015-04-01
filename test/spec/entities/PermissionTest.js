describe("Permission entity", function () {
    "use strict";

    var mockPermissionResource, $httpBackend;

    beforeEach(angular.mock.module("bluelatex"));

    beforeEach(function () {
        angular.mock.inject(function ($injector) {
            $httpBackend = $injector.get("$httpBackend");
            mockPermissionResource = $injector.get("Permission");
        });
    });

    describe("get paper permissions", function () {
        it("should call getPermissions with id", inject(function () {
            $httpBackend.expectGET("api/papers/123/permissions")
                .respond({
                    "author": ["edit", "delete", "compile", "configure", "publish", "download", "read", "view", "comment", "chat", "fork", "change-phase"],
                    "reviewer": ["compile", "view", "comment"],
                    "guest": ["compile", "view"],
                    "other": [],
                    "anonymous": []
                });

            var result = mockPermissionResource.get({
                paperId: "123"
            });

            $httpBackend.flush();

            expect(result.author[0]).toEqual("edit");
        }));
    });

    describe("patch paper permissions", function () {
        it("should call patchPermissions with id", inject(function () {
            $httpBackend.expectPATCH("api/papers/123/permissions")
                .respond("true", {
                    "If-Match": "V2"
                });

            var result = mockPermissionResource.save({
                paperId: "123"
            }, {});

            $httpBackend.flush();

            expect(result["if-match"]).toEqual("V2");
        }));
    });

    describe("get user custom permissions", function () {
        it("should call getUser with id", inject(function () {
            $httpBackend.expectGET("api/users/username/permissions")
                .respond({
                    "public": {
                        "author": ["read", "write"],
                        "reviewer": ["read"],
                        "guest": [],
                        "other": [],
                        "anonymous": []
                    }
                });

            var result = mockPermissionResource.getCustomPermission({
                userId: "username"
            });

            $httpBackend.flush();

            expect(result.public.author[0]).toEqual("read");
        }));
    });

    describe("change user custom permissions", function () {
        it("should call getUser with id", inject(function () {
            $httpBackend.expectPATCH("api/users/username/permissions")
                .respond("true");

            var result = mockPermissionResource.saveCustomPermission({
                userId: "username"
            }, {});

            $httpBackend.flush();

            expect(result.response).toEqual(true);
        }));
    });
});
