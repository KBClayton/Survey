app.get("/api/people", function(req, res) {
    return res.json(people);
});

app.post("/api/people", function(req, res) {
    var newpeople= req.body;
    console.log(newpeople);
    for(var i=0; i<people.length; i++){
        for(var r=0;r<10;r++){
            diff+=Math.abs(people[i].answers[r]-newpeople.answers[r]);
        }
        if(outsidediff>diff){
            indexer=i;
        }
    }
    people.push(newpeople);
    res.json(people[indexer]);
});