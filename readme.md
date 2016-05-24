#template for testing UI

- mocha
- chai
- selenium-webdriver

##instalation

```bash
npm install -g mocha

npm install
```

##Run testing

```bash
mocha index.js --opts firefox
```

###Structure

```
/index.js - start point of testing, also includes all tests, and libraries
/tests/ - folder contains tests packs
/tests/index.js - point includes all test cases folders in folder tests
/tests/{test_pack_name}/ - test cases folder
/tests/{test_pack_name}/index.js - point of test cases in this folder
/tests/{test_pack_name}/{test_case_name}.js - single test case
```

###Documentation

[selenium-webdriver fuctions](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/)
[chai webdriver api](http://chaijs.com/plugins/chai-webdriver/)
[chai assertions](http://chaijs.com/api/bdd/)
[mocha docs](https://mochajs.org/)