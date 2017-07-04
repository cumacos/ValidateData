function dateOfToday(format, separator)
{
    var f = new Date();
    separator = separator == null ? '' : separator;
    switch ( format.toUpperCase() ) {
        case 'YYYYMMDD':
            return f.getFullYear() + separator + pad( ( f.getMonth() + 1 ) , 2 ) + separator + pad( f.getDate(), 2 );
            break;
        case 'YYMMDD':
            return f.getFullYear().toString().substr(2,2) + separator + pad( ( f.getMonth() + 1 ) , 2 ) + separator + pad( f.getDate(), 2 );
            break;
        case 'DDMMYYYY':
            return  pad( f.getDate(), 2 ) + separator + pad( ( f.getMonth() + 1 ) , 2 ) + separator + f.getFullYear();
            break;
        case 'DDMMYY':
            return  pad( f.getDate(), 2 ) + separator + pad( ( f.getMonth() + 1 ) , 2 ) + separator + f.getFullYear().toString().substr( 2, 2 ); 
            break;
        default:
            return f;
    }
}

