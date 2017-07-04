/** Coloca formato de número real (separadores de miles y decimales de tres (3) dígitos)
* a un elemento INPUT automáticamente, mientras el usuario presiona las teclas.
* Nota: El teclado solo aceptará números y el punto decimal.
* Ver también: {@link formato_float} y {@link formato_numeric}.
* @param fld object Elemento INPUT que tendrá el valor tecleado.
* @param milSep string Separador de miles, puede ser punto ó coma.
* @param decSep string Separador de decimales, puede ser punto ó coma.
* @param e object Evento de presionar una tecla.
* @return Retorna FALSE si no se puede colocar el formáto; de lo contrario, coloca el formato.*/
function formato_float_3d(fld, milSep, decSep, e)
{
    var tipo = e.keyCode;
    if ( tipo == 8 ) {  // 3 8,37,39,46
        return true;
    }
    var sep = 0;
    var key = '';
    var i = j = 0;
    var len = len2 = 0;
    var strCheck = '0123456789';
    var aux = aux2 = '';
    var whichCode = (window.Event) ? e.which : e.keyCode;
    //if (whichCode == 13) return true; // Enter
    key = String.fromCharCode(whichCode); // Get key value from key code
    if ( strCheck.indexOf(key) == -1 )
        return false; // Not a valid key
    len = fld.value.length;
    for ( i = 0; i < len; i++ )
        if ( ( fld.value.charAt(i) != '0' ) && ( fld.value.charAt(i) != decSep ) )
            break;
    aux = '';
    for ( ; i < len; i++ )
        if ( strCheck.indexOf( fld.value.charAt(i) ) != -1 )
            aux += fld.value.charAt(i);
    aux += key;
    len = aux.length;
    if ( len == 0 )
        fld.value = '';
    if ( len == 1 )
        fld.value = '0'+ decSep + '00' + aux;
    if ( len == 2 )
        fld.value = '0'+ decSep + '0' + aux;
    if ( len == 3 )
        fld.value = '0'+ decSep + aux;
    if ( len > 3 ) {
        aux2 = '';
        for ( j = 0, i = len - 4; i >= 0; i-- ) {
            if ( j == 3 ) {
                aux2 += milSep;
                j = 0;
            }
            aux2 += aux.charAt(i);
            j++;
        }
        fld.value = '';
        len2 = aux2.length;
        for ( i = len2 - 1; i >= 0; i-- )
            fld.value += aux2.charAt(i);
        fld.value += decSep + aux.substr(len - 3, len);
    }
    return false;
}

/** Coloca formato de número real (separadores de miles y decimales) a un elemento INPUT automáticamente,
* mientras el usuario presiona las teclas. Nota: El teclado solo aceptará números y el punto decimal.
* Ver también: {@link formato_float_3d} y {@link formato_numeric}.
* @param fld object Elemento INPUT que tendrá el valor tecleado.
* @param milSep string Separador de miles, puede ser punto ó coma.
* @param decSep string Separador de decimales, puede ser punto ó coma.
* @param e object Evento de presionar una tecla.
* @return Retorna FALSE si no se puede colocar el formáto; de lo contrario, coloca el formato.*/
function formato_float(fld, milSep, decSep, e)
{
    var tipo=e.keyCode;
    if ( tipo == 8 ) { // 3 8,37,39,46
        return true;
    }
    var sep = 0;
    var key = '';
    var i = j = 0;
    var len = len2 = 0;
    var strCheck = '0123456789';
    var aux = aux2 = '';
    var whichCode = (window.Event) ? e.which : e.keyCode;
    //if (whichCode == 13) return true; // Enter
    key = String.fromCharCode(whichCode); // Get key value from key code
    if ( strCheck.indexOf(key) == -1 )
        return false; // Not a valid key
    len = fld.value.length;
    for ( i = 0; i < len; i++ )
        if ( ( fld.value.charAt(i) != '0' ) && ( fld.value.charAt(i) != decSep ) )
            break;
    aux = '';
    for ( ; i < len; i++ )
        if ( strCheck.indexOf( fld.value.charAt(i) ) != -1 )
            aux += fld.value.charAt(i);
    aux += key;
    len = aux.length;
    if ( len == 0 )
        fld.value = '';
    if ( len == 1 )
        fld.value = '0'+ decSep + '0' + aux;
    if ( len == 2 )
        fld.value = '0'+ decSep + aux;
    if ( len > 2 ) {
        aux2 = '';
        for ( j = 0, i = len - 3; i >= 0; i-- ) {
            if ( j == 3 ) {
                aux2 += milSep;
                j = 0;
            }
            aux2 += aux.charAt(i);
            j++;
        }
        fld.value = '';
        len2 = aux2.length;
        for ( i = len2 - 1; i >= 0; i-- )
            fld.value += aux2.charAt(i);
        fld.value += decSep + aux.substr(len - 2, len);
    }
    return false;
}

/** Coloca formato de número entero (separadores de miles) a un elemento INPUT automáticamente,
* mientras el usuario presiona las teclas. Nota: El teclado solo aceptará números y el punto decimal.
* Ver también: {@link formato_float} y {@link formato_float_3d}.
* @param fld object Elemento INPUT que tendrá el valor tecleado.
* @param milSep string Separador de miles, puede ser punto ó coma.
* @param decSep string Separador de decimales, puede ser punto ó coma.
* @param e object Evento de presionar una tecla.
* @return Retorna FALSE si no se puede colocar el formáto; de lo contrario, coloca el formato.*/
function formato_numeric(fld, milSep, decSep, e)
{
    var tipo=e.keyCode;
    if ( tipo == 8 )  // 3 8,37,39,46
        return true;
    var key = '';
    var i = j = 0;
    var len = len2 = 0;
    var strCheck = '0123456789';
    var aux = aux2 = '';
    var whichCode = (window.Event) ? e.which : e.keyCode;
    //if (whichCode == 13) return true; // Enter
    key = String.fromCharCode(whichCode); // Get key value from key code
    if ( strCheck.indexOf(key) == -1 )
        return false; // Not a valid key
    len = fld.value.length;
    for ( i = 0; i < len; i++ )
        if ( ( fld.value.charAt(i) != '0' ) )
            break;
        aux = '';
        for ( ; i < len; i++ )
            if ( strCheck.indexOf( fld.value.charAt(i) ) != -1 )
                aux += fld.value.charAt(i);
        aux += key;
        len = aux.length;
        aux2 = '';
        for ( j = 0, i = len - 1; i >= 0; i-- ) {
            if ( j == 3 ) {
                aux2 += milSep;
                j = 0;
            }
            aux2 += aux.charAt(i);
            j++;
        }
        fld.value = '';
        len2 = aux2.length;
        for ( i = len2 - 1; i >= 0; i-- )
            fld.value += aux2.charAt(i);
        fld.value += aux.substr(len - 0, len);
        return false;
}

