// ==UserScript==
// @name         AnimePahe Anime Manager
// @namespace    http://tampermonkey.net/
// @version      2024-02-07
// @description  try to take over the world!
// @author       You
// @match        https://animepahe.ru/anime/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    function addToWatchList() {
        const episodeCountElem = document.querySelector("div.anime-info > p:nth-child(4)").innerText;
        const episodeCount = parseInt(episodeCountElem.slice(10));

        const titleWrapper = document.querySelector("div.title-wrapper > h1 > span");
        const animeTitle = titleWrapper.innerText;

        let data = localStorage.getItem("animepahe");

        if(data === undefined || data === null) {
            data = {};
            data[animeTitle] = {"totalEpisodes": episodeCount};
            alert("Added to watchlist!");
        } else {
            data = JSON.parse(data);
            if (Object.keys(data).find(e => e === animeTitle)) {
                alert("Already Watching!");
            } else {
                data[animeTitle] = {"totalEpisodes": episodeCount};
                alert("Added to watchlist!");
            }
        }

        localStorage.setItem("animepahe", JSON.stringify(data));
    }

    const modal = ``


    const japaneseTitle = document.querySelector('h2.japanese');
    const node = document.createElement("button");
    node.textContent = "+Add to watchlist";
    node.style.backgroundColor = "red";
    node.style.marginLeft = "10px";
    node.style.padding = "5px";
    node.addEventListener("click", addToWatchList);

    japaneseTitle.appendChild(node);
    // titleWrapper.innerHTML = titleWrapper.innerHTML + "<span><button>Click Me!</button></span>";
})();