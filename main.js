const country = document.querySelector("#country");
const city = document.querySelector("#city");
const main = document.querySelector(".main");
const resultTame = document.querySelector(".result_time");
const nameNom = document.querySelector(".name_nom");
// const lokal1=JSON.parse(localStorage.getItem('select1_value'))
// const lokal2 = localStorage.getItem("select2_value");

const url = "http://167.71.202.51:8080/viloyat";
(async () => {
  const data = await fetch(url);
  const res = await data.json();
  localStorage.setItem("select1_value", res);
  countrySet(res);
  console.log(res);
})();

function countrySet(res) {
  // console.log(res);
  res.data.forEach((element) => {
    // console.log(element.cityHref);
    const option = document.createElement("option");
    option.textContent = element.cityName;
    option.setAttribute("value", element.cityHref);
    country.appendChild(option);
  });
}

country.addEventListener("change", (e) => {
  citySet(e.target.value);
});

const ID = "http://167.71.202.51:8080/viloyat/";
async function citySet(val) {
  console.log(val);
  const newData = await fetch(ID + val);
  const newRes = await newData.json();
  console.log(newRes);
  city.innerHTML = `<option selected disabled>shaharni tanlang </option>`;

  newRes.data.forEach((element) => {
    const option = document.createElement("option");
    option.textContent = element.cityName;
    option.setAttribute("value", element.cityHref);
    city.appendChild(option);
  });
}

city.addEventListener("change", (e) => {
  render(e.target.value);
});

const x = "http://167.71.202.51:8080/shahar/";
async function render(name) {
  // localStorage.setItem('select2_value',name)
  main.innerHTML = `
    <style>
    .lds-roller {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
      }
      .lds-roller div {
        animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        transform-origin: 40px 40px;
      }
      .lds-roller div:after {
        content: " ";
        display: block;
        position: absolute;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #fff;
        margin: -4px 0 0 -4px;
      }
      .lds-roller div:nth-child(1) {
        animation-delay: -0.036s;
      }
      .lds-roller div:nth-child(1):after {
        top: 63px;
        left: 63px;
      }
      .lds-roller div:nth-child(2) {
        animation-delay: -0.072s;
      }
      .lds-roller div:nth-child(2):after {
        top: 68px;
        left: 56px;
      }
      .lds-roller div:nth-child(3) {
        animation-delay: -0.108s;
      }
      .lds-roller div:nth-child(3):after {
        top: 71px;
        left: 48px;
      }
      .lds-roller div:nth-child(4) {
        animation-delay: -0.144s;
      }
      .lds-roller div:nth-child(4):after {
        top: 72px;
        left: 40px;
      }
      .lds-roller div:nth-child(5) {
        animation-delay: -0.18s;
      }
      .lds-roller div:nth-child(5):after {
        top: 71px;
        left: 32px;
      }
      .lds-roller div:nth-child(6) {
        animation-delay: -0.216s;
      }
      .lds-roller div:nth-child(6):after {
        top: 68px;
        left: 24px;
      }
      .lds-roller div:nth-child(7) {
        animation-delay: -0.252s;
      }
      .lds-roller div:nth-child(7):after {
        top: 63px;
        left: 17px;
      }
      .lds-roller div:nth-child(8) {
        animation-delay: -0.288s;
      }
      .lds-roller div:nth-child(8):after {
        top: 56px;
        left: 12px;
      }
      @keyframes lds-roller {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      .dis{
        display: none;
      }
    </style>
    <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    `;
  const respons = await fetch(x + name);
  const data = await respons.json();
  const loader = document.querySelector(".lds-roller");
  loader.classList.add("dis");
  console.log(data);
  let num = 0;
  data.forEach((elem) => {
    const box1 = document.createElement("div");
    box1.classList.add("box1");
    // ==
    const nowHours = new Date().getHours();
    const nowMinut = new Date().getMinutes();
    const date1 = new Date(
      `August 16, 2023 ${nowHours > 9 ? nowHours : "0" + nowHours}:${
        nowMinut > 9 ? nowMinut : "0" + nowMinut
      }:00`
    );
    const date2 = new Date(`August 16, 2023 ${elem.prayTime}:00`);
    // console.log(date1*1,date2*1,  (date2-date1)/1000/60/60);

    if (date2 < date1) {
      box1.classList.add("box2");

      // console.log((date2-date1)/1000/60);
    } else {
      num++;
      // console.log(num);
    }
    if (num == 1) {
      // console.log(elem.prayName);
      let times = 0;
      let prayH = elem.prayTime.split(":")[0];
      let prayM = elem.prayTime.split(":")[1];
      const inter = setInterval(function () {
        let h = new Date().getHours();
        let m = new Date().getMinutes();
        let s = new Date().getSeconds();
        times = prayH * 3600 + prayM * 60 - h * 3600 - m * 60 - s;
       
        resultTame.innerHTML=`${Math.floor(times / 3600)} : ${Math.floor(times / 60) % 60} : ${times % 60}`
        nameNom.textContent=`${elem.prayName}gacha qolgan vaqt`
        if (times < 1) {
          clearInterval(inter);
        }
      }, 100);
      box1.classList.add("box3");

      
    }
    // ===
    const hour = document.createElement("p");
    hour.textContent = elem.prayTime;
    hour.classList.add("hour");
    const text = document.createElement("p");
    text.textContent = elem.prayName;
    text.classList.add("text");
    box1.appendChild(hour);
    box1.appendChild(text);
    main.appendChild(box1);
  });
}

// console.log(d);
