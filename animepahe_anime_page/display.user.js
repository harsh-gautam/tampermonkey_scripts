// ==UserScript==
// @name         AnimePahe Anime Displayer
// @namespace    http://tampermonkey.net/
// @version      2024-08-25
// @description  Show list of anime in watchlist on main screen
// @author       You
// @match        https://animepahe.ru
// @match        https://animepahe.ru/?page=*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @require      https://raw.githubusercontent.com/CoeJoder/waitForKeyElements.js/refs/heads/master/waitForKeyElements.js
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    const data = JSON.parse(localStorage.getItem("animepahe"));
    const IDs = Object.values(data).map(e => e.id)


    function addBox(){

        // Show green color on watching animes
        let animeList = document.querySelectorAll("div[data-id]");

        animeList.forEach(node => {
            let animeId = node.getAttribute('data-id');
            if(IDs.includes(animeId)) {
                node.style.border = "2px solid green";
            }
        })
    }
    
    waitForKeyElements ("div[data-id]", addBox, true);

})();