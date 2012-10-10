function validate_regex (element, regex)
{
  var r = element.val().match(regex);
  if( !r )
  {
    element.removeClass('success');
    element.addClass('error');
  } else {
    element.addClass('success');
    element.removeClass('error');
  }
  return r;
}

function regAjax () {
  function ValidateSignIn (event)
  {
    // ajax checker
    var self = event.target,
        url  = $(self).attr('action');

    // check user name
    try {
      validate_regex (
        $(self).find('*[name="uname"]:first'),
        /^[\w]{4,18}$/
      );
    } catch(e) {
      console.log(e.name);
    }

    // check user password
    validate_regex (
      $(self).find('*[name="paswd"]:first')
      , /^[\w]{6,64}$/
    );

    $(self).find('.error:first').focus().select();

    // no sending form as old method: apply ajax.
    return false;
  }

  function ValidateSignUp (event)
  {
    // ajax checker
    var self = event.target,
        url  = $(self).attr('action');

    // check user name
    try {
      validate_regex (
        $(self).find('*[name="uname"]:first')
        , /^[\w]{4,18}$/
      );
    } catch(e) {
      console.log(e.name);
    }

    // check email
    try {
      var res = validate_regex (
        $(self).find('*[name="email"]:first')
        , /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
      );
    } catch(e) {
      console.log(e.name);
    }

    // check user password
    validate_regex (
      $(self).find('*[name="paswd"]:first')
      , /^[\w]{6,64}$/
    );

    $(self).find('.error:first').focus().select();

    // no sending form as old method: apply ajax.
    return false;
  }

  function OnSubmit (event)
  {
    if ( $(this).attr('action') == '/submit/signin' )
      return ValidateSignIn (event);
    else if ( $(this).attr('action') == '/submit/signup' )
      return ValidateSignUp (event);
    else
      return false;
  }

  $('form[data-ajax="Y"]').on('submit', OnSubmit);
}

function onOpenModal () {
  regAjax();
}

function SignIn (event)
{
  event.preventDefault();
  $('#signin-form').modal({ onOpen: onOpenModal }).open();
}

function SignUp (event)
{
  event.preventDefault();
  $('#signup-form').modal({ onOpen: onOpenModal }).open();
}

$(function(){

  $('a[href="/signin"]').on('click', SignIn);
  $('a[href="/signup"]').on('click', SignUp);

  // attach modal close handler
  $('.cloud-contaner .cloud-close').on('click', function(e){
    e.preventDefault();
    $.modal().close();
  });

  // below isn't important (demo-specific things)
  $('.cloud-contaner .more-toggle').on('click', function(e){
    e.stopPropagation();
    $('.cloud-contaner .more').toggle();
  });

  $('.mainmenu > ul > li > ul').each(function(){ $(this).prev().append("<b style='position: absolute; right: 2px; font-size: 80%; text-decoration: none;'>↓</b>") });
  $('.mainmenu > ul > li > ul ul').each(function(){ $(this).prev().append("<b style='position: absolute; right: 3px; font-size: 80%; text-decoration: none;'>→</b>") });

});