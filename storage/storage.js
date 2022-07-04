
function incrementLocal(){
    var a=localStorage.getItem('localCount')??0;
    localStorage.setItem('localCount',parseInt(a)+1);
    document.getElementById('local').innerHTML=localStorage.getItem('localCount').toString();
}

function decrementLocal(){
    var a=localStorage.getItem('localCount')??0;
    localStorage.setItem('localCount', parseInt(a)-1);
    document.getElementById('local').innerHTML=localStorage.getItem('localCount').toString();
}

function incrementSession(){
    var a=sessionStorage.getItem('sessionCount')??0;
    sessionStorage.setItem('sessionCount', parseInt(a)+1);
    document.getElementById('session').innerHTML=sessionStorage.getItem('sessionCount').toString();
}

function decrementSession(){
    var a=sessionStorage.getItem('sessionCount')??0;
    sessionStorage.setItem('sessionCount', parseInt(a)-1);
    document.getElementById('session').innerHTML=sessionStorage.getItem('sessionCount').toString();
}

function values(){
    document.getElementById('local').innerHTML=localStorage.getItem('localCount')??0;
    document.getElementById('session').innerHTML=localStorage.getItem('sessionCount')??0;
}