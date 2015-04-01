/*
 * This file is part of the \BlueLaTeX project.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var module = angular.module("bluelatex");

module.factory("User", [
    "$resource",
    "CONFIG",
    function ($resource, CONFIG) {
        "use strict";

        return $resource(CONFIG.apiPrefix + "/users/:userId", null, {
            "get": {
                url: CONFIG.apiPrefix + "/users/:userId/info"
            },
            "create": {
                method: "POST",
                url: CONFIG.apiPrefix + "/users/:userId"
            },
            "save": {
                method: "PATCH",
                url: CONFIG.apiPrefix + "/users/:userId/info"
            },
            "resetPassword": {
                url: CONFIG.apiPrefix + "/users/:userId/reset"
            },
            "changePassword": {
                method: "POST",
                url: CONFIG.apiPrefix + "/users/:userId/reset"
            }
        });
    }
]);
