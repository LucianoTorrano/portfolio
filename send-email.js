const btn = document.getElementById('button');


document.getElementById('form')
        .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Sending...';

   const serviceID = 'default_service';
   const templateID = 'template_2xc43b2';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Enviar mensaje';
      //alert('Sent!');
      window.location.href= 'success-email.html';
    }, (err) => {
      btn.value = 'Enviar mensaje';
      //alert(JSON.stringify(err));
      window.location.href= 'error-email.html';
    });
});