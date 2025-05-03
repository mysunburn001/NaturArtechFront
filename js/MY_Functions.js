var myBase_url = "https://www.naturartech.com/Admin/"
var EstadoSesion;

function ValidateUserLogin(){

    var Membresia = $("#Membresia").val();

    $('#PreloaderLogin').show();
    $("#BotonLogin").attr('disabled',true);
    $("#BotonPanelRegistro").attr('disabled',true);

    if (Membresia != "") {

        $.ajax({
            url:myBase_url+"index.php/Session/validateloginweb",
            type:'POST',
            data:{Membresia:Membresia},
            async: true,
            timeout: 15000,
            success:function(datos){

                var obj = JSON.parse(datos); 
                var sp = obj.split("-");

                if(sp[0] == "OK"){

                    $('#PreloaderLogin').hide();
                    $("#BotonLogin").attr('disabled',false);
                    $("#BotonPanelRegistro").attr('disabled',false);
                    window.location.href = myBase_url+"index.php/"+sp[1];
    
                }else if(obj == "UWOA"){

                    $('#PreloaderLogin').hide();
                    $("#BotonLogin").attr('disabled',false);
                    $("#BotonPanelRegistro").attr('disabled',false);
                    swal("Error","Usuario sin acceso a la aplicacion","error");

                }else if(obj == "IUOP"){

                    $('#PreloaderLogin').hide();
                    $("#BotonLogin").attr('disabled',false);
                    $("#BotonPanelRegistro").attr('disabled',false);
                    swal("Error","Usuario o contraseña incorrecta" ,"error");

                } else if(obj == "UWAS"){

                    $('#PreloaderLogin').hide();
                    $("#BotonLogin").attr('disabled',false);
                    $("#BotonPanelRegistro").attr('disabled',false);
                    swal("Error","Usuario con sesion activa","error");
                }


            },error:function(status){

                var CodigoError = status.status;
                var DescripcionError = status.statusText;
                var Origen = "Login"
                GuardaErrorSession(CodigoError,DescripcionError,Origen);
            
                if (status.statusText=="timeout") {

                    swal({   
                        title: "Error",
                        text: "Tu dispositivo no esta conectado a internet o la conexion es muy lenta.\n Porfavor intentelo de nuevo",   
                        type: "error",   
                        showCancelButton: false,   
                        confirmButtonColor: "#DD6B55",   
                        confirmButtonText: "OK",   
                        cancelButtonText: "Cancelar",   
                        closeOnConfirm: true,   
                        closeOnCancel: false 
                    }, function(isConfirm){ 
                        $('#PreloaderLogin').hide();
                        $("#BotonLogin").attr('disabled',false);
                        $("#BotonPanelRegistro").attr('disabled',false);       
                    }); 
                        
                }else if(status.statusText=="Not Found"){
        
                    $('#PreloaderLogin').hide();
                    $("#BotonLogin").attr('disabled',false);
                    $("#BotonPanelRegistro").attr('disabled',false);
                    swal('Error',"La pagina que busca no existe" ,'error' );
        
                }else if(status.statusText=="Internal Server Error"){
        
                    $('#PreloaderLogin').hide();
                    $("#BotonLogin").attr('disabled',false);
                    $("#BotonPanelRegistro").attr('disabled',false);
                    swal('Error','Ha ocurrido un error interno del servidor, porfavor contacte al administrador del sitio', 'error');
        
                }else{
        
                    $('#PreloaderLogin').hide();
                    $('#BotonLogin').removeAttr('disabled');
                    $("#BotonPanelRegistro").attr('disabled',false);
                    swal('Error', 'Ha ocurrido un error desconocido, porfavor contacte al administrador del sitio','error');
                }
            }
        });
    
    }else{

        $('#PreloaderLogin').hide();
        $("#BotonLogin").attr('disabled',false);
        $("#BotonPanelRegistro").attr('disabled',false);
        swal("Cuidado", "Aun quedan campos vacios", "warning")
    }

}

function LogOut(){

    $.ajax({
        url:myBase_url+"index.php/Session/logout",
        type:'GET',
        async: true,
        success:function(datos){
            swal({   
                title: "Error",
                text: "La sesion expiro, porfavor ingrese de nuevo",   
                type: "error",   
                showCancelButton: false,   
                confirmButtonColor: "#DD6B55",   
                confirmButtonText: "OK",   
                cancelButtonText: "Cancelar",   
                closeOnConfirm: false,   
                closeOnCancel: false 
            }, function(isConfirm){ 
                    location.href = myBase_url+"index.php/Session";       
            });     
        }
    });   
}


function CheckUActivo(){

    $.ajax({
        url:myBase_url+"index.php/Session/EstadoU",
        type:'GET',
        async: true,
        success:function(datos){
            var obj = JSON.parse(datos);

            if(obj != ""){
                console.log("Cuenta Activa");
            }else{
                $.ajax({
                    url:myBase_url+"index.php/Session/logout",
                    type:'GET',
                    async: true,
                    success:function(datos){
                        swal({   
                            title: "Error",
                            text: "Tu cuenta ha sido eliminada, para mas informacion contacte al administrado del sitio",   
                            type: "error",   
                            showCancelButton: false,   
                            confirmButtonColor: "#DD6B55",   
                            confirmButtonText: "OK",   
                            cancelButtonText: "Cancelar",   
                            closeOnConfirm: false,   
                            closeOnCancel: false 
                        }, function(isConfirm){ 
                                location.href = myBase_url+"index.php/Session";       
                        }); 
                    }
                });
            }  
        }
    });

} 


/* END - CONTROLLER: Session */

/* START - CONTROLLER: Dashboard */


/* END - CONTROLLER: Dashboard */

/* =============================================================================================================================================================================================================================== */

/* START - CONTROLLER: Citas */


/* END - CONTROLLER: Citas */

/* =============================================================================================================================================================================================================================== */

/* START - CONTROLLER: Productos */

/* END - CONTROLLER: Productos */


/* START - CONTROLLER: Categorias */

/* END - CONTROLLER: Categorias */

/* =============================================================================================================================================================================================================================== */

/* START - CONTROLLER: Reportes */

/* END - CONTROLLER: Reportes */

/* =============================================================================================================================================================================================================================== */

/* START - CONTROLLER: Clientes */

function RevisaTelefonoCliente(){

    var Telefono = $("#Telefono").val();
    var LargoTelefono = Telefono.length;

    if (LargoTelefono<10 || LargoTelefono>10) {

        swal("Error","El telefono proporcionado es mas largo o corto que 10 digitos, porfavor intentelo de nuevo","error");
        $("#Telefono").val("");
    }
    
}

function RevisaCorreoCliente(){

    var CadenaValida = "[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})";
    var Correo = $("#Correo").val();

     if (!Correo.match(CadenaValida)) {

        swal("Error","El correo proporcionado no es un correo electrónico válido, proporcione un correo válido.","error");
        $("#Correo").val("");

     }

}

function RegistroCliente(){

    $("#PreloaderRegistro").show();
    $("#BotonRegistro").attr('disabled',true);

    var NombreCliente = $("#Nombre").val();
    var ApPaternoCliente = $("#Apaterno").val();
    var ApMaternoCliente = $("#Amaterno").val();
    var TelefonoCliente = $("#Telefono").val();
    var CorreoCliente = $("#Correo").val();
    var FechaNCliente = $("#FechaNCliente").val();

    if(NombreCliente!="" && ApPaternoCliente!="" && ApMaternoCliente!="" && TelefonoCliente!="" && CorreoCliente!="" && FechaNCliente!=""){

        GuardaClienteS(); 
    }else{

        $('#PreloaderRegistro').hide();
        $("#BotonRegistro").attr('disabled',false);
        swal("Cuidado","Aun hay campos vacios","warning");
    }
}

function GuardaClienteS(){

    var NombreCliente = $("#Nombre").val();
    var ApPaternoCliente = $("#Apaterno").val();
    var ApMaternoCliente = $("#Amaterno").val();
    var TelefonoCliente = $("#Telefono").val();
    var CorreoCliente = $("#Correo").val();
    var FechaNCliente = $("#FechaNCliente").val();

    $.ajax({
        url:myBase_url+"index.php/Session/GuardaClienteC",
        type:"POST",
        data:{NombreCliente:NombreCliente,ApPaternoCliente:ApPaternoCliente,ApMaternoCliente:ApMaternoCliente,TelefonoCliente:TelefonoCliente,CorreoCliente:CorreoCliente,FechaNCliente:FechaNCliente},
        async:true,
        timeout: 15000,
        success:function(datos){

            $('#PreloaderRegistro').hide();
            $("#BotonRegistro").attr('disabled',false);

            var Objeto = JSON.parse(datos)

            if(Objeto=="True"){

                swal({   
                    title: "Error",
                    text: "Ya existe un usuario registrado con el correo/telefono proporcionado por favor intente de nuevo",   
                    type: "error",   
                    showCancelButton: false,   
                    confirmButtonColor: "#DD6B55",   
                    confirmButtonText: "OK",   
                    cancelButtonText: "Cancelar",   
                    closeOnConfirm: true,   
                    closeOnCancel: false 
                }, function(isConfirm){ 
                           
                }); 

            }else{

                var Cambio = "Registro";
                var Origen = "ClientesWeb";
                var Contenido = FechaNCliente;
                GuardaCambioCliente(Cambio,Origen,Contenido);
                
                swal({   
                    title: "Exito",
                    text: "Su registro ha sido guardado exitosamente, su numero de membresia ha sido enviada a su correo electronico",   
                    type: "success",   
                    showCancelButton: false,   
                    confirmButtonColor: "#DD6B55",   
                    confirmButtonText: "OK",   
                    cancelButtonText: "Cancelar",   
                    closeOnConfirm: true,   
                    closeOnCancel: false 
                }, function(isConfirm){ 
                        $('#modal-login').modal('hide');   
                        
                        $("#Nombre").val("");
                        $("#Apaterno").val("");
                        $("#Amaterno").val("");
                        $("#Telefono").val("");
                        $("#Correo").val("");
                        $("#FechaNCliente").val("");

                        $("#RegistroClientes").hide();
                        $("#LoginTab").show();
                }); 
            }

        },error:function(status){

            var CodigoError = status.status;
            var DescripcionError = status.statusText;
            var Origen = "GuardaClienteWeb"
            GuardaErrorCliente(CodigoError,DescripcionError,Origen);
        
            if (status.statusText=="timeout") {

                swal({   
                    title: "Error",
                    text: "Tu dispositivo no esta conectado a internet o la conexion es muy lenta.\n Porfavor intentelo de nuevo",   
                    type: "error",   
                    showCancelButton: false,   
                    confirmButtonColor: "#DD6B55",   
                    confirmButtonText: "OK",   
                    cancelButtonText: "Cancelar",   
                    closeOnConfirm: true,   
                    closeOnCancel: false 
                }, function(isConfirm){ 
                    $('#PreloaderRegistro').hide();
                    $('#BotonRegistro').removeAttr('disabled');      
                });
                    
            }else if(status.statusText=="Not Found"){
    
                $('#PreloaderRegistro').hide();
                $('#BotonRegistro').removeAttr('disabled');
                swal('Error',"La pagina que busca no existe" ,'error' );
    
            }else if(status.statusText=="Internal Server Error"){
    
                $('#PreloaderRegistro').hide();
                $('#BotonRegistro').removeAttr('disabled');
                swal('Error','Ha ocurrido un error interno del servidor, porfavor contacte al administrador del sitio', 'error');
    
            }else{
    
                $('#PreloaderRegistro').hide();
                $('#BotonRegistro').removeAttr('disabled');
                swal('Error', 'Ha ocurrido un error desconocido, porfavor contacte al administrador del sitio','error');
            }
        }

    });

}


/* END - CONTROLLER: Clientes */

/* START - CONTROLLER: Usuarios */

/* END - CONTROLLER: Usuarios */

/* START: ErrorLog/ChangeLog */

function GuardaErrorSession(CodigoError,DescripcionError,Origen){

    $.ajax({
        url:myBase_url+"index.php/Session/GuardaErrorSC",
        type:'POST',
        data:{CodigoError:CodigoError,DescripcionError:DescripcionError,Origen:Origen},
        async: true,
        success:function(datos){

        },error:function(datos){

        }

    });
}

function GuardaCambioCliente(Cambio,Origen,Contenido){

    $.ajax({
        url:myBase_url+"index.php/Session/GuardaCambioCliC",
        type:'POST',
        data:{Cambio:Cambio,Origen:Origen,Contenido:Contenido},
        async: true,
        success:function(datos){

        },error:function(datos){

        }

    });
}

function GuardaErrorCliente(CodigoError,DescripcionError,Origen){

    $.ajax({
        url:myBase_url+"index.php/Session/GuardaErrorCliC",
        type:'POST',
        data:{CodigoError:CodigoError,DescripcionError:DescripcionError,Origen:Origen},
        async: true,
        success:function(datos){

        },error:function(datos){

        }

    });
}

/* END: ErrorLog/ChangeLog */
