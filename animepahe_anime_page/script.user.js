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
    function addToWatchList(self, data, animeId, animeTitle, totalEpisodes, parentNode) {

        data[animeId] = {"title": animeTitle, "totalEpisodes": totalEpisodes, "episodesWatched": 0, "status": "Watching"};
        alert("Added to watchlist!");
        localStorage.setItem("animepahe", JSON.stringify(data));

        // remove the add to list button and display status
        self.remove();
        displayStatusButtons(animeId, data[animeId], parentNode);
    }

    function increaseEpisodeCount(animeId) {
        data = JSON.parse(localStorage.getItem("animepahe"));
        data[animeId].episodesWatched = data[animeId].episodesWatched + 1;
        let episodeInput = document.querySelector("#episode-input");
        episodeInput.value = data[animeId].episodesWatched;
        localStorage.setItem("animepahe", JSON.stringify(data));
    }

    function displayStatusButtons(animeId, currentAnime, parentNode) {
        // Add watching status
        const statusText = document.createElement("div");
        statusText.textContent = currentAnime.status;
        statusText.style = "width: 250px; background-color: #d5015b; color: white; opacity: 0.9; padding: 5px; margin: 0 0 8px 240px; border: 1px solid #d5015b; border-radius: 10px;";
        parentNode.appendChild(statusText);

        // Create the input node
        const episodeParent = document.createElement("span");
        episodeParent.style = "padding: 5px;";
        const episodeInput = document.createElement("input");
        episodeInput.id = "episode-input";
        episodeInput.type = "text";
        episodeInput.name = "episode-input";
        episodeInput.value = currentAnime.episodesWatched;
        episodeInput.style = "width: 20%; background-color: black; color: white; padding: 0; margin: auto 5px; text-align: center; border: 1px solid white; border-radius: 10px;";


        const episodeTotal = document.createElement("span");
        episodeTotal.textContent = "/ " + episodeCount;


        const episodeIncrease = document.createElement("i");
        episodeIncrease.classList = "fa fa-plus-circle";
        episodeIncrease.style = "margin: auto 5px; cursor: pointer;";
        episodeIncrease.addEventListener("click", function(){ increaseEpisodeCount(animeId, currentAnime)});

        episodeParent.appendChild(episodeInput);
        episodeParent.appendChild(episodeTotal);
        episodeParent.appendChild(episodeIncrease);

        statusText.appendChild(episodeParent);

    }

    // Get the total episode count
    let episodeCountElem = document.querySelector("div.anime-info > p:nth-child(4)").innerText;
    if(!episodeCountElem.startsWith("Episodes")) {
        episodeCountElem = document.querySelector("div.anime-info > p:nth-child(3)").innerText;
    }
    const episodeCount = parseInt(episodeCountElem.slice(10));

    // Get the title
    const titleWrapper = document.querySelector("div.title-wrapper > h1 > span");
    const animeTitle = titleWrapper.innerText;

    // Get the myanimelist link
    const malLink = document.querySelector("p.external-links").lastElementChild.href;
    const animeId = malLink.split("/")[4];

    let parentNode = document.querySelector('div.title-wrapper');


    let data = localStorage.getItem("animepahe");
    if(data === null) {
        data = {};
        localStorage.setItem("animepahe", JSON.stringify(data));
    } else {
        data = JSON.parse(data);
    }

    let watchedEpisode = 0;

    if(Object.keys(data).find(e => e === animeId)) {

        let currentAnime = data[animeId];
        displayStatusButtons(animeId, currentAnime, parentNode);
        // displayRemoveButton(currentAnime, parentNode);

    } else {
        const addButton = document.createElement("button");
        addButton.textContent = "Add to list";
        addButton.style = "width: 250px; background-color: #d5015b; color: white; opacity: 0.9; padding: 5px; margin: 0 0 8px 240px; border: 1px solid #d5015b; border-radius: 10px;";
        addButton.addEventListener("click", function(){addToWatchList(addButton, data, animeId, animeTitle, episodeCount, parentNode)});
        parentNode.appendChild(addButton);
    }


})();