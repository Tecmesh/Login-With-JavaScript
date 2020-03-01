window.onload = function(e) { //Se ejecuta cuando el documento se carga.
    FormInit(); //Llama a esta función
    UserDataInit(); //Llama a esta función
};

/*
    Array de usuarios con los datos de cada usuario. Se inicializa vacio.
    Se crea afuera de cualquier función para que podamos usarlo en 
    cualquier función que pertenezca al documento.
*/
var users = [];

/*
    Función para establecer cada usuario en el buffer o memoria de JavaScript   
    Cada usuario tiene un Id, email, contraseña, nombre, un genero, un campo de activo
    para verificar si se le permite el acceso.
*/
function UserDataInit() {
    users = [

        {
            "id": 1,
            "username": "abrahamv09",
            "email": "abrahamv09@hotmail.com",
            "password": "password123",
            "name": "Abraham Velazquez",
            "gender": "M",
            "activo": true
        },

        {
            "id": 2,
            "username": "yeremy12",
            "email": "yeremy12@hotmail.com",
            "password": "password123",
            "name": "Jeremy Peguero",
            "gender": "M",
            "activo": true
        },

        {
            "id": 3,
            "username": "ronnieNFS",
            "email": "ronnieNFS@hotmail.com",
            "password": "password123",
            "name": "Ronnie Anonimo",
            "gender": "M",
            "activo": true
        },

        {
            "id": 4,
            "username": "junior01",
            "email": "junior01@hotmail.com",
            "password": "password123",
            "name": "Junior Oleaga",
            "gender": "M",
            "activo": true
        },

        {
            "id": 5,
            "username": "nissi10",
            "email": "nissi10@hotmail.com",
            "password": "password123",
            "name": "Nissi De Los Santos",
            "gender": "F",
            "activo": true
        },

        {
            "id": 6,
            "username": "karla21",
            "email": "karla21@hotmail.com",
            "password": "password123",
            "name": "Karla Mejía",
            "gender": "F",
            "activo": true
        }

    ];
}

/*
    Esta función verifica el Local Storage del navegador, para establecer los valores
    del campo de usuario y del checkbox de recordarme, en caso de que el usuario haya 
    decidido guardar el usuario en su ultimo inicio de sesión.
*/
function FormInit() {

    if (localStorage.getItem("username")) { //Si el valor con la clave "username" existe
        //Tomamos ese valor, y hacemos que el campo usuario del fomulario sea igual al campo guardado.
        var form = document.querySelector("form");
        form.elements.usuario.value = localStorage.getItem("username");

        //Establecemos el valor del checkbox.
        form.elements.recordarme.checked = true;
        form.elements.recordarme.value = "true";
    }
}

/*
    Esta función cambia el valor del checkbox cuando el usuario le de un click.
    (Esta función solo se ejecutará cuando el usuario le de un click al CheckBox).
*/
function VerifyCheck() {
    var checkbox = document.getElementById("recordarme");

    if (checkbox.checked) { //Si el checkbox esta encendido,
        // cambiar su valor a 'true'. Notar que es un string, no un booleano.
        checkbox.value = "true";

    } else { //De lo contrario,
        // cambiar su valor a 'false. Notar que es un string, no un booleano.
        checkbox.value = "false";
    }

}

/* 
    Buscamos el formulario en el documento y cuando se ejecute el evento 'Submit',
    ejecutamos una función anonima para validar los valores introducidos por el usuario
    y realizar el inicio de sessión.
*/
document.querySelector("form").onsubmit = function(e) { //El parametro 'e', hace referencia al evento.
    e.preventDefault(); //Hacemos que el formulario no envie la info a otra pagina.

    var usuario = e.target.elements.usuario.value; //Recuperamos el valor del input 'usuario'.
    var password = e.target.elements.contrasena.value; //Recuperamos el valor del input 'contrasena'.
    var recordarme = e.target.elements.recordarme.value; //Recuperamos el valor del input checkbox 'recordarme'.
    var url = e.target.action; //Recuperamos el valor de la url al cual debía ir el formulario.
    var isValid = false; //La cambiaremos a True, cuando el usuario y la contraseña sean correctos.
    var isActive = true; //La cambiaremos a false, si el campo activo del usuario es 'false' (boolean).
    var user = {}; //La usaremos para enviarla a otra función que la enviará a la pagina de destino.

    //Blucle for que recorre el array de 'users', pasando por cada usuario
    for (var i = 0; i < users.length; i++) {
        if (usuario == users[i].username && password == users[i].password) {
            //Si el usuario y la contraseña son correctos.
            isValid = true; //Hacemos que esta variable sea 'true'
            user = users[i]; //Hacemos que la variable 'user' sea igual, al usuario evaluado como correcto.

            if (!users[i].activo) { //si la propiedad activo de el usuario NO ES TRUE
                isActive = false;
            }
        }
    }

    if (isValid && isActive) { //En caso de 'isValid' y 'isActive' sea true (es un Booleano)
        //Ejecutamos la función 'RedirectWithData()' y le mandamos el usuario evaludado y la url del action formulario.
        RedirectWithData(user, url);

        if (recordarme == "true") { //Si el valor del checkbox es 'true' (un String, no Booleano)

            SetLocalStorage(usuario); // Llamamos a esta función y le enviarmos solo el usuario

        } else { //De lo contrario
            UnsetLocalStorage(); //Llamamos a esta función
        }

    } else if (!isActive) { //si 'isActive' NO ES TRUE (es booleano).
        // Le damos una alerta al usuario.
        alert("Su Cuenta esta Inactiva. Contacte con su Administrador.");

    } else { // Si 'isValid es False (es un Booleano)'
        // Le damos una alerta al usuario.
        alert("Usuario o Contraseña Incorrecto. Intente de Nuevo.");
    }
};

/* 
    Esta función crea un formulario en memoria, con datos los datos del usuario
    y los envia a la pagina de destino, establecida en la url.
*/
function RedirectWithData(user, url) {
    var form = document.createElement("form"); //Creamos un formulario (Esto es un elemento HTML).

    form.setAttribute("method", "get"); //Establecemos el metodo como "GET".
    form.setAttribute("action", url); //Establecemos la URL del action.

    /* 
        Creamos las variables, que serán los Inputs del formulario, y llamamos a una función, 
        que establecerá sus atributos.
    */
    var id = CreateFormElement("id", user.id);
    var username = CreateFormElement("username", user.username);
    var email = CreateFormElement("email", user.email);
    var name = CreateFormElement("name", user.name);
    var gender = CreateFormElement("gender", user.gender);

    //Añadimos los inputs al formulario.
    form.appendChild(id);
    form.appendChild(username);
    form.appendChild(email);
    form.appendChild(name);
    form.appendChild(gender);

    //añadimos el formulario al body del documento HTML
    document.body.appendChild(form);

    //Enviamos el formulario
    form.submit();

    //Borramos el formulario del Body del documento HTML. (Podemos Omitir esta linea).
    document.body.removeChild(form);
}

/*
    Esta función crea un elemento Input, establece su nombre y su valor, 
    y luego retorna el elemento input.
*/
function CreateFormElement(name, data) {
    var input = document.createElement("input");
    input.name = name;
    input.value = data;

    return input;
}

/* 
    Guarda el usuario en el LocalStorage del Navegador.
*/
function SetLocalStorage(usuario) {
    localStorage.setItem("username", usuario);
}

/* 
    Elimina el usuario en el LocalStorage del Navegador.
*/
function UnsetLocalStorage() {
    localStorage.removeItem("username");
}