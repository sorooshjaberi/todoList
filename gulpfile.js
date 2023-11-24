// const gulp = require("gulp");
// const exec = require("gulp-exec");
// const nodemon = require("gulp-nodemon");
import gulp from "gulp";
import exec from "gulp-exec";
import nodemon from "gulp-nodemon";

gulp.task("webpack", (done) => {
  exec("yarn build");
  done();
});

gulp.task("distWatcher", (done) => {
  nodemon({
    exec: "dist/bundle.js",
    watch: "src/index.js",
    ext: "js",
  });
  done();
});

gulp.task("default", gulp.series("webpack", "distWatcher"));
