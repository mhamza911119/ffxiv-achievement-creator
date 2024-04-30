$(document).ready(function() {

    //declare variables
    const achievementsList = [];

    //function to append/display initial objects of array
    const displayAchievementsList = (achievement, achieveNum) => {
        $(`#achievementsListDiv`).append(`<li>${achievement.name}</li>`)
    }

    //access api endpoint, returns achievement of given number
    const getAchievements = (achievementNum) => {
        $.ajax({
            type: "GET",
            url: `https://ffxivcollect.com/api/achievements/${achievementNum}`,
            dataType: "json",
            success: function(result) {
                console.log(result);
                achievementsList.push(result);
                console.log(achievementsList);
                displayAchievementsList(result, achievementNum - 5);
                if (achievementNum < 14) { 
                    getAchievements(achievementNum + 1);
                }
                return(result);
            },
            error: function(xhr, status, error) {
                alert(
                    "Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText
                );
            },
        });
    };

    //called by default to fill the array with objects to start with, fills array with 10 achievements
    const fillArray = () => {
        getAchievements(5);
    }
    fillArray();

    //create achievement
    const createAchievement = () => {
        let createName = prompt("What will you name this achievement?:");
        let createDescription = prompt("What will this achievements description be?:");
        let createPoints = prompt("How many points will this achievement be worth? (Enter an integer between 0-100):");
        let createOwned = prompt("What percentage of people own this achievement? (Enter an integer between 0-100):");
        let newAchievement = {
            name: `${createName}`,
            description: `${createDescription}`,
            points: `${createPoints}`,
            owned: `${createOwned}%`
        };
        achievementsList.push(newAchievement);
        let $newItem = $(`<li style="display: none">${newAchievement.name}</li>`);
        $('#achievementsListDiv').append($newItem);
        //item creation animation
        $newItem.fadeIn();
    }

    //read achievement details
    const readAchievement = () => {
        let achievementToFind = prompt("Enter the full name of the achievement you would like to read:");
        let foundAchievement = achievementsList.find(achievement => achievement.name.toLowerCase() === achievementToFind.toLowerCase());
        if (foundAchievement) {
            // Display the details of the found achievement
            alert(`Details for ${foundAchievement.name}:  \nDescription: ${foundAchievement.description} \nPoints: ${foundAchievement.points} \nOwnership percentage: ${foundAchievement.owned}`);
        } else {
            alert("Achievement not found!");
        }
    }

    //update achievement details
    const updateAchievement = () => {
        let achievementToFind = prompt("Enter the full name of the achievement you would like to update:");
        let foundAchievement = achievementsList.find(achievement => achievement.name.toLowerCase() === achievementToFind.toLowerCase());
        if (foundAchievement){
            foundAchievement.name = prompt("Enter the updated name:");
            foundAchievement.description = prompt("Enter the updated description:");
            foundAchievement.points = parseInt(prompt("Enter the updated number of points (an integer between 0-100):"));
            foundAchievement.owned = `${parseInt(prompt("Enter the updated ownership rate (an integer between 0-100):"))}%`
            $(`#achievementsListDiv li:eq(${achievementsList.indexOf(foundAchievement)})`).text(`${foundAchievement.name}`);
        } else{
            alert("Achievement not found!");
        }
    }

    //delete achievement
    const deleteAchievement = () => {
        let achievementToFind = prompt("Enter the name of the achievement you would like to delete:");
        let foundIndex = achievementsList.findIndex(achievement => achievement.name.toLowerCase() === achievementToFind.toLowerCase());
        if (foundIndex !== -1){
            //item deletion animation
            $(`#achievementsListDiv li:eq(${foundIndex})`).fadeOut(function() {
                achievementsList.splice(foundIndex, 1);
                $(this).remove();
            });
        } else{
            alert("Achievement not found!");
        }
    }

    //event listener for the submit button
    $(document).on("click", "#submitButton", function() {
        const achievementAction = $("#achievementActionInput").val().toLowerCase();
        if(achievementAction == "c"){
            createAchievement();
        } else if(achievementAction == "r"){
            readAchievement();
        } else if(achievementAction == "u"){
            updateAchievement();
        } else if(achievementAction == "d"){
            deleteAchievement();
        } else {
            alert("Invalid action. Please enter 'C', 'R', 'U', or 'D'.");
        }
    });

});
