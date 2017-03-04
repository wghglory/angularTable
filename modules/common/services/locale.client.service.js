/**
 * @name addressbookApp.service:LocaleService
 * @description
 * # LocaleService
 * Service for setting/getting current locale
 */
angular.module('addressbookApp')
    .service('LocaleService', function($translate, LOCALES, $rootScope, tmhDynamicLocale) {
        'use strict';

        let localesObj = LOCALES.locales;
        /*{
            'zh': '中文',
            'en': 'English'
        }*/

        // locales and locales display names
        let _locales = Object.keys(localesObj);   //zh, en
        if (!_locales || _locales.length === 0) {
            console.error('There are no _locales provided');
        }
        let _localesDisplayNames = [];
        _locales.forEach((locale) => {
            _localesDisplayNames.push(localesObj[locale]);
        });

        let currentLocale = $translate.proposedLanguage(); // because of async loading

        // METHODS
        let checkLocaleIsValid = (locale) => {
            return _locales.indexOf(locale) !== -1;
        };

        let setLocale = (locale) => {
            if (!checkLocaleIsValid(locale)) {
                console.error('Locale name "' + locale + '" is invalid');
                return;
            }
            startLoadingAnimation();
            currentLocale = locale;  //zh, en
            $translate.use(locale);
        };

        /**
         * Stop application loading animation when translations are loaded
         */
        let $html = angular.element(document.querySelector('html'));
        const LOADING_CLASS = 'app-loading';

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
                return localesObj[currentLocale];  //中文 English
            },
            setLocaleByDisplayName: (localeDisplayName) => {
                setLocale(
                    _locales[
                        _localesDisplayNames.indexOf(localeDisplayName) // get locale index
                    ]
                );
            },
            getLocalesDisplayNames: () => {
                return _localesDisplayNames;  //中文 English
            }
        };
    });
