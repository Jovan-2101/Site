const htmlSadrzaj = [
   {
    naziv: "Palindrom",
    deskripcija: "Napisati program u JS koji provjerava da li je uneseni string palindrom ili ne",
    jezik: "JavaScript",
    kod:
`function isPalindrome(str) {
  const cleanedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversedStr = cleanedStr.split('').reverse().join('');

  return cleanedStr === reversedStr;
}

const inputText = prompt("Unesite tekst za provjeru palindroma:");
if (inputText !== null) {
  if (isPalindrome(inputText)) {
    console.log("Uneseni tekst je palindrom!");
  } else {
    console.log("Uneseni tekst nije palindrom.");
  }
}`,
   },
   {
    naziv: "color.h",
    deskripcija: `Napisati biblioteku u C-u koja sluzi za manipulisanje bojama konzole`,
    jezik: "C",
    kod:
`#ifndef color_h
#define color_h

#if defined(_WIN32) || defined(_WIN64) // Windows

#include <windef.h>
#include <winbase.h>
#include <Wincon.h>

static HANDLE hConsole;

static const char *boje[]={
    "black", "crna",
    "blue", "plava",
    "green", "zelena",
    "cyan", "tirkiz",
    "red", "crvena",
    "magenta", "ljubicasta",
    "yellow", "zuta",
    "gray", "siva",
    "dark gray", "tamno siva",
    "light blue", "svijetlo plava",
    "light green", "svijetlo zelena",
    "light cyan", "svijetlo tirkiz",
    "light red", "svijetlo crvena",
    "light magenta", "svijetlo ljubicasta",
    "light yellow", "svijetlo zuta",
    "white", "bijela"
};

static void _internal_lib_handleConsole(){
    hConsole = GetStdHandle(STD_OUTPUT_HANDLE);
}

static void _internal_lib_updateConsoleAttributes(){
    CONSOLE_SCREEN_BUFFER_INFO info;
    GetConsoleScreenBufferInfo(hConsole, &info);
    WORD currentAttributes=info.wAttributes;
    SetConsoleTextAttribute(hConsole,currentAttributes);
}

void setTextColor(const char boja[]){
    _internal_lib_handleConsole();
    WORD textAttributes=0;

    for (unsigned char i=0; i<sizeof(boje)/sizeof(boje[0])/2; i++){
        if (stricmp(boja,boje[i*2])==0 || stricmp(boja,boje[i*2+1])==0){
            textAttributes=i;
            break;
        }
    }

    CONSOLE_SCREEN_BUFFER_INFO info;
    GetConsoleScreenBufferInfo(hConsole, &info);
    WORD currentAttributes=info.wAttributes;
    WORD updatedAttributes=(currentAttributes & 0xF0) | textAttributes;
    SetConsoleTextAttribute(hConsole, updatedAttributes);
}

void setBackgroundColor(const char boja[]){
    _internal_lib_handleConsole();
    WORD backgroundAttributes = 0;

    for (unsigned char i=0; i<sizeof(boje)/sizeof(boje[0])/2; i++){
        if (stricmp(boja, boje[i*2])==0 || stricmp(boja,boje[i*2+1])==0){
            backgroundAttributes=i;
            break;
        }
    }

    CONSOLE_SCREEN_BUFFER_INFO info;
    GetConsoleScreenBufferInfo(hConsole, &info);
    WORD currentAttributes=info.wAttributes;
    WORD updatedAttributes=(currentAttributes & 0x0F) | (backgroundAttributes << 4);
    SetConsoleTextAttribute(hConsole, updatedAttributes);
}

void setTextColorByIndex(int index) {
    _internal_lib_handleConsole();
    if (index>=0 && index<sizeof(boje)/sizeof(boje[0])/2){
        _internal_lib_updateConsoleAttributes();
        CONSOLE_SCREEN_BUFFER_INFO info;
        GetConsoleScreenBufferInfo(hConsole, &info);
        WORD currentAttributes = info.wAttributes;
        WORD updatedAttributes = (currentAttributes & 0xF0) | index;
        SetConsoleTextAttribute(hConsole, updatedAttributes);
    }
}

void setBackgroundColorByIndex(int index){
    _internal_lib_handleConsole();
    if (index>=0 && index<sizeof(boje)/sizeof(boje[0])/2){
        _internal_lib_updateConsoleAttributes();
        CONSOLE_SCREEN_BUFFER_INFO info;
        GetConsoleScreenBufferInfo(hConsole, &info);
        WORD currentAttributes = info.wAttributes;
        WORD updatedAttributes = (currentAttributes & 0x0F) | (index << 4);
        SetConsoleTextAttribute(hConsole, updatedAttributes);
    }
}

void colorReset(){
    _internal_lib_handleConsole();
    SetConsoleTextAttribute(hConsole, FOREGROUND_RED | FOREGROUND_GREEN | FOREGROUND_BLUE);
}

int showIndexByColorName(const char naziv[]){
    for (unsigned char i=0; i<sizeof(boje)/sizeof(boje[0])/2; i++){
        if (stricmp(naziv,boje[i*2])==0 || stricmp(naziv,boje[i*2+1])==0){
           return i;
        }
    }
    return -1; //(boja nije pronadjena)
}

const char *showColorNameByIndex(unsigned char i){
    i*=2;
    if (i>=0 && i<sizeof(boje)/sizeof(boje[0]) /* takodje moze sizeof(char *) */){
        return boje[i+1]; // boje[i+1] sa srpski, boje[i] za engleski 
    }
    else{
        return "Boja nije pronadjena";
    }
}

const char *getColorList(){
    static const char colorList[]=
        " [ 0  ] | black           [ 0  ] | crna\\n"
        " [ 1  ] | blue            [ 1  ] | plava\\n"
        " [ 2  ] | green           [ 2  ] | zelena\\n"
        " [ 3  ] | cyan            [ 3  ] | tirkiz\\n"
        " [ 4  ] | red             [ 4  ] | crvena\\n"
        " [ 5  ] | magenta         [ 5  ] | ljubicasta\\n"
        " [ 6  ] | yellow          [ 6  ] | žuta\\n"
        " [ 7  ] | gray            [ 7  ] | siva\\n"
        " [ 8  ] | dark gray       [ 8  ] | tamno siva\\n"
        " [ 9  ] | light blue      [ 9  ] | svijetlo plava\\n"
        " [ 10 ] | light green     [ 10 ] | svijetlo zelena\\n"
        " [ 11 ] | light cyan      [ 11 ] | svijetlo tirkiz\\n"
        " [ 12 ] | light red       [ 12 ] | svijetlo crvena\\n"
        " [ 13 ] | light magenta   [ 13 ] | svijetlo ljubicasta\\n"
        " [ 14 ] | light yellow    [ 14 ] | svijetlo žuta\\n"
        " [ 15 ] | white           [ 15 ] | bijela\\n";
        
    return colorList;
}


#elif defined(__linux__) || defined(__APPLE__) // GNU/Linux ili MacOS

#include <stdio.h>
#include <string.h>

#define stricmp strcasecmp

static const char *boje[]={
    "black", "crna",
    "red", "crvena",
    "green", "zelena",
    "yellow", "zuta",
    "blue", "plava",
    "magenta", "ljubicasta",
    "cyan", "tirkiz",
    "gray", "siva",
    "dark gray", "tamno siva",
    "light red", "svijetlo crvena",
    "light green", "svijetlo zelena",
    "light yellow", "svijetlo zuta",
    "light blue", "svijetlo plava",
    "light magenta", "svijetlo ljubicasta",
    "light cyan", "svijetlo tirkiz",
    "white", "bijela"
};

void setTextColor(const char *color){ 
    for (unsigned char i=0; i<sizeof(boje)/sizeof(boje[0]); i+=2){
        if (stricmp(color, boje[i]) == 0 || stricmp(color,boje[i+1]) == 0) {
            if (i<8){
            printf("\\033[%dm", i / 2 + 30);
           }
         else{
            printf("\\033[%dm", i / 2 + 82);
           }
          return;
        }
    }
}

void setBackgroundColor(const char *color){ 
    for (unsigned char i=0; i<sizeof(boje)/sizeof(boje[0]); i+=2){
        if (stricmp(color, boje[i]) == 0 || stricmp(color,boje[i+1]) == 0) {
         if (i<8){ 
            printf("\\033[%dm",i/2+40);
           }
         else{
            printf("\\033[%dm",i/2+92);
           }
          return;
        }
    }
}

void setTextColorByIndex(int index){
    if (index>=0 && index<sizeof(boje)/sizeof(boje[0])/2){
     if (index<8){
       printf("\\033[%dm",index+30);
      }
     else{
       printf("\\033[%dm",index+82);
      }
    }
}

void setBackgroundColorByIndex(int index){ 
    if (index>=0 && index<sizeof(boje)/sizeof(boje[0])/2){
     if (index<8){ 
       printf("\\033[%dm",index +40);
      }
     else{
       printf("\\033[%dm",index +92);
      }
    }
}


void colorReset(){ 
  printf("\\033[39m\\033[49m"); 
}

int showIndexByColorName(const char naziv[]){ 
    for (unsigned char i=0; i<sizeof(boje)/sizeof(boje[0])/2; i++){
        if (stricmp(naziv,boje[i*2])==0 || stricmp(naziv,boje[i*2+1])==0){
           return i;
        }
    }
    return -1; //(boja nije pronadjena)
}

const char *showColorNameByIndex(unsigned char i){ 
    i*=2;
    if(i>=0 && i<sizeof(boje)/sizeof(boje[0]) /* takodje moze sizeof(char *) */){
        return boje[i+1]; // boje[i+1] za srpski, boje[i] za engleski 
    } 
    else{
        return "Boja nije pronadjena";
    }
}

const char *getColorList(){ 
    static const char colorList[]=
        " [ 0  ] | black           [ 0  ] | crna\\n"
        " [ 1  ] | red             [ 1  ] | crvena\\n"
        " [ 2  ] | green           [ 2  ] | zelena\\n"
        " [ 3  ] | yellow          [ 3  ] | zuta\\n"
        " [ 4  ] | blue            [ 4  ] | plava\\n"
        " [ 5  ] | magenta         [ 5  ] | ljubicasta\\n"
        " [ 6  ] | cyan            [ 6  ] | tirkiz\\n"
        " [ 7  ] | gray            [ 7  ] | siva\\n"
        " [ 8  ] | dark gray       [ 8  ] | tamno siva\\n"
        " [ 9  ] | light red       [ 9  ] | svijetlo crvena\\n"
        " [ 10 ] | light green     [ 10 ] | svijetlo zelena\\n"
        " [ 11 ] | light yellow    [ 11 ] | svijetlo zuta\\n"
        " [ 12 ] | light blue      [ 12 ] | svijetlo plava\\n"
        " [ 13 ] | light magenta   [ 13 ] | svijetlo ljubicasta\\n"
        " [ 14 ] | light cyan      [ 14 ] | svijetlo tirkiz\\n"
        " [ 15 ] | white           [ 15 ] | bijela\\n";
        
    return colorList;
}

#else // Not Supported
#error "Nepodržana platforma."

#endif // OS_CHECK

#endif // color_h


`,
   },
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
`#include <stdio.h>;
int main(){
  printf("MRS1");
  return 0;
}`,
  },
  
];
