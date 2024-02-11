// ==UserScript==
// @name         AnimePahe Anime Manager
// @namespace    animepahe
// @version      1.0.1-test
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

        data[animeTitle] = {"totalEpisodes": totalEpisodes, "episodesWatched": 0, "status": "Watching"};
        alert("Added to watchlist!");
        localStorage.setItem("animepahe", JSON.stringify(data));
    }

    // Get the total episode count
    const episodeCountElem = document.querySelector("div.anime-info > p:nth-child(4)").innerText;
    const episodeCount = parseInt(episodeCountElem.slice(10));

    // Get the title
    const titleWrapper = document.querySelector("div.title-wrapper > h1 > span");
    const animeTitle = titleWrapper.innerText;

    // Add the Add to watchlist button to DOM
    const japaneseTitle = document.querySelector('h2.japanese');

    let data = localStorage.getItem("animepahe");
    if(data === null) {
        data = {};
        localStorage.setItem("animepahe", JSON.stringify(data));
    } else {
        data = JSON.parse(data);
    }

    let watchedEpisode = 0;
    
    if(Object.keys(data).find(e => e === animeTitle)) {

        let currentAnime = data[animeTitle];

        // Add watching status
        const statusText = document.createElement("span")
        statusText.textContent = currentAnime.status;
        statusText.style = "background-color: #d5015b; padding: 5px; margin: auto 10px; border: 1px solid #d5015b; border-radius: 10px;";
        japaneseTitle.appendChild(statusText);

        // Create the input node
        const episodeParent = document.createElement("span");
        const episodeInput = document.createElement("input");
        episodeInput.type = "text";
        episodeInput.name = "episode-input";
        episodeInput.value = currentAnime.episodesWatched;
        episodeInput.style = "width: 5%; background-color: black; color: white; padding: 0; margin: auto 5px; text-align: center; border: 1px solid white; border-radius: 10px;";

        
        const episodeTotal = document.createElement("span");
        episodeTotal.textContent = "/ " + episodeCount;


        const episodeIncrease = document.createElement("i");
        episodeIncrease.classList = "fa fa-plus-circle";
        episodeIncrease.style = "margin: auto 5px;";

        episodeParent.appendChild(episodeInput);
        episodeParent.appendChild(episodeTotal);
        episodeParent.appendChild(episodeIncrease);

        japaneseTitle.appendChild(episodeParent);

    } else {
        const addButton = document.createElement("button");
        addButton.textContent = "Add to list";
        addButton.style = "background-color: #d5015b; color: white; padding: 5px; margin: auto 10px; border: 1px solid #d5015b; border-radius: 10px;"; 
        addButton.addEventListener("click", function(){addToWatchList(data, animeTitle, episodeCount)});
        japaneseTitle.appendChild(addButton);
    }

    
})();