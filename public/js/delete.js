/**
 * @author Ismael Moral <jastertdc@gmail.com>
 **/
(function(jq){

      /**
       * @type    {HTMLElement}
       * @private
       **/
      var _jqDelete = $('#delete');

      /**
       * @type    {HTMLElement}
       * @private
       **/
      var _jqDescription = $('#description');

      /**
       * @type    {HTMLElement}
       * @private
       **/
      var _jqTitle = $('#title');

      /**
       * Submit callback
       * @param   {Event} evt
       * @private
       **/
      var _onSubmit = function(evt){
        evt.preventDefault();

        var arr, list = {}, i;

        arr = _jqDelete.serializeArray();

        for(i = 0; i < arr.length; i++){
          list[arr[i]['name']] = arr[i]['value'];
        }

        $.ajax({
          contentType:  "application/json",
          dataType:     "json",
          data:         JSON.stringify(list),
          url:          _jqDelete.attr('action'),
          type:         "DELETE",
          success:    function(data){
            swal("Ticket deleted !", "Ticket has been deleted successfully", "success");
          },
          error:      function(err){
            swal("Ticket error !", "Something wrong happened with the ticket deleting ", "error");
          }
        });
      };

      /**
       * DOM Load callback
       * @param   {Event} evt
       * @private
       **/
      var _onDomLoad = function(evt){
        _jqDelete.submit(_onSubmit);
      };

      $(document).ready(_onDomLoad);

})(jQuery);
