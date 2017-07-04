function inicio()
{
    DOM.ready( function()
    {
        var obj = document.getElementById( "contenido" );
        inicializarObjs();
        formatData( obj );
        constraintsData( obj );
        validateData( obj );
    } );
}

function inicializarObjs()
{
    initObjs( document.getElementById( "contenido" ) );
    initObjsSelectMultiple( document.getElementById( "objList" ),
                            document.getElementById( "objSelected" ) );
}

function valEnvio()
{
    if ( validateObjs( document.getElementById( "contenido" ) ) ) {
        alert( "Exito: Formulario validado correctamente..." );
    }
}
