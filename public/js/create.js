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
   * Result container
   * @type    {HTMLElement}
   * @private
   **/
  var _jqResult = $('#result');

  /**
   * Clean input fields
   * @type    {HTMLElement}
   * @private
   **/
  var _cleanInput = function(){
    _jqTitle.val('');
    _jqTitle.attr('placeholder', 'Insert issue title here ...');

    _jqDescription.val('');
    _jqDescription.attr('placeholder', 'Insert issue description here ...');
  };

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
        window.location.href = "/tickets/";
        _cleanInput.apply(this);
      },
      error:      function(err){
        swal("Ticket error !", "An error has occured during ticket creation. ", "error");
        _cleanInput.apply(this);
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
