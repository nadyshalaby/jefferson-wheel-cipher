// shuffling the tiles
$('.wrapper').each( function(index, val) {
  var $this = $(this);
  var order = Number($this.find('input[name=order]').val());
  var cur_tiles = $this.find('.tile');
  cur_tiles.shuffle();
});

var checked_radio = $('input[type=radio]:checked');
var order_input = checked_radio.next('input[name=order]');
var wrapper = checked_radio.closest('.wrapper');
var tiles = wrapper.find('.tiles');
var settings = {
  'animation-speed' : 200,
};

  // action for up arrow
  $('.arrow:eq(0)').on('click', function() {
    tiles.animate({ 'margin-top': "-=50px" },settings['animation-speed']);
    var order = Number(order_input.val());
      order++;    
      if(order > 25){
        order = 0;
        tiles.animate({'margin-top': "0px"},settings['animation-speed']);
      }
      order_input.val(order);
  });
// action for down arrow
$('.arrow:eq(1)').on('click', function() {
  tiles.animate({ 'margin-top': "+=50px" },settings['animation-speed']);
  var order = Number(order_input.val());
   order--;    
   if(order < 0){
    order = 25;
    tiles.animate({'margin-top': "-1250px"},settings['animation-speed']);
  }
  order_input.val(order);
});

  // updating tiles var on input radio changes
  $('input[type=radio],input[type=checkbox]').iCheck({
    checkboxClass: 'icheckbox_flat-red',
    radioClass: 'iradio_flat-red'
  }).on('ifChecked',function(){
    var $this = $(this);
    wrapper = $this.closest('.wrapper');
    tiles = wrapper.find('.tiles');
    order_input = wrapper.find('input[name=order]');
  });

// extract the alternatives
$('.extract-btn').on('click', function() {
  var alternatives = [];
  var target = '';
  var flag_init = true;
  $('.wrapper').each( function(index, val) {
    var $this = $(this);
      //retrieve current order from each wrapper
      var order = Number($this.find('input[name=order]').val()); 
      // fetch all the current wrapper tiles
      var cur_tiles = $this.find('.tile');
      // retrieve the plain text
      target += cur_tiles.eq(order).text().replace('-','');
      // retrieve the cipher alternatives
      count = 0;
      while(count < 25){
        order++;
        pos = order % 26;
        // doing one time initialization
        if(flag_init){
          alternatives[count] = '';
        }
        // predict all possible cipher
        alternatives[count] += (cur_tiles.eq(pos).text().replace('-',''));
        count++;
      }
      flag_init = false;
    });

  // printing the cipher text
  var htm = '<strong>Your Plain:</strong><p><small>'+target+'</small></p>'+
  '<strong>Your Predicted Ciphers:</strong>';
  for (var i = 0; i < alternatives.length; i++) {
    htm += '<p><small>'+alternatives[i]+'</small></p>';
  }
  swal({   title: "Success",   text: htm,   type: "success",html : true});
});




