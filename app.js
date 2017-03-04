let app = angular.module('addressbookApp', [
        'ngCookies',
        'pascalprecht.translate',
        'tmh.dynamicLocale'
    ])
    .constant('DEBUG_MODE', /*DEBUG_MODE*/ true /*DEBUG_MODE*/ )
    .constant('LOCALES', {
        'locales': {
            'zh': '中文',
            'en': 'English'
        },
        'preferredLocale': 'en'
    })
    // Angular debug info
    .config(function($compileProvider, DEBUG_MODE) {
        if (!DEBUG_MODE) {
            $compileProvider.debugInfoEnabled(false); // disables AngularJS debug info
        }
    })
    // Angular Translate
    .config(function($translateProvider, DEBUG_MODE, LOCALES) {
        if (DEBUG_MODE) {
            $translateProvider.useMissingTranslationHandlerLog(); // warns about missing translates
        }

        $translateProvider.useStaticFilesLoader({
            prefix: 'resources/locale-',
            suffix: '.json'
        });

        $translateProvider.preferredLanguage(LOCALES.preferredLocale);
        $translateProvider.useLocalStorage();
    })
    // Angular Dynamic Locale
    .config(function(tmhDynamicLocaleProvider) {
        tmhDynamicLocaleProvider.localeLocationPattern('lib/angular-i18n/angular-locale_{{locale}}.js');
    });
