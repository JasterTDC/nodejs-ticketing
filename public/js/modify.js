/**
 * @author Ismael Moral <imoral@nohacefaltapapel-et.net>
 **/
(function(jq){

    /**
     * @type    {HTMLElement}
     * @private
     **/
    var _jqDescription = $('#description');

    /**
     * @type    {HTMLElement}
     * @private
     **/
    var _jqModify = $('#modify');

    /**
     * @type    {HTMLElement}
     * @private
     **/
    var _jqTitle = $('#title');

    /**
     * Result container
     * @type    {HTMLElement}
     * @private
     **/
    var _jqResult = $('#result');

    /**
     * Clean all input fields
     * @private
     **/
    var _cleanInput = function(){
      _jqTitle.val('');
      _jqDescription.val('');
    };

    /**
     * Submit callback
     * @param   {Event} evt
     * @private
     **/
    var _onSubmit = function(evt){
      evt.preventDefault();

      var arr, list = {}, i;

      arr = _jqModify.serializeArray();

      for(i = 0; i < arr.length; i++){
        list[arr[i]['name']] = arr[i]['value'];
      }

      $.ajax({
        contentType:  "application/json",
        dataType:     "json",
        data:         JSON.stringify(list),
        url:          _jqModify.attr('action'),
        type:         "PUT",
        success:    function(data){
          swal("Ticket updated !", "Ticket info has been updated successfully", "success");
        },
        error:      function(err){
          swal("Ticket error !", "Something wrong happened with the ticket updating ", "error");
        }
      });
    };

    /**
     * DOM Load callback
     * @param   {Event} evt
     * @private
     **/
    var _onDomLoad = function(evt){
      _jqModify.submit(_onSubmit);
    };

    $(document).ready(_onDomLoad);

})(jQuery);
