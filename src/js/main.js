var contactForm = $('#contactForm');
var contactFormStatus = $('#contact-form-status');

$('#feedback-submit').click(function(e) {
  e.preventDefault();
  // Submit the form using AJAX
  $.ajax({
    type: 'POST',
    url: contactForm.attr('action'),
    data: $('#formComments').text()
  }).done(function(response) {
    contactFormStatus
      .show()
      .html(response)
      .delay(1000)
      .fadeOut('slow');
  });
  alert('Thanks!');
});
