(function(){
    emailjs.init("SRATUoTWMDVFXQ6X6");  // your Public Key
})();

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        // Show sending message
        status.style.display = "block";
        status.className = "";
        status.innerText = "⏳ Sending...";

        // First: send to yourself (admin)
        emailjs.sendForm("service_8fccfhb", "template_wvk37ox", form)
        .then(() => {
            // Then: send thank-you email to user
            return emailjs.sendForm("service_8fccfhb", "template_uyf8v5f", form);
        })
        .then(() => {
            // Success
            status.className = "success";
            status.innerText = "✅ Message sent successfully! Thank you for contacting me.";
            form.reset();

            // Auto-hide after 5s
            setTimeout(() => {
                status.style.display = "none";
            }, 5000);
        })
        .catch((error) => {
            // Error
            status.className = "error";
            status.innerText = "❌ Failed to send message. Please try again.";
            console.error("EmailJS Error:", error);
        });
    });
});
