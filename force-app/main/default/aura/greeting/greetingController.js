({
    updateValue : function(component, event, helper) {
         var val = component.find("myInput").getElement().value;
        component.set("v.RussianWords", val);
    }
})