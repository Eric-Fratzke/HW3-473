(function(window) {
  'use strict';
  var App = window.APP || {};
  var $ = window.jQuery;

  function FormHandler(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }
    this.$formElement = $(selector);

    if (this.$formElement.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  FormHandler.prototype.addSubmitHandler = function(fn) {
    console.log('Setting submit handler for form');
    this.$formElement.on('submit', function(event) {

      event.preventDefault();
      var data = {};
      $(this).serializeArray().forEach(function(item) {
        data[item.name] = item.value;
        console.log(item.name + ' is ' + item.value);
      });
      console.log(data);
      fn(data);
      this.reset();
      this.elements[0].focus();
    });
  };

  $('#payment-form').on('submit', function(event) {
    event.preventDefault();

    var data = {};
    $(this).serializeArray().forEach(function(item) {
      data[item.name] = item.value;
      console.log(item.name + ' is ' + item.value);
    });

    $('#thankYou').text('Thank you for your payment, ' + data.title + ' ' + data.username);
    $('#modalBox').modal({});

    this.reset();
    this.elements[0].focus();
  });

  $('#payform').on('click', function(event) {
    event.preventDefault();
    location.assign('payment-form.html');
    this.reset();
    this.elements[0].focus();
  });

  App.FormHandler = FormHandler;
  window.App = App;
})(window);
