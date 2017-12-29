/**
 *  2016-01-05 DS: Added src/fonts/ and src/images/ folder
 */
module.exports = function(grunt) {

    var concatJSFiles = grunt.file.readJSON('concat.js.json');
    var concatCSSFiles = grunt.file.readJSON('concat.css.json');

    var package = grunt.file.readJSON('package.json');

    var webPath = 'web/';
    var cssPath = webPath + package.context + 'css/';
    var jsPath = webPath + package.context + 'js/';

    var site_id = 1;

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: '\r\n'
            },
            buildJS: {
                "src": concatJSFiles,
                "dest": jsPath + "javascript.js"
            },
            buildCSS: {
                "src": concatCSSFiles,
                "dest": cssPath + "stylesheet.css"
            }
        },
        copy:{
            main:{
                files:[
                    {
                        "expand": true,
                        "cwd": "vendor/jquery-ui/themes/ui-lightness/images/",
                        "src": ["**"],
                        "dest": cssPath + "images/"
                    },
                    {
                        "expand": true,
                        "cwd": "vendor/fancyBox/source/helpers/",
                        "src": ["**"],
                        "dest": cssPath + "helpers/"
                    },
                    {
                        "expand": true,
                        "cwd": "src/images/",
                        "src": ["**"],
                        "dest": webPath + "images/"
                    },
                    {
                        "expand": true,
                        "cwd": "src/fonts/",
                        "src": ["**"],
                        "dest": webPath + "fonts/"
                    },
                    {
                        "expand": true,
                        "cwd": "vendor/fancyBox/source/",
                        "src": ["*gif","*png"],
                        "dest": cssPath
                    },
                    {
                        "expand": true,
                        "cwd": "custom_modules/app/",
                        "src": ["index.html"],
                        "dest": webPath
                    },
                    {
                        "expand": true,
                        "cwd": "custom_modules/osw_templates/",
                        "src": ["**/*"],
                        "dest": webPath + 'osw_templates'
                    }
                ]
            },
            to_docker:{
                files :[
                    {
                        "expand": true,
                        "cwd": webPath,
                        "src": ["**/*/*"],
                        "dest": 'oswebengine/web/sites/' + site_id
                    }
                ]
            },
            osw_modules:{
                files:[
                    {
                        "expand": true,
                        "cwd": "custom_modules/osw/",
                        "src": ["**/*"],
                        "dest": webPath
                    }
                ]
            }
        },
        sass:{
            main:{
                options: {
                    trace: true,
                    style: 'expanded',
                    loadPath: ['src/scss/']
                },
                files: [{
                    expand: true,
                    cwd: 'src/scss/',
                    src: ['sites.scss'],
                    dest: 'temp/css/',
                    ext: '.css'
                }]
            }

        },
        watch: {
            less: {
                files: [
                    'src/scss/*.scss'
                ],
                tasks: ['sass','concat','copy:main','cssmin','minified'],
                options: {
                    spawn: false
                }
            },
            js: {
                files: [
                    'src/js/*.js'
                ],
                tasks: ['sass','concat','copy:main','cssmin','minified'],
                options: {
                    spawn: false
                }
            },
            modules: {
                files: [
                    'src/includes/**/*.php'
                ],
                tasks: ['copy:osw_modules'],
                options: {
                    spawn: false
                }
            }
        },
        cssmin: {
            files: {
                expand: true,
                cwd: cssPath,
                src: ['*.css', '!*.min.css', '!*.css.map', '!*.min.css.map'],
                dest: cssPath,
                ext: '.min.css'
            }
        },
        minified : {
            files: {
                src: [
                    jsPath + '*.js', '!' +jsPath +'*.min.js'
                ],
                dest: jsPath
            },
            options: {
                ext: '.min.js'

            }
        },
        criticalcss: {
            custom: {
                options: {
                    url: package.url,
                    width: 1200,
                    height: 900,
                    outputfile: cssPath + "critical.css",
                    filename: cssPath + "stylesheet.css", // Using path.resolve( path.join( ... ) ) is a good idea here
                    buffer: 800*1024,
                    ignoreConsole: false
                }
            }
        }
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');

    //grunt.loadNpmTasks('grunt-chokidar');
    //grunt.loadNpmTasks('grunt-contrib-cssmin');
    //grunt.loadNpmTasks('grunt-minified');
    //grunt.loadNpmTasks('grunt-criticalcss');

    //grunt.renameTask('chokidar', 'watch');

    // Default task(s).
    //grunt.registerTask('osw_modules', ['copy:osw_modules']);

    grunt.registerTask('default', ['sass','concat','copy:main']);

    //grunt.registerTask('dev', ['sass','concat','copy:main','copy:to_docker']);
};
