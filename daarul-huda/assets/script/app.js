const btn = document.querySelector(".btn");
const listItem = [];

const nameInput = document.querySelectorAll(".name");
const passive = document.querySelector(".cta--passive");
const list = Array.from(nameInput);
const crewList = document.querySelector(".crew");

const sideBar = document.querySelector(".sidebar");
const user = [];
const operationTab = document.querySelectorAll(".operation__tab");
const modal = document.querySelector(".add-modal");
const operationContent = document.querySelectorAll(".operation__content");
const dots = document.querySelector(".dots");
const modalTemplate = document.querySelector(".modal-template");
const containerModal = document.querySelector(".modal");
const backdrop = document.querySelector(".backdrop");
const modalTempleteEl = document.querySelector(".modal__content");
const modalRing = document.querySelector(".lds-dual-ring");

class App {
  constructor() {
    modal.addEventListener("click", this._modalShow.bind(this));
    this._showObserveContent();
  }
  _modalShow(e) {
    const clicked = e.target.closest(".operation__tab--section");

    console.log(clicked);
    operationContent.forEach((cur) =>
      cur.classList.remove("operation__content--hidden")
    );

    containerModal.append(modalTempleteEl);
    setTimeout(() => {
      modalTempleteEl.classList.add("section--hidden");
      containerModal.append(
        document.querySelector(`.operation__content--${clicked.dataset.tab}`)
      );
    }, 2000);

    this._modalHandler();
    backdrop.addEventListener("click", this._hideBackdrop);

    containerModal.addEventListener("click", this._hideModal);
  }
  _modalHandler() {
    modalTemplate.classList.remove("hidden");
  }
  _hideBackdrop() {
    modalTemplate.classList.add("hidden");
    operationContent.forEach((cur) =>
      cur.classList.add("operation__content--hidden")
    );
  }
  _hideModal() {
    modalTemplate.classList.add("hidden");
    operationContent.forEach((cur) =>
      cur.classList.add("operation__content--hidden")
    );
  }

  _showObserveContent() {
    const observecontent = new IntersectionObserver(
      this._revealContent.bind(this),
      {
        root: null,
        threshold: 0,
      }
    );
    observecontent.observe(modal);
  }

  _revealContent(entries, observe) {
    const [entry] = entries;
    console.log(entry);
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    observe.unobserve(entry.target);
  }
}
const app = new App();

// rgb(255,255,255)
const random = (max, min) => Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;

dots.addEventListener("click", function (e) {
  document.body.style.backgroundColor = randomColor();
});

const searchInput = document.querySelector("#searchInput");
const operationIMg = document.querySelector(".operation__img");
// [operationTab.textContent].forEach((cur) => {
//   console.log(cur);
// });
searchInput.addEventListener("change", function (e) {
  const clicked = e.target.value;
  if (!clicked) return;
  console.log(clicked);
  list.filter((item) => {
    if (clicked === item) console.log(item);
  });
});

const render = () => {
  const addlist = document.querySelector(".productList");

  for (const item of listItem) {
    const product = document.createElement("li");
    product.classList.add("prodlist");
    product.textContent = item.info.userInput;
    addlist.append(product);
    console.log(product);
    console.log(addlist);
  }
};
const inputHandler = () => {
  const userInput = document.getElementById("title").value;
  if (userInput.trim() === "") {
    alert("please enter a word");
    return;
  }
  const list = {
    info: {
      userInput: userInput,
    },
  };
  listItem.push(list);
  console.log(listItem);
  render(list.userInput);
};
btn.addEventListener("click", inputHandler);
