// Lógica del frontend para manejar el login, registro y mostrar mensajes sin recargar la página.
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
    const formTitle = document.getElementById("form-title");
    const submitBtn = document.getElementById("submit-btn");
    const toggleLink = document.getElementById("toggle-link");
    const toggleMsg = document.getElementById("toggle-msg");
    const mensajeDiv = document.getElementById("mensaje");

    let isLoginMode = true;

    // Función para cambiar entre Login y Registro
    toggleLink.addEventListener("click", (e) => {
        e.preventDefault();
        isLoginMode = !isLoginMode;
        mensajeDiv.classList.add("hidden"); // Ocultar mensajes anteriores
        form.reset();

        if (isLoginMode) {
            formTitle.textContent = "Iniciar Sesión";
            submitBtn.textContent = "Ingresar";
            toggleMsg.textContent = "¿No tienes cuenta?";
            toggleLink.textContent = "Regístrate aquí";
            form.action = "/login";
        } else {
            formTitle.textContent = "Crear Cuenta";
            submitBtn.textContent = "Registrar y enviar correo";
            toggleMsg.textContent = "¿Ya tienes cuenta?";
            toggleLink.textContent = "Inicia sesión aquí";
            form.action = "/enviar-datos";
        }
    });

    // Interceptar el envío del formulario
    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // Evita que la página se recargue

        const formData = new FormData(form);
        const url = isLoginMode ? "/login" : "/enviar-datos";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData)
            });

            const data = await response.json(); // Esperamos un JSON del backend

            mensajeDiv.classList.remove("hidden", "success", "error");
            
            if (response.ok) {
                mensajeDiv.classList.add("success");
                mensajeDiv.textContent = data.mensaje;
                if (!isLoginMode) form.reset(); // Limpiar si se registró
            } else {
                mensajeDiv.classList.add("error");
                mensajeDiv.textContent = data.mensaje;
            }

        } catch (error) {
            mensajeDiv.classList.remove("hidden", "success");
            mensajeDiv.classList.add("error");
            mensajeDiv.textContent = "Error de conexión con el servidor.";
        }
    });
});