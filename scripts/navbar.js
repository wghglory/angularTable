/**
 * @author Guanghui Wang
 * @name addressbookApp.app
 * @date 2017-03-05 15:53:09
 * @description add "active" class for narbar clicked item
 */
'use strict';

{
    let navItems = document.querySelectorAll('.navbar-nav li');

    // bind click event for each nav items
    for (let i = 0, len = navItems.length; i < len; i++) {
        navItems[i].addEventListener('click', function() {
            // remove active class for all
            for (var i = 0, len = navItems.length; i < len; i++) {
                navItems[i].classList.remove('active');
            }
            // add active for clicked item
            this.classList.add('active');
        }, false);
    }
}
