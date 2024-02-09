// ==UserScript==
// @name         AnimePahe Anime Manager
// @namespace    animepahe
// @version      2024-02-07 V1
// @description  try to take over the world!
// @author       Harsh
// @match        https://animepahe.ru/anime/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    function addToWatchList(data, animeTitle, totalEpisodes) {

        if(data === undefined || data === null) {
            data = {};
            data[animeTitle] = {"totalEpisodes": episodeCount, "status": "Watching"};
            alert("Added to watchlist!");
        } else {
            data = JSON.parse(data);
            if (Object.keys(data).find(e => e === animeTitle)) {
                alert("Already Watching!");
            } else {
                data[animeTitle] = {"totalEpisodes": episodeCount, "status": "Watching"};
                alert("Added to watchlist!");
            }
        }

        localStorage.setItem("animepahe", JSON.stringify(data));
    }

    let data = localStorage.getItem("animepahe");

    // Get the total episode count
    const episodeCountElem = document.querySelector("div.anime-info > p:nth-child(4)").innerText;
    const episodeCount = parseInt(episodeCountElem.slice(10));

    // Get the title
    const titleWrapper = document.querySelector("div.title-wrapper > h1 > span");
    const animeTitle = titleWrapper.innerText;

    // Add the Add to watchlist button to DOM
    const japaneseTitle = document.querySelector('h2.japanese');
    const addNode = document.createElement("button");
    addNode.textContent = "+Add to watchlist";
    addNode.style.backgroundColor = "red";
    addNode.style.marginLeft = "10px";
    addNode.style.padding = "5px";

    // Create the input node
    const episodeParent = document.createElement("div");
    const episodeInput = document.createElement("input");
    episodeInput.type = "text";
    episodeInput.name = "episode-input";

    const episodeTotal = document.createElement("span");
    episodeTotal.textContent = "/" + episodeCount;

    const episodeIncrease = document.createElement("i");
    episodeIncrease.classList = ['fa-solid', 'fa-circel-plus'];

    episodeParent.appendChild(episodeInput);
    episodeParent.appendChild(episodeTotal);
    episodeParent.appendChild(episodeIncrease);

    addNode.addEventListener("click", function(){addToWatchList(data, animeTitle, totalEpisodes)});

    japaneseTitle.appendChild(addNode);
    japaneseTitle.appendChild(episodeParent);
    
})();