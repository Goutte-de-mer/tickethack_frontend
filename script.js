let searchBtn = document.getElementById("searchBtn");

function getTrips() {
  let departure = document.querySelector("#departureInput").value;
  let arrival = document.querySelector("#arrivalInput").value;
  let date = document.querySelector("#date").value;
  const tripsContainer = document.querySelector(".tripsContainer");

  fetch(`http://localhost:3000/trips/${departure}/${arrival}/${date}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) {
        tripsContainer.classList.toggle("flex");
        tripsContainer.innerHTML = "";
        for (let trip of data) {
          tripsContainer.innerHTML += `
          <div class="trip">
          <div class="fieldsContainer">
            <span class="departure-arrival">${trip.departure} > ${
            trip.arrival
          }</span>
            <span class="hour">${new Date(trip.date)
              .getHours()
              .toString()
              .padStart(2, "0")}:${new Date(trip.date)
            .getMinutes()
            .toString()
            .padStart(2, "0")}</span>
            <span class="price">${trip.price}€</span>
          </div>
  
          <div id="${trip._id}" class="bookBtn">Book</div>
        </div>
              `;
        }
        addEventListenerToBookBtns();
      } else if (data.length == 0) {
        tripsContainer.classList.add("flex");
        tripsContainer.querySelector("img").src = "./images/notfound.png";
        tripsContainer.querySelector("p").textContent = "No trip found";
      }
    });
}

function bookTrip() {
  let tripId = this.id;

  const trip = {
    trip: tripId,
    isPaid: false,
  };

  fetch("http://localhost:3000/bookings/book", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(trip),
  }).then(window.location.assign("./cart.html"));
}

function addEventListenerToBookBtns() {
  let bookBtns = document.querySelectorAll(".bookBtn");
  for (let btn of bookBtns) {
    btn.addEventListener("click", bookTrip);
  }
}

// EVENT LISTENERS

searchBtn.addEventListener("click", getTrips);
