fetch("http://localhost:3000/bookings")
  .then((res) => res.json())
  .then((data) => {
    let bookingsContainer = document.querySelector(".container");
    let unpaidBookings = data.filter((el) => el.isPaid == false);
    for (let booking of unpaidBookings) {
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
  });
