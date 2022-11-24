const express = require("express");
const bodyparse = require("body-parser");
const fs = require("fs");
const e = require("express");
const port = 8000;
var app = express();
app.use(bodyparse.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.post("/submitting", (req, res) => {
  var id = req.body.id;
  var name = req.body.name;
  var address = req.body.address;
  var english = req.body.english;
  var maths = req.body.maths;
  var science = req.body.science;
  var punjabi = req.body.punjabi;
  var hindi = req.body.hindi;
  var total =
    parseInt(english) +
    parseInt(hindi) +
    parseInt(maths) +
    parseInt(science) +
    parseInt(punjabi);
  var average = total / 5;
  var grades =
    average > 90
      ? "A"
      : average > 80
      ? "B"
      : average > 70
      ? "C"
      : average > 60
      ? "D"
      : average > 33
      ? "E"
      : "F";
  fs.appendFile(
    "FormData.txt",
    "\n" +
      id +
      "\n" +
      name +
      "\n" +
      address +
      "\n" +
      english +
      "\n" +
      hindi +
      "\n" +
      punjabi +
      "\n" +
      maths +
      "\n" +
      science +
      "\n" +
      total +
      "\n" +
      average +
      "\n" +
      grades,

    (err) => {
      console.log("file create succesfully");
    }
  );
  res.redirect("/displayDetails");
});
app.get("/displayDetails", (req, res) => {
  var data = fs.readFileSync("FormData.txt", "utf-8");
  var ans = `<table style="margin:auto" border="1" bgcolor="#D6EEEE" cellpadding="10">
  <thead>
    <tr>
    <th>
      Student Id
    </th>
    <th>
      Name
    </th>
    <th>
      Address
    </th>
    <th>
      English
    </th>
    <th>
      Hindi
    </th>
    <th>
      Punjabi
    </th>
    <th>
      Maths
    </th>
    <th>
      Science
    </th>
    <th>
      Total Marks
    </th>
    <th>
      Average
    </th>
    <th>
      Grades
    </th>
  </th>
  </tr>
  </thead>
  <tbody>`;
  var i = 0;
  var flag = false;
  data.split(/\r?\n/).forEach((line) => {
    if (flag == false) {
      var b = line;
      flag = true;
    } else {
      i++;
      if (i == 1) {
        ans += "<tr>";
      }
      ans += `<td>${line}</td>`;

      if (i == 11) {
        ans += "</tr>";
        i = 0;
      }
    }
  });
  ans += "</td></tr></tbody></table>";
  res.send(ans);
});

app.listen(port, () => {
  console.log("Server is started at port: " + port);
});
