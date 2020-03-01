window.onload = function(e) { //Se ejecuta cuando el documento se carga.
    ReadUser(); //Llamamos a esta función
};

/* 
    Lee los parametros de la barra de dirección para recuperar el usuario 
    y usarlo en el documento.
*/
function ReadUser() {

    // Organiza los parametros que vienen en la barra de direcciones del navegador
    var params = new URLSearchParams(window.location.search);

    /*
        Cambiaremos el valor de esta variable, dependiendo si el genero del usuario es M o F.
        Por defecto es M. La url es de una imagen de avatar de un hombre.
    */
    var imgUrl = "https://www.w3schools.com/howto/img_avatar.png";

    /*
        Creamos un objeto user, y establecemos sus propiedades, 
        de acuerdo a los valores que vengan en los parametros.
    */
    var user = {
        "id": params.get("id"),
        "username": params.get("username"),
        "email": params.get("email"),
        "name": params.get("name"),
        "gender": params.get("gender")
    };

    if (user.gender === "F") {
        //Si el genero del usuario, es F, cambiamos la url a un avatar de mujer.
        imgUrl = "https://www.w3schools.com/howto/img_avatar2.png";
    }

    //Establecemos la propiedad 'SRC' de la imagen en el documento HTML a nuestra 'imgUrl'
    document.getElementById("card-img").src = imgUrl;

    //Recuperamos el div con la clase '.container', del documento HTML
    var card = document.querySelector(".container");

    //Cremos elementos HTML, cambiamos su HTML interno, su estilo y lo añadimos al 'card'.
    var nombre = document.createElement("h4");
    nombre.innerHTML = "<b> " + user.name + "</b>";
    nombre.style.margin = "0";
    card.appendChild(nombre);

    var username = document.createElement("p");
    username.innerHTML = "<b>Usuario :</b> " + user.username;
    username.style.fontSize = "1rem";
    card.appendChild(username);

    var email = document.createElement("p");
    email.innerHTML = "<b>Correo Electrónico :</b> " + user.email;
    email.style.fontSize = "1rem";
    card.appendChild(email);

}