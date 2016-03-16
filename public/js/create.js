/**
 * @author Ismael Moral <jastertdc@gmail.com>
 **/
(function(jq){

  /**
   * @type    {HTMLElement}
   * @private
   **/
  var _jqCreate = $('#create');

  /**
   * Result container
   * @type    {HTMLElement}
   * @private
   **/
  var _jqResult = $('#result');

  /**
   * Submit callback
   * @param   {Event} evt
   * @private
   **/
  var _onSubmit = function(evt){
    evt.preventDefault();

    var arr, list = {}, i;

    arr = _jqCreate.serializeArray();

    for(i = 0; i < arr.length; i++){
      list[arr[i]['name']] = arr[i]['value'];
    }

    $.ajax({
      contentType:  "application/json",
      dataType:     "json",
      data:         JSON.stringify(list),
      url:          _jqCreate.attr('action'),
      type:         _jqCreate.attr('method'),
      success:    function(data){
        _jqResult.append('<pre>' + JSON.stringify(data, undefined, 2) + '</pre>');
      },
      error:      function(err){
        console.log(err);
      }
    });
  };

  /**
   * DOM Load callback
   * @param   {Event} evt
   * @private
   **/
  var _onDomLoad = function(evt){
    _jqCreate.submit(_onSubmit);
  };

  $(document).ready(_onDomLoad);

})(jQuery);
