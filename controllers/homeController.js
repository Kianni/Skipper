exports.welcome = (req, res) => {
  res.render("index");
};

var courses = [
  {
    title: "Sailng in the nigth time",
    cost: 200
  },
  {
    title: "Motorboat skills",
    cost: 120
  },
  {
    title: "Man-over-board exercises",
    cost: 45
  }

];

exports.showCourses = (req, res) => {
  res.render("courses", {
    offeredCourses: courses
  });
};

exports.showPhoto = (req, res) => {
  res.sendFile(`./public/images/waves.jpg`,{
    root: "./"
  });
};
