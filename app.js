const zadaci = document.querySelector("#zadaci");
const naslov = document.querySelector("h1");
const dugmeSort = document.querySelector("#dugmeSort");

let prikaziJezike = true;
let NewFirst = true;

let programskiJezici = [];

function ucitajProgramskeJezike() {
  programskiJezici = [...new Set(htmlSadrzaj.map((zadatak) => zadatak.jezik))];
}

function escapeHTML(str) { 
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

htmlSadrzaj.forEach((zadatak) => { // zbog znakova'<' i '>'
  zadatak.kod = escapeHTML(zadatak.kod);
});

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

function generisiSelect() {
  const selectJezik = document.getElementById("selectJezik");
  selectJezik.innerHTML = '';

  const sviJeziciOption = new Option("Svi jezici", "svi");
  selectJezik.appendChild(sviJeziciOption);

  for (const jezik of programskiJezici) {
    const jezikOption = new Option(jezik, jezik);
    selectJezik.appendChild(jezikOption);
  }
}


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

function sortDugmeUpdate(){
 if (!NewFirst) {
    dugmeSort.textContent = "Sortirano od najstarijeg";
  } 
  else {
    dugmeSort.textContent = "Sortirano od najnovijeg";
  }
}

function sort() {
  NewFirst=toggleBoolean(NewFirst);
  sortDugmeUpdate();
  generisi();
}

function toggleBoolean(nekaPromenljiva) {
  return !nekaPromenljiva;
}

dugmeSort.addEventListener('click',function(){
 sort();
});

function BrojZadataka() {
  const jeziciIZadaci = {};

  for (let i = 0; i < htmlSadrzaj.length; i++) {
    const jezik = htmlSadrzaj[i].jezik;
    if (jezik in jeziciIZadaci) {
      jeziciIZadaci[jezik]++;
    } else {
      jeziciIZadaci[jezik] = 1;
    }
  }

  const nizObjekata = [];

  for (const jezik in jeziciIZadaci) {
    nizObjekata.push({
      naziv: jezik,
      brojZadataka: jeziciIZadaci[jezik],
    });
  }

  return nizObjekata;
}


function formatirajBrojZadataka(broj){ //Senka 
  if (broj === 1){
    return "zadatak";
  } 
  else if (broj > 1 && broj <= 4){
    return "zadataka";
  } 
  else{
    return "zadataka";
  }
}

function prikaziJezikeInfo(jezici) {
  const jeziciInfoDiv = document.getElementById("jeziciInfo");
  let ukupno = 0;
  let html = `<h3>Programski jezici:</h3>`;

  for (let jezik of jezici) {
    html += `<p>${jezik.naziv}: ${jezik.brojZadataka} ${formatirajBrojZadataka(jezik.brojZadataka)}</p>`;
    ukupno += jezik.brojZadataka;
  }

  html += `<p>Ukupno: ${ukupno} ${formatirajBrojZadataka(ukupno)}</p>`;
  jeziciInfoDiv.innerHTML = html;
}

function prikazJezika(){
 if (prikaziJezike){
  prikaziJezikeInfo(BrojZadataka());
 }
 else{
  document.querySelector("#jeziciInfo").style.display="none";
 }
}

function main(){ //moze da sluzi za restart
 sortDugmeUpdate();
 ucitajProgramskeJezike();
 generisiSelect();
 filtrirajPoJeziku();
 generisi();
 prikazJezika();
}

main();
