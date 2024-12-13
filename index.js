const advice_Text = document.getElementById("advice_Message");
const generateAdvice = document.getElementById("Gen_Advice");
const loader = document.getElementById("loadAfter");
loader.style.display = "none"

// async function name(params) {

// }

const fetchData = async () => {
  try {
    loader.style.display = "block";
    advice_Text.innerHTML = "";
    const res_URL = await fetch("https://api.adviceslip.com/advice");
    if (!res_URL.ok) {
      const error_Message = `Error fetching data: ${res_URL.status}`;
      throw new Error(error_Message);
    }
    const data = await res_URL.json();
    // console.log(data)
    const retreieve = data.slip.advice;
    console.log(retreieve);
    advice_Text.innerHTML = `"${retreieve}"`;
    const store_data = localStorage.setItem("advice", retreieve);
    console.log(localStorage.getItem("advice"));
  } catch (error) {
    advice_Text.innerHTML = error.message;
    console.log(error);
  }
  finally{
    loader.style.display = "none"
  }
};

generateAdvice.addEventListener("click", fetchData);

const refresh_Non = () => {
  const get_data = localStorage.getItem("advice");
  if (get_data) {
    advice_Text.innerHTML = get_data;
  }
};

window.addEventListener("DOMContentLoaded", refresh_Non);
