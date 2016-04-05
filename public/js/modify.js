/**
 * @author Ismael Moral <jastertdc@gmail.com>
 **/
(function(jq){

    /**
     * Issue number
     * @type    {Number}
     * @private
     **/
    var _issue = ticket.issue;

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
          swal({
            title:  "Are you sure?",
            text:   "This action cannot be undone!",
            type:   "warning",
            showCancelButton:   false,
            closeOnConfirm:     false,
            confirmButtonText:  "Yes, modify it!"
          },
          function(isConfirm){
            if (isConfirm){
              window.location.href = "/ticket/" + _issue + "/";
            }
          });
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
