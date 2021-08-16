const api = "https://codeforces.com/api/contest.status?contestId=";
// const errors = document.querySelector(".errors");
const loading = document.querySelector("#loading");
// const accName = document.querySelector(".acc-name");
// const status = document.querySelector(".status");
const results = document.querySelector(".result-container");
results.style.display = "none";
loading.style.display = "none";
// errors.textContent = "  ";
// grab the form
const form = document.querySelector(".form-data");
// grab the UserName
const username = document.querySelector(".username");

let currentTab = "";
let problemIndex = "";
let contestId = "";
let pathName = "";
let comment = "";
let urlArr = [];
// Finding the Url of the Current Page
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  currentTab = tabs[0].url;
  pathName = currentTab;
  urlArr = pathName.split("/");
  let check=urlArr.includes("problem");
  if(!check){
    document.getElementById("not").style.display = "none";
  }
  else{
    document.getElementById("final-status").style.display = "none";
  }
  //Finding ContestId && ProblemIndex
  if (urlArr[3] == "contest" || urlArr[3] == "gym") {
    contestId = urlArr[4];
  } else {
    contestId = urlArr[urlArr.length - 2];
  }
  problemIndex = urlArr[urlArr.length - 1];
  console.log(problemIndex);
  // declare a method to search status by Username && ContestId && problemIndex
  const searchForAccount = async (accountName) => {
    results.innerHTML = "";
    loading.style.display = "block";
    //errors.textContent = "";
    let usrArr = accountName.split(",");
    for (let j = 0; j < usrArr.length; j++) {
      try {
        const currAccount = usrArr[j];
        const data = await fetch(`${api}${contestId}&handle=${currAccount}`);
        const response = await data.json();
        console.log(response);
        loading.style.display = "none";
        results.style.display = "block";
        if (response.status == "FAILED") {
          comment = response.comment;
        }
        const res = response.result;
        let flag = 0;
        let otherVerdict = [];
        function onlyUnique(value, index, self) {
          return self.indexOf(value) === index;
        }
        //

        let finalVerdict = "";
        for (let i = 0; i < res.length; i++) {
          console.log(res[i]);
          if (res[i].problem.index == problemIndex) {
            console.log(res[i].verdict);
            if (res[i].verdict == "OK") {
              console.log("OK");
              flag = 2;
              finalVerdict = "Accepted";
              let newUsr = document.createElement("p");
              let strong1 = document.createElement("strong");
              let cstrong1 = document.createTextNode("Username: ");
              strong1.appendChild(cstrong1);
              newUsr.appendChild(strong1);
              let span1 = document.createElement("span");
              let cspan1 = document.createTextNode(`${currAccount}`);
              span1.appendChild(cspan1);
              newUsr.appendChild(span1);
              results.appendChild(newUsr);
              let newStatus = document.createElement("p");
              let strong2 = document.createElement("strong");
              let cstrong2 = document.createTextNode("Verdict: ");
              strong2.appendChild(cstrong2);
              newStatus.appendChild(strong2);
              let span2 = document.createElement("span");
              let cspan2 = document.createTextNode(`${finalVerdict}`);
              span2.appendChild(cspan2);
              span2.style.color = "green";
              newStatus.appendChild(span2);
              results.appendChild(newStatus);
              break;
            } else {
              flag = 1;
              res[i].verdict = res[i].verdict.replaceAll("_", " ");
              otherVerdict.push(
                " " +
                  res[i].verdict[0] +
                  res[i].verdict.slice(1).toLowerCase() +
                  " "
              );
            }
          }
        }
        var uniqueVerdict = otherVerdict.filter(onlyUnique);
        if (flag == 0) {
          finalVerdict = "Not Attempted";
          let newUsr = document.createElement("p");
          let strong1 = document.createElement("strong");
          let cstrong1 = document.createTextNode("Username: ");
          strong1.appendChild(cstrong1);
          newUsr.appendChild(strong1);
          let span1 = document.createElement("span");
          let cspan1 = document.createTextNode(`${currAccount}`);
          span1.appendChild(cspan1);
          newUsr.appendChild(span1);
          results.appendChild(newUsr);
          let newStatus = document.createElement("p");
          let strong2 = document.createElement("strong");
          let cstrong2 = document.createTextNode("Verdict: ");
          strong2.appendChild(cstrong2);
          newStatus.appendChild(strong2);
          let span2 = document.createElement("span");
          let cspan2 = document.createTextNode(`${finalVerdict}`);
          span2.appendChild(cspan2);
          span2.style.color = "	#ff0000";
          newStatus.appendChild(span2);
          results.appendChild(newStatus);
        } else if (flag == 1) {
          //   status.textContent = uniqueVerdict;
          let newUsr = document.createElement("p");
          let strong1 = document.createElement("strong");
          let cstrong1 = document.createTextNode("Username: ");
          strong1.appendChild(cstrong1);
          newUsr.appendChild(strong1);
          let span1 = document.createElement("span");
          let cspan1 = document.createTextNode(`${currAccount}`);
          span1.appendChild(cspan1);
          newUsr.appendChild(span1);
          results.appendChild(newUsr);
          let newStatus = document.createElement("p");
          let strong2 = document.createElement("strong");
          let cstrong2 = document.createTextNode("Verdict: ");
          strong2.appendChild(cstrong2);
          newStatus.appendChild(strong2);
          let span2 = document.createElement("span");
          let cspan2 = document.createTextNode(`${uniqueVerdict}`);
          span2.appendChild(cspan2);
          span2.style.color = "	#ff0000";
          newStatus.appendChild(span2);
          results.appendChild(newStatus);
        }
      } catch (error) {
        loading.style.display = "none";
        results.style.display = "block";
        let fidx = comment.indexOf(" ");
        let commentArr = comment.slice(fidx + 1);
        const currAccount = usrArr[j];
        let fg = 0;
        let newUsr = document.createElement("p");
        let strong1 = document.createElement("strong");
        let cstrong1 = document.createTextNode("Username: ");
        strong1.appendChild(cstrong1);
        newUsr.appendChild(strong1);
        let span1 = document.createElement("span");
        let cspan1 = document.createTextNode(`${currAccount}`);
        span1.appendChild(cspan1);
        newUsr.appendChild(span1);
        results.appendChild(newUsr);
        fg = 1;
        if (fg == 1) {
          let newError = document.createElement("p");
          let strong2 = document.createElement("strong");
          let cstrong2 = document.createTextNode("Error: ");
          strong2.appendChild(cstrong2);
          newError.appendChild(strong2);
          let span2 = document.createElement("span");
          let cspan2 = document.createTextNode(`${commentArr}`);
          span2.appendChild(cspan2);
          span2.style.color = "#B00020";
          newError.appendChild(span2);
          results.appendChild(newError);
        }
      }
    }
  };

  // declare a function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.value != "") searchForAccount(username.value);
    console.log(username.value);
  };

  form.addEventListener("submit", (e) => handleSubmit(e));
});
