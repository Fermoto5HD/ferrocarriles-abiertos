# Flota Ferroviaria
Este es un proyecto personal el cual reúne las características y composiciones de las formaciones de la flota ferroviaria del Area Metropolitana de Buenos Aires. 
Estos datos se van a ir actualizando conforme a los cambios que se vayan realizando en el ámbito ferroviario. 

## Sobre la v2.x.x 
Esta versión es una reescritura total del proyecto, ya que decidí no mantener más la base en Polymer (v1.x.x), dado a la dificultad del uso y manejo de los elementos como iron-ajax, que dió mucho problema al querer pasar archivos CSV por parámetro. 

## ¿Qué tengo que hacer para ejecutarlo sin errores? 
* Montarlo en xampp o correrlo con ruby. 
* Instalar los módulos con `npm install`. 
* Instalar las dependencias con `bower install`. 

## Componentes utilizados 
* Angular v1.5.x 
* Angular -> Angular-route 
* Angular -> Angular-sanitize 
* Angular -> Angular-moment 
* jQuery 
* MomentJS
* MomentJS -> ES locale 
* FM5strap v1.x 
* Tether 

#Changelog
## v2.0.0.1 
* Cambios en README.md, actualización de textos. 

## v2.0.0
Versión final, se mergeará la nueva versión en master. La versión anterior quedará en el branch v1.x.x. 
* Script: Soporte de Moment vía Angular. 
* Layout: Agregados modals de foto expandida y esquemas.
* Line: Fixeo de bug en jumbotron. 

## v2.0.0-dev4
Cambios finales antes de lanzarse como versión final. 
* Layout: Accesos rápidos a las líneas desde el navbar. 
* Home: Botones diferenciados entre final, provisorio y no disponibles. 
* Line: Covers randomizados mediante Angular. 
* Line: Soporte de descarga de varios CSVs. 
* **Restante**:  Agregar soporte de Moment (en lo posible integrarlo con Angular)

## v2.0.0-dev3
Pre-versión estable. 
* Parser de la tabla mediante Angular. 
* Se agrega un formulario de feedback. 
* Retoques adicionales. 

## v2.0.0-dev2
* Cambios en scripts, vistas y elementos. 

## v2.0.0-dev1
* Carga inicial. Proyecto en pleno desarrollo 

## v1.x.x 
Para ver esa versión cambiá de branch a "v1.x.x". 

## Reutilización de archivos 
Sentite libre en utilizar los distintos archivos de este repositorio para lo que se te ocurra o para algún proyecto que tengas! 