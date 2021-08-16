const apiStatus = "https://codeforces.com/api/user.status?handle=";
let conId = "";
let probIndex = "";
let probArr = [];
let pageUrl=location.href;
let ctId="";
window.onload = () => {
  const table = document.querySelector(".problems tbody");
  if(pageUrl.includes("https://codeforces.com/problemset")){
  for (let i = 1, row; (row = table.rows[i]); i++) {
    probArr.push(row.cells[0].innerText);
  }
  console.log(probArr);
  }
  else if(!pageUrl.includes("problem")){
    let urlCurArr = pageUrl.split("/");
    ctId=urlCurArr[urlCurArr.length-1];
    for (let i = 1, row; (row = table.rows[i]); i++) {
      probArr.push(ctId+row.cells[0].innerText);
    }
    console.log(probArr);
  }

  {
    let finalCheck = "";
    chrome.storage.sync.get("finalUsername", function (obj) {
      finalCheck = obj.finalUsername;
      console.log("Value currently is " + obj.finalUsername);
      const searchForAccount2 = async (user) => {
        let newArr = [];
        newArr.length = 0;
        function onlyUnique(value, index, self) {
          return self.indexOf(value) === index;
        }
        let finalA = user.split(",");
        finalArr = finalA.filter(onlyUnique);
        for (let k = 0; k < finalArr.length; k++) {
          try {
            const finalUser = finalArr[k];
            const data = await fetch(`${apiStatus}${finalUser}`);
            const response = await data.json();
            console.log(response.result);
            if (response.status == "FAILED") {
              comment = response.comment;
            }
            let currObj = response.result;
            for (let i = 0; i < currObj.length; i++) {
              if (currObj[i].verdict == "OK") {
                let problemInfo = currObj[i].contestId + currObj[i].problem.index;
                // console.log(problemInfo);
                if (
                  probArr.includes(problemInfo) &&
                  !newArr.includes(problemInfo)
                ) {
                  newArr.push(problemInfo);
                }
              }
            }
          } catch (error) {
            console.log(error);
          }
        }
        const table = document.querySelector(".problems tbody");
        console.log(newArr);
        for (let i = 1, row; (row = table.rows[i]); i++) {
          if (newArr.includes(ctId+row.cells[0].innerText)) {
            row.cells[2].style.backgroundColor = "#D4EDC9";
          } 
          // else {
          //   if (i % 2 == 1) row.cells[2].style.backgroundColor = "#F8F8F8";
          //   else {
          //     row.cells[2].style.backgroundColor = "#FFFFFF";
          //   }
          // }
        }
      };
    
      searchForAccount2(finalCheck);
    });
    }
    chrome.runtime.onMessage.addListener(function (request, sender) {
      console.log(request.message);
      window.location.reload();
    });
    

};
