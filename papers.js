/* URLs */

//eapcet
const eapcetCardUrl = "https://script.google.com/macros/s/AKfycbzBbckyzRaeuzs3PM_5Izvf5xXO3wRpu4Oi4cT6doEwilNkXMLhJ3kGyJt-ufWKDvKZ/exec";
const eapcetCheckUrl = "https://script.google.com/macros/s/AKfycbwHlnCOURvtxNMqx_hpz7A2rWzS13C9RTDILdotBCB9Dbw84HCgvGb4dcnOk9P2OWjLwg/exec";

//aptitude
const logicalCardUrl = "https://script.google.com/macros/s/AKfycbx7IZosqNYistP8R6s7uMFCYtpeG1DTU-WKlPxnNwQR38f4ojnSPLK06Ywb1-TXupRe/exec";
const logicalCheckUrl = "https://script.google.com/macros/s/AKfycbzL-6Fjm_L6ias0j7VV_8MUVy8agwq12V81gUFPx-yjAAjyIaY1Fw-63-MeUOBRw6Rq/exec";

//reasoning
const reasoningCardUrl = "https://script.google.com/macros/s/AKfycbxC848v4Ej7khUbiEAvL58dkFzKlq4xGULHWa8EV5WjQAeRlOp84iXANBy46UBWLFnV/exec";
const reasoningCheckUrl = "https://script.google.com/macros/s/AKfycbwEXguhU8OIuNsC2j0jOcW1TdM2iQWX1TySVuu2jFJGkMBGs2seyPxVefOtRYKPA7CZ/exec";

//english
const englishCardUrl = "https://script.google.com/macros/s/AKfycbzxWe-ZiUhPZulY0fxv-KAu9X2D5h2C8DBvBBtTr9Cgj6uqaXy7Ofiw6NOQDVZ9IqdoMA/exec";
const englishCheckUrl = "https://script.google.com/macros/s/AKfycbyrVr5soPJGo71TtXbRO_nW9SkPXNWJkTwzvRDNfQLR2zGF1DFLqZW9VuF_3YP4549zKQ/exec";

//SSC
const sscCardUrl = "https://script.google.com/macros/s/AKfycbwRMXg0tTAKHroxN-JL3DKIrD89k99Ckk5F0Dn18bLNLmEydXWYM0muivpEj6Z2TflQ/exec";
const sscCheckUrl = "https://script.google.com/macros/s/AKfycbxQ2u9rjHy8HQ-urQ_O7aZWhWBITCBbvhU_YSqXe9x1NA3kokNawgTQsYiGxY2oYV8TVw/exec";

//polycet
const polycetCardUrl = "https://script.google.com/macros/s/AKfycbx9vmE7E7aGsAwztrnN1rp2j_wkIIMuC2uSJeZCjU0qpl2wHvthlzrIG9M0fYItCUE3/exec";
const polycetCheckUrl = "https://script.google.com/macros/s/AKfycbyFBMQO_8DWOrfOMAMkaAdNFu791xj6TJ3PAoxf9rmhhrWTCp-z9E-1NUrmeSpWP3Yu/exec";

//aprjc
const aprjcCardUrl = "https://script.google.com/macros/s/AKfycbzOYtHXIYKvYEfk6zTHEEr6tD4xgjhz6NkJAjJqkWxMXpIUigP6HUF6lFo71c_B1aJ1FQ/exec";
const aprjcCheckUrl = "https://script.google.com/macros/s/AKfycbw6cye6AwiterRzkiClcxdFIVNdqLuV6c-qdmbQXJ1LQkW3Kai4Jbqook0K-SN_lsA0/exec";

let params = new URLSearchParams(window.location.search);
let title = params.get('title');
sessionStorage.setItem('title', title);
let titletag = document.getElementById("title");
titletag.innerText = title;

const userid = localStorage.getItem('userid');
if (!title) {
  window.location.href = `user.html?student_id=${userid}`;
}

console.log("Selected Title:", title);
if (title === "eapcet") {
  papers(eapcetCardUrl, eapcetCheckUrl);
  console.log(title, ":Called");
}
else if(title==="aptitude"){
  papers(logicalCardUrl, logicalCheckUrl);
  console.log(title, ":Called");
}
else if(title==="reasoning"){
  papers(reasoningCardUrl, reasoningCheckUrl);
  console.log(title, ":Called");
}
else if(title==="english"){
  papers(englishCardUrl, englishCheckUrl);
  console.log(title, ":Called");
}
else if(title==="ssc"){
  papers(sscCardUrl, sscCheckUrl);
  console.log(title, ":Called");
}
else if(title==="polycet"){
  papers(polycetCardUrl, polycetCheckUrl);
  console.log(title, ":Called");
}
else if(title==="aprjc"){
  papers(aprjcCardUrl, aprjcCheckUrl);
  console.log(title, ":Called");
}
else{
  alert("Invalid Exam Selected:Try again!");
  window.location.href = "user.html";
}


let cardData = [];
let test_names = [];


function papers(cardDataUrl, checkExistanceUrl){
  //loading
  document.addEventListener("DOMContentLoaded", function () {
      setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        document.querySelector('.card-container').style.display = 'grid';
        document.querySelector('.pagination-controls').style.display = 'block';
      }, 3000);
  });

  /* Fetching data and then render */
  Promise.all([
    fetch(cardDataUrl + "?action=get_titles")
      .then(res => res.ok ? res.json() : Promise.reject("Card fetch failed"))
      .then(data => {
        cardData = Object.entries(data).map(([key, value]) => ({
          title: key,
          title_url: value
        }));
      }),
    fetch(checkExistanceUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        action: 'check',
        userid: userid,
        exam: title
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject("Check fetch failed"))
      .then(data => {
        test_names = data;
      })
  ])
  .then(() => {
    renderCards(test_names);
  })
  .catch(error => {
    console.error("Error during data fetch:", error);
  });

  /* Pagination & Rendering */
  let currentPage = 1;
  let cardsPerPage = getCardsPerPage();

  function getCardsPerPage() {
    return window.innerWidth <= 768 ? 6 : 8;
  }

  function renderCards(writtenTests) {
    const container = document.querySelector('.card-container');
    container.innerHTML = '';

    cardsPerPage = getCardsPerPage();
    const totalPages = Math.ceil(cardData.length / cardsPerPage);
    const start = (currentPage - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    const cardsToDisplay = cardData.slice(start, end);

    cardsToDisplay.forEach(card => {
      const cardEl = document.createElement('div');
      cardEl.className = 'l_card';

      const isWritten = writtenTests.includes(card.title);

      cardEl.innerHTML = `
        <h2>${card.title}</h2>
        <img class="course_img" src="${card.title_url}">
        <button class="take-btn" ${isWritten ? 'disabled' : ''}>
          ${isWritten ? 'Completed' : 'Take'}
        </button>
      `;
      container.appendChild(cardEl);

      if (!isWritten) {
        const takeBtn = cardEl.querySelector('.take-btn');
        takeBtn.addEventListener('click', () => {
          sessionStorage.setItem('selectedTitle', card.title);
          window.location.href = 'eapcetexam.html';
        });
      }
    });

    document.getElementById('page-indicator').textContent = `Page ${currentPage} of ${totalPages}`;
  }

  function nextPage() {
    const totalPages = Math.ceil(cardData.length / cardsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      renderCards(test_names);
    }
  }

  function prevPage() {
    if (currentPage > 1) {
      currentPage--;
      renderCards(test_names);
    }
  }

  window.addEventListener('resize', () => {
    const newCardsPerPage = getCardsPerPage();
    if (newCardsPerPage !== cardsPerPage) {
      currentPage = 1;
      cardsPerPage = newCardsPerPage;
      renderCards(test_names);
    }
  });
}
