/**
 * @author  Ismael Moral <jastertdc@gmail.com>
 **/
(function(jq){

  /**
   * @type    {HTMLElement}
   * @private
   **/
  var _deleteAction = $('deleteTicket');

  /**
   * Delete ticket clicked
   * @private
   **/
  var _onClick = function(evt){
    evt.preventDefault();
  };

  /**
   * DOM Load callback
   * @private
   **/
  var _onDomLoad = function(evt){
    _deleteAction.click(_onClick);
  };

  $(document).ready(_onDomLoad);
})(jQuery);
