const projectFolder = 'dist';
const sourceFolder = 'src';

const path = {
    build: {
        html: `${projectFolder}/`,
        styles: `${projectFolder}/styles/`,
        img: `${projectFolder}/img/`
    },
    source: {
        html: `${sourceFolder}/*.html`,
        styles: `${sourceFolder}/styles/*.less`,
        img: `${sourceFolder}/img/*`
    },
    clean: `./${projectFolder}/`
};

const gulp = require('gulp');
const { src, dest } = require('gulp');

const less = require('gulp-less');
const minifyCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const del = require('del');


function copyHTML() {
    return src( path.source.html )
           .pipe( dest( path.build.html ) )
           .pipe( browserSync.stream() );
}

function copyImg() {
    return src( path.source.img )
           .pipe( dest( path.build.img ) );
}

function transformStyles() {
    return src( path.source.styles )
           .pipe( less() )
           .pipe( minifyCSS({ format: 'beautify' }) )
           .pipe( dest( path.build.styles ) )
           .pipe( browserSync.stream() );
}

function initBrowserSync() {
    browserSync.init({
        server: {
            baseDir: `./${projectFolder}/`
        },
        port: 2000,
        notify: false
    });
}

function watchFiles() {
    gulp.watch( path.source.html, copyHTML );
    gulp.watch( path.source.styles, transformStyles );
}

function clean() {
    return del( path.clean );
}


const build = gulp.series(
    clean,
    gulp.parallel(
        copyHTML,
        copyImg,
        transformStyles
    )
);

const watch = gulp.parallel(
    build,
    watchFiles,
    initBrowserSync
);

module.exports = {
    default: build,
    build,
    watch,
    copyHTML,
    copyImg,
    transformStyles,
};
