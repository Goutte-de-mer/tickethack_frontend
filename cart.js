fetch("http://localhost:3000/bookings")
  .then((res) => res.json())
  .then((data) => {
    let bookingsContainer = document.querySelector("#cart .tripsDisplayed");
    let unpaidBookings = data.filter((el) => el.isPaid == false);
    let total = 0;
    if (unpaidBookings.length > 0) {
      bookingsContainer.innerHTML = "";
      for (let booking of unpaidBookings) {
        total += booking.trip.price;
        bookingsContainer.innerHTML += `
              <div class="trip">
                <div class="fieldsContainer">
                  <span class="departure-arrival">${booking.trip.departure} > ${
          booking.trip.arrival
        }</span>
                  <span class="hour">${new Date(booking.trip.date)
                    .getHours()
                    .toString()
                    .padStart(2, "0")}:${new Date(booking.trip.date)
          .getMinutes()
          .toString()
          .padStart(2, "0")}</span>
                  <span class="price">${booking.trip.price}€</span>
                </div>
        
                <div id="${booking.trip._id}" class="bookBtn">Book</div>
              </div>
              `;
      }
      let totalField = document.querySelector(".total");

      totalField.textContent = total;
    }
  });
