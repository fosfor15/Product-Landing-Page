const projectFolder = 'dist';
const sourceFolder = 'src';

const path = {
    build: {
        html: projectFolder + '/',
        styles: projectFolder + '/styles/',
        img: projectFolder + '/img/'
    },
    source: {
        html: sourceFolder + '/*.html',
        styles: sourceFolder + '/styles/*.less',
        img: sourceFolder + '/img/*'
    },
    clean: './' + projectFolder + '/'
};

const gulp = require('gulp');
const { src, dest } = require('gulp');

const less = require('gulp-less');
const minifyCSS = require('gulp-clean-css');
const del = require('del');


function copyHTML() {
    return src( path.source.html )
           .pipe( dest( path.build.html ) );
}

function copyImg() {
    return src( path.source.img )
           .pipe( dest( path.build.img ) );
}

function transformStyles() {
    return src( path.source.styles )
           .pipe( less() )
           .pipe( minifyCSS({ format: 'beautify' }) )
           .pipe( dest( path.build.styles ) );
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

exports.copyHTML = copyHTML;
exports.copyImg = copyImg;
exports.transformStyles = transformStyles;
exports.build = build;
exports.default = build;
