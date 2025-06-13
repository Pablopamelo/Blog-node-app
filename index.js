import express from "express";
import bodyParser from "body-parser";
import ejs, { render } from "ejs";

const app = express();

app.use(express.static("Public"));

const port = 3000;

app.use(bodyParser.urlencoded( {extended: true} ));

let logs = new Array;

let j = 0;

let one_time_id;

let edit = false;
let create = false;

class log{
    constructor(title, description, content, date){
        this.title = title;
        this.description = description;
        this.content = content;
        this.date = date;
    }
}

app.set('view engine', 'ejs');

app.get("/", (req,res) => {
    res.render("home.ejs");
});

app.get("/blog", (req,res) => {
    let iterations = logs.length;
    res.render("blog.ejs", {iterations, logs});
});

app.get(`/log/:id`, (req,res) => {
    let log_id = req.params.id;
    let title = logs[log_id]["title"];
    let content = logs[log_id]["content"];
    let date = logs[log_id]["date"];
    res.render("log", {title, content, date, log_id});
});

app.get(`/log/:id/edit`, (req,res) => {
    let log_id = req.params.id;
    one_time_id = log_id;
    let title = logs[log_id]["title"];
    let content = logs[log_id]["content"];
    let description = logs[log_id]["description"];
    edit = true;
    res.render("addLog.ejs", {title, description ,content});
});

app.get(`/log/:id/delete`, (req,res) => {
    let log_id = req.params.id;
    let iterations = logs.length;
    j--;
    res.render("blog.ejs", {iterations, logs});
    logs.splice(log_id,1);
});

app.get("/addlog", (req,res) => {
    create = true;
    res.render("addlog.ejs");
});

app.post("/blog/submit", (req,res) => {
    let iterations = logs.length;
    let date = new Date;
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes();
    if(hour < 10) {hour = "0" + hour};
    if(minute < 10) {minute = "0" + minute};
    if(month < 10) {month = "0" + month};
    if(day < 10) {day = "0" + day};
    let fulldate = day + "." + month + "." + year + " | " + hour + ":" + minute;

    if(!edit && create){
        create = false;
        let title = req.body["title"];
        let description = req.body["description"];
        let content = req.body["content"];
        logs[j] = new log(title, description, content, fulldate);
        res.render("blog.ejs", {iterations, logs});
        j++;
    }else{
        edit = false;
        let title = req.body["title"];
        let description = req.body["description"];
        let content = req.body["content"];
        let fulldate = day + "." + month + "." + year + " | " + hour + ":" + minute;
        logs[one_time_id]["title"] = title;
        logs[one_time_id]["description"] = description;
        logs[one_time_id]["content"] = content;
        logs[one_time_id]["date"] = fulldate;
        res.render("blog.ejs", {iterations, logs});
    }

    one_time_id = 0;

});

app.get("/contact", (req,res) => {
    res.render("contact.ejs");
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});