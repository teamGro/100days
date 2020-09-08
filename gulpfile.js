const gulp = require("gulp");
const less = require("gulp-less");
const concat = require("gulp-concat");
var cssmin = require("gulp-cssmin");
const sourcemaps = require("gulp-sourcemaps");
const gulpIf = require("gulp-if");
const del = require("del");
const browserSync = require("browser-sync").create();
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");
const rollup = require("gulp-rollup");
const minify = require("gulp-minify");
const remember = require("gulp-remember");
//const imagemin = require("gulp-imagemin");
//const pngquant = require("imagemin-pngquant");
//const webp = require("gulp-webp");
const htmlmin = require("gulp-htmlmin");

let isDevelopment =
    !process.env.NODE_ENV || process.env.NODE_ENV == "development";

gulp.task("less", () => {
    return (
        gulp
            .src("src/styles/**/*.less", { since: gulp.lastRun("less") })
            .pipe(
                plumber({
                    errorHandler: notify.onError(function (err) {
                        return {
                            title: "less",
                            message: err.message
                        };
                    })
                })
            )
            .pipe(gulpIf(isDevelopment, sourcemaps.init()))
            .pipe(remember())
            .pipe(less())
            .pipe(concat("styles.css"))
            .pipe(gulpIf(isDevelopment, sourcemaps.write()))
            //.pipe(cssmin())
            .pipe(gulp.dest("public/styles"))
    );
});

gulp.task("js", () => {
    return gulp
        .src("src/scripts/**/*.js")
        .pipe(
            plumber({
                errorHandler: notify.onError(err => {
                    return {
                        title: "js",
                        message: err.message,
                        err: err
                    };
                })
            })
        )
        .pipe(gulpIf(isDevelopment, sourcemaps.init()))
        .pipe(
            rollup({
                input: "./src/scripts/main.js",
                output: {
                    format: "iife"
                }
            })
        )
        .pipe(gulpIf(isDevelopment, sourcemaps.write()))
        .pipe(minify())
        .pipe(gulp.dest("./public/js"));
});

gulp.task("clean", () => {
    return del(["public/styles", "public/js"]);
});

gulp.task("copy", () => {
    return gulp
        .src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("public"));
});

gulp.task("watch", () => {
    gulp.watch("src/**/*.less", gulp.series("less"));
    gulp.watch("src/*.html", gulp.series("copy"));
    gulp.watch("src/scripts/**/*.js", gulp.series("js"));
});

gulp.task(
    "build",
    gulp.series("clean", gulp.parallel("less", "copy", "js"))
);

gulp.task("serve", () => {
    browserSync.init({
        server: "public"
    });

    gulp.watch("public/**/*.*").on("change", browserSync.reload);
});

gulp.task("dev", gulp.series("build", gulp.parallel("watch", "serve")));