function addSetAttributeInGroup( aObj,  attribute, property )
{
    for(var i = 0; i < aObj.length; i++ )
        aObj[i].setAttribute( attribute, property );
}


function addEventListenerInGroup(aObj, aEvent, oFun)
{
    for(var i = 0; i < aObj.length; i++ )
        for(var j = 0; j < aEvent.length; j++ )
            aObj[i].addEventListener( aEvent[j], oFun);
}

