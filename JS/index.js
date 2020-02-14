"use strict";

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.targetDate = targetDate;
    this.element = document.querySelector(selector);
    this.refs = {
      days: this.element.querySelector('span[data-value="days"]'),
      hours: this.element.querySelector('span[data-value="hours"]'),
      mins: this.element.querySelector('span[data-value="mins"]'),
      secs: this.element.querySelector('span[data-value="secs"]')
    };

    this.startTimer();
  }

  startTimer() {
    setInterval(() => {
      const currentTime = Date.now();
      let time = this.targetDate.getTime() - currentTime;
      if (time < 1) {
        time = 0;
        this.updateClockface(time);
        return;
      }
      // console.log(new Date(time))
      this.updateClockface(time);
    }, 1000);
  }

  updateClockface(value) {
    const days = this.pad(Math.floor(value / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((value % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((value % (1000 * 60)) / 1000));

    this.refs.days.innerText = days;
    this.refs.hours.innerText = hours;
    this.refs.mins.innerText = mins;
    this.refs.secs.innerText = secs;
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }
}

new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Feb 19, 2020")
});
