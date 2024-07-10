import data from "../data/data.json";

let favTours = [];

function showSlider() {
  let sliderItems = "";
  for (let i = 0; i < data.length; i++) {
    sliderItems += ` <div class="frame">
                        <div class="item" style="background-image: url(./img/slider/${data[i].cover})">
                        <div class="item-content">
                          <div class="content-heading">${data[i].title}</div>
                          <p class="item-text">${data[i].date}</p>
                          <p class="item-text">${data[i].price} грн</p>
                          <button class="favorites-button" id=${data[i].id}>Додати до обраного</button>
                          <button class="button">
                            <a href="./tours.html">Поїхали!</a>
                          </button>
                        </div>
                      </div>
                        </div>
                        `;

    document.querySelector(".owl-carousel").innerHTML = sliderItems;
  }
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 30,
    items: 2,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      992: {
        items: 2,
        nav: true,
      },
    },
  });
}

function addFavorites() {
  document
    .querySelector(".owl-carousel")
    .addEventListener("click", function (el) {
      let elementId = el.target.id;
      if (el.target.matches(".favorites-button")) {
        favTours.push(data.find((el) => el.id == elementId));
        localStorage.setItem("favTours", JSON.stringify(favTours));
      }
    });
}

function showFeedbackModal() {
  document.querySelector("body").innerHTML = `
    <div class="submit-booking">
    <div class="container">
      <button class="close-button">
      </button>
      <div class="submit-booking-content">
        <p>
          Дякуємо, що ви обрали<br />
          <span>Grofa Travel</span>
        </p>
        <p>Очікуйте дзінка від нашого менеджера</p>
      </div>
    </div>
  </div>
    `;
  document.querySelector(".close-button").onclick = () => {
    location.replace("./index.html");
  };
}

document.querySelector("body").addEventListener("submit", (el) => {
  if (el.target.matches(".question-form")) {
    showFeedbackModal();
  }
});
showSlider();
addFavorites();
