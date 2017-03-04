/**
 * @name addressbookApp.factory:LocaleService
 * @description
 * # LocaleService
 * Service for setting/getting current locale
 */
angular.module('addressbookApp')
    .service('LocaleService', function($translate, LOCALES, $rootScope, tmhDynamicLocale) {
        'use strict';

        let localesObj = LOCALES.locales;

        // locales and locales display names
        let _LOCALES = Object.keys(localesObj);
        if (!_LOCALES || _LOCALES.length === 0) {
            console.error('There are no _LOCALES provided');
        }
        let _LOCALES_DISPLAY_NAMES = [];
        _LOCALES.forEach((locale) => {
            _LOCALES_DISPLAY_NAMES.push(localesObj[locale]);
        });

        let currentLocale = $translate.proposedLanguage(); // because of async loading

        // METHODS
        let checkLocaleIsValid = (locale) => {
            return _LOCALES.indexOf(locale) !== -1;
        };

        let setLocale = (locale) => {
            if (!checkLocaleIsValid(locale)) {
                console.error('Locale name "' + locale + '" is invalid');
                return;
            }
            startLoadingAnimation();
            currentLocale = locale;
            $translate.use(locale);
        };

        /**
         * Stop application loading animation when translations are loaded
         */
        let $html = angular.element(document);
        console.log($html)
        let LOADING_CLASS = 'app-loading';

        function startLoadingAnimation() {
            $html.addClass(LOADING_CLASS);
        }

        function stopLoadingAnimation() {
            $html.removeClass(LOADING_CLASS);
        }

        // EVENTS
        $rootScope.$on('$translateChangeSuccess', (event, data) => {
            document.documentElement.setAttribute('lang', data.language); // sets "lang" attribute to html

            tmhDynamicLocale.set(data.language.toLowerCase().replace(/_/g, '-')); // load Angular locale
        });

        $rootScope.$on('$localeChangeSuccess', () => {
            stopLoadingAnimation();
        });

        return {
            getLocaleDisplayName: () => {
                return localesObj[currentLocale];
            },
            setLocaleByDisplayName: (localeDisplayName) => {
                setLocale(
                    _LOCALES[
                        _LOCALES_DISPLAY_NAMES.indexOf(localeDisplayName) // get locale index
                    ]
                );
            },
            getLocalesDisplayNames: () => {
                return _LOCALES_DISPLAY_NAMES;
            }
        };
    });
