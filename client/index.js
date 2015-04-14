/* global pokedex:true */
/* jshint camelcase:false */

'use strict';

$(document).ready(init);

function init(){
  $('#pokedex').on('click', '.pokemon', getPokemon);
  drawPokedex();
}

function getPokemon(){
  var $self = $(this);
  var domain = 'http://pokeapi.co/';
  var uri = $(this).data('uri');
  var url = domain + uri;
  $.getJSON(url, function(response){

    console.log(response);

    var $ul = $self.find('ul');
    var attributes = ['attack', 'defense', 'exp', 'hp'];
    var $lis = attributes.map(function(attribute){
      return '<li>' + attribute + ':' + response[attribute] + '</li>'
    });
    $ul.append($lis);

    var spriteUrls = response.sprites.map(function(o){
      return domain + o.resource_uri;
    });

    spriteUrls.forEach(function(url){
      $.getJSON(url, function(response){

        $self.children('.image').css('background-image', 'url("'+domain + response.image+'")');
      });
    });
  });
}

function drawPokedex(){
  pokedex.pokemon.forEach(function(pokemon){
    var $outer = $('<div>');
    var $name = $('<div>');
    var $image = $('<div>');
    var $stats = $('<div>');

    $outer.addClass('pokemon');
    $outer.attr('data-uri', pokemon.resource_uri);
    $name.addClass('name');
    $name.text(pokemon.name);
    $image.addClass('image');
    $stats.addClass('stats');

    var $ul = $('<ul>');
    $stats.append($ul);

    $outer.append($name, $image, $stats);
    $('#pokedex').append($outer);
  });
}
