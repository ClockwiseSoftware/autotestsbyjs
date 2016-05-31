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
gulp chrome --speed 2000 -w 1024
gulp chrome --speed 2000 -w 1024 -h 720

```

where `--speed 2000` in (ms) `-w 1024` window width and `-h 720` window heigth


###Structure

```bash
/index.js # - start point of testing, also includes all tests, and libraries
/tests/ # - folder contains tests packs
/tests/index.js # - point includes all test cases folders in folder tests
/tests/{test_pack_name}/ # - test cases folder
/tests/{test_pack_name}/index.js # - point of test cases in this folder
/tests/{test_pack_name}/{test_case_name}.js # - single test case
```


###Generator
```bash
node gen.js foldername filename
```

it will create `/tests/{foldername}/{filename}.js`

###Parser
All source files of seleniun should be contained in /selenium_id_src
also this folder could contatain sub folders of level 2

`/selenium_id_src/one`

`/selenium_id_src/two`

`/selenium_id_src/two/three` - <--- wrong --->

files of seleniums source should be format html

For parse all folsers use `gulp parse --all`;

For parse single file use `gulp parse --file {file_name}` in folder /selenium_id_src/ without file format (.html)

or

`gulp parse --file {file_name} --folder {folder_name}` in sub folder (`/selenium_id_src/{folder_name}`)

All parsed files would be contained in tests/ folder and if there are subfolder in sub folders `(/test/one/, /test/two/)` and would be called the same name like source file with low dash( `_` ) separator .js

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