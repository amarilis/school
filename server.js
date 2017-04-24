var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 3000));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});


app.use('/', express.static(path.join(__dirname, '/')));


app.get('/read/:fileName', function(req, res) {
    var fileJSON = req.params["fileName"]+'.json';
    fs.readFile(path.join(__dirname, 'data', fileJSON), function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(JSON.parse(data));
    });
});


app.get('/schedule', function (req, res) {

    var rooms = fs.readFileSync(path.join(__dirname, 'data', 'rooms.json'), 'utf8');
    var lectures = fs.readFileSync(path.join(__dirname, 'data', 'lectures.json'), 'utf8');
    var schools = fs.readFileSync(path.join(__dirname, 'data', 'schools.json'), 'utf8');
    var readers = fs.readFileSync(path.join(__dirname, 'data', 'readers.json'), 'utf8');

    res.render(
        'schedule',{
            title: 'school',
            rooms: JSON.parse(rooms),
            lectures: JSON.parse(lectures),
            schools: JSON.parse(schools),
            readers: JSON.parse(readers)
        }
    );

});


app.post('/add-edit/:fileName', function(req, res) {
    var fileJSON = req.params["fileName"]+'.json';
    fs.readFile(path.join(__dirname, 'data', fileJSON), function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var dataFront = JSON.parse(data);

        switch (req.params["fileName"]) {
            case 'lectures':
                var newRecord = {
                    "lecturesName": req.body.lecturesName,
                    "readerName": req.body.readerName.split(','),
                    "schoolName": req.body.schoolName.split(','),
                    "roomName": req.body.roomName,
                    "date": +req.body.date,
                    "time": req.body.time,
                    "videoLink": req.body.videoLink,
                    "presentation": req.body.presentation,
                    "Id": req.body.Id
                };
                break;

            case 'schools':
                var newRecord = {
                    "schoolName": req.body.schoolName,
                    "studentsCount": req.body.studentsCount,
                    "Id": req.body.Id
                };
                break;

            case 'rooms':
                var newRecord = {
                    "roomName": req.body.roomName,
                    "capacity": req.body.capacity,
                    "locate": req.body.locate,
                    "Id": req.body.Id
                };
                break;
        }




        //console.log(req.body);

        var existingArr = dataFront.filter(function(obj) {
            return obj.Id == req.body.Id;
        });

        if (existingArr.length > 0){
            dataFront.splice(dataFront.indexOf(existingArr[0]), 1, newRecord);
            fs.writeFile(path.join(__dirname, 'data', fileJSON), JSON.stringify(dataFront, null, 2), function(err) {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
                res.json(dataFront);
            });
        } else {
            dataFront.push(newRecord);
            fs.writeFile(path.join(__dirname, 'data', fileJSON), JSON.stringify(dataFront, null, 4), function(err) {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
                res.json(dataFront);
            });
        }

    });
});




app.use(function (req, res) {
    res.status(404).send('Page Not Found Sorry');
});


app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});