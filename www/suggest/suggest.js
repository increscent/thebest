function Suggest(container_id, source_callback, submit_callback, min_letters) {
  var input = document.querySelector('#' + container_id + ' input');
  input.addEventListener('blur', function (e) {
    document.querySelector('#' + container_id + ' .options').innerHTML = '';
  });
  input.addEventListener('input', handle_input);
  input.addEventListener('keydown', function (e) {
    if (e.keyCode == 40) {
      e.preventDefault();
      up_down_key('DOWN', container_id);
    } else if (e.keyCode == 38) {
      e.preventDefault();
      up_down_key('UP', container_id);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      var selected = document.querySelector('#' + container_id + ' .selected-option');
      if (selected) {
        submit_callback(selected.textContent);
      } else {
        submit_callback(input.value);
      }
    }
  });

  function handle_input() {
    var value = input.value;
    if (value.length >= min_letters) {
      source_callback(value, function (data) {
        if (data.length) {
          data_callback.call(null, data, container_id, submit_callback);
        }
      });
    } else {
      document.querySelector('#' + container_id + ' .options').innerHTML = '';
    }
  }
}

function up_down_key(direction, container_id) {
  var current_id = get_selected_option(container_id); 
  if (current_id) {
    var new_id = current_id + ((direction == 'UP')? -1 : 1); 
    // make sure an option stays selected
    if (select_option(container_id, new_id) || (new_id == 1 || direction == 'UP')) {
      var selected = document.querySelector('#' + container_id + ' .option[data-option="' + current_id + '"]');
      selected.className = selected.className.replace('selected-option', '').trim();
    }
  } else if (direction == 'DOWN') {
    select_option(container_id, 1);
  }
}

function get_selected_option(container_id) {
  var selected = document.querySelector('#' + container_id + ' .selected-option');
  if (selected) {
    return parseInt(selected.getAttribute('data-option'));
  } else {
    return 0;
  }
}

function select_option(container_id, option_id) {
  var new_selected = document.querySelector('#' + container_id + ' .option[data-option="' + option_id + '"]');
  if (new_selected) {
    new_selected.className += ' selected-option';
    return true;
  } else {
    return false;
  }
}

function data_callback(data, container_id, submit_callback) {  
  var options_container = document.querySelector('#' + container_id + ' .options');
  options_container.innerHTML = display_options(data.slice(), options_container);
  add_click_listeners(data.slice(), container_id, submit_callback);
}

function add_click_listeners(data, container_id, submit_callback) {
  if (data.length) {
    var option = document.querySelector('#' + container_id + ' .option[data-option="' + data.length + '"]');
    if (option) {
      option.addEventListener('mousedown', function (e) {
        submit_callback(e.target.textContent);
      });
    }
    data.pop();
    add_click_listeners(data, container_id, submit_callback);
  }
}

function display_options(data) {
  if (data.length) {
    var id = data.length;
    var inner_text = data.pop();
    return display_options(data) + '<div class="option" data-option="' + id + '">' + inner_text + '</div>';
  } else {
    return '';
  }
}
