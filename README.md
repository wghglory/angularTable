# Address book Angularjs app

## My opinions:

#### Explain how to structure an UI project in MVC model with a simple example.

- if working with nodejs, UI project (this demo) can be placed into a folder call **"public"**
- css folder have all style files, including bootstrap, custom css(site.css in this case)
- modules folder has different modules, like department, employee, each of them may contains controllers, directives, filters, services, views, etc. Common module may be used by other modules
- my naming convention is module.client.controller.js, because it will be easier to distinguish from nodejs server controller, which I call it module.server.controller.js
- filters, directives folders are self-explanatory, views usually are for SPA implementation by angular routing
- lib contains all third-party libraries, which can be installed by bower. Some people call it scripts or bowerComponents
- app.js is used to config angularjs by injecting modules needed
- index.html is main page

Above is for a small or middle project by using horizontal architecture. For larger project, vertical architecture is better. It's also recommended to put css, images, scripts into a folder called "asset". If working with newest .net platform, these folders can be put into a folder called "www";

#### Explain how AngularJS directive is used, and give a couple of use cases

directive includes built-in directives and custom ones.

**built-in directives** like ng-app, ng-model, ng-if, ng-controller, are decorated on the html tag as attributes usually. They define the behavior of that html tag. The use cases can be found in index.html

**custom directives** are usually used when you want to create a reusable html markup. It's like a partial view in .net MVC framework. Below is an example and you can use it as `<myDir></myDiv>`. I also created LanguageSelectDirective under modules/common/directives

```javascript
let app = angular.module('app', []);
//creating custom directive syntax
app.directive("myDir", function() {
    return {
        restrict: "E", //define directive type like E = element, A = attribute, C = class, M = comment
        scope: { //create a new child scope or an isolate scope
            title: '@' //@ reads the attribute value,
            //= provides two-way binding,
            //& works with functions
        },
        template: "<ul><li>{{name}}<li></ul>", // define HTML markup
        templateUrl: 'mytemplate.html', //path to the template, used by the directive replace: true | false, // replace original markup with template yes/no transclude: true | false, // copy original HTML content yes/no
        controller: function(scope) { //define controller, associated with the directive
        },
        link: function(scope, element, attrs, controller) { //define function, used for DOM manipulation
        }
    }
});
```

#### Explain how AngularJS scope is defined, and give a couple of use cases

$scope is a JavaScript object which is used for communication between controller and view. Basically, $scope binds a view (DOM element) to the model and functions defined in a controller.

The $rootScope is the top-most scope. An app can have only one $rootScope which will be shared among all the components of an app. Hence it acts like a global variable. All other $scopes are children of the $rootScope.

You can find I use scope in this demo. Below is a very brief example.

```JavaScript
let app = angular.module('demo', []);
app.controller("myController", function($scope) {
    $scope.name = 'Guanghui';
});
```
so in the view, you can use {{name}} or ng-model="name" to achieve 2-way bindings.

#### How to achieve internalization or localization?

To be honest, I never implement an app with internalization although I ever heard angular has i18n and l10n for this purpose. Localization, from my understanding, is to use local symbols. e.g. $ is US currency while ￥ is for China. This can be achieved by introducing **angular-locale_zh.js**.

Internalization, here I mean shifting between English and Chinese, needs resources for both of them, and I just learnt that we can use angular-translate to do it.

## Instruction and Features

1. Assume using core angular, no angular-ui-grid for filtering, editing, etc
2. **Add**: add button will add a blank row. After typing anything, assume clicking "Save" will save new record
3. **Save**: Save modified record and save new record
4. Double click cellphone cell, edit that row; double click that cell in that row again, quit edit mode
5. Double click cellphone cell and then double click cellphone in another row => quitting edit mode of previous row and enable edit for current row
6. select all checkboxes/none and multi-delete

There are some small places that can be optimized but I think it's enough for a demo.
