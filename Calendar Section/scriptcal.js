$(document).ready(function () {
    // Initialize with the current day
    var currentDay = dayjs();
    updateCalendar(currentDay);

    // Button click event to go to the previous day
    $("#prevDayBtn").on("click", function () {
        currentDay = currentDay.subtract(1, 'day');
        updateCalendar(currentDay);
    });

    // Button click event to go to the next day
    $("#nextDayBtn").on("click", function () {
        currentDay = currentDay.add(1, 'day');
        updateCalendar(currentDay);
    });

    // Function to create time blocks for standard business hours
    function createTimeBlocks(day) {
        var container = $(".container");
        var currentTime = dayjs();

        // Display the current time
        $("#currentTime").text("Current Time: " + currentTime.format("h:mm A"));

        for (var hour = 7; hour <= 21; hour++) {
            var startTime = day.hour(hour).minute(0);
            var endTime = day.hour(hour + 1).minute(0);

            var timeBlock = $("<div>").addClass("time-block row");
            var hourColumn = $("<div>").addClass("hour col-md-1").text(startTime.format("hA"));
            var textArea = $("<textarea>").addClass("description col-md-10");

            // Color-code time blocks based on past, present, and future
            if (currentTime.isBefore(endTime)) {
                timeBlock.addClass(currentTime.isBefore(startTime) ? "future" : "present");
            } else {
                timeBlock.addClass("past");
            }

            var saveBtn = $("<button>").addClass("saveBtn col-md-1").html('<i class="fas fa-save"></i>');

            // Load events from local storage
            var savedEvent = localStorage.getItem("event-" + day.format("YYYY-MM-DD") + "-" + hour);
            if (savedEvent) {
                textArea.val(savedEvent);
            }

            // Save event to local storage when save button is clicked
            saveBtn.on("click", function () {
                var eventText = $(this).siblings("textarea").val();
                var eventHour = parseInt($(this).parent().index()) + 7; 

                localStorage.setItem("event-" + day.format("YYYY-MM-DD") + "-" + eventHour, eventText);
            });

            timeBlock.append(hourColumn, textArea, saveBtn);
            container.append(timeBlock);
        }
    }

    // Function to update the calendar for the specified day
    function updateCalendar(day) {
        // Display current day at the top of the calendar
        $("#currentDay").text(day.format("dddd, MMMM D"));

        // Clear existing time blocks
        $(".container").empty();

        // Create time blocks for the specified day
        createTimeBlocks(day);
    }

    // Update the current time every minute
    setInterval(function () {
        var currentTime = dayjs();
        $("#currentTime").text("Current Time: " + currentTime.format("h:mm A"));
        // Update time blocks based on current time
        updateCalendar(currentTime);
    }, 60000);
});

// var weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// $(document).ready(function () {
//     // Initialize with the current day
//     var currentDay = dayjs();
//     updateCalendar(currentDay);

//     // Button click event to go to the previous day
//     $("#prevDayBtn").on("click", function () {
//         currentDay = currentDay.subtract(1, 'day');
//         updateCalendar(currentDay)
//     });

//     // Button click event to go to the next day
//     $("#nextDayBtn").on("click", function () {
//         currentDay = currentDay.add(1, 'day');
//         updateCalendar(currentDay);
//     })
// });

// // Function to update the calendar for the specified day
// function updateCalendar(currentDay) {
//     // Display current day at the top of the calendar
//     $("#currentDay").text(currentDay.format("dddd, MMMM D"));

//     // Clear existing time blocks
//     $(".container").empty();

//     // Create weekday columns
//     createWeekdayColumns();

//     // Create time blocks for the specific day
//     createTimeBlocks(currentDay);

//     // call time function to display the time along the top
//     time();
// } console.log("this is the updated calendar, i think", updateCalendar)

// function createWeekdayColumns() {
//     var container = $(".container");
//     var weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

//     var column = $("<div>").addClass("column");

//     for (var i = 0; i < weekdays.length; i++) {
//         var weekdayColumn = $("<div>").addClass("weekday col-md-2").text(weekdays[i]);
//         column.append(weekdayColumn);
//     }

//     container.append(column);
// }
// // console.log("this is the CONTAINER???", weekdayColumn)

// // Function to create time blocks for standard business hours
// function createTimeBlocks(day) {
//     var container = $(".container");
//     var currentTime = dayjs();

//     // Display the current time
//     $("#currentTime").text("Current Time: " + currentTime.format("h:mm A"));

//     for (var hour = 7; hour <= 21; hour++) {
//         var startTime = dayjs().hour(hour).minute(0);
//         var endTime = dayjs().hour(hour + 1).minute(0);

//         var timeBlock = $("<div>").addClass("time-block row");
//         var timeRow = $("<div>").addClass("time-row");
//         var hourColumn = $("<div>").addClass("hour col-md-1").text(startTime.format("hA"));

//         hourColumn.append(timeBlock);
//         timeBlock.append(container);
//         // timeBlock.append(hourColumn);

//         for (var i = 0; i < 7; i++) {

//             var textArea = $("<textarea>").addClass("description col-md-10");
//             var saveBtn = $("<button>").addClass("saveBtn col-md-1").html('<i class="fas fa-save"></i>');

//             // Save event to local storage when save button is clicked
//             saveBtn.on("click", function () {
//                 var eventText = $(this).siblings("textarea").val();
//                 var eventHour = parseInt(hour) + 7;
//                 localStorage.setItem("event-" + day.format("YYYY-MM-DD") + "-" + eventHour, eventText);
//             });

//             var timeRow = $("<div>").addClass("time-row");
//             timeRow.append(timeBlock);
//             timeBlock.append(textArea, saveBtn);
//             container.append(timeBlock);

//         }

//     }
// }; console.log("Is this the time blocks", hourColumn)
// // function to update the calendar for the specific day




// // Update the current time every minute
// setInterval(function() {
//     var currentTime = dayjs();
//     $("#currentTime").text("Current Time: " + currentTime.format("h:mm A"));
//     updateCalendar(currentTime);
//     time();
//   }, 60000);

// function time() {
//     var currentTime = dayjs(); // display current time
//     document.getElementById("currentTime").textContent = "Current Time: " + currentTime.format("h:mm A");

//     var container = document.getElementById("container")
//     var timeRow = $("<div>").addClass("time-row");

//     for (var hour = 7; hour <= 21; hour++) {
//         var startTime = dayjs().hour(hour).minute(0);
//         var endTime = dayjs().hour(hour + 1).minute(0);

//         var timeBlock = document.createElement("div");
//         timeBlock.classList.add("time-block", "column");

//         var hourColumn = document.createElement("div");
//         hourColumn.classList.add("hour", "col-md-1");
//         hourColumn.textContent = startTime.format("hA");

//         timeBlock.appendChild(hourColumn);
//         container.appendChild(timeBlock);
//     }
// }
// console.log(" is this the time rn??", time)


// for (var i = 0; i <= weekdays.length; i++) {

//     var timeBlock = $("<div>").addClass("time-block row");
//     var hourColumn = $("<div>").addClass("hour col-md-1").text(weekdays[i]);
//     var textArea = $("<textarea>").addClass("description col-md-10");
//     var saveBtn = $("<button>").addClass("saveBtn col-md-1").html('<i class="fas fa-save"></i>');
// }


// // Save event to local storage when save button is clicked
// saveBtn.on("click", function () {
//     var eventText = $(this).siblings("textarea").val();
//     var eventHour = parseInt(i) + 7;

//     localStorage.setItem("event-" + day.format("YYYY-MM-DD") + "-" + eventHour, eventText);
// });
// timeBlock.append(hourColumn, textArea, saveBtn);
// container.append(timeBlock);