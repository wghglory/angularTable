/**
 * @name Addressbook.directive:LanguageSelectDirective
 * @description
 * # LanguageSelectDirective
 * Directive to append language select and set its view and behavior
 */
angular.module('addressbookApp')
    .directive('ngTranslateLanguageSelect', (LocaleService) => {
        'use strict';

        return {
            restrict: 'A',
            replace: true,
            template: `<div class="language-select" ng-if="visible">
                            <label>
                                {{"directives.language-select.Language" | translate}}:
                                <select ng-model="currentLocaleDisplayName" ng-options="localesDisplayName for localesDisplayName in localesDisplayNames" ng-change="changeLanguage(currentLocaleDisplayName)">
                                </select>
                            </label>
                      </div>`,
            controller: ($scope) => {
                $scope.currentLocaleDisplayName = LocaleService.getLocaleDisplayName();
                $scope.localesDisplayNames = LocaleService.getLocalesDisplayNames();
                $scope.visible = $scope.localesDisplayNames && $scope.localesDisplayNames.length > 1;

                $scope.changeLanguage = (lang) => {
                    LocaleService.setLocaleByDisplayName(lang);  //中文 English
                    $scope.$emit('reloadDataEvent', lang); // when changing language, employeeController reloads data
                };
            }
        };
    });
