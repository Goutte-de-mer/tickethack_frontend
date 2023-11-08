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
  
          <div class="bookBtn">Book</div>
        </div>
              `;
        }
      } else if (data.length == 0) {
        tripsContainer.querySelector("img").src = "./images/notfound.png";
        tripsContainer.querySelector("p").textContent = "No trip found";
      }
    });
}

searchBtn.addEventListener("click", getTrips);
