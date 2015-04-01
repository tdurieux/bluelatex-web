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

module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        bower: {
            install: {
                options: {
                    copy: false
                }
            },
        },
        eslint: {
            target: ["app/**/*.js", "test/spec/**/*.js"],
            options: {
                node: true,
                jasmine: true,
            }
        },
        karma: {
            unit: {
                configFile: 'test/config/karma.conf.js'
            }
        },
        injector: {
            task: {
                options: {
                    ignorePath: "dist",
                    min: true
                },
                files: {
                    "index.html": [
                        "bower.json",
                        "dist/assets/css/*.css",
                        "dist/assets/js/BlueLatex.js",
                        "dist/assets/js/templates.js",
                        "dist/assets/js/BlueLatex-*.js"
                    ]
                }
            },
            test: {
                files: {
                    'test/config/karma.conf.js': [
                        "bower.json",
                        "dist/assets/js/BlueLatex.js",
                        "dist/assets/js/templates.js",
                        "dist/assets/js/BlueLatex-*.js"
                    ]
                },
                options: {
                    starttag: '/** tagstart */',
                    endtag: '/** tagend */',
                    devDependencies: true,
                    transform: function (filepath, index, length) {
                        return "\"." + filepath + "\",";
                    }
                }
            }
        },
        less: {
            production: {
                options: {
                    paths: ["assets/less"],
                    plugins: [
                        new(require("less-plugin-autoprefix"))({
                            browsers: ["last 2 versions"]
                        }),
                        new(require("less-plugin-clean-css"))()
                    ],
                },
                files: {
                    "dist/assets/css/css.css": "assets/less/css.less"
                }
            }
        },
        ngtemplates: {
            app: {
                src: "app/**/*.html",
                dest: "dist/assets/js/templates.js",
                options: {
                    module: "bluelatex",
                    htmlmin: {
                        collapseWhitespace: true,
                        collapseBooleanAttributes: true
                    }
                }
            }
        },
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ";"
            },
            dist: {
                files: {
                    "dist/assets/js/<%= pkg.name %>.js": "app/*.js",
                    "dist/assets/js/<%= pkg.name %>-core.js": "app/core/**/*.js",
                    "dist/assets/js/<%= pkg.name %>-shared.js": "app/shared/**/*.js",
                    "dist/assets/js/<%= pkg.name %>-components.js": "app/components/**/*.js"
                }
            }
        },
        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: "/*! <%= pkg.name %> <%= grunt.template.today(\"dd-mm-yyyy\") %> */\n",
                compress: true,
                sourceMap: true
            },
            dist: {
                files: [{
                    expand: true,
                    src: "dist/assets/js/*.js",
                    dest: ""
                }]
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src: ["assets/img/**"],
                        dest: "dist/"
                    },
                    {
                        expand: true,
                        src: ["assets/css/**"],
                        dest: "dist/"
                    },
                    {
                        expand: true,
                        src: ["i18n/**"],
                        dest: "dist/"
                    },
                    {
                        expand: true,
                        src: ["index.html"],
                        dest: "dist/"
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks("grunt-eslint");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-bower-task");
    grunt.loadNpmTasks("grunt-injector");
    grunt.loadNpmTasks("grunt-karma");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-htmlmin");
    grunt.loadNpmTasks("grunt-angular-templates");

    grunt.registerTask("default", ["eslint", "bower", "concat", "uglify", "ngtemplates", "less", "injector", "copy", "karma"]);
};