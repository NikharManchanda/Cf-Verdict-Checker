let finalStatus = document.querySelector("#final");
let update = document.getElementById("alt-name-final");

const handleSubmit2 = async (e) => {
  e.preventDefault();
  console.log(update.value);
  if (update.value != "") {
    let finalName=update.value;
    
    chrome.storage.sync.set({ "finalUsername" : finalName}, function () {
      console.log("Value is set to " + finalName);
    });
 
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { message: update.value });
    });
  }
};

finalStatus.addEventListener("submit", (e) => handleSubmit2(e));
