const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber');
//src sirve para identificar un archivo, dest para guardar 


function css(done) {
  src("src/scss/**/*.scss") //Identificar el archivo SASS
    .pipe(plumber())//para no detener la ejecución pero si muestra el error
    .pipe(sass()) //Compilarlo
    .pipe(dest("build/css")); //Almacenando en el disco duro

  done(); //Callback que avisa a gulp que termino o llegamos al final
}


//automatizar la ejecución

function dev(done) {
    watch("src/scss/**/*.scss",css);
    done();
}


exports.css = css;
exports.dev = dev