let interval_id;

function initialize_countdown() {
    const main_container = document.getElementById("main-container");

    let h1 = document.createElement("h1");
    h1.innerText = "Graduation Countdown Timer";

    let countdown_display = document.createElement("p");
    countdown_display.id = "countdown-display";
    countdown_display.innerText = "Timer has not been started.";

    let button_one = document.createElement("button");
    button_one.innerText = "Start Countdown";
    button_one.id = "start-countdown";
    button_one.onclick = () => start_countdown();

    let button_two = document.createElement("button");
    button_two.innerText = "Stop Countdown";
    button_two.id = "stop-countdown";
    button_two.onclick = () => stop_countdown();

    let button_three = document.createElement("button");
    button_three.innerText = "Set Countdown to Zero";
    button_three.id = "zero-countdown";
    button_three.onclick = () => zero_countdown();

    main_container.appendChild(h1);
    main_container.appendChild(countdown_display);
    main_container.appendChild(button_one);
    main_container.appendChild(button_two);
    main_container.appendChild(button_three);
}

function start_countdown() {
    const grad_date = new Date(2025, 7, 1);
    const countdown_display = document.getElementById("countdown-display");
    if (interval_id) {
        clearInterval(interval_id);
    }
    interval_id = setInterval(() => {
        const to_grad_date = grad_date - new Date();

        if (to_grad_date <= 0) {
            zero_countdown();
        }

        // is there an easier way to do this??
        const days = Math.floor(to_grad_date / (1000 * 60 * 60 * 24));
        const hours = Math.floor((to_grad_date % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((to_grad_date % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((to_grad_date % (1000 * 60)) / 1000);

        countdown_display.innerText = `${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds until graduation!`;
    }, 1000);
}

function stop_countdown() {
    if (interval_id) {
        clearInterval(interval_id);
    }
}

// sets countdown to zero
function zero_countdown() {
    const countdown_display = document.getElementById("countdown-display");
    if (interval_id) {
        clearInterval(interval_id);
    }

    //fetch_celebration_message_callback((message) => {
        //countdown_display.innerText = message;
    //});

    fetch_celebration_message_promise()
        .then((message) => {
            countdown_display.innerText = message;
        }).catch((error) => {
            console.error(error);
        })
}

function fetch_celebration_message_callback(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "celebrations.json", true);
    
    xhr.onload = function() {
        if (xhr.status === 200) {
            const celebrations = JSON.parse(xhr.responseText);
            const random_message = celebrations["messages"][Math.floor(Math.random() * celebrations["messages"].length)];
            callback(random_message);
        } else {
            console.error("Couldn't get celebrations.json file");
        }
    };
    
    xhr.onerror = function() {
        console.error("Error while making the xhr request");
    };
    
    xhr.send();
}

function fetch_celebration_message_promise() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "celebrations.json", true);
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                const celebrations = JSON.parse(xhr.responseText);
                const random_message = celebrations["messages"][Math.floor(Math.random() * celebrations["messages"].length)];
                resolve(random_message);
            } else {
                reject("Couldn't get the celebrations.json file");
            }
        };
        
        xhr.onerror = function() {
            reject("Error while making the xhr request");
        };
        
        xhr.send();
    });
}

initialize_countdown();