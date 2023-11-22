const gulp = require("gulp");
const exec = require("gulp-exec");
const nodemon = require("gulp-nodemon");

gulp.task("webpack", (done) => {
  exec("yarn build");
  done();
});

gulp.task("distWatcher", (done) => {
  nodemon({
    exec: "dist/bundle.js",
    watch: "dist",
    ext: "js",
  });
  done();
});

gulp.task("default", gulp.series("webpack", "distWatcher"));
