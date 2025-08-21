export const getCounter = () => {
  let count = 0;
  const counter = document.querySelector(".counter");

  function updateCounter() {
    counter.textContent = count + "%";
    if (count < 100) {
      count++;
    }
  }

  let interval = setInterval(updateCounter, 20); // Adjust the interval duration for animation speed
  setTimeout(function () {
    clearInterval(interval);
  }, 18000);
};
