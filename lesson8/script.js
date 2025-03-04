let interval_id;

function initializeCountdown() {
    const main_container = document.getElementById("main-container");

    let h1 = document.createElement("h1");
    h1.innerText = "Graduation Countdown Timer";

    let countdown_display = document.createElement("p");
    countdown_display.id = "countdown-display";
    countdown_display.innerText = "Timer has not been started.";

    let button_one = document.createElement("button");
    button_one.innerText = "Start Countdown";
    button_one.id = "start-countdown";
    button_one.onclick = () => startCountdown();

    let button_two = document.createElement("button");
    button_two.innerText = "Stop Countdown";
    button_two.id = "stop-countdown";
    button_two.onclick = () => stopCountdown();

    let button_three = document.createElement("button");
    button_three.innerText = "Set Countdown to Zero";
    button_three.id = "zero-countdown";
    button_three.onclick = () => zeroCountdown();

    main_container.appendChild(h1);
    main_container.appendChild(countdown_display);
    main_container.appendChild(button_one);
    main_container.appendChild(button_two);
    main_container.appendChild(button_three);
}

function startCountdown() {
    const grad_date = new Date(2025, 7, 1);
    const countdown_display = document.getElementById("countdown-display");
    if (interval_id) {
        clearInterval(interval_id);
    }
    interval_id = setInterval(() => {
        const to_grad_date = grad_date - new Date();

        if (to_grad_date <= 0) {
            zeroCountdown();
        }

        // is there an easier way to do this??
        const days = Math.floor(to_grad_date / (1000 * 60 * 60 * 24));
        const hours = Math.floor((to_grad_date % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((to_grad_date % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((to_grad_date % (1000 * 60)) / 1000);

        countdown_display.innerText = `${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds until graduation!`;
    }, 1000);
}

function stopCountdown() {
    if (interval_id) {
        clearInterval(interval_id);
    }
}

// sets countdown to zero
function zeroCountdown() {
    const countdown_display = document.getElementById("countdown-display");
    if (interval_id) {
        clearInterval(interval_id);
    }
    countdown_display.innerText = "Congratulations!";
}

initializeCountdown();