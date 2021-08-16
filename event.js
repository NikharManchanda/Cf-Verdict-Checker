let formStatus = document.querySelector("#status");
let updateTextTo = document.getElementById("alt-name-status");

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(updateTextTo.value);
  if (updateTextTo.value != "") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { message: updateTextTo.value });
    });
  }
};

formStatus.addEventListener("submit", (e) => handleSubmit(e));
