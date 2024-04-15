/*
1. Escribe una función que encuentre el primer carácter de un cadena de texto que no se repite. Prueba tu función con: 'abacddbec'
2. Escribe una función que implemente el algoritmo 'bubble-sort' para ordenar una lista de números.
3. Escribe dos funciones: la primera que invierta un arreglo de números y regrese un nuevo arreglo con el resultado; 
   la segunda que modifique el mismo arreglo que se pasa como argumento. No se permite usar la función integrada 'reverse'.
4. Escribe una función que reciba una cadena de texto y regrese una nueva con la primer letra de cada palabra en mayúscula.
5. Escribe una función que calcule el máximo común divisor de dos números.
6. Crea una función que cambie una cadena de texto a 'Hacker Speak'. Por ejemplo, para la cadena 'Javascript es divertido', 
   su hacker speak es: 'J4v45c1pt 35 d1v3rt1d0'.
7. Escribe una función que reciba un número, y regrese una lista con todos sus factores. 
   Por ejemplo: factoriza(12) -> [1, 2, 3, 4, 6, 12].
8. Escribe una función que quite los elementos duplicados de un arreglo y regrese una lista con los elementos que quedan. 
   Por ejemplo: quitaDuplicados([1, 0, 1, 1, 0, 0]) -> [1, 0]
9. Escribe una función que reciba como parámetro una lista de cadenas de texto, y regrese la longitud de la cadena más corta.
10. Escribe una función que revise si una cadena de texto es un palíndromo o no.
11. Escribe una función que tome una lista de cadena de textos y devuelva una nueva lista con todas las cadenas en orden alfabético.
12. Escribe una función que tome una lista de números y devuelva la mediana y la moda.
13. Escribe una función que tome una lista de cadenas de texto y devuelva la cadena más frecuente.
14. Escribe una función que tome un número y devuelva verdadero si es una potencia de dos, falso de lo contrario.
15. Escribe una función que tome una lista de números y devuelva una nueva lista con todos los números en orden descendente.
*/

//First exercise
function findFirstUnrepeatedChar(text){
    for(let i=0; i<text.length; i++){
        let counter=0;
        for(let j=0; j<text.length; j++){
            if(text[i] === text[j]){
                counter++
            }
        }
        if(counter == 1){
            console.log(text[i] + " repeats once")
            return text[i];
        }
    }
}
//Second exercise
function bubbleSort(list){
    for(let i=0; i<list.length-1; i++){
        for(let j=0; j<list.length-i-1; j++){
            if(list[j]>list[j+1]){
                let temp=list[j];
                list[j]=list[j+1];
                list[j+1]=temp;
            }
        }
    }
    return list;
}


//Third exercise
function softInvertArray(list){
    let newarr=[];
    for(let i=0; i<list.length; i++){
        newarr.unshift(list[i]);
    }
    return newarr;
}
function hardInvertArray(list){
    let newarr=[];
    for(let i=0; i<list.length; i++){
        newarr.unshift(list[i]);
    }
    list=newarr;
    return list;
}

//Fourth exercise
function mayus(string){
    let words = string.split(" ");
    for(let i=0; i<words.length; i++){
        words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
    let capitalizedString = words.join(" ");
    return capitalizedString;
}

//Fifth exercise
function maxComDiv(n, m){
    let arr=[n,m];
    if(arr[0] == 0 || arr[1] == 0){
        return 0;
    }
    
    while(arr[1]!==0){
        let temp=arr[1];
        arr[1]=arr[0]%arr[1];
        arr[0]=temp;
    }
    return arr[0];
}

//Sixth exercise
function hackerSpeak(string){
    let dictionary = {
        a:4,
        e:3,
        i:1,
        o:0,
        s:5
    };
    return string.replace(/[aeios]/gi, (v) => dictionary[v]);
}

//Seventh exercise
function factors(n){
    let factors=[];
    if(n==0){
        return factors;
        console.log("there are no factors for zero dummyyy");
    }
    for(i=1; i<=n; i++){
        if(Number.isInteger(n/i)){
            console.log(i+" times "+n/i+" is equal to "+n)
            factors.push(i);
        }
    }
    return factors;

}

//Eigth exercise
function noDuplicates(array){
    let newarray=[];
    for(i=0; i<array.length; i++){
        let coincidences=0;
        for(j=0; j<newarray.length; j++){
            if(array[i]==newarray[j]){
                coincidences++;
            }
        }
        if(coincidences==0){
            newarray.push(array[i]);
        }
    }
    return newarray;
}
//Ninth exercise
function shortestString(strings){
    let shortestString = strings[0];
    for(i=0; i<strings.length; i++){
        if(strings[i].length<shortestString.length){
            shortestString=strings[i];
        }
    }
    return shortestString;
}
//Tenth exercise
function reverse(s){
    return s.split("").reverse().join("");
}
function checkPalindrome(string){
    if(string == reverse(string)){
        console.log("This is a palindrome")
        return true;
    }
    else{
        console.log("Thats not a palindrome")
        return false;
    }
}
//Eleventh exercise
function sortAlphabetically(str) {
    return str.split('').sort().join('');
  }
//Twelfth exercise
function getMedianMode(list){
    let median;
    let mode;
    let mostappearances=0;
    reference = noDuplicates(list);

    if(list.length%2==0){
        median=list[Math.floor((list.length-1)/2)];       
    }
    else{
        median=list[Math.round((list.length-1)/2)];
    }
    for(i=0; i<reference.length; i++){
        appearances=0;
        for(j=0; j<list.length; j++){
            if(reference[i]==list[j]){
                appearances++;
            }
        }
        if(appearances>mostappearances){
            mode=reference[i];
            mostappearances=appearances;
        }
    }
    console.log("median: "+median+" mode: "+mode)
}
//Thirteenth exercise
function mostRepeatedString(strings){
    let mostAppearances=0;
    let mostRepeated;
    if (!strings.length) {
        return null;
      }

    for(i=0; i<strings.length; i++){
        let appearances = 0;
        for(j=0; j<strings.length; j++){
            if(strings[i]==strings[j]){
                appearances++;
            }
        }
        if(appearances>mostAppearances){
            mostAppearances=appearances;
            mostRepeated=strings[i];
        }
    }
    return mostRepeated;
}
//fourteenth exercise
function isItAPowerOfTwo(n){
    let i=2
    let x=0
    while(i**x<=n){
        
        if(i**x==n){
            return true;
        }
        else{
            x++;
        }
    }
    return false;
}
//fifteenth exercise
function inverseSort(list){
    return hardInvertArray(bubbleSort(list));
}


//1
findFirstUnrepeatedChar("abacddbec");
findFirstUnrepeatedChar("aaaaaaaeeeeeeeeeuuuuuuu"); //this should not return anything since every character repeats
findFirstUnrepeatedChar("uxieou");
//2
let array1=[1,5,4,3,2,7,6,9,8];
let array2=[1,5,3,3,36,7,3,8,32];
let array3=[78,3,6,7,3,6];
console.log(bubbleSort(array1));
console.log(bubbleSort(array2));
console.log(bubbleSort(array3));
//3
console.log(softInvertArray(array1));
console.log(softInvertArray(array2));
console.log(softInvertArray(array3));
console.log(hardInvertArray(array1));
console.log(hardInvertArray(array2));
console.log(hardInvertArray(array3));
//4
console.log(mayus("the fox jumped over the rock"));
console.log(mayus("js is fun"));
console.log(mayus("the fox is writing js code"));
//5
console.log(maxComDiv(6,13)); //outputs one since its the only common divisor
console.log(maxComDiv(6,2)); //this inverts the values to make the calculation
console.log(maxComDiv(4,12));
//6
console.log(hackerSpeak("Javascript es divertido"));
console.log(hackerSpeak("C++ es mejor"));
console.log(hackerSpeak("Python es mejor"));
//7
console.log(factors(120));
console.log(factors(200));
console.log(factors(12));
//8
console.log(noDuplicates([1,1,1,2,4,5,66,66,3]));
console.log(noDuplicates([3,3,3,3,3,3,3,3,3,3]));
console.log(noDuplicates([0,0,0,0,2,2,2,3,5,5,5,5,5]));
//9
console.log(shortestString(["aaaaa","This is a string as well","hehe"]))
console.log(shortestString(["jajaja","jaja","ja"]))
console.log(shortestString(["this is a short string","this is a string"]))
//10
checkPalindrome("eevee");
checkPalindrome("12345");
checkPalindrome("121");
//11
console.log(sortAlphabetically("eevee"));
console.log(sortAlphabetically("pedrooo"));
console.log(sortAlphabetically("This is a stringg"));
//12
getMedianMode([1,1,2,44,65,6,5,5])
getMedianMode([1,3,4,5,6,7,8,1,9])
getMedianMode([1,2,3,4,5,6,6,6])
//13
console.log(mostRepeatedString(["string","string","hello"]));
console.log(mostRepeatedString(["apple","apple","banana","banana","banana"]));
console.log(mostRepeatedString(["a","a","b","b","b","b","c","c","c","c","c","c"]));
//14
console.log(isItAPowerOfTwo(128))
console.log(isItAPowerOfTwo(127))
console.log(isItAPowerOfTwo(1))
//15
console.log(inverseSort([1,1,2,44,65,6,5,5]));
console.log(inverseSort([9,8,7,6,5,4,3,2,1]));
console.log(inverseSort([9,3,4,56,1,3,44,1,3]));
