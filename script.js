// Menu
/*let contextMenu = document.querySelector(".context");

document.oncontextmenu = function (e) {
  e.preventDefault();
  contextMenu.style.top = e.offsetY + "px";
  contextMenu.style.left = e.offsetX + "px";
  contextMenu.classList.add("active");
};
document.onclick = () => {
  contextMenu.classList.remove("active");
};
*/

// ############# API #############
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "9b47162aa1msh50e75416f2bea09p155507jsna9a37c37a2b1",
    "X-RapidAPI-Host": "famous-quotes4.p.rapidapi.com",
  },
};

// ********* Categoary *********
let select = document.querySelector("#select");
let optionSelected = document.querySelector("select");
let quote = document.querySelector(".all");
let link = `https://famous-quotes4.p.rapidapi.com/random?category=${optionSelected.value}&count=2`;
let qcontent = "";
let spining = document.querySelector(".spin");
let btn = document.querySelector("#submit");

fetch("https://famous-quotes4.p.rapidapi.com/", options)
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    for (const i in response) {
      let category = response[i];
      let option = `<option value="${category}">${category}</option>`;
      select.innerHTML += option;
    }

    btn.addEventListener("click", function () {
      function spin() {
        spining.classList.add("active");
      }
      spin();
      setTimeout(function load() {
        // ************ Data ************
        fetch(
          `https://famous-quotes4.p.rapidapi.com/random?category=${optionSelected.value}&count=4`,
          options
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (result) {
            for (const i in result) {
              console.log(result);
              let text = result[i].text;
              let cate = result[i].category;
              let author = result[i].author;
              qcontent += `<div id="cont"><p class="mainText">${text}</p><div class="info"><h5 id="author">${author}</h5><h5 id="cate">${cate}</h5></div></div>`;
              quote.innerHTML = qcontent;
            }
          })
          .catch(function (err) {
            console.error(err);
          });
        spining.classList.remove("active");
      }, 3000);
    });
  })
  .catch((err) => console.error(err));
