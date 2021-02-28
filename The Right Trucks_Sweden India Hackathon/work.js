var la,lo,l,ll,name,lat1,lon1,lat2,lon2,dist,length,al,alt1,alt2,altdiff,length,elevation,flag,nm,nam,aa,agee,i,k;
var b=[];
var aa=[];
function working(){
    document.getElementById("spl").innerHTML="";
    event.preventDefault(); //without this line the truck name and other details just flash once on the html page and are then gone.

    flag=0;
    src= document.getElementById("truck").value;
    des= document.getElementById("truck2").value;
    console.log(src);
    console.log(des);
    if (src==des)
    {
        alert('The source and the destination cannot be the same');
        return;
    } 
    ll= latlon(src);
    console.log(ll);
    lat1=ll[0];
    lon1=ll[1];
    alt1=ll[2]

    ll= latlon(des);
    console.log(ll);
    lat2=ll[0];
    lon2=ll[1];
    alt2=ll[2]

    dist=getDistanceFromLatLng(lat1,lon1,lat2,lon2);
    dist= 1.3 * dist;
    console.log(dist);

    if (dist<100){
    length = "small";
    }
    else length= "long";

    if (alt1>100 || alt2>100){
        elevation="high";
    }
    else elevation="low";


    if (src == "Lonavala" || des == "Lonavala")
    {
        topology="hilly";
    }
    else topology="flat";

    if (length=="small" && elevation== "high" && topology== "hilly"){
        flag=1;
    }
    console.log("length ",length," elevation ",elevation, " topology ",topology,flag);

    if (flag==1){

        k = newest();
        console.log(b);
        nm= trucks[k].name;
        agee= trucks[k].age;

        console.log(nm);
        document.getElementById("spl").innerHTML = "This route has been identified as a CLUSTER A route. The fuel consumption factor is high. This route has a higher impact on CO2 emissions. The most fuel efficient and a relatively new truck will be assigned for this route";

    }

    else {
        i = (Math.floor(Math.random()*5));
        nm = trucks[i].name;
        agee = trucks[i].age;
        console.log('age is',agee);

    }
    console.log("final",nm);

    localStorage.setItem('len', length);
    document.getElementById("dist").innerHTML = localStorage.getItem('len');

    localStorage.setItem('ele', elevation);
    document.getElementById("elev").innerHTML = localStorage.getItem('ele');

    localStorage.setItem('top', topology);
    document.getElementById("topo").innerHTML = localStorage.getItem('top');

    localStorage.setItem('ag',agee);
    document.getElementById("agg").innerHTML = localStorage.getItem('ag');




    localStorage.setItem('nm', nm);
    nam= localStorage.getItem('nm');
    document.getElementById("name").innerHTML = nam;
    
}

let trucks = [
    {
        "name":"TATA YODDHA PICKUP",
        "age": 3,
        "weight-capacity": 750,    
    },
    {
        "name":"TATA ACE",
        "age": 2,
        "weight-capacity": 750,    
    },

    {
        "name":"TTata LPT 3723",
        "age": 6,
        "weight-capacity": 1500,    
    },

    {
        "name":"Eicher Pro 6000",
        "age": 10,
        "weight-capacity": 500,    
    },

    {
        "name":"ASHOK LEYLAND U 3718",
        "age": 1,
        "weight-capacity": 500,    
    },
]

function latlon(name){
    switch(name){
        
        case "Mumbai":
            la= 19.0759837;
            lo= 72.8776559;
            al=4;
            break;
        case "Lonavala":
            la= 18.7557237;
            lo= 73.4090757;
            al=628;
            break;
        case "Aurangabad":
            la= 19.8761653;
            lo= 75.3433139;
            al=591;
            break;
        case "Vashi":
            la= 18.7501386;
            lo= 73.0420662;
            al=4;
            break;
        case "Thane":
            la= 19.2183307;
            lo= 72.9780897;
            al= 13;
            break;
        case "Pune":
            la= 18.5204303;
            lo= 73.8567437;
            al= 560;
            break;        
        case "Karjat":
            la= 18.9102069;
            lo= 73.3282612;
            al= 46;
            break;
        case "Kolhapur":
            la= 16.7049873;
            lo= 74.2432527;
            al= 564;
            break;        
        case "Alibaug":
            la= 18.6583989;
            lo= 72.8773346;
            al= 6;
            break;
        case "Nashik":
            la= 19.9974533;
            lo= 73.7898022;
            al= 580;
            break;    
                
    }
    l=[la,lo,al];
    return(l);
}

/* Distance between two lat/lng coordinates in km using the Haversine formula */
function getDistanceFromLatLng(lat1, lng1, lat2, lng2, miles) { // miles optional
    if (typeof miles === "undefined"){miles=false;}
    function deg2rad(deg){return deg * (Math.PI/180);}
    function square(x){return Math.pow(x, 2);}
    var r=6371; // radius of the earth in km
    lat1=deg2rad(lat1);
    lat2=deg2rad(lat2);
    var lat_dif=lat2-lat1;
    var lng_dif=deg2rad(lng2-lng1);
    var a=square(Math.sin(lat_dif/2))+Math.cos(lat1)*Math.cos(lat2)*square(Math.sin(lng_dif/2));
    var d=2*r*Math.asin(Math.sqrt(a));
    if (miles){return d * 0.621371;} //return miles
    else{return d;} //return km
  }
  /* Copyright 2016, Chris Youderian, SimpleMaps, http://simplemaps.com/resources/location-distance
   Released under MIT license - https://opensource.org/licenses/MIT */ 
    
function newest()
{
    var smallest=1000;
    var index=-1;
    for(var i= 0 ;i<5;i++)
    {
        if (trucks[i].age < smallest) {
            smallest = trucks[i].age;
            index = i;
            console.log('index is ',index);
        }
    }
    console.log("smallest index = ",index);
    return(index);

}