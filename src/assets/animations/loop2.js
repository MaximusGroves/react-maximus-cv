(function() {
  var logo, logoMain, tall;

  logoMain = new LogoBg({
    x: 40,
    y: 40
  });

  logo = new LogoLayerClear;

  tall = false;

  logo.properties = {
    x: 40,
    y: 40
  };

  logo.anim = getAnimation2(logo);

  logo.start();

}).call(this);

