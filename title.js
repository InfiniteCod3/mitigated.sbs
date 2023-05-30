var i=0;
setInterval(function(){
    var titles=[
"i have femboys in my basement",
"primordial enjoyer",
"never resolve user",
"ur mom enjoyer"
]

    if(i===titles.length) {
        i=0;
    }
    document.title = titles[i];
    i++;
}, 500);

