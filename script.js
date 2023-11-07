let searchBtn = document.getElementById("searchBtn");

function getTrips() {
  let departure = document.querySelector(".departureField").value;
  let arrival = document.querySelector(".arrivalField").value;
  let date = document.querySelector(".dateField").value;
  const tripsContainer = document.querySelector(".tripsContainer");

  fetch(`http://localhost:3000/trips/${departure}/${arrival}/${date}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) {
        for (let trip of data) {
          tripsContainer.innerHTML += `
              <div>
                  <span class="departure">${trip.departure}</span> > <span class="arrival">${trip.arrival}</span>
                  <span class="price">${trip.price}</span>
                  <div id="bookBtn">Book</div>
              </div>
              `;
        }
      }
    });
}

searchBtn.addEventListener("click", getTrips);
