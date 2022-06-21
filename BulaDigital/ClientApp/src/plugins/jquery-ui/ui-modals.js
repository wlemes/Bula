var UIModals = function () {

    var handleModals = function () {
        $("#infracao-modal").draggable({
            handle: ".modal-header"
        });
    }

    return {
        //main function to initiate the module
        init: function () {
            handleModals();
        }

    };

}();

jQuery(document).ready(function() {    
   UIModals.init();
});