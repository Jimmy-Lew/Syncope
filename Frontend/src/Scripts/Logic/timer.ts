export const Timer = {
    update: (timeLeft : number) => Math.round((timeLeft - 0.1) * 10) / 10,
    run: true,
    timeLeft: 0,
    timeSubtracted: 0,
    start: function() : void {
        let timer = setInterval(() => {
            if (Timer.timeLeft % 1 == 0) console.log(Timer.timeLeft);
            Timer.timeLeft = Timer.update(Timer.timeLeft)
            if (!Timer.run) clearInterval(timer);
            if (Timer.timeLeft <= 0) clearInterval(timer);
        }, 100, Timer.timeLeft)
    },
    deduct: (deduction : number) => { Timer.timeLeft -= deduction; Timer.timeSubtracted += deduction; },
}