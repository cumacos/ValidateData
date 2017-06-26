/** Convierte una hora normal a hora militar.
* Ej: '03:45:PM' => '15:45:00'
* @param hora (string) Cadena de caracteres representando la hora con formato normal.
* @return hora (string) Cadena de caracteres representando la hora con formato militar.*/
function timeNormalToMilitar(hora)
{
    var meridian = hora.substr(6, 1);
    hora = hora.replace('AM', '00');
    hora = hora.replace('PM', '00');
    if ( meridian == 'P' ) {
        var arr = hora.split(':');
        arr[0]=parseInt(arr[0])+12;
        if (arr[0] == 24 )
            arr[0]='00';
        hora = pad( arr[0], 2 ) + ':' + pad( arr[1], 2 ) + ':' + arr[2];
    }
    return hora;
}

/** Formatea una cadena de caracteres con una cantidad de ceros (0) 
* a la izquierda, según lo especifique el parámetro 'size'.
* @param num (string) Cadena de caracteres que será formateada; generalmente pueden ser números.
* @param size (integer) Cantidad de ceros (0) que se colocaran a la izquierda.
* @return (string) Cadena de caracteres formateada con una cantidad de ceros (0) especificada.*/
function pad(num, size)
{
    var s = "000000000000000000" + num;
    return s.substr(s.length-size);
}

/** Chequea que si la hora es 00 la convierta a 24, 
* esta acción se aplica para operaciones matemáticas.
* @param val (string) Cadena de caracteres con formato de hora.
* @return (string) Cadena de caracteres con formato de hora, 
* si la hora es 00 la convierta a 24.*/
function chkHour00To24(val)
{
    var arr = val.split(':');
    if ( arr[0] == '00' )
        arr[0] = 24;
    return arr[0] + ':' + arr[1] + ':' + arr[2];
}

/** Hora actual.	
* Hora del momento actual.
* @return string Devuelve la hora del momento.*/
function currentTime()
{
    var dig = new Date();
    var h = dig.getHours();
    var m = dig.getMinutes();//var s=dig.getSeconds();
    var ap = "AM"; 
    if ( h > 12 ) {
        ap = "PM";
        h = h - 12;
    }
    if ( h == 0 )
        h = 12;
    if ( h < 9 )
        h="0"+h;
    if ( m <= 9 )
        m = "0" + m;
    //if ( s <= 9 ) s="0"+s;	
    return h + ':' + m + ':' + ap;
}

