/**
 * @author Guanghui Wang
 * @name addressbookApp.app
 * @date 2017-03-02 16:03:09 
 * @description angular configuration and bootstrap, injecting all services needed
 */

let app = angular.module('addressbookApp', [
        'ngCookies',
        'ngSanitize',
        'pascalprecht.translate',
        'tmh.dynamicLocale',
        'ngAnimate'
    ])
    .constant('DEBUG_MODE', true)
    .constant('LOCALES', {
        'locales': {
            'zh': '中文',
            'en': 'English'
        },
        'preferredLocale': 'en'
    })
    // Angular debug info
    .config(($compileProvider, DEBUG_MODE) => {
        if (!DEBUG_MODE) {
            $compileProvider.debugInfoEnabled(false); // disable AngularJS debug info
        }
    })
    // Angular Translate
    .config(($translateProvider, DEBUG_MODE, LOCALES) => {
        if (DEBUG_MODE) {
            $translateProvider.useMissingTranslationHandlerLog(); // warns about missing translates
        }

        $translateProvider.useStaticFilesLoader({
            prefix: 'resources/locale-',
            suffix: '.json'
        });

        // $translateProvider.useSanitizeValueStrategy('sanitize');
        $translateProvider.useSanitizeValueStrategy(null);
        $translateProvider.preferredLanguage(LOCALES.preferredLocale);
        $translateProvider.useLocalStorage();
    })
    // Angular Dynamic Locale
    .config(tmhDynamicLocaleProvider => {
        tmhDynamicLocaleProvider.localeLocationPattern('lib/angular-i18n/angular-locale_{{locale}}.js');
    });
