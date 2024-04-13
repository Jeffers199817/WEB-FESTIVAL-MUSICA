const { src, dest, watch, parallel } = require("gulp");

//CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
//src sirve para identificar un archivo, dest para guardar

// IMAGENES
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require('gulp-webp');
const avif = require("gulp-avif");

// JAVASCRIPT
const terser = require('gulp-terser-js');


function css(done) {
  src("src/scss/**/*.scss") //Identificar el archivo SASS
    .pipe(sourcemaps.init())
    .pipe(plumber()) //para no detener la ejecución pero si muestra el error
    .pipe(sass()) //Compilarlo
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest("build/css")); //Almacenando en el disco duro

  done(); //Callback que avisa a gulp que termino o llegamos al final
}

//IMAGENES CON ASYNC Y AWAIT IMPORT

function versionwebp(done) {
  const opciones = {
    quality: 50
  };
 
    src("src/img/**/*.{png,jpg}")
    .pipe(webp(opciones))
      .pipe(dest("build/img"));
  
  done();
}

function imagenes(done) {
  const opciones = {
    optimizationLevel: 3
  };
  src("src/img/**/*.{png,jpg}")
    .pipe(cache(imagemin(opciones)))
    .pipe(dest("build/img"));

  done();
}
function versionAvif(done) {
  const opciones = {
    quality: 50
  };
  src("src/img/**/*.{png,jpg}")
    .pipe(avif(opciones))
    .pipe(dest("build/img"));
  
  done();
}


function javascript(done) {
  
  src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/js'));
  
  done();


}

//automatizar la ejecución

function dev(done) {
  watch("src/scss/**/*.scss", css);
  watch("src/js/**/*.js", javascript);
  done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionwebp = versionwebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionwebp, versionAvif,javascript, dev);
//Para ejecutar escribe en la terminar "npm run css" o "npx gulp dev"
