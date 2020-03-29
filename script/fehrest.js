var svg = d3.select("#svg-tree")
            .attr("width",window.innerWidth)
            .attr("height",window.innerWidth)


width = 1000,
height = 1000,


g = svg.append("g").attr("id","g-tree")
      // .attr("transform", "translate(" + (width / 2 - 15) + "," + (height / 2 + 25) + ")");
// svg.call(d3.zoom().on("zoom", function () {
// g.attr("transform", d3.event.transform);
// console.log("svgv",svg)
// }))
// g.attr("transform", "translate(" + (window.innerWidth / 2 - 15) + "," + (window.innerWidth / 2 + 25) + ") scale("+window.innerWidth/1000+")");
g.attr("transform", "translate(" + (window.innerWidth / 2) + "," + (window.innerWidth / 2) + ") scale("+window.innerWidth/1000+")");

d3.zoomIdentity.x=window.innerWidth / 2;
d3.zoomIdentity.y=window.innerWidth / 2;
d3.zoomIdentity.k=window.innerWidth/1000;

svg.call(d3.zoom().on("zoom", function () {
  g.attr("transform", d3.event.transform)
}))



window.addEventListener("resize", WindowsResizeSVGUpdate);
function WindowsResizeSVGUpdate() {
  

  d3.select("tree-div").attr("width",window.innerWidth)
                        .attr("height",window.innerWidth)
    svg.attr("width",window.innerWidth)
        .attr("height",window.innerWidth)
    g.attr("transform", "translate(" + (window.innerWidth / 2) + "," + (window.innerWidth / 2) + ") scale("+window.innerWidth/1000+")");

    d3.zoomIdentity.x=window.innerWidth / 2;
    d3.zoomIdentity.y=window.innerWidth / 2;
    d3.zoomIdentity.k=window.innerWidth/1000;
}



var stratify = d3.stratify()
    .parentId(function(d) { return d.id.substring(0, d.id.lastIndexOf(".")); });

var tree = d3.cluster()
    .size([360, width/3])
    .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

d3.csv("script/flare2.csv", function(error, data) {
  if (error) throw error;

  var root = tree(stratify(data));

  var link = g.selectAll(".link")
    .data(root.descendants().slice(1))
    .enter().append("path")
      .attr("class", "link")
      .attr("d", function(d) {
        return "M" + project(d.x, d.y)
            + "C" + project(d.x, (d.y + d.parent.y) / 2)
            + " " + project(d.parent.x, (d.y + d.parent.y) / 2)
            + " " + project(d.parent.x, d.parent.y);
      })
      .attr("stroke","rgb("+180+","+180+","+180+")")
      .on("mouseover",function(){d3.select(this).attr("stroke", "orange");})
      .on("mouseleave",function(){d3.select(this).attr("stroke", "rgb("+180+","+180+","+180+")");})
      

  var node = g.selectAll(".node")
    .data(root.descendants())
    .enter().append("g")
      .attr("stroke-width","1px")
      .attr("stroke-opacity",.5)
      .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
      .attr("transform", function(d) { return "translate(" + project(d.x, d.y) + ")"; })
      .on("mouseover",function(){if(d3.select(this)._groups[0][0].style.stroke=="rgb(2, 123, 0)"){}else{d3.select(this).style("stroke", "orange");}})
      .on("mouseleave",function(){if(d3.select(this)._groups[0][0].style.stroke=="rgb(2, 123, 0)"){console.log("red")}else{d3.select(this).style("stroke", "none");};})
      .on("click",function(){if(d3.select(this)._groups[0][0].style.stroke=="rgb(2, 123, 0)"){d3.select(this).style("stroke", "none");}else{d3.select(this).style("stroke", "rgb(2, 123, 0)")}});
  node.append("circle")
              .attr("r", 2.5)
              .attr("fill","rgb("+150+","+150+","+150+")")
              .attr("id",function(e){id_save="circle"+e.data.id;return id_save})
              .attr("clickedbefore",false)
              // .on("mouseover",function(){if(d3.select(this)._groups[0][0].style.fill=="red"){}else{d3.select(this).style("fill", "orange");}})
              // .on("mouseleave",function(){if(d3.select(this)._groups[0][0].style.fill=="red"){console.log("red")}else{d3.select(this).style("fill", "rgb("+150+","+150+","+150+")");};})
              // .on("click",function(){if(d3.select(this)._groups[0][0].style.fill=="red"){d3.select(this).style("fill", "rgb("+150+","+150+","+150+")");}else{d3.select(this).style("fill", "red")}})

  node.append("text")
      .attr("dy", ".31em")
      .attr("x", function(d) { return d.x < 180 === !d.children ? 6 : -6; })
      .style("text-anchor", function(d) { return d.x < 180 === !d.children ? "start" : "end"; })
      .attr("transform", function(d) { return "rotate(" + (d.x < 180 ? d.x - 90 : d.x + 90) + ")"; })
      .text(function(d) { return d.id.substring(d.id.lastIndexOf(".") + 1); });
});


function project(x, y) {
  var angle = (x - 90) / 180 * Math.PI, radius = y;
  return [radius * Math.cos(angle), radius * Math.sin(angle)];
}

// d3.select('#saghi-path').attr("d","m "+48.84165+","+59.067585+" c 0,0 -0.015,-0.765601 0.054,-1.8928 0.1306,-2.144131 3.7612,-5.59661 5.1703,-7.5768 2.1498,-3.02119 2.4201,-11.14906 3.8607,-9.44306 1.3387,1.18189 4.9062,4.31006 5.4351,5.94708 11.2468,4.525009 15.455,1.39727 24.2252,5.1559 l 12.093605,3.48782 6.861895,4.28395 0.834,0.454929 2.6538,10.122262 -2.5853,22.91728 c 0.569,8.771304 5.0668,10.464804 2.1241,18.758644 v 0 c 6.36181,-3.11125 15.49641,-6.38863 16.27021,-10.51304 0.1661,-0.799666 0.1,-1.646134 0.3412,-2.426306 0.3745,-1.209439 1.4471,-2.159219 1.6895,-3.401909 0.3378,-1.73232 -0.1288,-3.535799 -0.4005,-5.279721 -0.286,-1.83533 -0.553,-3.71584 -1.289,-5.421278 -0.4194,-0.971862 -1.5214,-1.618932 -1.7439,-2.653781 -0.1184,-0.550431 -0.063,-1.210519 0.2654,-1.668079 0.4743,-0.661522 1.3681,-0.952632 2.1609,-1.13733 0.9234,-0.215141 2.0166,-0.388332 2.8433,0.0758 0.2231,0.125261 0.3438,0.399319 0.417,0.64449 0.5644,1.88889 -0.2713,3.967121 0.038,5.91412 0.4307,2.711612 0.4711,6.00011 2.5021,7.84759 0.2201,0.200141 0.6358,0.009 0.872,0.18955 0.9156,0.700781 1.1664,1.999311 1.5923,3.070802 0.1359,0.341968 0.099,0.75515 0.3032,1.061508 0.5828,0.875731 1.7866,1.166781 2.4643,1.971371 0.725,0.860913 1.3873,1.858033 1.6301,2.957063 0.9512,4.30429 0.9323,9.18828 -0.9098,13.19304 -0.4668,1.01479 -1.3525,1.93278 -2.3884,2.35049 -1.0783,0.43478 -2.4542,0.49447 -3.4878,-0.0379 -0.5146,-0.26505 -0.6383,-0.97078 -1.0236,-1.40271 -1.3039,-1.46152 -3.0085,-2.52771 -4.3219,-3.98066 -0.466,-0.51561 -0.6077,-1.40504 -1.251,-1.66809 -0.5443,-0.22254 -1.4331,-0.23371 -1.7439,0.26538 l -5.0043,3.63943 -2.7675,2.00929 c -4.4938,2.3893 -8.3646,4.66679 -12.29601,7.75586 0,0 -3.17769,6.3091 -3.06289,14.51462 0.082,5.85281 9.45379,12.77347 3.1604,12.35206 -2.5298,-0.16941 -3.62091,-2.74 -3.62091,-2.74 -2.017493,8.01473 -13.22919,22.09281 -20.38559,27.48618 0,0 2.5887,1.14701 5.8762,9.09864 3.287397,7.95165 9.169897,30.41664 15.7102,35.26288 0,0 -2.753605,0.10672 -3.074203,1.36434 -0.2363,0.92699 0.849299,2.47925 5.333803,5.07495 -0.098,4.35127 -4.921003,15.65851 -7.200103,17.89594 -2.2792,2.23742 -5.7009,1.23585 -6.5616,-0.6085 0,0 2.641798,-0.0477 2.764999,-7.17318 0.044,-2.54559 0.1979,-6.11774 -0.807501,-10.74158 0,0 -0.1413,-1.41278 -2.451999,-0.0723 0,0 1.235099,-2.95793 -0.045,-6.10503 -2.420596,-5.95141 -8.331696,-14.08438 -8.331696,-14.08438 0,0 0.069,12.86931 1.0184,16.78971 0.9496,3.92041 2.5917,5.30111 2.3557,6.8668 -0.2361,1.56568 -1.1781,0.31386 -2.3781,2.69657 -1.1999,2.3827 4.2843,9.32189 2.0301,11.84571 -2.2542,2.52381 -4.1825,-0.39095 -7.3979,0.53068 -4.1337,2.61697 -8.09881,2.71929 -12.4444,1.57536 -4.34561,-1.14394 -3.8074,-2.05257 -3.8074,-2.05257 0,0 -0.5541,-1.27108 4.501,-0.39629 1.4231,0.24625 2.5837,-0.82447 4.115,-2.19483 1.5493,-1.38645 4.5147,-2.73254 5.0699,-3.6263 0.8246,-1.5086 0.7055,-3.8923 -0.038,-4.62515 l -1.6382,0.0101 c 1.1418,-15.66053 -8.8548,-49.15027 -8.5717,-50.63345 0.2878,-1.50804 -1.0417,-1.39536 -1.348,-3.23506 -0.3062,-1.83969 0.2567,-3.92561 0.4983,-7.66926 0.2417,-3.74365 -3.3147,-13.73669 4.7645,-32.34111 2.6838,-4.26856 6.5933,-7.14556 0.495,-8.05235 -4.6064,-0.56493 -12.41631,-8.90817 -14.9238,-14.8863 6.8202,1.82735 24.5722,7.68673 28.0243,-0.0216 -10.4391,-7.05461 -12.1185,-10.89677 -12.1185,-10.89677 -0.54981,-6.400077 8.333,-11.415307 7.4137,-16.310127 -0.096,-0.558848 -0.56,-1.23462 -1.7036,-1.593919 -1.2939,-0.17933 -2.6839,-2.642301 -5.4405,-1.371561 -0.9317,0.561721 -0.4561,-2.907508 -1.6326,-4.33847 -1.1765,-1.43096 -3.4848,-1.76289 -5.0687,-3.012178 -2.69161,-0.27078 -6.0719,-13.270682 -7.4217,-12.601112 11.1179,0.207631 17.4285,-14.3898 22.852,-6.51929 5.1621,7.832451 7.7659,6.20634 11.212897,6.55454 2.071801,0.26162 3.881601,1.963521 4.814199,3.546642 -6.274396,0.27686 -4.159999,2.620377 -4.691099,4.283829 -0.5562,1.741879 -3.541797,2.80874 -0.6461,3.19383 3.0236,0.402101 10.2767,-4.22793 9.973001,-4.31107 0,0 0.066,-4.95177 -1.3272,-7.48508 -2.935902,-2.10695 -9.698698,-4.716781 -13.771998,-6.900061 -4.0733,-2.18328 -9.8246,-2.97282 -12.8864,-2.98552 -0.6524,-0.003 -2.1143,-2.63484 -5.2227,-2.648169 -1.8138,0.478089 -3.751,-0.398491 -5.62141,-0.25693 -3.91109,0.358729 -12.09209,2.890469 -10.73869,5.128349 2.9587,4.89237 0.18009,3.219611 0.076,8.70678 -0.7039,36.959547 -1.07961,177.836717 -1.07961,177.836717 0,0 0.098,-120.26243 -0.086,-179.959627 -0.01,-1.5328 1.6226,-3.364059 1.2388,-4.4284 -0.8868,-2.45929 -1.2411,-1.307869 -1.2411,-1.307869 z")
                        // .transition()
                        // .attr("d","m "+48.84165+","+59.067585+" c 0,0 -0.015,-0.765601 0.054,-1.8928 0.1306,-2.144131 3.7612,-5.59661 5.1703,-7.5768 2.1498,-3.02119 2.4201,-11.14906 3.8607,-9.44306 1.3387,1.18189 4.9062,4.31006 5.4351,5.94708 11.2468,4.525009 15.455,1.39727 24.2252,5.1559 l 12.093605,3.48782 6.861895,4.28395 0.834,0.454929 2.6538,10.122262 -2.5853,22.91728 c 0.569,8.771304 5.0668,10.464804 2.1241,18.758644 v 0 c 6.36181,-3.11125 15.49641,-6.38863 16.27021,-10.51304 0.1661,-0.799666 0.1,-1.646134 0.3412,-2.426306 0.3745,-1.209439 1.4471,-2.159219 1.6895,-3.401909 0.3378,-1.73232 -0.1288,-3.535799 -0.4005,-5.279721 -0.286,-1.83533 -0.553,-3.71584 -1.289,-5.421278 -0.4194,-0.971862 -1.5214,-1.618932 -1.7439,-2.653781 -0.1184,-0.550431 -0.063,-1.210519 0.2654,-1.668079 0.4743,-0.661522 1.3681,-0.952632 2.1609,-1.13733 0.9234,-0.215141 2.0166,-0.388332 2.8433,0.0758 0.2231,0.125261 0.3438,0.399319 0.417,0.64449 0.5644,1.88889 -0.2713,3.967121 0.038,5.91412 0.4307,2.711612 0.4711,6.00011 2.5021,7.84759 0.2201,0.200141 0.6358,0.009 0.872,0.18955 0.9156,0.700781 1.1664,1.999311 1.5923,3.070802 0.1359,0.341968 0.099,0.75515 0.3032,1.061508 0.5828,0.875731 1.7866,1.166781 2.4643,1.971371 0.725,0.860913 1.3873,1.858033 1.6301,2.957063 0.9512,4.30429 0.9323,9.18828 -0.9098,13.19304 -0.4668,1.01479 -1.3525,1.93278 -2.3884,2.35049 -1.0783,0.43478 -2.4542,0.49447 -3.4878,-0.0379 -0.5146,-0.26505 -0.6383,-0.97078 -1.0236,-1.40271 -1.3039,-1.46152 -3.0085,-2.52771 -4.3219,-3.98066 -0.466,-0.51561 -0.6077,-1.40504 -1.251,-1.66809 -0.5443,-0.22254 -1.4331,-0.23371 -1.7439,0.26538 l -5.0043,3.63943 -2.7675,2.00929 c -4.4938,2.3893 -8.3646,4.66679 -12.29601,7.75586 0,0 -3.17769,6.3091 -3.06289,14.51462 0.082,5.85281 9.45379,12.77347 3.1604,12.35206 -2.5298,-0.16941 -3.62091,-2.74 -3.62091,-2.74 -2.017493,8.01473 -13.22919,22.09281 -20.38559,27.48618 0,0 2.5887,1.14701 5.8762,9.09864 3.287397,7.95165 9.169897,30.41664 15.7102,35.26288 0,0 -2.753605,0.10672 -3.074203,1.36434 -0.2363,0.92699 0.849299,2.47925 5.333803,5.07495 -0.098,4.35127 -4.921003,15.65851 -7.200103,17.89594 -2.2792,2.23742 -5.7009,1.23585 -6.5616,-0.6085 0,0 2.641798,-0.0477 2.764999,-7.17318 0.044,-2.54559 0.1979,-6.11774 -0.807501,-10.74158 0,0 -0.1413,-1.41278 -2.451999,-0.0723 0,0 1.235099,-2.95793 -0.045,-6.10503 -2.420596,-5.95141 -8.331696,-14.08438 -8.331696,-14.08438 0,0 0.069,12.86931 1.0184,16.78971 0.9496,3.92041 2.5917,5.30111 2.3557,6.8668 -0.2361,1.56568 -1.1781,0.31386 -2.3781,2.69657 -1.1999,2.3827 4.2843,9.32189 2.0301,11.84571 -2.2542,2.52381 -4.1825,-0.39095 -7.3979,0.53068 -4.1337,2.61697 -8.09881,2.71929 -12.4444,1.57536 -4.34561,-1.14394 -3.8074,-2.05257 -3.8074,-2.05257 0,0 -0.5541,-1.27108 4.501,-0.39629 1.4231,0.24625 2.5837,-0.82447 4.115,-2.19483 1.5493,-1.38645 4.5147,-2.73254 5.0699,-3.6263 0.8246,-1.5086 0.7055,-3.8923 -0.038,-4.62515 l -1.6382,0.0101 c 1.1418,-15.66053 -8.8548,-49.15027 -8.5717,-50.63345 0.2878,-1.50804 -1.0417,-1.39536 -1.348,-3.23506 -0.3062,-1.83969 0.2567,-3.92561 0.4983,-7.66926 0.2417,-3.74365 -3.3147,-13.73669 4.7645,-32.34111 2.6838,-4.26856 6.5933,-7.14556 0.495,-8.05235 -4.6064,-0.56493 -12.41631,-8.90817 -14.9238,-14.8863 6.8202,1.82735 24.5722,7.68673 28.0243,-0.0216 -10.4391,-7.05461 -12.1185,-10.89677 -12.1185,-10.89677 -0.54981,-6.400077 8.333,-11.415307 7.4137,-16.310127 -0.096,-0.558848 -0.56,-1.23462 -1.7036,-1.593919 -1.2939,-0.17933 -2.6839,-2.642301 -5.4405,-1.371561 -0.9317,0.561721 -0.4561,-2.907508 -1.6326,-4.33847 -1.1765,-1.43096 -3.4848,-1.76289 -5.0687,-3.012178 -2.69161,-0.27078 -6.0719,-13.270682 -7.4217,-12.601112 11.1179,0.207631 17.4285,-14.3898 22.852,-6.51929 5.1621,7.832451 7.7659,6.20634 11.212897,6.55454 2.071801,0.26162 3.881601,1.963521 4.814199,3.546642 -6.274396,0.27686 -4.159999,2.620377 -4.691099,4.283829 -0.5562,1.741879 -3.541797,2.80874 -0.6461,3.19383 3.0236,0.402101 10.2767,-4.22793 9.973001,-4.31107 0,0 0.066,-4.95177 -1.3272,-7.48508 -2.935902,-2.10695 -9.698698,-4.716781 -13.771998,-6.900061 -4.0733,-2.18328 -9.8246,-2.97282 -12.8864,-2.98552 -0.6524,-0.003 -2.1143,-2.63484 -5.2227,-2.648169 -1.8138,0.478089 -3.751,-0.398491 -5.62141,-0.25693 -3.91109,0.358729 -12.09209,2.890469 -10.73869,5.128349 2.9587,4.89237 0.18009,3.219611 0.076,8.70678 -0.7039,36.959547 -1.07961,177.836717 -1.07961,177.836717 0,0 0.098,-120.26243 -0.086,-179.959627 -0.01,-1.5328 1.6226,-3.364059 1.2388,-4.4284 -0.8868,-2.45929 -1.2411,-1.307869 -1.2411,-1.307869 z")
                        // .duration(3000)
var Arr_MazrabHa = [1,(2**(500/1200)),(2**(2*500/1200)),(2**((2*500+200)/1200)),(2**((2*500+200)/1200))*2**(500/1200),(2**((2*500+200)/1200))*2**(2*500/1200),(2**((2*500+200)/1200))*2**((200+2*500)/1200)]
var mainFrequency = 180;
var NavaDaramad = new Nava('nava-klids',620,150,7,0,8,"shur shur",mainFrequency*Arr_MazrabHa[0])
//const daramad1 = d3.select('#nava-klids').style("visibility","visible").style("top","100px").style("left","100px")
