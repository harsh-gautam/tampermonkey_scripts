// ==UserScript==
// @name         AnimePahe Anime Displayer
// @namespace    http://tampermonkey.net/
// @version      2024-08-25
// @description  Show list of anime in watchlist on main screen
// @author       You
// @match        https://animepahe.ru
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let contentWrapper = document.querySelector(".content-wrapper");

    let trackerWrapper = document.createElement("div");
    trackerWrapper.setAttribute('tracker-wrapper');
    trackerWrapper.textContent = "Watch List"

    contentWrapper.appendChild(trackerWrapper);

})();