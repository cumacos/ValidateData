/** Funciones reutilizables para objetos combo */

function move(side, docFormObjLista, docFormObjSelected)
{
    this.bubbleSort = function (inputArray, inputArray1, start, rest)
    {
        for ( var i = rest - 1; i >= start;  i-- ) {
            for ( var j = start; j <= i; j++ ) {
                if ( inputArray1[j+1] < inputArray1[j] ) {
                    var tempValue = inputArray[j];
                    var tempValue1 = inputArray1[j];
                    inputArray[j] = inputArray[j+1];
                    inputArray1[j] = inputArray1[j+1];
                    inputArray[j+1] = tempValue;
                    inputArray1[j+1] = tempValue1;
                }
            }
        }
        return inputArray;
    }
    this.ClearList = function (OptionList, TitleName) { OptionList.length = 0; }
    var temp1 = [];
    var temp2 = [];
    var tempa = [];
    var tempb = [];
    var current1 = 0;
    var current2 = 0;
    var y = 0;
    var attribute;
    //assign what select attribute treat as attribute1 and attribute2
    if (side == "right") {  
        attribute1 = docFormObjLista;
        attribute2 = docFormObjSelected;
    } else {
        attribute1 = docFormObjSelected;
        attribute2 = docFormObjLista;
    }
    //fill an array with old values seleccionados
    for ( var i = 0; i < attribute2.length; i++ ) {
        y = current1++;
        temp1[y] = attribute2.options[i].value;
        tempa[y] = attribute2.options[i].text;
    }
    //assign new values to arrays
    for ( var i = 0; i < attribute1.length; i++ ) {
        if ( attribute1.options[i].selected ) {
            //llena un vector con los valores todos seleccionados
            y=current1++;
            temp1[y] = attribute1.options[i].value;
            tempa[y] = attribute1.options[i].text;
        } else {
            //llena un vector con los valores no seleccionados
            y=current2++;
            temp2[y] = attribute1.options[i].value;
            tempb[y] = attribute1.options[i].text;
        }
    }
    //sort atribute2
    temp1 = bubbleSort( temp1, tempa, 0, temp1.length - 1 );
    //sort atribute1
    temp2 = bubbleSort( temp2, tempb, 0, temp1.length - 1 );
    //generating new options
    ClearList( attribute2, attribute2 );
    for ( var i = 0; i < temp1.length; i++ ) {
        attribute2.options[i] = new Option();
        attribute2.options[i].value = temp1[i];
        attribute2.options[i].text =  tempa[i];
    }
    //generating new options
    ClearList(attribute1,attribute1);
    if (temp2.length > 0) {
        for ( var i = 0; i < temp2.length; i++ ) {
            attribute1.options[i] = new Option();
            attribute1.options[i].value = temp2[i];
            attribute1.options[i].text =  tempb[i];
        }
    }
    return true;
}

function getValues(objForm, objStrArray){
    if (objForm.length!=0)
        for (i=0;i < objForm.length;i++)
            objStrArray.value = ( i == 0 ) ? objForm.options[i].value : objStrArray.value + ", " + objForm.options[i].value; 
    else
        objStrArray.value = '';
    return objStrArray.value;
}

