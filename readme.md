#Boilerplate for testing UI (Selenium, Mocha, Chai)

- mocha
- chai
- selenium-webdriver
- node.js

##Instalation

```bash
npm install
```

###Browser engines
For using different browsers please download them for your OS from this urls [selenium drivers](https://www.npmjs.com/package/selenium-webdriver) and put them in root of project (`operadriver`, `chromedriver`)

##Run testing

```bash
gulp #default firefox
gulp firefox
gulp chrome

#ie,opera,edge,safari

gulp chrome --speed 2000 
gulp chrome --speed 2000 -ww 1024
gulp chrome --speed 2000 -ww 1024 -wh 720
gulp chrome --speed 2000 -ww 1024 -wh 720 --show
gulp chrome --speed 2000 -ww 1024 -wh 720 --show --report

```

where `--speed 2000` in (ms) `--ww 1024` window width,  `--wh 720` window heigth, `--show` not close browser after test ends and `--report` open browser window with tests report after tests end;


###Structure

```bash
/index.js # - start point of testing, also includes all tests, and libraries
/tests/ # - folder contains tests
/tests/{test_case_name}.js # - single test case

/suites/ # - folder with has test suites
/suites/{test_suite_name}.js # - suite which run pack of test cases 
```


###Generator
```bash
node gen.js filename
```

it will create `/tests/{filename}.js`

###Parser
All source files of selenium should be contained in `/selenium_id_src`
All source files of selenium suites should be contained in `/selenium_id_suites`

files of seleniums source should be of format `HTML`

For parse all folsers use `gulp parse --all`;

For parse single file use `gulp parse --file {file_name}` in folder /selenium_id_src/ without file format (.html)

All parsed files would be contained in tests/ folder and would be called the same name like source file with low dash( `_` ) separator .js

###EXAMPLE of test
```js

'use strict';
module.exports = function(app) {
    var isEnabled = 1;

    if (isEnabled) {

        var chai = app.chai;
        var driver = app.driver;
        var until = app.until;
        var By = app.By;
        var waiter = app.waiter;
        var $ = app.$;
        var seq = app.seq;
        var cmd = require('../../wrappers/wrappers')(app);


        describe('Check the New Consignment data with all information', function() {
            this.timeout(20000);

            beforeEach(function() {

            });

            afterEach(function() {

            });

            before(function() {

            });

            after(function(done) {
               cmd.close().end(done);
            });


            it.only('- verifyElementPresent("css=h3.ng-binding")', function(done) {

                cmd.verifyElementPresent("css=h3.ng-binding").end(done);

            });


            it('- storeText("css=h3.ng-binding", "Consignment_Title")', function(done) {

                cmd.storeText("css=h3.ng-binding", "Consignment_Title").end(done);

            });


            it('- echo("This is New Consignment Title - ${Consignment_Title}")', function(done) {

                cmd.echo("This is New Consignment Title - ${Consignment_Title}").end(done);

            });


            it('- storeEval("storedVars[\'Consignment_Title\'].replace(\"Po/Consignments / \",\"\").replace(\" / View\",\"\")", "Consignment_Name")', function(done) {

                cmd.storeEval("storedVars[\'Consignment_Title\'].replace(\"Po/Consignments / \",\"\").replace(\" / View\",\"\")", "Consignment_Name").end(done);

            });


            it('- echo("This is Consignment Name - ${Consignment_Name}")', function(done) {

                cmd.echo("This is Consignment Name - ${Consignment_Name}").end(done);

            });


            it('- verifyText("css=div.col-md-6.ng-binding", "${Consignment_Supplier}")', function(done) {

                cmd.verifyText("css=div.col-md-6.ng-binding", "${Consignment_Supplier}").end(done);

            });
            })
        }
```



###Documentation

- [selenium-webdriver functions](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/)
- [chai webdriver api](http://chaijs.com/plugins/chai-webdriver/)
- [selenium drivers](https://www.npmjs.com/package/selenium-webdriver)
- [chai assertions](http://chaijs.com/api/bdd/)
- [mocha docs](https://mochajs.org/)