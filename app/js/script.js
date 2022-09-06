"use strict";

const month = document.querySelector(".current-month");
const day = document.querySelector(".current-day");
const date = document.querySelector(".current-date");
const year = document.querySelector(".current-year");
const arrowLeft = document.getElementById("arrow-left");
const arrowRight = document.getElementById("arrow-right");
//let counter = 0;

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

const allMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November",
    "December"];

const allDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const allDaysInOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const removeSpacingClass = function () {
    const arrSpacing = document.getElementsByClassName("toggle-spacing");
    for (let i = 0; i < arrSpacing.length; i++) {
        arrSpacing[i].classList.remove("spacing");
    }
};

const addSpacingClass = function () {
    const arrSpacing = document.getElementsByClassName("toggle-spacing");
    for (let i = 0; i < arrSpacing.length; i++) {
        arrSpacing[i].classList.add("spacing");
    }
};

let getDaysOfMonth = function (year, month) {
    // console.log(new Date(currentYear, currentMonth + 1, 0).getDate());
    return new Date(year, month + 1, 0).getDate();
}

let startDayOfMonth = function (year, month) {
    return allDays[new Date(year, month, 1).getDay()];
};

const startDayIndex = function (year, month) {
    return allDaysInOrder.indexOf(startDayOfMonth(year, month));
};

let endDayOfMonth = function (year, month) {
    return allDays[new Date(year, month, getDaysOfMonth(year, month)).getDay()];
};

const endDayIndex = function (year, month) {
    return allDaysInOrder.indexOf(endDayOfMonth(year, month));
};
//console.log(endDayIndex(currentYear, currentMonth));

const showEmptyDaysOfMonthStart = function (year, month) {
    for (let j = 0; j < startDayIndex(year, month); j++) {
        let elementBlanc = document.createElement("div");
        elementBlanc.className = "blanc child-flex";
        elementBlanc.textContent = "x ";
        document.getElementById("dates").appendChild(elementBlanc);
    }
}

const showEmptyDaysOfMonthEnd = function (year, month) {
    for (let k = endDayIndex(year, month); k < 6; k++) {
        let elementBlanc = document.createElement("div");
        elementBlanc.className = "blanc child-flex";
        elementBlanc.textContent = "x ";
        document.getElementById("dates").appendChild(elementBlanc);
    }
}

const selectedDay = function (curYear, curMonth) {
    if (month) {
        month.textContent = allMonths[curMonth];
    }
    if (day) {
        day.textContent = allDays[new Date().getDay()];
    }
    if (date) {
        date.textContent = new Date().getDate();
    }
    if (year) {
        year.textContent = curYear;
    }
};

// month.textContent = allMonths[currentMonth];
// day.textContent = allDays[new Date().getDay()];
// date.textContent = new Date().getDate();
// year.textContent = currentYear;

selectedDay(currentYear, currentMonth);

//const getCurrentDate = function(){}

const dayOne = new Date(currentYear, currentMonth, 1);

const firstDay = allDays[dayOne.getDay()];

getDaysOfMonth(currentYear, currentMonth);

const daysOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

function getAllDaysOfMonth(currentYear, currentMonth) {
    for (let i = 1; i <= getDaysOfMonth(currentYear, currentMonth); i++) {
        // console.log(new Date(currentYear, currentMonth, i));
        // console.log(new Date(currentYear, currentMonth, i).getDay());
        // console.log(new Date(currentYear, currentMonth, i).getDate());
        // console.log(allDays[new Date(currentYear, currentMonth, i).getDay()]);
        let element = document.createElement("div");
        element.className = "table-data child-flex";
        element.textContent = new Date(currentYear, currentMonth, i).getDate();
        if (element.textContent === new Date().getDate().toString() && currentMonth === new Date().getMonth() &&
            currentYear === new Date().getFullYear()) {
            element.classList.add("today");
        }
        element.addEventListener("click", function () {
            addSpacingClass();
            let elements = document.getElementsByClassName("selected");
            if (elements.length > 0) {
                for (let j = 0; j < elements.length; j++) {
                    elements[j].classList.remove("selected");
                };
            };
            element.classList.add("selected");
            let whichDate = element.textContent;
            date.textContent = whichDate;
            let whichDay = allDays[new Date(currentYear, currentMonth, Number(whichDate)).getDay()];
            day.textContent = whichDay;
        })
        document.getElementById("dates").appendChild(element);
    }
}

const renderCalendar = function (year, month) {
    const calendar = document.getElementById("dates");
    if (calendar) {
        calendar.innerHTML = "";
        showEmptyDaysOfMonthStart(year, month);
        getAllDaysOfMonth(year, month);
        showEmptyDaysOfMonthEnd(year, month);
    }
}

renderCalendar(currentYear, currentMonth);

if (arrowLeft) {
    arrowLeft.addEventListener("click", function (e) {
        e.preventDefault();
        currentMonth--;
        if (currentMonth < 0) {
            currentYear--;
            currentMonth = 11;
        }
        console.log(currentMonth);
        renderCalendar(currentYear, currentMonth);
        selectedDay(currentYear, currentMonth);
        day.textContent = "";
        date.textContent = "";
        removeSpacingClass();
    });
}

if (arrowRight) {
    arrowRight.addEventListener("click", function (e) {
        e.preventDefault();
        currentMonth++;
        if (currentMonth > 11) {
            currentYear++;
            currentMonth = 0;
        }
        console.log(currentMonth);
        renderCalendar(currentYear, currentMonth);
        selectedDay(currentYear, currentMonth);
        day.textContent = "";
        date.textContent = "";
        removeSpacingClass();
    });
}

const createAnElement = function (tag, context, arrayOfClasses) {
    const el = document.createElement(tag.toString());
    el.textContent = context;
    el.classList.add(...arrayOfClasses);
    plantDataOutput.appendChild(el);
}

const responseData = document.getElementById("response");
const inputPlant = document.getElementById("input-plant");
const submitPlant = document.getElementById("submit-search");
const aToZButton = document.getElementById("a-to-z");
const searchDiv = document.getElementById("main-search");
const alphabeticSearchDiv = document.getElementById("alphabetic-search");
const plantDataOutput = document.getElementById("plant-output");
// const originalInputPlantInfo = `<h2 class="main-text">Search the plant you want and get smart tips!</h2>
//     <button class="main-text btn-a-z" id = "a-to-z" >Search Alphabetically </button>
// <input class="main-text" id="input-plant" type="text" placeholder="Enter the plant" />
// <input class="main-text submit-plant" id="submit-search" type="submit" value="Search!"/>`;

const searchAlphabetically = function () {
    if (aToZButton) {
        aToZButton.addEventListener("click", function () {
            plantDataOutput.style.visibility = "hidden";
            responseData.textContent = "";
            searchDiv.style.display = "none";
            const alphabet = "abcdefghijklmnopqrstuvwxyz";
            for (let i = 0; i < alphabet.length; i++) {
                //console.log(alphabet[i]);
                let element = document.createElement("button");
                element.textContent = alphabet[i];
                element.classList.add("a-to-z-btns");
                alphabeticSearchDiv.appendChild(element);
                element.addEventListener("click", function () {
                    responseData.textContent = "";
                    plantsWithSameFirstLetter(alphabet[i]);
                })
            }
            const button = document.createElement("button");
            button.classList.add("go-back");
            button.textContent = "Go back";
            alphabeticSearchDiv.appendChild(button);
            button.addEventListener("click", function () {
                // searchDiv.innerHTML = originalInputPlantInfo;
                searchDiv.style.display = "block";
                alphabeticSearchDiv.innerHTML = "";
                responseData.innerHTML = "";
                plantDataOutput.style.visibility = "hidden";
            });
        })
    }
};
searchAlphabetically();

const plantsWithSameFirstLetter = function (letter) {
    let json = fetch("../../files/plantInfo.json").
        then(response => response.json()).
        then(obj => {
            let lenghtOfData = obj.data.length;
            let arrayOfPlants = [];
            for (let i = 0; i < lenghtOfData; i++) {
                let firstLetter = obj.data[i].name[0].toLowerCase();
                if (firstLetter === letter) {
                    let divPlants = document.createElement("div");
                    divPlants.className = "plants";
                    divPlants.id = `${obj.data[i].name}`;
                    divPlants.textContent = obj.data[i].name;
                    // responseData.innerHTML += `<div class="plants" id="${obj.data[i].name}">${obj.data[i].name}</div> `;
                    responseData.appendChild(divPlants);
                    // console.log(arrayOfPlants);
                    arrayOfPlants.push(`${obj.data[i].name}`);
                    console.log(document.getElementById(obj.data[i].name));
                    divPlants.addEventListener("click", function () {
                        console.log(arrayOfPlants);
                        const plantName = createAnElement("div", obj.data[i].name, ["plant-name-output"]);
                        // let plantName = document.createElement("div");
                        // plantName.textContent = obj.data[i].name;
                        // plantName.className = "plant-name-output";
                        // plantDataOutput.appendChild(plantName);
                        let plantImg = document.createElement("img");
                        let plantImgContainer = document.createElement("div");
                        plantImgContainer.className = "photo plant-photo-output";
                        plantImg.setAttribute("src", `${obj.data[i].photo}`);
                        plantDataOutput.appendChild(plantImgContainer);
                        plantImgContainer.appendChild(plantImg);
                        if (obj.data[i].watering) {
                            let plantWater = document.createElement("div");
                            let plantWaterSpan = document.createElement("span");
                            plantWater.textContent = "Watering: ";
                            plantWaterSpan.textContent = obj.data[i].watering;
                            plantWater.className = "plant-header-output";
                            plantWaterSpan.className = "text-plant-info";
                            plantDataOutput.appendChild(plantWater);
                            plantWater.appendChild(plantWaterSpan);
                        }
                        if (obj.data[i].description) {
                            let plantDesc = document.createElement("div");
                            let plantDescSpan = document.createElement("span");
                            plantDesc.textContent = "Description: ";
                            plantDescSpan.textContent = obj.data[i].description;
                            plantDesc.className = "plant-header-output";
                            plantDescSpan.className = "text-plant-info";
                            plantDataOutput.appendChild(plantDesc);
                            plantDesc.appendChild(plantDescSpan);
                        }
                        if (obj.data[i].soil) {
                            let plantSoil = document.createElement("div");
                            let plantSoilSpan = document.createElement("span");
                            plantSoil.textContent = "Soil: ";
                            plantSoilSpan.textContent = obj.data[i].soil;
                            plantSoil.className = "plant-header-output";
                            plantSoilSpan.className = "text-plant-info";
                            plantDataOutput.appendChild(plantSoil);
                            plantSoil.appendChild(plantSoilSpan);
                        }
                        if (obj.data[i].climate) {
                            let plantClimate = document.createElement("div");
                            let plantClimateSpan = document.createElement("span");
                            plantClimate.textContent = "Climate: ";
                            plantClimateSpan.textContent = obj.data[i].climate;
                            plantClimate.className = "plant-header-output";
                            plantClimateSpan.className = "text-plant-info";
                            plantDataOutput.appendChild(plantClimate);
                            plantClimate.appendChild(plantClimateSpan);
                        }
                        if (obj.data[i].height) {
                            let plantHeight = document.createElement("div");
                            let plantHeightSpan = document.createElement("span");
                            plantHeight.textContent = "Height: ";
                            plantHeightSpan.textContent = obj.data[i].height;
                            plantHeight.className = "plant-header-output";
                            plantHeightSpan.className = "text-plant-info";
                            plantDataOutput.appendChild(plantHeight);
                            plantHeight.appendChild(plantHeightSpan);
                        }
                        if (obj.data[i].utilization) {
                            let plantUtil = document.createElement("div");
                            let plantUtilSpan = document.createElement("span");
                            plantUtil.textContent = "Utilities: ";
                            plantUtilSpan.textContent = obj.data[i].utilization;
                            plantUtil.className = "plant-header-output";
                            plantUtilSpan.className = "text-plant-info";
                            plantDataOutput.appendChild(plantUtil);
                            plantUtil.appendChild(plantUtilSpan);
                        }
                        if (obj.data[i].sowing_time) {
                            let plantSow = document.createElement("div");
                            let plantSowSpan = document.createElement("span");
                            plantSow.textContent = "Sowing: ";
                            plantSowSpan.textContent = obj.data[i].sowing_time;
                            plantSow.className = "plant-header-output";
                            plantSowSpan.className = "text-plant-info";
                            plantDataOutput.appendChild(plantSow);
                            plantSow.appendChild(plantSowSpan);
                        }
                        if (obj.data[i].harvest_time) {
                            let plantHarvest = document.createElement("div");
                            let plantHarvestSpan = document.createElement("span");
                            plantHarvest.textContent = "Harvesting: ";
                            plantHarvestSpan.textContent = obj.data[i].harvest_time;
                            plantHarvest.className = "plant-header-output";
                            plantHarvestSpan.className = "text-plant-info";
                            plantDataOutput.appendChild(plantHarvest);
                            plantHarvest.appendChild(plantHarvestSpan);
                        }

                        plantDataOutput.style.visibility = "visible";
                        // responseData.innerHTML += `<div>${obj.data[i].name}</div>
                        //         <img class="photo" src="${obj.data[i].photo}"/>
                        //         <div>${obj.data[i].type}</div><div>${obj.data[i].description}</div>
                        //         <div>${obj.data[i].soil}</div><div>${obj.data[i].climate}</div>
                        //         <div>${obj.data[i].height}</div><div>${obj.data[i].utilization}</div>
                        //         <div>${obj.data[i].sowing_time}</div><div>${obj.data[i].harvest_time}</div>`;
                    });
                };
            }
        });
}

const searchForPlantName = function () {
    let json = fetch("../../files/plantInfo.json").
        then(response => response.json()).
        then(obj => {
            let lenghtOfData = obj.data.length;

            const retrievePlant = function () {
                let found = false;
                let text = inputPlant.value.toLowerCase();
                for (let i = 0; i < lenghtOfData; i++) {
                    if (obj.data[i].name.toLowerCase() === text) {
                        let plantName = document.createElement("div");
                        plantName.textContent = obj.data[i].name;
                        plantName.className = "plant-name-output";
                        plantDataOutput.appendChild(plantName);
                        let plantImg = document.createElement("img");
                        let plantImgContainer = document.createElement("div");
                        plantImgContainer.className = "photo plant-photo-output";
                        plantImg.setAttribute("src", `${obj.data[i].photo}`);
                        plantDataOutput.appendChild(plantImgContainer);
                        plantImgContainer.appendChild(plantImg);
                        if (obj.data[i].watering) {
                            let plantWater = document.createElement("div");
                            let plantWaterSpan = document.createElement("span");
                            plantWater.textContent = "Watering: ";
                            plantWaterSpan.textContent = obj.data[i].watering;
                            plantWater.className = "plant-header-output";
                            plantWaterSpan.className = "text-plant-info";
                            plantDataOutput.appendChild(plantWater);
                            plantWater.appendChild(plantWaterSpan);
                        }
                        if (obj.data[i].description) {
                            let plantDesc = document.createElement("div");
                            let plantDescSpan = document.createElement("span");
                            plantDesc.textContent = "Description: ";
                            plantDescSpan.textContent = obj.data[i].description;
                            plantDesc.className = "plant-header-output";
                            plantDescSpan.className = "text-plant-info";
                            plantDataOutput.appendChild(plantDesc);
                            plantDesc.appendChild(plantDescSpan);
                        }
                        if (obj.data[i].soil) {
                            let plantSoil = document.createElement("div");
                            let plantSoilSpan = document.createElement("span");
                            plantSoil.textContent = "Soil: ";
                            plantSoilSpan.textContent = obj.data[i].soil;
                            plantSoil.className = "plant-header-output";
                            plantSoilSpan.className = "text-plant-info";
                            plantDataOutput.appendChild(plantSoil);
                            plantSoil.appendChild(plantSoilSpan);
                        }
                        if (obj.data[i].climate) {
                            let plantClimate = document.createElement("div");
                            let plantClimateSpan = document.createElement("span");
                            plantClimate.textContent = "Climate: ";
                            plantClimateSpan.textContent = obj.data[i].climate;
                            plantClimate.className = "plant-header-output";
                            plantClimateSpan.className = "text-plant-info";
                            plantDataOutput.appendChild(plantClimate);
                            plantClimate.appendChild(plantClimateSpan);
                        }
                        if (obj.data[i].height) {
                            let plantHeight = document.createElement("div");
                            let plantHeightSpan = document.createElement("span");
                            plantHeight.textContent = "Height: ";
                            plantHeightSpan.textContent = obj.data[i].height;
                            plantHeight.className = "plant-header-output";
                            plantHeightSpan.className = "text-plant-info";
                            plantDataOutput.appendChild(plantHeight);
                            plantHeight.appendChild(plantHeightSpan);
                        }
                        if (obj.data[i].utilization) {
                            let plantUtil = document.createElement("div");
                            let plantUtilSpan = document.createElement("span");
                            plantUtil.textContent = "Utilities: ";
                            plantUtilSpan.textContent = obj.data[i].utilization;
                            plantUtil.className = "plant-header-output";
                            plantUtilSpan.className = "text-plant-info";
                            plantDataOutput.appendChild(plantUtil);
                            plantUtil.appendChild(plantUtilSpan);
                        }
                        if (obj.data[i].sowing_time) {
                            let plantSow = document.createElement("div");
                            let plantSowSpan = document.createElement("span");
                            plantSow.textContent = "Sowing: ";
                            plantSowSpan.textContent = obj.data[i].sowing_time;
                            plantSow.className = "plant-header-output";
                            plantSowSpan.className = "text-plant-info";
                            plantDataOutput.appendChild(plantSow);
                            plantSow.appendChild(plantSowSpan);
                        }
                        if (obj.data[i].harvest_time) {
                            let plantHarvest = document.createElement("div");
                            let plantHarvestSpan = document.createElement("span");
                            plantHarvest.textContent = "Harvesting: ";
                            plantHarvestSpan.textContent = obj.data[i].harvest_time;
                            plantHarvest.className = "plant-header-output";
                            plantHarvestSpan.className = "text-plant-info";
                            plantDataOutput.appendChild(plantHarvest);
                            plantHarvest.appendChild(plantHarvestSpan);
                        }

                        // plantDataOutput.innerHTML = `<div class="plant-name-output">${array.data[j].name}</div>
                        // <div class="plant-photo-output"><img src="${array.data[j].photo}"/></div>
                        // ${array.data[j].watering && '<div class="plant-header-output">Watering: <span class="text-plant-info">' + array.data[j].watering + '</span></div>'}
                        // ${array.data[j].description && '<div class="plant-header-output">Description: <span class="text-plant-info">' + array.data[j].description + '</span></div>'}
                        // ${array.data[j].soil && '<div class="plant-header-output">Soil:  <span class="text-plant-info">' + array.data[j].soil + '</span></div>'}
                        // ${array.data[j].climate && '<div class="plant-header-output">Climate: <span class="text-plant-info">' + array.data[j].climate + '</span></div>'}
                        // ${array.data[j].height && '<div class="plant-header-output">Height: <span class="text-plant-info">' + array.data[j].height + '</span></div>'}
                        // ${array.data[j].utilization && '<div class="plant-header-output">Utilities: <span class="text-plant-info">' + array.data[j].utilization + '</span></div>'}
                        // ${array.data[j].sowing_time && '<div class="plant-header-output">Sowing: <span class="text-plant-info">' + array.data[j].sowing_time + '</span></div>'}
                        // ${array.data[j].harvest_time && '<div class="plant-header-output">Harvesting: <span class="text-plant-info">' + array.data[j].harvest_time + '</span></div>'}`;
                        plantDataOutput.style.visibility = "visible";
                        found = true;
                        responseData.classList.remove("warning");
                    }
                }
                if (!found) {
                    responseData.textContent = "Sorry we could not find plant with this name";
                    responseData.classList.add("warning");
                }
            }

            if (inputPlant) {
                submitPlant.addEventListener("click", retrievePlant);
                inputPlant.addEventListener("keydown", function (e) {
                    if (e.code === "Enter") {
                        retrievePlant();
                    }
                });
            }
        });
}

searchForPlantName();

