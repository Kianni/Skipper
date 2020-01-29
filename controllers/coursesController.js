const mongoose = require("mongoose"),
  Course = require("../models/course"),
  User = require("../models/user"),
  httpStatus = require("http-status-codes"),
  getCourseParams = (body) => {
    return {
      title: body.title,
      description: body.description,
      maxStudents: body.maxStudents,
      cost: body.cost
    }
  };

  module.exports = {
    new: (req, res) => {
      res.render("courses/new");
    },
    create: (req, res, next) => {
      let courseParams = getCourseParams(req.body);

      Course.create(courseParams)
        .then( course => {
          res.locals.redirect = "/courses";
          res.locals.course = course;
          next();
        })
        .catch( error => {
          console.log(`Error saving course ${error.message}`);
          next(error);
        });
    },
    redirectView: (req, res, next) => {
      let redirectPath = res.locals.redirect
      if (redirectPath) res.redirect(redirectPath);
      else next();
    },
    index: (req, res, next) => {
      Course.find({})
        .then( courses => {
          res.locals.courses = courses;
          next();
        })
        .catch( error => {
          console.log(`Error fetching courses: ${error.message}`);
          next(error);
        });
    },
    indexView: (req, res) => {
      res.render("courses/index");
    },
    show: (req, res, next) => {
      let courseId = req.params.id;
      Course.findById(courseId)
        .then( course => {
          res.locals.course = course;
          next();
        })
        .catch(error => {
          console.log(`Error fetching course by ID: ${error.message}`);
          next(error);
        });
    },
    showView: (req, res) => {
      res.render("courses/show");
    },
    edit: (req, res, next) => {
      //откуда эти PARAMS????
      let courseId = req.params.id;
      Course.findById(courseId)
        .then( course => {
          // без косой линии должно быть,
          // т.к. это не путь для браузера, а адрес файла
          res.render("courses/edit", {
            course: course
          });
        })
        .catch ( error => {
          console.log(`Error fetching user by ID: ${error.message}`);
          next(error);
        })
    },
    update: (req, res, next) => {
      let courseId = req.params.id,
        courseParams = getCourseParams(req.body);

      Course.findByIdAndUpdate(courseId, {
        $set: courseParams
      })
        .then( course => {
          res.locals.course = course;
          res.locals.redirect = `/courses/${courseId}`;
          next();
        })
        .catch(error => {
          console.log(`Error updating course by ID: ${error.message}`);
          next(error);
        });
    },
    delete: (req, res, next) => {
      let courseId = req.params.id;
      Course.findByIdAndRemove(courseId)
        .then( course => {
          res.locals.redirect = "/courses"
          next();
        })
        .catch( error => {
          console.log(`Error deleting user by ID: ${error.message}`);
          next(error);
        });
    },

  respondJSON: (req, res) => {
    res.json({
      status: httpStatus.OK,
      data: res.locals
    });
  },

  errorJSON: (error, req, res, next) => {
    let errorObject;

    if (error) {
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      };
    } else {
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Unknown Error."
      };
    }

    res.json(errorObject);
  },

 join: (req, res, next) => {
    let courseId = req.params.id;
    currentUser = req.user;

    if (currentUser) {
      User.findByIdAndUpdate(currentUser, {
        $addToSet: {
          courses: courseId
        }
      })
      .then(() => {
        res.locals.success = true;
        next();
      })
      .catch(error => {
        next(error);
      });
    } else {
      // куда выводится это сообщение?
      next(new Error("User must log in."));
    }
  },

  filterUserCourses: (req, res, next) => {
    let currentUser = res.locals.currentUser;
    if (currentUser) {
      let mappedCourses = res.locals.courses.map((course) => {
        let userJoined = currentUser.courses.some((userCourse) => {
          return userCourse.equals(course._id);
        });
        return Object.assign(course.toObject(), { joined: userJoined });
      });
      res.locals.courses = mappedCourses;
      next();
    } else {
      next();
    }
  }


  }
