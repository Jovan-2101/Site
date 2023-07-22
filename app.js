const naslov = document.querySelector("title");
const zadaci = document.querySelector("#zadaci");

//Dok se ne napravi API (koji ce biti NAPISAN U PROGRAMSKOM JEZIKU C), mora se koristiti ovaj nacin
const htmlSadrzaj = [
   {
    naziv: "Ispis poruke 2",
    deskripcija: `Napisati program u Javi koji ispisuje poruku "321"`,
    jezik: "Java",
    kod:
`public class zadatak{
	public static void main(Strings[] args){
		System.out.print("321\\n");
	}
}`,
  },
  
  {
    naziv: "Ispis poruke 1",
    deskripcija: `Napisati program u Javi koji ispisuje poruku "123"`,
    jezik: "Java",
    kod:
`public class zadatak{
	public static void main(Strings[] args){
		System.out.print("123\\n");
	}
}`,
  },
  
  {
    naziv: "Zadatak 4",
    deskripcija: 'Napisati program u C-u koji ispisuje poruku "MRS3"',
    kod:
`#include <stdio.h>
int main(){
  printf("MRS3");
  return 0;
}`,
    jezik: "C",
  },

  {
  naziv: "Sortiranje niza",
  deskripcija: "Napisati program u programskom jeziku C koji sortira niz brojeva od najmanjeg do najvećeg.",
  jezik: "C",
  kod: 
`#include <stdio.h>

void sortirajNiz(int niz[], int duzina) {
    int temp;
    for (int i = 0; i < duzina - 1; i++) {
        for (int j = 0; j < duzina - i - 1; j++) {
            if (niz[j] > niz[j + 1]) {
                temp = niz[j];
                niz[j] = niz[j + 1];
                niz[j + 1] = temp;
            }
        }
    }
}

int main() {
    int niz[] = {5, 2, 9, 1, 5, 6};
    int duzina = sizeof(niz) / sizeof(niz[0]);

    printf("Nesortirani niz: ");
    for (int i = 0; i < duzina; i++) {
        printf("%d ", niz[i]);
    }

    sortirajNiz(niz, duzina);

    printf("\\nSortirani niz: ");
    for (int i = 0; i < duzina; i++) {
        printf("%d ", niz[i]);
    }

    return 0;
}`,
  },
  
  {
    naziv: "Zadatak 2",
    deskripcija: 'Napisati program u C-u koji ispisuje poruku "MRS2"',
    jezik: "C",
    kod:
`#include <stdio.h>
int main(){
  printf("MRS2");
  return 0;
}`,
  },
  
  {
    naziv: "Zadatak 1",
    deskripcija: 'Napisati program u C-u koji ispisuje poruku "MRS1"',
    jezik: "C",
    kod: 
`#include <stdio.h>
int main(){
  printf("MRS1");
  return 0;
}`,
  },
  
];


let NewFirst = true; 
// NAJSTARIJI = false
// NAJNOVIJI = true

function mrs(i){
const zadatak = htmlSadrzaj[i];
      const div = document.createElement("div");
      div.classList.add("blok");

      const naslov = document.createElement("h2");
      naslov.textContent = zadatak.naziv;
      div.appendChild(naslov);

      const opis = document.createElement("h4");
      opis.textContent = zadatak.deskripcija;
      div.appendChild(opis);

      const kodPre = document.createElement("pre");
      kodPre.textContent = zadatak.kod;
      div.appendChild(kodPre);

      const kopirajButton = document.createElement("button");
      kopirajButton.classList.add("kopiraj-tekst");
      kopirajButton.textContent = "Kopiraj kod";
      kopirajButton.onclick = function () {
        kopirajKod(this);
      };
      div.appendChild(kopirajButton);

      zadaci.appendChild(div);

      div.classList.add("animacija");
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


function generisi() {
  zadaci.innerHTML = '';
  const searchInput = document.getElementById('search').value.toLowerCase().trim();
  const selectedLanguage = document.getElementById('selectJezik').value;

  if (NewFirst) {
    for (let i = 0; i < htmlSadrzaj.length; i++) {
      if ((selectedLanguage === 'svi' || htmlSadrzaj[i].jezik === selectedLanguage) &&
        htmlSadrzaj[i].naziv.toLowerCase().includes(searchInput)) {
        mrs(i);
      }
    }
  } else {
    for (let i = htmlSadrzaj.length - 1; i >= 0; i--) {
      if ((selectedLanguage === 'svi' || htmlSadrzaj[i].jezik === selectedLanguage) &&
        htmlSadrzaj[i].naziv.toLowerCase().includes(searchInput)) {
        mrs(i);
      }
    }
  }
}

function filtrirajPoNaslovu() {
  generisi();
}

function filtrirajPoJeziku() {
  const selectJezik = document.getElementById("selectJezik");
  const odabraniJezik = selectJezik.value;
  zadaci.innerHTML = ''; 
  if (odabraniJezik === "svi") {   
    generisi();
  } else {
    for (let i = 0; i < htmlSadrzaj.length; i++) {
      if (htmlSadrzaj[i].jezik === odabraniJezik) {
        mrs(i);
      }
    }
  }
}

let tmp = true;
function sort() {
  if (tmp) {
    dugmeSort.textContent = "Sortirano od najstarijeg";
    NewFirst = false;
    tmp = false;
  } else {
    dugmeSort.textContent = "Sortirano od najnovijeg";
    NewFirst = true;
    tmp = true;
  }

  generisi();
  console.log(tmp);
}

const dugmeSort = document.querySelector("#dugmeSort");

dugmeSort.addEventListener('click', function () { sort() });

generisiSelect();
filtrirajPoJeziku();
generisi();
