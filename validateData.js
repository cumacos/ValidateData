 /*Autor: Ernesto Jiménez @fdsoil */

/** Restringe las entradas de datos contenidos dentro de un elemento HTML.
* Los elementos contenedores pueden ser por ejemplo: FORM, DIV, TABLE, SECTION...
* Las entradas son recibidas en elementos tales como INPUT, SELECT y TEXTAREA.
* Para que estas entradas sean RESTRINGIDAS deben tener el atributo respectivo 'data-constraints'.
* Ver también: {@link formatData}, {@link validateData}, {@link initObjs}.
* @param obj (object) Elemento contenedor de las entradas de datos. Ejemplo: FORM, DIV, TABLE, SECTION....*/
function constraintsData(obj)
{
    var aEvents = [ "onkeypress" ];
    this.acceptOnlyRegExp = function( e, strRegExp )
    {
        var tecla = ( document.all ) ? e.keyCode : e.which;
        if ( tecla == 8 )
            return true;
        var patron = strRegExp;
        var te;
        te = String.fromCharCode( tecla );
        return patron.test( te );
    }
    /* Accepts Only Letters. */
    var fLetter = "return acceptOnlyRegExp( event, /[a-zA-Z]/ );";
    addSetAttributeInGroup( obj.querySelectorAll( "[data-constraints=letter]" ), aEvents, fLetter );
    /* Accepts Only Numbers. */
    var fNumber = "return acceptOnlyRegExp( event, /[0-9]/ );";
    addSetAttributeInGroup( obj.querySelectorAll( "[data-constraints=number]" ), aEvents, fNumber );
    /* Accepts Only Numbers and Letters. */
    var fCode = "return acceptOnlyRegExp( event, /[0-9a-zA-Z]/ );";
    addSetAttributeInGroup( obj.querySelectorAll( "[data-constraints=code]" ), aEvents, fCode );
    /* Accepts Letters, Blanks, Points and Commas. */
    var fFullName = "return acceptOnlyRegExp( event, /[a-zA-Z\\s.,]/ );";
    addSetAttributeInGroup( obj.querySelectorAll( "[data-constraints=fullname]" ), aEvents, fFullName );
    /* Accepts Letters, Blanks, Points, Commas and Parentheses. */
    var fTextArea = "return acceptOnlyRegExp( event, /[0-9a-zñA-ZÑ\\s.,()]/ );";
    addSetAttributeInGroup( obj.querySelectorAll( "[data-constraints=textarea]" ), aEvents, fTextArea );
    /* Accepts Letters, Blanks, Points, Commas, Parentheses and Ampersand. */
    var fFirmName = "return acceptOnlyRegExp( event, /[0-9a-zA-Z\\s.,()&]/ );";
    addSetAttributeInGroup( obj.querySelectorAll( "[data-constraints=firmname]" ), aEvents, fFirmName);
    /* Accepts Numbers, Letters, Points And Underscore. */
    var fUserName = "return acceptOnlyRegExp( event, /[0-9a-zA-Z._]/ );";
    addSetAttributeInGroup( obj.querySelectorAll( "[data-constraints=username]"), aEvents, fUserName );
    /* Accepts Numbers, Letters, Points, Underscore, Guión And Arroba. */
    var fEmail = "return acceptOnlyRegExp( event, /[0-9a-zA-Z.@_-]/ );";
    addSetAttributeInGroup( obj.querySelectorAll( "[data-constraints=email]" ), aEvents, fEmail);
    /* Accepts Numbers, 2 Points, Aa, Pp and Mm. */
    var fTime = "return acceptOnlyRegExp( event, /[0-9AaMmPp:]/ );";
    addSetAttributeInGroup( obj.querySelectorAll( "[data-constraints=time]" ), aEvents, fTime);
    /* Accepts Numbers and guión ("-"). */
    var fDate = "return acceptOnlyRegExp( event, /[0-9-]/ );";
    addSetAttributeInGroup( obj.querySelectorAll( "[data-constraints=date]" ), aEvents, fDate);
} 

/** Formatea las entradas de datos contenidos dentro de un elemento HTML.
* Los elementos contenedores pueden ser por ejemplo: FORM, DIV, TABLE, SECTION...
* Las entradas son recibidas en elementos tales como INPUT, SELECT y TEXTAREA.
* Para que estas entradas sean formateadas deben tener el atributo respectivo 'data-format'.
* Ver también: {@link constraintsData}, {@link validateData}, {@link initObjs}.
* @param obj (object) Elemento contenedor de las entradas de datos. Ejemplo: FORM, DIV, TABLE, SECTION....*/
function formatData(obj)
{
    var aEvents = [ "keyup" ];
    addEventListenerInGroup
    (
        obj.querySelectorAll("[data-format=uppercase]"), aEvents, function(event){this.value = this.value.toUpperCase();}
    );
    addSetAttributeInGroup(obj.querySelectorAll("[data-format=uppercase]"), "style" , "text-transform: uppercase");

    aEvents = [ "keyup" ];
    addEventListenerInGroup
    (
        obj.querySelectorAll("[data-format=lowercase]"), aEvents, function(event){this.value = this.value.toLowerCase();}
    );
    addSetAttributeInGroup(obj.querySelectorAll("[data-format=lowercase]"), "style" , "text-transform: lowercase");

    aEvents = [ "onkeypress" ];
    var fInt = "return formato_numeric(this, '.', ',', event);";
    addSetAttributeInGroup(obj.querySelectorAll("[data-format=integer]"), aEvents, fInt);
    addSetAttributeInGroup(obj.querySelectorAll("[data-format=integer]"), [ "style" ], "text-align:right");

    aEvents = [ "onkeypress" ];
    var fFloat = "return formato_float(this, '.', ',', event);";
    addSetAttributeInGroup(obj.querySelectorAll("[data-format=float]"), aEvents, fFloat);
    addSetAttributeInGroup(obj.querySelectorAll("[data-format=float]"), [ "style" ], "text-align:right");

    aEvents = [ "onkeypress" ];
    var fFloat3d = "return formato_float_3d(this, '.', ',', event);";
    addSetAttributeInGroup(obj.querySelectorAll("[data-format=float_3d]"), aEvents, fFloat3d);
    addSetAttributeInGroup(obj.querySelectorAll("[data-format=float_3d]"), [ "style" ], "text-align:right");
}

/** Agrega eventos de validación a las entradas de datos contenidos dentro de un elemento HTML.
* Los elementos contenedores pueden ser por ejemplo: FORM, DIV, TABLE, SECTION...
* Las entradas son recibidas en elementos tales como INPUT, SELECT y TEXTAREA.
* Para agregar los eventos de validación, deben tener el atributo respectivo 'data-validation'.
* Ver también: {@link constraintsData}, {@link formatData}, {@link initObjs}.
* @param obj (object) Elemento contenedor de las entradas de datos. Ejemplo: FORM, DIV, TABLE, SECTION....*/
function validateData(obj)
{
    var aEventsInput = [ "keyup", "blur", "focus" ];
    var aEventsSelect = [ "change", "blur"];
    var aEventsSelectMultiple = [ "dblclick", "blur", "focus" ];
    var aEventsRadio = [ "click" ];
    var oFun = function() { valObj(this); };
    var oFunRadio = function() { valObjs(this.name); };
    addEventListenerInGroup(obj.querySelectorAll("input[data-validation=required]"), aEventsInput, oFun);
    addEventListenerInGroup(obj.querySelectorAll("input[data-validation=length]"), aEventsInput, oFun);
    addEventListenerInGroup(obj.querySelectorAll("input[data-validation=email]"), aEventsInput, oFun);
    addEventListenerInGroup(obj.querySelectorAll("input[data-validation=float]"), aEventsInput, oFun);
    addEventListenerInGroup(obj.querySelectorAll("input[data-validation=float_3d]"), aEventsInput, oFun);
    addEventListenerInGroup(obj.querySelectorAll("input[data-validation=integer]"), aEventsInput, oFun);
    addEventListenerInGroup(obj.querySelectorAll("input[data-validation=date]"), aEventsInput, oFun);
    addEventListenerInGroup(obj.querySelectorAll("input[data-validation=time]"), aEventsInput, oFun);
    addEventListenerInGroup(obj.querySelectorAll("input[data-validation=radio]"), aEventsRadio, oFunRadio);
    addEventListenerInGroup(obj.querySelectorAll("textarea[data-validation=textarea]"), aEventsInput, oFun);
    addEventListenerInGroup(obj.querySelectorAll("select[data-validation=select]"), aEventsSelect, oFun);
    addEventListenerInGroup(obj.querySelectorAll("select[data-validation=select-small]"), aEventsSelect, oFun);
    addEventListenerInGroup(obj.querySelectorAll("select[data-validation=select-multiple]"), aEventsSelectMultiple, oFun);
}

/** Valida las entradas de datos contenidos dentro de un elemento HTML.
* Los elementos contenedores pueden ser por ejemplo:
* FORM, DIV, TABLE...
* Las entradas son recibidas en objetos tales como INPUT, SELECT y TEXTAREA.
* Para que estas entradas sean validadas deben tener los atributos respectivos definidos en jQryValidateData().
* @param obj (object) Elemento HTML contenedor de las entradas de datos.
* @return (boolean) Devuelve TRUE si no está definida la clase 'error' (css) dentro del contenedor (elemento HTML),
* de lo contrario devuelve FALSE.*/
function validateObjs(obj)
{
    var objsSelect = obj.getElementsByTagName( "select" );
    for ( var i = 0; i < objsSelect.length; i++ )
       valObj( objsSelect[i] );
    var objsTextArea = obj.getElementsByTagName( "textarea" );
    for ( var i = 0; i < objsTextArea.length; i++ )
       valObj( objsTextArea[i] );
    var objsInput = obj.getElementsByTagName( "input" );
    var objsRadioCheck = [];
    var k = 0;
    for ( var i = 0; i < objsInput.length;i++)
        if ( objsInput[i].getAttribute( "type" ) != "button"
        && objsInput[i].getAttribute( "type" ) != "submit"
        && objsInput[i].getAttribute( "type" ) != "radio"
        && objsInput[i].getAttribute( "type" ) != "checkbox"
        && objsInput[i].getAttribute( "data-validation" ) != null )
            valObj( objsInput[i] );
        else if ( objsInput[i].getAttribute( "type" ) == "radio" )
            objsRadioCheck[k++] = objsInput[i];
    if ( objsRadioCheck.length > 0 ) {
        var key = 0;
        var keyAux = 0;
        var strRadioCheckName = objsRadioCheck[0].name;
        var mObjsRadioCheck = [];
        mObjsRadioCheck[key] = [];
        mObjsRadioCheck[key][keyAux++] = objsRadioCheck[0];
        for ( var i = 1; i < objsRadioCheck.length; i++ )
            if ( strRadioCheckName == objsRadioCheck[i].name ) {
               while ( strRadioCheckName == objsRadioCheck[i].name ) {
                    mObjsRadioCheck[key][keyAux++] = objsRadioCheck[i++];
                    if ( i == objsRadioCheck.length )
                        break;
                }
                if ( i == objsRadioCheck.length )
                    break;
                else {
                    strRadioCheckName = objsRadioCheck[i--].name;
                    keyAux = 0;
                    mObjsRadioCheck[++key] = [];
                }
            }
            for ( var i = 0; i < mObjsRadioCheck.length; i++ )
                valObjsRadioCheck( mObjsRadioCheck[i] );
    }
    return ( obj.getElementsByClassName( "error" ).length == 0 );
}

/** Valida el dato contenido en un elemento HTML. Dicho elemento puede ser: INPUT, SELECT o TEXTAREA.
* Para que el elemento sea validado debe tener el atributo respectivo definidos en jQryValidateData().
* Si el elemento no cumple con la validación, la clase 'error' (css) es asignada al elemento. De lo contrario
* dicha clase es removida.
* @param obj (object) Elemento HTML contenedor del dato.*/
function valObj(obj)
{
    if ( obj.getAttribute( "data-validation" ) == "required" )
        ( obj.value == '' ) ? displayErrorMsg( obj, ' Campo Requerido' ) : removeErrorMsg(obj);
    else if ( obj.getAttribute( "data-validation" ) == "length" ) {
        if ( obj.getAttribute( "data-validation-length" ) != null )
            ( obj.value.length != obj.getAttribute( "data-validation-length" ) )
            ? displayErrorMsg( obj, ' Deben ser ' + obj.getAttribute( "data-validation-length" ) + ' caracteres ')
            : removeErrorMsg(obj);
        else if ( obj.getAttribute( "data-validation-min" ) != null )
            ( obj.value == '' || obj.value.length < obj.getAttribute( "data-validation-min" ) )
            ? displayErrorMsg( obj, ' Debe ser mayor o igual a ' + obj.getAttribute( "data-validation-min" ) + ' caracteres ')
            : removeErrorMsg(obj);
        else if ( obj.getAttribute( "data-validation-max" ) != null )
            ( obj.value == '' || obj.value.length > obj.getAttribute( "data-validation-max" ) )
            ? displayErrorMsg( obj, ' Debe ser menor o igual a ' + obj.getAttribute( "data-validation-max" ) + ' caracteres ')
            : removeErrorMsg(obj);
        else if ( obj.getAttribute( "data-validation-min-max" ) != null ) {
            var arr = obj.getAttribute( "data-validation-min-max" ).split('-');
            ( obj.value == '' || ( obj.value.length < arr[0] || obj.value.length > arr[1] ) )
            ? displayErrorMsg( obj, ' Debe ser entre '
                + obj.getAttribute( "data-validation-min-max" ).replace('-', ' y ') + ' caracteres ')
            : removeErrorMsg(obj);
        }
    } else if ( obj.getAttribute( "data-validation" ) == "integer" )
        if ( obj.getAttribute( "data-validation-min" ) != null )
            ( valInt(obj) == false )
            ? displayErrorMsg( obj, ' Indique un valor numérico' )
            : !( valMoreThan(obj) )
                ? displayErrorMsg( obj, ' Indique número mayor o igual a ' + obj.getAttribute( "data-validation-min" ) )
                : removeErrorMsg(obj);
        else if ( obj.getAttribute( "data-validation-max" ) != null )
            ( valInt(obj) == false )
            ? displayErrorMsg( obj, ' Indique un valor numérico' )
            : !( valLessThan(obj) )
                ? displayErrorMsg( obj, ' Indique número menor o igual a ' + obj.getAttribute( "data-validation-max" ) )
                :removeErrorMsg(obj);
        else if ( obj.getAttribute( "data-validation-min-max" ) != null )
            ( valInt(obj) == false)
            ? displayErrorMsg( obj, ' Indique un valor numérico' )
            : !( valMoreAndLessThan(obj) )
                ? displayErrorMsg( obj, ' Indique número entre ' + obj.getAttribute( "data-validation-min-max" ).replace('-', ' y '))
                : removeErrorMsg(obj);
        else
            (valInt(obj)==false)?displayErrorMsg(obj, ' Indique valor numérico' ):removeErrorMsg(obj);
    else if ( obj.getAttribute( "data-validation" ) == "float" || obj.getAttribute( "data-validation" ) == "float_3d" )
        if ( obj.getAttribute( "data-validation-min" ) != null )
            ( valFloat(obj) == false )
            ? displayErrorMsg( obj, ' Indique un valor numérico' )
            : !( valMoreThan(obj) )
                ? displayErrorMsg( obj, ' Indique número mayor o igual a ' + obj.getAttribute( "data-validation-min" ) )
                : removeErrorMsg(obj);
        else if ( obj.getAttribute( "data-validation-max" ) != null )
            ( valFloat(obj) == false )
            ? displayErrorMsg( obj, ' Indique un valor numérico' )
            : !( valLessThan(obj) )
                ? displayErrorMsg( obj, ' Indique número menor o igual a ' + obj.getAttribute( "data-validation-max" ) )
                : removeErrorMsg(obj);
        else if ( obj.getAttribute( "data-validation-min-max" ) != null )
            ( valFloat(obj) == false )
            ? displayErrorMsg( obj, ' Indique un valor numérico' )
            : !( valMoreAndLessThan(obj) )
                ? displayErrorMsg( obj, ' Indique número entre ' + obj.getAttribute( "data-validation-min-max" ).replace('-', ' y '))
                : removeErrorMsg(obj);
        else
            ( valFloat(obj) == false )
            ? displayErrorMsg( obj, ' Indique valor numérico' )
            : removeErrorMsg(obj);
    else if ( obj.getAttribute( "data-validation" ) == "date" )
        if ( obj.getAttribute( "data-validation-min" ) != null )
            ( valDate(obj) == false )
            ? displayErrorMsg( obj, ' Formato de Fecha Invalida' )
            : !( valMoreThan(obj) )
                ? displayErrorMsg( obj, ' Indique fecha mayor o igual a ' + obj.getAttribute( "data-validation-min" ) )
                : removeErrorMsg(obj);
        else if ( obj.getAttribute( "data-validation-max" ) != null )
            ( valDate(obj) == false )
            ? displayErrorMsg( obj, ' Formato de Fecha Invalida' )
                : ! ( valLessThan(obj) )
                ? displayErrorMsg( obj, ' Indique fecha menor o igual a ' + obj.getAttribute( "data-validation-max" ) )
                : removeErrorMsg(obj);
        else if ( obj.getAttribute( "data-validation-min-max" ) != null )
            ( valDate(obj) == false )
            ? displayErrorMsg( obj, ' Formato de Fecha Invalida' )
            : !( valMoreAndLessThan(obj) )
                ? displayErrorMsg( obj, ' Indique fecha entre ' + obj.getAttribute( "data-validation-min-max" ).replace('/', ' y '))
                : removeErrorMsg(obj);
        else
            ( valDate(obj) ==false )
            ? displayErrorMsg(obj, ' Formato de Fecha Invalida' )
            :removeErrorMsg(obj);
    else if ( obj.getAttribute( "data-validation" ) == "time" )
        if ( obj.getAttribute( "data-validation-min" ) != null )
            ( valTime(obj) == false )
            ? displayErrorMsg( obj, ' Formato de Hora Invalido' )
            : !( valMoreThan(obj) )
                ? displayErrorMsg( obj, ' Indique Hora mayor o igual a ' + obj.getAttribute( "data-validation-min" ) )
                : removeErrorMsg(obj);
        else if ( obj.getAttribute( "data-validation-max" ) != null )
            ( valTime(obj) == false )
            ? displayErrorMsg( obj, ' Formato de Hora Invalido' )
            : !( valLessThan(obj) )
                ? displayErrorMsg( obj, ' Indique Hora menor o igual a ' + obj.getAttribute( "data-validation-max" ) )
                :removeErrorMsg(obj);
        else if ( obj.getAttribute( "data-validation-min-max" ) != null )
            ( valTime(obj) == false )
            ? displayErrorMsg( obj, ' Formato de Hora Invalido' )
            : !( valMoreAndLessThan(obj) )
                ? displayErrorMsg( obj, ' Indique Hora entre ' + obj.getAttribute( "data-validation-min-max" ).replace('/', ' y '))
                : removeErrorMsg(obj);
        else
            ( valTime(obj) == false )
            ? displayErrorMsg( obj, ' Formato de Hora Invalido' )
            : removeErrorMsg(obj);
    else if ( obj.getAttribute( "data-validation" ) == "email" )
        ( valEmail(obj.value) == false ) ? displayErrorMsg(obj, 'Formato de Correo Invalido' ) : removeErrorMsg(obj);
    else if ( obj.getAttribute( "data-validation" ) == "url" )
        ( valURL(obj.value) == false ) ? displayErrorMsg( obj, 'Formato de URL Invalido' ) : removeErrorMsg(obj);
    else if ( obj.getAttribute( "data-validation" ) == "select" )
        ( obj.selectedIndex == 0 ) ? displayErrorMsg( obj, 'Seleccione un Item' ) : removeErrorMsg(obj);
    else if ( obj.getAttribute( "data-validation" ) == "select-small" )
        ( obj.selectedIndex==0 ) ? displayErrorMsg( obj, 'Selec...' ): removeErrorMsg(obj);
    else if ( obj.getAttribute( "data-validation" ) == "select-multiple" )
        ( obj.length==0 ) ? displayErrorMsg( obj, 'Seleccionar Item(s)' ) : removeErrorMsg(obj);
    else if ( obj.getAttribute( "data-validation" ) == "textarea" )
        ( obj.value == '') ? displayErrorMsg(obj, 'Texto Requerido' ) : removeErrorMsg(obj);
}

/** Valida que un elemento TABLE, tenga como mínimo el número de filas (elemento TR)
* definida con el atributo (data-validation-min). Para que la tabla sea validada debe tener también
* el atributo: (data-validation='table'). Si el elemento no cumple con la validación, la clase 'error'
* (css) es asignada, de lo contrario, es removida.
* @param obj (object) Elemento TABLE. Tabla a ser validada.*/
function valObjTable(obj)
{
    if ( obj.getAttribute( "data-validation" ) == "table" ) {
        if ( valTable( obj, obj.getAttribute( "data-validation-min" ) ) == false ) {
            displayErrorMsgTable( obj, 'Debe agregar mínimo ' + obj.getAttribute( "data-validation-min" ) + ' Item(s)' );
            return false;
        } else {
            removeErrorMsgTable(obj);
            return true;
        }
    }
}

/** Valida que el valor de un elemento sea tipo FLOAT (double precision).
* @param obj (object) Elemento que contiene el valor a ser validado.
* @return (boolean) Devuelve FALSE si no cumple con la condición, de lo contrario devuelve TRUE.*/
function valFloat(obj)
{
    return ( isNaN( parseFloat( obj.value.replace(/\./g, '').replace(',', '.') ) ) ) ? false : true;
}

/** Valida que el valor de un elemento sea tipo INTEGER.
* @param obj (object) Elemento que contiene el valor a ser validado.
* @return (boolean) Devuelve FALSE si no cumple con la condición, de lo contrario devuelve TRUE.*/
function valInt(obj)
{
    var x = obj.value.replace(/\./g, '');
    var y = parseInt(x);
    if ( isNaN(y) )
        return false;
    return x == y && x.toString() == y.toString();
}

/** Valida que el valor de un elemento sea mayor o igual que el contenido del atributo 'data-validation-min'.
* Para que el elemento sea validado debe tener también el atributo: ('data-validation') con su valor respectivo
* ('integer'; 'float'; 'date'; 'time').
* @param obj (object) Elemento que contiene el valor a ser validado.
* @return (boolean) Devuelve FALSE si no cumple con la condición, de lo contrario devuelve TRUE.*/
function valMoreThan(obj)
{
    if ( obj.getAttribute( "data-validation" ) == "integer"
    || obj.getAttribute( "data-validation" ) == "float"
    || obj.getAttribute( "data-validation" )=="float_3d" )
        return ( ( obj.value.replace(/\./g, '').replace(',', '.') * 1 ) >= ( obj.getAttribute( "data-validation-min" ) * 1 ) );
    else if ( obj.getAttribute( "data-validation" ) == "date" )
        return ( ( obj.value.replace(/\-/g, '') * 1 ) >= ( obj.getAttribute( "data-validation-min" ).replace(/\-/g, '') * 1 ) );
    else if ( obj.getAttribute( "data-validation" ) == "time")
        return ( ( chkHour00To24( timeNormalToMilitar( obj.value ) ).replace(/\:/g, '') * 1 )
            >= ( chkHour00To24( timeNormalToMilitar( obj.getAttribute( "data-validation-min" ) ) ).replace(/\:/g, '') * 1 ) );
}

/** Valida que el valor de un elemento sea menor o igual que el contenido del atributo 'data-validation-max'.
* Para que el elemento sea validado debe tener también el atributo: ( 'data-validation' ) con su valor respectivo
* ('integer'; 'float'; 'date'; 'time').
* @param obj (object) Elemento que contiene el valor a ser validado.
* @return (boolean) Devuelve FALSE si no cumple con la condición, de lo contrario devuelve TRUE.*/
function valLessThan(obj)
{
    if ( obj.getAttribute( "data-validation" ) == "integer"
    || obj.getAttribute( "data-validation" ) == "float"
    || obj.getAttribute( "data-validation" ) == "float_3d" )
        return ( ( obj.value.replace(/\./g, '').replace(',', '.') * 1 ) <= ( obj.getAttribute( "data-validation-max" ) * 1 ) );
    else if ( obj.getAttribute( "data-validation" ) == "date" )
        return ( ( obj.value.replace(/\-/g, '') * 1 ) <= ( obj.getAttribute( "data-validation-max" ).replace(/\-/g, '') * 1 ) );
    else if ( obj.getAttribute( "data-validation" ) == "time" )
        return ( ( chkHour00To24( timeNormalToMilitar(obj.value) ).replace(/\:/g, '') * 1 )
            <= ( chkHour00To24( timeNormalToMilitar( obj.getAttribute( "data-validation-max" ) ) ).replace(/\:/g, '') * 1 ) );
}

/** Valida que el valor de un elemento sea mayor o igual que y menor o igual que
* el contenido del atributo 'data-validation-min-max'. Ejemplo: 50-100 (mayor o igual a 50 y menor o igual a 100).
* Para que el elemento sea validado debe tener también el atributo: ('data-validation') con su valor respectivo
* ('integer'; 'float'; 'date'; 'time').
* @param obj (object) Elemento que contiene el valor a ser validado.
* @return (boolean) Devuelve FALSE si no cumple con la condición, de lo contrario devuelve TRUE.*/
function valMoreAndLessThan(obj)
{
    var arr = obj.getAttribute( "data-validation-min-max" ).split(obj.getAttribute( "data-validation" ) == "date" ? '/' : '-' );
    if ( obj.getAttribute( "data-validation" ) == "integer"
    || obj.getAttribute( "data-validation" ) == "float"
    || obj.getAttribute( "data-validation" ) == "float_3d" )
        return ( ( obj.value.replace(/\./g, '').replace(',', '.') * 1 )
        >= ( arr[0] * 1 )
        && ( obj.value.replace(/\./g, '').replace(',', '.') * 1 )
        <= ( arr[1] * 1 ) );
    else if ( obj.getAttribute( "data-validation" ) == "date" )
        return ( ( obj.value.replace(/\-/g, '') * 1 )
        >= ( arr[0].replace(/\-/g, '') * 1 )
        && ( obj.value.replace(/\-/g, '') * 1 )
        <= ( arr[1].replace(/\-/g, '') * 1 ) );
    else if ( obj.getAttribute( "data-validation" ) == "time" )
        return ( ( chkHour00To24( timeNormalToMilitar(obj.value) ).replace(/\:/g, '') * 1 )
        >= ( chkHour00To24( timeNormalToMilitar( arr[0] ) ).replace(/\:/g, '') * 1 )
        && ( chkHour00To24( timeNormalToMilitar( obj.value) ).replace(/\:/g, '') * 1 )
        <= ( chkHour00To24( timeNormalToMilitar( arr[1] ) ).replace(/\:/g, '') * 1 ) );
}

/** Valida los datos contenidos en un elemento HTML tipo array. Dicho elemento debe ser: INPUT tipo RADIO o CHECKBOX.
* Cada INPUT del arreglo debe llamarse igual y para que cada elemento sea validado debe tener el atributo respectivo
* definidos en jQryValidateData(). Si el elemento no cumple con la validación,
* la clase 'error' (css) es asignada al elemento. De lo contrario dicha clase es removida.
* Esta función trabaja con otra función auxiliar llamada: valObjsRadioCheck();
* @param strName (string) El nombre de los elementos en forma de arreglo que serán validados.*/
function valObjs(strName)
{
    var objElementsByName = document.getElementsByName(strName);
    valObjsRadioCheck(objElementsByName);
}

/** Valida los datos contenidos en un arreglo de elementos HTML. Dichos elementos deben ser: INPUT tipo RADIO o CHECKBOX.
* Por cada grupo de elementos con el mismo nombre es que hace la validación.
* Para que cada elemento sea validado debe tener el atributo respectivo definidos en jQryValidateData().
* Si el elemento no cumple con la validación, la clase 'error' (css) es asignada. De lo contrario, es removida.
* @param arrayObj (array) Arreglo de elementos que contienen el valor a ser validado.
* @return Devuelve NULL si el arreglo de elementos HTML no tienen definidos los atributos respectivos.*/
function valObjsRadioCheck(arrayObj)
{
    var nSelected = 0;
    if ( arrayObj[0].getAttribute( "data-validation" ) == "radio" || arrayObj[0].getAttribute( "data-validation" ) == "checkbox" ) {
        var dataValidation = arrayObj[0].getAttribute( "data-validation" );
        var strUn = ( arrayObj[0].getAttribute( "data-validation" ) == "checkbox" ) ? 'algún(os)' : 'un';
        var strS = ( arrayObj[0].getAttribute( "data-validation" ) == "checkbox") ? '(s)' : '';
    } else
        return null;
        for ( j = 0; j < arrayObj.length; j++ )
            if ( arrayObj[j].getAttribute( "data-validation" ) != dataValidation )
                return null;
            else if ( arrayObj[j].checked )
                nSelected = 1;
        ( nSelected == 0 ) ? displayErrorMsg( arrayObj[--j], 'Seleccione ' + strUn + ' Item' + strS ) : removeErrorMsg( arrayObj[--j] );
}

/** Muestra un mensaje debajo del elemento enviado como parámetro, con las características de la clase 'error'.
* @param obj (object) Elemento al cual se le asignará el mensaje.
* @param msj (string) Mensaje que será mostrado con las características de la clase 'error' (css).*/
function displayErrorMsg(obj, msg)
{
    if ( obj.parentNode.getElementsByTagName( "span" ).length == 0 ) {
        obj.setAttribute("class", "error" );
        var objDisplayErrorMsg = document.createElement( "span" );
        objDisplayErrorMsg.innerHTML = msg;
        objDisplayErrorMsg.setAttribute("class","help-block form-error");
        obj.parentNode.appendChild(objDisplayErrorMsg);
    } else {
        var oSpan = obj.parentNode.getElementsByTagName( "span" );
        oSpan[0].innerHTML = msg;
    }
}

/** Remueve un mensaje de error debajo del elemento enviado como parámetro y
* elimina las características de la clase 'error' (css) de ese elemento.
* @param obj (object) Elemento al cual se le removerá el mensaje y se eliminará la clase 'error' (css).*/
function removeErrorMsg(obj)
{
    var objP = obj.parentNode.getElementsByTagName( "span" );
    if ( objP.length == 1 )
        obj.parentNode.removeChild(obj.parentNode.lastChild);
    obj.setAttribute("class","valid");
}

/** Inicializa el valor de un elemento HTML de entrada de datos y le asigna la clase 'init' (css).
* @param obj (object) Elemento que su valor será inicializado y que se le asignará la clase 'init' (css).
* @param value (string) Valor con el que se inicializará el elemento.*/
function initializeObj(obj, value)
{
    if ( value != null )
        obj.value = value;
    var objP = obj.parentNode.getElementsByTagName( "span" );
    if ( objP.length == 1 )
        obj.parentNode.removeChild(obj.parentNode.lastChild);
    obj.setAttribute("class","init");
}

/** Muestra un mensaje debajo del elemento TABLE enviado como parámetro, con las características de la clase 'error'.
* @param obj (object) Elemento TABLE al cual se le asignará el mensaje.
* @param msj (string) Mensaje que será mostrado con las características de la clase 'error' (css).*/
function displayErrorMsgTable(obj, msg)
{
    if ( obj.parentNode.getElementsByTagName( "span" ).length == 0 ) {
        var objDisplayErrorMsg = document.createElement("span");
        objDisplayErrorMsg.innerHTML = msg;
        objDisplayErrorMsg.setAttribute("class","help-block form-error");
        obj.parentNode.appendChild(objDisplayErrorMsg);
    }
}

/** Remueve un mensaje de error debajo del elemento TABLE enviado como parámetro y
* elimina las características de la clase 'error' (css) de ese elemento.
* @param obj (object) Elemento TABLE al cual se le removerá el mensaje y se eliminará la clase 'error' (css).*/
function removeErrorMsgTable(obj)
{
    var objP = obj.parentNode.getElementsByTagName( "span" );
    if ( objP.length == 1 )
        obj.parentNode.removeChild(obj.parentNode.lastChild);
}

/** Valida que una cadena de carácteres cumpla con el debido formato de un correo eléctronico.
* @param strValue (string) Cadena de carácteres a ser validada.
* @return boolean Devuelve TRUE si cumple con el debido formato de un correo eléctronico.
* De lo contrario devuelve FALSE.*/
function valEmail(strValue)
{
    var emailFilter=/^[^@\s]+@[^@\.\s]+(\.[^@\.\s]+)+$/;
    return emailFilter.test(strValue);
}

/** Valida que una cadena de carácteres cumpla con el debido formato de una dirección URL.
* @param strValue (string) Cadena de carácteres a ser validada.
* @return boolean Devuelve TRUE si cumple con el debido formato de una dirección URL.
* De lo contrario devuelve FALSE.*/
function valURL(strValue)
{
    var urlFilter = /^(https?|ftp):\/\/((((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])(\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])(\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/(((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|\[|\]|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#(((\w|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i; 
    return urlFilter.test(strValue);
}

/** Valida que el valor de un elemento sea una cadena de carácteres
* que cumpla con el debido formato de un dato tipo Fecha (YYYY-MM-DD).
* @param obj (object) Elemento con el valor a ser validado.
* @return boolean Devuelve TRUE si cumple con el debido formato de un dato tipo Fecha (YYYY-MM-DD).
* De lo contrario devuelve FALSE.*/
function valDate(obj)
{
    var dateFilter1 = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;
    var dateFilter2 = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
    return ( dateFilter1.test(obj.value) || dateFilter2.test(obj.value) );
}

/** Valida que una cadena de carácteres cumpla con el debido formato de un dato tipo Hora (HH:MM:XX).
* @param str (string) Cadena de carácteres a ser validada.
* @return boolean Devuelve TRUE si cumple con el debido formato de un dato tipo Hora (HH:MM:XX).
* De lo contrario devuelve FALSE.*/
function valTime(str)
{
    var hora = str.value
    if (hora.length != 8)
        return false;
    var a = hora.charAt(0) //<=2
    var b = hora.charAt(1) //<4
    var c = hora.charAt(2) //:
    var d = hora.charAt(3) //<=5
    var e = hora.charAt(5) //:
    var f = hora.charAt(6) //<=5
    if ((a == 2 && b > 3) || (a > 2))//El valor que introdujo en la Hora no corresponde, introduzca un digito entre 00 y 23
        return false;
    if (d > 5) //El valor que introdujo en los minutos no corresponde, introduzca un digito entre 00 y 59
        return false;
    if (f > 5) //El valor que introdujo en los segundos no corresponde
        return false;
    if (c != ':' || e != ':') //Introduzca el caracter ':' para separar la hora, los minutos y los segundos
        return false;
    return true;
}

/** Valida que un elemento TABLE, tenga como mínimo el número de filas (elemento TR) definido en el parámetro minRow.
* @param obj (object) Elemento TABLE. Tabla a ser validada.
* @param minRow (integer) Representa el número mínimo de filas que debe tener la tabla.
* @return boolean Devuelve FALSE si el número de filas de la tabla es menor a minRow. De lo contrario, devuelve TRUE.*/
function valTable(obj, minRow)
{
    return (obj.tBodies[0].rows.length < parseInt(minRow))?false:true;
}

/** Inicializa los valores de los elementos HTML de entrada de datos (INPUT, SELECT y TEXTAREA),
*  contenidos dentro el elemento pasado como parametro (FORM, DIV, TABLE...).
* Para que el valor del elemento sea inicializado debe tener el atributo respectivo 'data-validation'.
* Esta función implementa initObj() como auxiliar.
* Ver también: {@link constraintsData}, {@link formatData}.
* @param obj (object) Elemento que su valor será inicializado.*/
function initObjs(obj)
{
    var objsInput = obj.getElementsByTagName( "input" );
    var objsRadioCheck = [];
    var k = 0;
    for ( var i = 0; i < objsInput.length; i++ )
        if ( objsInput[i].getAttribute("type") != "button" 
        && objsInput[i].getAttribute("type") != "submit"
        && objsInput[i].getAttribute("type") != "radio"
        && objsInput[i].getAttribute("type") != "checkbox"
        && objsInput[i].getAttribute( "data-validation" ) != null)
            initObj( objsInput[i] );
        else if ( objsInput[i].getAttribute( "type" ) == "radio" || objsInput[i].getAttribute( "type" ) == "checkbox" )
            objsRadioCheck[k++] = objsInput[i];
    if ( objsRadioCheck.length > 0 ) {
        var key = 0;
        var keyAux = 0;
        var strRadioCheckName = objsRadioCheck[0].name;
        var mObjsRadioCheck = [];
      	 mObjsRadioCheck[key] = [];
        mObjsRadioCheck[key][keyAux++] = objsRadioCheck[0];
        for ( var i = 1; i < objsRadioCheck.length; i++ )
            if ( strRadioCheckName == objsRadioCheck[i].name ) {
                while ( strRadioCheckName == objsRadioCheck[i].name ) {
                    mObjsRadioCheck[key][keyAux++] = objsRadioCheck[i++];
                    if ( i == objsRadioCheck.length)
                        break;
                }
                if ( i == objsRadioCheck.length )
                    break;
                else {
                    strRadioCheckName = objsRadioCheck[i--].name;
                    keyAux = 0;
                    mObjsRadioCheck[++key] = [];
                }
            }
        for ( var i = 0; i < mObjsRadioCheck.length; i++ )
            intObjsRadioCheck( mObjsRadioCheck[i] );
    }
    var objsSelect = obj.getElementsByTagName( "select" );
    for ( var i = 0; i < objsSelect.length; i++ )
        initObj( objsSelect[i] );
    var objsTextArea = obj.getElementsByTagName( "textarea" );
    for ( var i = 0; i < objsTextArea.length; i++ )
        initObj( objsTextArea[i] );
}

/** Inicializa el valor de un elemento HTML de entrada de datos.
* Para que el valor del elemento sea inicializado debe tener el atributo respectivo 'data-validation'.
* Esta función implementa initializeObj() como auxiliar.
* @param obj (object) Elemento que su valor será inicializado.*/
function initObj(obj){
    if ( (obj.getAttribute( "data-validation" )== "required" ) 
    || (obj.getAttribute( "data-validation" )=="length")
    || (obj.getAttribute( "data-validation" )=="email")
    || (obj.getAttribute( "data-validation" )=="url")
    || (obj.getAttribute( "data-validation" )=="textarea") )
        initializeObj( obj, '' );
    else if ( obj.getAttribute( "data-validation" ) == "integer" )
        initializeObj( obj, '0' );
    else if ( obj.getAttribute( "data-validation" ) == "float" )
        initializeObj( obj, '0,00' );
    else if ( obj.getAttribute( "data-validation" ) == "float_3d" )
        initializeObj( obj, '0,000' );
    else if ( ( obj.getAttribute( "data-validation" ) == "select" ) || ( obj.getAttribute( "data-validation" ) == "select-small" ) )
        initializeObj( obj, 'null' );
    else if ( obj.getAttribute( "data-validation" ) == "time" )
        initializeObj( obj, currentTime() );
    else if ( obj.getAttribute( "data-validation" ) == "date" )
        initializeObj( obj, dateOfToday( 'YYYYMMDD', '-' ) );
    //*else if (obj.getAttribute( "data-validation" ) == 'table' ) */
}

/** Inicializa los valore de un arreglo de elementos HTML de entrada de datos tipo RADIO o CHECKBOX.
* Para que los valores del arreglo de elementos sean inicializado deben tener el atributo 'data-validation'...
* 'radio' o 'checkbox' respectivamente.
* Esta función implementa initializeObj() como auxiliar.
* @param arrayObj (array) Arreglo de elementos HTML de entrada de datos tipo RADIO o CHECKBOX
* para que sus valores sean inicializado.*/
function intObjsRadioCheck(arrayObj)
{
    if ( arrayObj[0].getAttribute( "data-validation" ) == "radio" || arrayObj[0].getAttribute( "data-validation" ) == "checkbox") {
        for ( var j = 0; j < arrayObj.length; j++ )
            arrayObj[j].checked = false;
        initializeObj(arrayObj[--j]);
    }
}

/** Inicializar Objeto de Selección Múltiple.
* Descripción: Inicializar Objeto de Selección Múltiple (Combo).
* Nota: Esta método hace referencia a la función 'move()', la cual está ubicada en el archivo 'combo.js'.
* @param objSelect (object) Elemento tipo Combo (múltiple) de donde seleccionan los Items.
* @param objSelected (object) Elemento tipo Combo (múltiple) donde se envian los Items seleccionados.*/
function initObjsSelectMultiple(objSelect, objSelected) {
    for ( var i = 0; i < objSelected.length; i++ )
        objSelected[i].selected = true;
    move( 'left', objSelect, objSelected );
    initializeObj( objSelected, 'null' );
}

