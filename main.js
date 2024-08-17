const btn = document.getElementById('button');

// Función para sanitizar las entradas del formulario usando DOMPurify
function sanitizeInput(input) {
    return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
}

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    btn.value = 'Sending...';

    const form = event.target;

    // Sanitizar los valores del formulario
    const sanitizedData = {
        from_name: sanitizeInput(form.from_name.value),
        message: sanitizeInput(form.message.value),
        email_id: sanitizeInput(form.email_id.value)
    };

    // Log sanitizado para verificación
    console.log('Sanitized Data:', sanitizedData);

    const serviceID = 'default_service';
    const templateID = 'template_c6mtj9h';

    // Enviar los datos sanitizados
    emailjs.send(serviceID, templateID, sanitizedData)
        .then(() => {
            btn.value = 'Send Email';
            alert('Sent!');
        }, (err) => {
            btn.value = 'Send Email';
            alert('Failed to send. Error: ' + JSON.stringify(err));
        });
});
