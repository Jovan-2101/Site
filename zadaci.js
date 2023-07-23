const htmlSadrzaj = [
   {
    naziv: "Ispis poruke 2",
    deskripcija: `Napisati program u Javi koji ispisuje poruku "321"`,
    jezik: "Java",
    kod:
`public class zadatak2{
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
`public class zadatak1{
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

export default htmlSadrzaj;
