({
    onClick : function(component, event, helper) {
        var id = event.target.dataset.menuItemId;
        if (id) {
            component.getSuper().navigate(id);
         }
   },

   onRender: function(component, event, helper) {
       console.log('onRender fired');
   }
 })