var Arr_MazrabHa = [1,(2**(500/1200)),(2**(2*500/1200)),(2**((2*500+200)/1200)),(2**((2*500+200)/1200))*2**(500/1200),(2**((2*500+200)/1200))*2**(2*500/1200),(2**((2*500+200)/1200))*2**((200+2*500)/1200)]
var mainFrequency = 180;
// var NavaDaramad = new Nava('daramad-1',620,100,7,0,8,"shur shur",360)

// var NavaOuj = new Nava('ouj-1',620,100,7,0,8,"shur shur",360*(2**(500/1200)))

// var NavaSalmak = new Nava('salmak-1',620,100,7,0,8,"shur nava",360*(2**(500/1200)))

// var NavaBozorg = new Nava('bozorg-1',620,100,7,0,8,"shur nava",360*(2**(2*500/1200)))

// var NavaOzal1 = new Nava('ozal-1',360,100,4,0,5,"nava",360*(2**(2*500/1200)))
// var NavaOzal2 = new Nava('ozal-2',360,100,4,0,5,"shur",360*(2**((2*500+200)/1200)))

// var NavaDaramadZir = new Nava('daramad-zir-1',620,100,7,0,8,"shur shur",360*(2**((2*500+200)/1200)))


// var NavaShahnaz1 = new Nava('shahnaz-1',620,100,7,0,8,"shur shur",360*(2**((2*500+200)/1200))*2**(500/1200))
// var NavaShahnaz2 = new Nava('shahnaz-2',620,100,7,0,8,"shur nava",360*(2**((2*500+200)/1200))*2**(500/1200))
// var NavaShahnaz3 = new Nava('shahnaz-3',620,100,7,0,8,"shur nava",360*(2**((2*500+200)/1200))*2**(2*500/1200))


// var NavaOujShahrAshoub1 = new Nava('ouj-shahr-ashoub-1',360,100,4,0,5,"nava",360*(2**((2*500+200)/1200))*2**(2*500/1200))
// var NavaOujShahrAshoub2 = new Nava('ouj-shahr-ashoub-2',360,100,4,0,5,"shur",360*(2**((2*500+200)/1200))*2**((200+2*500)/1200))
// document.getElementById("main").addEventListener("mousemove",function(){console.log(event.clientX,event.clientY)})

var NavaDaramad = new Nava('daramad-1',620,150,7,0,8,"shur shur",mainFrequency*Arr_MazrabHa[0])
var NavaOuj = new Nava('ouj-1',620,150,7,0,8,"shur shur",mainFrequency*Arr_MazrabHa[1])
var NavaSalmak = new Nava('salmak-1',620,150,7,0,8,"shur nava",mainFrequency*Arr_MazrabHa[1])

var NavaBozorg = new Nava('bozorg-1',620,150,7,0,8,"shur nava",mainFrequency*Arr_MazrabHa[2])

var NavaOzal1 = new Nava('ozal-1',360,150,4,0,5,"nava",mainFrequency*Arr_MazrabHa[2])
var NavaOzal2 = new Nava('ozal-2',360,150,4,0,5,"shur",mainFrequency*Arr_MazrabHa[3])

var NavaDaramadZir = new Nava('daramad-zir-1',620,150,7,0,8,"shur shur",mainFrequency*Arr_MazrabHa[3])

var NavaShahnaz1 = new Nava('shahnaz-1',620,150,7,0,8,"shur shur",mainFrequency*Arr_MazrabHa[4])
var NavaShahnaz2 = new Nava('shahnaz-2',620,150,7,0,8,"shur nava",mainFrequency*Arr_MazrabHa[4])
var NavaShahnaz3 = new Nava('shahnaz-3',620,150,7,0,8,"shur nava",mainFrequency*Arr_MazrabHa[5])

var NavaOujShahrAshoub1 = new Nava('ouj-shahr-ashoub-1',360,150,4,0,5,"nava",mainFrequency*Arr_MazrabHa[5])
var NavaOujShahrAshoub2 = new Nava('ouj-shahr-ashoub-2',360,150,4,0,5,"shur",mainFrequency*Arr_MazrabHa[6])

// document.getElementById('daramad-1-text').innerHTML = "Daramad-o-rohab"
// document.getElementById('ouj-1-text').innerHTML = "Ouj"
// document.getElementById('salmak-1-text').innerHTML = "Salmak"
// document.getElementById('bozorg-1-text').innerHTML = "Bozorg"
// document.getElementById('ozal-1-text').innerHTML = "Ozal"
// document.getElementById('ozal-2-text').innerHTML = "Ozal"
// document.getElementById('daramad-zir-1-text').innerHTML = "Daramad Zir"
// document.getElementById('shahnaz-1-text').innerHTML = "Shahnaz"
// document.getElementById('shahnaz-2-text').innerHTML = "karachi"
// document.getElementById('shahnaz-3-text').innerHTML = "razi"
// document.getElementById('ouj-shahr-ashoub-1-text').innerHTML = "Ouj Shahr Ashoub"
// document.getElementById('ouj-shahr-ashoub-2-text').innerHTML = "Ouj Shahr Ashoub"


// function reqListener () {
//     console.log(this);
// }
  
// var oReq = new XMLHttpRequest();
// oReq.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//        // Typical action to be performed when the document is ready:
//        console.log(oReq.responseText);
//     }
// };
// //oReq.addEventListener("load", reqListener);
// oReq.open("GET", "http://localhost/DanaAPI/api/Values/6", true);
// oReq.send();


