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
            $compileProvider.debugInfoEnabled(false); // disables AngularJS debug info
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
    .config(function(tmhDynamicLocaleProvider) {
        tmhDynamicLocaleProvider.localeLocationPattern('lib/angular-i18n/angular-locale_{{locale}}.js');
    });
