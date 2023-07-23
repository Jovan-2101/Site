const zadaci = document.querySelector("#zadaci");
const naslov = document.querySelector("h1");


let NewFirst = true; 
// NAJSTARIJI = false
// NAJNOVIJI = true

function generisiBlok(i) {
  const zadatak = htmlSadrzaj[i];
  const div = document.createElement("div");
  div.classList.add("blok", "animacija");

  div.innerHTML = `
    <h2>${zadatak.naziv}</h2>
    <h4>${zadatak.deskripcija}</h4>
    <pre>${zadatak.kod}</pre>
    <button class="kopiraj-tekst">Kopiraj kod</button>
  `;

  const kopirajButton = div.querySelector(".kopiraj-tekst");
  kopirajButton.onclick = function () {
    kopirajKod(this);
  };

  zadaci.appendChild(div);

  setTimeout(() => {
    div.classList.add("active");
  }, 10 * (i + 1));
}

const programskiJezici = [...new Set(htmlSadrzaj.map((zadatak) => zadatak.jezik))];

function generisiSelect() {
  const selectJezik = document.getElementById("selectJezik");
  selectJezik.innerHTML = '';

  const sviJeziciOption = document.createElement("option");
  sviJeziciOption.value = "svi";
  sviJeziciOption.textContent = "Svi jezici";
  selectJezik.appendChild(sviJeziciOption);

  for (const jezik of programskiJezici) {
    const jezikOption = document.createElement("option");
    jezikOption.value = jezik;
    jezikOption.textContent = jezik;
    selectJezik.appendChild(jezikOption);
  }
}
/*
const nekiString = [
"moj je tata",
"vi se potrudite",
"nema niko muda",
"moj je tajo",
"moj je stari",
];
const nekiOdgovor = [ 
"Zlocinac iz rata",
"Pa ga osudite",
"Da vodi ga do suda",
"Po Bosni osvaj'o",
"Opasan u stvari",
];
const nekaBoja = [
"red",
"red",
"red",
"red",
"red",
];
const nekiLink = [
"https://www.youtube.com/watch?v=ETQmQ1Ixv5Y",
"https://www.youtube.com/watch?v=ETQmQ1Ixv5Y",
"https://www.youtube.com/watch?v=ETQmQ1Ixv5Y",
"https://www.youtube.com/watch?v=ETQmQ1Ixv5Y",
"https://www.youtube.com/watch?v=ETQmQ1Ixv5Y",
]

const searchInput = document.getElementById('search');

searchInput.addEventListener("input", function () {
    const uneseniTekst = searchInput.value.toLowerCase();
    let pronasaoOdgovor = false;
      
    for (let i = 0; i < nekiString.length; i++) {
      if (uneseniTekst === nekiString[i]) {
        naslov.innerHTML = nekiOdgovor[i];
        naslov.style.color = nekaBoja[i];
        window.location.href = nekiLink[i];
        pronasaoOdgovor = true;
        break;
      }
    }

    if (!pronasaoOdgovor) {
      naslov.innerHTML = "Sajt";
      naslov.style.color = "white";
   }
});
*/

function kopirajKod(buttonElement) {
  const preElement = buttonElement.previousElementSibling;
  const range = document.createRange();
  range.selectNodeContents(preElement);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);

  try {
    document.execCommand('copy');
    const originalText = buttonElement.textContent;
    buttonElement.textContent = 'Kopirano';
    setTimeout(() => {
      buttonElement.textContent = originalText;
    }, 2000);
  } 
  catch (error) {
    alert("Greška prilikom kopiranja koda.");
  }
  
  selection.removeAllRanges();
}


function generisi() {
  zadaci.innerHTML = '';
  const searchInput = document.getElementById('search').value.toLowerCase().trim();
  const selectedLanguage = document.getElementById('selectJezik').value;
  
  function filtrirajZadatke(i){
   if ((selectedLanguage === 'svi' || htmlSadrzaj[i].jezik === selectedLanguage) &&
        htmlSadrzaj[i].naziv.toLowerCase().includes(searchInput)) {
        generisiBlok(i);
      }
  }
  
  if (NewFirst){
    for (let i = 0; i < htmlSadrzaj.length; i++){
     filtrirajZadatke(i);
    }
  }
   else{
    for (let i = htmlSadrzaj.length - 1; i >= 0; i--){
     filtrirajZadatke(i);
    }
  }
}



function filtrirajPoNaslovu() {
  generisi();
}

function filtrirajPoJeziku() {
  const selectJezik = document.getElementById("selectJezik");
  zadaci.innerHTML = '';
  
  if (selectJezik.value == "svi") {   
    generisi();
  } 
  else {
    for (let i = 0; i < htmlSadrzaj.length; i++) {
      if (htmlSadrzaj[i].jezik == selectJezik.value) {
        generisiBlok(i);
      }
    }
  }
}

let tmp = true;

function sort() {
  if (tmp) {
    dugmeSort.textContent = "Sortirano od najstarijeg";
  } 
  else {
    dugmeSort.textContent = "Sortirano od najnovijeg";
  }
  
  NewFirst=toggleBoolean(NewFirst);
  tmp=toggleBoolean(tmp);
  generisi();
}

function toggleBoolean(nekaPromenljiva) {
  return !nekaPromenljiva;
}

const dugmeSort = document.querySelector("#dugmeSort");

dugmeSort.addEventListener('click',function(){
 sort();
});

generisiSelect();
filtrirajPoJeziku();
generisi();
