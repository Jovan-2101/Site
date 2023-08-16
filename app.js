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
function generisiBlok(i) {
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
   function filtrirajPoJeziku() {
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
