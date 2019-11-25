
/*

#class for drawing the comcastro logo with each symnol as a different image and layer
 */

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.comcastroYellow = "#FEC71C";

  this.logoSourceSize = 720;

  this.logoNudge = {
    x: -23.1,
    y: 40.26
  };

  this.starNudge = {
    x: -3.301,
    y: -10.022
  };

  this.LogoLayer = (function(superClass) {
    extend(LogoLayer, superClass);

    function LogoLayer(options) {
      this.options = options;
      LogoLayer.__super__.constructor.call(this, this.options);
      this.logoSize = 360;
      this.properties = {
        width: this.logoSize,
        height: this.logoSize,
        backgroundColor: comcastroYellow
      };
      this.addChildLayers();
      this.reset();
    }

    LogoLayer.prototype.size = function(newSize) {
      this.logoSize = this.width = this.height = newSize;
      this.cScale.scaleX = this.cScale.scaleY = this.logoScale();
      return this.cScale.x = this.cScale.y = this.scaleNudge();
    };

    LogoLayer.prototype.logoScale = function() {
      return this.logoSize / logoSourceSize;
    };

    LogoLayer.prototype.scaleNudge = function() {
      return -(logoSourceSize - this.logoSize) / 2;
    };

    LogoLayer.prototype.addChildLayers = function() {
      this.cScale = new Layer({
        name: "scale",
        superLayer: this,
        backgroundColor: "",
        width: logoSourceSize,
        height: logoSourceSize
      });
      this.cPos = new Layer({
        name: "position",
        superLayer: this.cScale,
        backgroundColor: "",
        width: logoSourceSize,
        height: logoSourceSize
      });
      this.cIn = new Layer({
        name: "in",
        superLayer: this.cPos,
        image: "images/c-in.png",
        width: logoSourceSize,
        height: logoSourceSize
      });
      this.cMid = new Layer({
        name: "mid",
        superLayer: this.cPos,
        image: "images/c-mid.png",
        width: logoSourceSize,
        height: logoSourceSize
      });
      this.cOut = new Layer({
        name: "out",
        superLayer: this.cPos,
        image: "images/c-out.png",
        width: logoSourceSize,
        height: logoSourceSize
      });
      return this.cStar = new Layer({
        name: "star",
        superLayer: this.cPos,
        image: "images/star.png",
        width: logoSourceSize,
        height: logoSourceSize
      });
    };

    LogoLayer.prototype.reset = function() {
      this.setDefaults(this.cStar);
      this.setDefaults(this.cIn);
      this.setDefaults(this.cMid);
      this.setDefaults(this.cOut);
      this.cScale.properties = {
        rotation: 0,
        scaleX: this.logoScale(),
        scaleY: this.logoScale(),
        x: this.scaleNudge(),
        y: this.scaleNudge()
      };
      this.cPos.properties = {
        rotation: 0,
        x: logoNudge.x,
        y: logoNudge.y
      };
      return this.cStar.properties = {
        x: starNudge.x,
        y: starNudge.y
      };
    };

    LogoLayer.prototype.setDefaults = function(layer) {
      return layer.properties = {
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
        x: 0,
        y: 0,
        blur: 0,
        opacity: 1,
        visible: true
      };
    };

    LogoLayer.prototype.start = function() {
      if (this.anim !== void 0) {
        return this.anim.start();
      }
    };

    LogoLayer.prototype.stop = function() {
      if (this.anim !== void 0) {
        return this.anim.stop();
      }
    };

    return LogoLayer;

  })(Layer);

}).call(this);


/*

#class for drawing the comcastro logo with each symnol as a different image and layer with a clear background
 */

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.comcastroYellow = "#FEC71C";

  this.logoSourceSize = 720;

  this.logoNudge = {
    x: -23.1,
    y: 40.26
  };

  this.starNudge = {
    x: -3.301,
    y: -10.022
  };

  this.LogoLayerClear = (function(superClass) {
    extend(LogoLayerClear, superClass);

    function LogoLayerClear(options) {
      this.options = options;
      LogoLayerClear.__super__.constructor.call(this, this.options);
      this.logoSize = 360;
      this.properties = {
        width: this.logoSize,
        height: this.logoSize,
        backgroundColor: ""
      };
      this.addChildLayers();
      this.reset();
    }

    LogoLayerClear.prototype.size = function(newSize) {
      this.logoSize = this.width = this.height = newSize;
      this.cScale.scaleX = this.cScale.scaleY = this.logoScale();
      return this.cScale.x = this.cScale.y = this.scaleNudge();
    };

    LogoLayerClear.prototype.logoScale = function() {
      return this.logoSize / logoSourceSize;
    };

    LogoLayerClear.prototype.scaleNudge = function() {
      return -(logoSourceSize - this.logoSize) / 2;
    };

    LogoLayerClear.prototype.addChildLayers = function() {
      this.cScale = new Layer({
        name: "scale",
        superLayer: this,
        backgroundColor: "",
        width: logoSourceSize,
        height: logoSourceSize
      });
      this.cPos = new Layer({
        name: "position",
        superLayer: this.cScale,
        backgroundColor: "",
        width: logoSourceSize,
        height: logoSourceSize
      });
      this.cIn = new Layer({
        name: "in",
        superLayer: this.cPos,
        image: "images/c-in.png",
        width: logoSourceSize,
        height: logoSourceSize
      });
      this.cMid = new Layer({
        name: "mid",
        superLayer: this.cPos,
        image: "images/c-mid.png",
        width: logoSourceSize,
        height: logoSourceSize
      });
      this.cOut = new Layer({
        name: "out",
        superLayer: this.cPos,
        image: "images/c-out.png",
        width: logoSourceSize,
        height: logoSourceSize
      });
      return this.cStar = new Layer({
        name: "star",
        superLayer: this.cPos,
        image: "images/star.png",
        width: logoSourceSize,
        height: logoSourceSize
      });
    };

    LogoLayerClear.prototype.reset = function() {
      this.setDefaults(this.cStar);
      this.setDefaults(this.cIn);
      this.setDefaults(this.cMid);
      this.setDefaults(this.cOut);
      this.cScale.properties = {
        rotation: 0,
        scaleX: this.logoScale(),
        scaleY: this.logoScale(),
        x: this.scaleNudge(),
        y: this.scaleNudge()
      };
      this.cPos.properties = {
        rotation: 0,
        x: logoNudge.x,
        y: logoNudge.y
      };
      return this.cStar.properties = {
        x: starNudge.x,
        y: starNudge.y
      };
    };

    LogoLayerClear.prototype.setDefaults = function(layer) {
      return layer.properties = {
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
        x: 0,
        y: 0,
        blur: 0,
        opacity: 1,
        visible: true
      };
    };

    LogoLayerClear.prototype.start = function() {
      if (this.anim !== void 0) {
        return this.anim.start();
      }
    };

    LogoLayerClear.prototype.stop = function() {
      if (this.anim !== void 0) {
        return this.anim.stop();
      }
    };

    return LogoLayerClear;

  })(Layer);

}).call(this);


/*

#class for drawing the comcastro logo's background
 */

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.comcastroYellow = "#FEC71C";

  this.logoSourceSize = 720;

  this.logoNudge = {
    x: -23.1,
    y: 40.26
  };

  this.starNudge = {
    x: -3.301,
    y: -10.022
  };

  this.LogoBg = (function(superClass) {
    extend(LogoBg, superClass);

    function LogoBg(options) {
      this.options = options;
      LogoBg.__super__.constructor.call(this, this.options);
      this.logoSize = 360;
      this.properties = {
        width: this.logoSize,
        height: this.logoSize,
        backgroundColor: comcastroYellow
      };
    }

    LogoBg.prototype.size = function(newSize) {
      this.logoSize = this.width = this.height = newSize;
      this.cScale.scaleX = this.cScale.scaleY = this.logoScale();
      return this.cScale.x = this.cScale.y = this.scaleNudge();
    };

    LogoBg.prototype.logoScale = function() {
      return this.logoSize / logoSourceSize;
    };

    LogoBg.prototype.scaleNudge = function() {
      return -(logoSourceSize - this.logoSize) / 2;
    };

    LogoBg.prototype.setDefaults = function(layer) {
      return layer.properties = {
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
        x: 0,
        y: 0,
        blur: 0,
        opacity: 1,
        visible: true
      };
    };

    LogoBg.prototype.start = function() {
      if (this.anim !== void 0) {
        return this.anim.start();
      }
    };

    LogoBg.prototype.stop = function() {
      if (this.anim !== void 0) {
        return this.anim.stop();
      }
    };

    return LogoBg;

  })(Layer);

}).call(this);

(function() {
  this.AnimationTween = (function() {
    function AnimationTween(logo) {
      this.logo = logo;
      this.anims = [];
    }

    AnimationTween.prototype.start = function() {
      return this.halt = false;
    };

    AnimationTween.prototype.stop = function() {
      var anim, i, len, ref;
      this.halt = true;
      ref = this.anims;
      for (i = 0, len = ref.length; i < len; i++) {
        anim = ref[i];
        anim.stop();
      }
      return this.logo.reset();
    };

    return AnimationTween;

  })();

}).call(this);

(function() {
  this.getAnimation1 = function(logo) {
    return new AnimationSpin(logo);
  };

  this.getAnimation2 = function(logo) {
    return new AnimationSpring(logo);
  };

  this.getAnimation3 = function(logo) {
    return new AnimationBreathePulseRotateSync(logo);
  };

  this.getAnimation4 = function(logo) {
    return new AnimationNodMusic(logo);
  };

  this.getAnimation5 = function(logo) {
    return new AnimationDanger(logo);
  };

  this.getAnimation6 = function(logo) {
    return new AnimationBlurSequence(logo);
  };

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.AnimationSimpleBreathe = (function(superClass) {
    extend(AnimationSimpleBreathe, superClass);

    function AnimationSimpleBreathe(logo) {
      AnimationSimpleBreathe.__super__.constructor.call(this, logo);
      this.makeAnimations();
    }

    AnimationSimpleBreathe.prototype.start = function() {
      AnimationSimpleBreathe.__super__.start.call(this);
      return this.anims[0].start();
    };

    AnimationSimpleBreathe.prototype.makeAnimations = function() {
      var cStarGrow, cStarShrink, growCurve, growScale, growTime, shrinkCurve, shrinkDelay, shrinkTime;
      growScale = 0.9;
      growCurve = "ease-in";
      shrinkCurve = "ease-out";
      growTime = 0.4;
      shrinkTime = 0.4;
      shrinkDelay = 0.2;
      cStarGrow = new Animation({
        layer: this.logo.cStar,
        properties: {
          scaleX: growScale,
          scaleY: growScale
        },
        time: growTime,
        curve: growCurve
      });
      cStarShrink = new Animation({
        layer: this.logo.cStar,
        properties: {
          scaleX: 1,
          scaleY: 1
        },
        time: shrinkTime,
        curve: shrinkCurve,
        delay: shrinkDelay
      });
      this.anims = [cStarGrow, cStarShrink];
      cStarGrow.on(Events.AnimationEnd, function() {
        if (!this.halt) {
          return cStarShrink.start();
        }
      });
      return cStarShrink.on(Events.AnimationEnd, function() {
        if (!this.halt) {
          return cStarGrow.start();
        }
      });
    };

    return AnimationSimpleBreathe;

  })(AnimationTween);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.AnimationSimplePulse = (function(superClass) {
    extend(AnimationSimplePulse, superClass);

    function AnimationSimplePulse(logo) {
      AnimationSimplePulse.__super__.constructor.call(this, logo);
      this.makeAnimations();
      this.logo.cIn.opacity = 0;
      this.logo.cOut.opacity = 0;
    }

    AnimationSimplePulse.prototype.start = function() {
      AnimationSimplePulse.__super__.start.call(this);
      this.anims[0].start();
      return this.anims[1].start();
    };

    AnimationSimplePulse.prototype.makeAnimations = function() {
      var cInFadeIn, cInFadeOut, cOutFadeIn, cOutFadeOut, fadeCurve, fadeDelay, fadeInTime, fadeOutTime, startDelay;
      fadeInTime = 0.3;
      fadeOutTime = 0.3;
      fadeDelay = 0.2;
      startDelay = 0.2;
      fadeCurve = "ease-in-out";
      cInFadeIn = new Animation({
        layer: this.logo.cIn,
        properties: {
          opacity: 1
        },
        curve: fadeCurve,
        time: fadeInTime,
        delay: startDelay
      });
      cOutFadeIn = new Animation({
        layer: this.logo.cOut,
        properties: {
          opacity: 1
        },
        curve: fadeCurve,
        time: fadeInTime,
        delay: fadeDelay + startDelay
      });
      cInFadeOut = new Animation({
        layer: this.logo.cIn,
        properties: {
          opacity: 0
        },
        curve: fadeCurve,
        time: fadeOutTime,
        delay: 0
      });
      cOutFadeOut = new Animation({
        layer: this.logo.cOut,
        properties: {
          opacity: 0
        },
        curve: fadeCurve,
        time: fadeOutTime,
        delay: 0
      });
      this.anims = [cInFadeIn, cOutFadeIn, cInFadeOut, cOutFadeOut];
      cInFadeIn.on(Events.AnimationEnd, (function(_this) {
        return function() {
          if (!_this.halt) {
            return cInFadeOut.start();
          }
        };
      })(this));
      cOutFadeIn.on(Events.AnimationEnd, (function(_this) {
        return function() {
          if (!_this.halt) {
            return cOutFadeOut.start();
          }
        };
      })(this));
      return cOutFadeOut.on(Events.AnimationEnd, (function(_this) {
        return function() {
          if (!_this.halt) {
            cInFadeIn.start();
            return cOutFadeIn.start();
          }
        };
      })(this));
    };

    return AnimationSimplePulse;

  })(AnimationTween);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.AnimationSimpleRotate = (function(superClass) {
    extend(AnimationSimpleRotate, superClass);

    function AnimationSimpleRotate(logo) {
      AnimationSimpleRotate.__super__.constructor.call(this, logo);
      this.makeAnimations();
    }

    AnimationSimpleRotate.prototype.start = function() {
      AnimationSimpleRotate.__super__.start.call(this);
      return this.anims[0].start();
    };

    AnimationSimpleRotate.prototype.makeAnimations = function() {
      var cMidRotate, clockwise, counter, rotationTime;
      rotationTime = 5;
      clockwise = 360;
      counter = -360;
      cMidRotate = new Animation({
        layer: this.logo.cMid,
        properties: {
          rotation: clockwise
        },
        time: rotationTime
      });
      this.anims = [cMidRotate];
      return cMidRotate.on(Events.AnimationEnd, (function(_this) {
        return function() {
          if (!_this.halt) {
            _this.logo.cMid.rotation = 0;
            return cMidRotate.start();
          }
        };
      })(this));
    };

    return AnimationSimpleRotate;

  })(AnimationTween);

}).call(this);

(function() {
  this.AnimationShrinkBlurLayer = (function() {
    function AnimationShrinkBlurLayer(layer, delay) {
      if (delay == null) {
        delay = 0;
      }
      this.layer = layer;
      this.delay = delay;
      this.makeAnimations();
    }

    AnimationShrinkBlurLayer.prototype.start = function() {
      return this.shrinkBlur.start();
    };

    AnimationShrinkBlurLayer.prototype.makeAnimations = function() {
      var blurDelay, blurring, dur, expansion, restartDelay;
      dur = 1;
      expansion = 2;
      blurring = 50;
      blurDelay = 1.2 + this.delay;
      restartDelay = 3.2 - this.delay;
      this.layer.opacity = 0;
      this.layer.scaleX = this.layer.scaleY = expansion;
      this.layer.blur = blurring;
      this.shrinkBlur = new Animation({
        layer: this.layer,
        properties: {
          scaleX: 1,
          scaleY: 1,
          blur: 0,
          opacity: 1
        },
        curve: "ease-in",
        time: dur,
        delay: blurDelay
      });
      this.shrinkBlurReturn = new Animation({
        layer: this.layer,
        properties: {
          scaleX: expansion,
          scaleY: expansion,
          blur: blurring,
          opacity: 0
        },
        curve: "ease-out",
        time: dur / 2,
        delay: restartDelay
      });
      this.shrinkBlur.on(Events.AnimationEnd, (function(_this) {
        return function() {
          return _this.shrinkBlurReturn.start();
        };
      })(this));
      return this.shrinkBlurReturn.on(Events.AnimationEnd, (function(_this) {
        return function() {
          return _this.shrinkBlur.start();
        };
      })(this));
    };

    return AnimationShrinkBlurLayer;

  })();

}).call(this);

(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.AnimationBreathePulseRotateSync = (function(superClass) {
    extend(AnimationBreathePulseRotateSync, superClass);

    function AnimationBreathePulseRotateSync(logo) {
      this.breathePulseStart = bind(this.breathePulseStart, this);
      AnimationBreathePulseRotateSync.__super__.constructor.call(this, logo);
      this.makeAnimations();
      this.logo.cIn.opacity = 0;
      this.logo.cOut.opacity = 0;
    }

    AnimationBreathePulseRotateSync.prototype.start = function() {
      AnimationBreathePulseRotateSync.__super__.start.call(this);
      this.breathePulseStart();
      return this.anims[6].start();
    };

    AnimationBreathePulseRotateSync.prototype.makeAnimations = function() {
      var cInFadeIn, cInFadeOut, cOutFadeIn, cOutFadeOut, cStarGrow, cStarShrink, fadeCurve, fadeDelay, fadeInTime, fadeOutTime, growCurve, growScale, growTime, rotation, shrinkCurve, shrinkTime, startDelay;
      fadeInTime = 0.3;
      fadeOutTime = 0.3;
      fadeDelay = 0.2;
      startDelay = 0.2;
      fadeCurve = "ease-in-out";
      growScale = 0.9;
      growCurve = "ease-in";
      shrinkCurve = "ease-out";
      growTime = 0.4;
      shrinkTime = 0.4;
      cInFadeIn = new Animation({
        layer: this.logo.cIn,
        properties: {
          opacity: 1
        },
        curve: fadeCurve,
        time: fadeInTime,
        delay: startDelay
      });
      cOutFadeIn = new Animation({
        layer: this.logo.cOut,
        properties: {
          opacity: 1
        },
        curve: fadeCurve,
        time: fadeInTime,
        delay: fadeDelay + startDelay
      });
      cInFadeOut = new Animation({
        layer: this.logo.cIn,
        properties: {
          opacity: 0
        },
        curve: fadeCurve,
        time: fadeOutTime,
        delay: 0
      });
      cOutFadeOut = new Animation({
        layer: this.logo.cOut,
        properties: {
          opacity: 0
        },
        curve: fadeCurve,
        time: fadeOutTime,
        delay: 0
      });
      cStarGrow = new Animation({
        layer: this.logo.cStar,
        properties: {
          scaleX: growScale,
          scaleY: growScale
        },
        time: growTime,
        curve: growCurve
      });
      cStarShrink = new Animation({
        layer: this.logo.cStar,
        properties: {
          scaleX: 1,
          scaleY: 1
        },
        time: shrinkTime,
        curve: shrinkCurve
      });
      rotation = new AnimationSimpleRotate(this.logo);
      this.anims = [cInFadeIn, cOutFadeIn, cInFadeOut, cOutFadeOut, cStarGrow, cStarShrink, rotation];
      cInFadeIn.on(Events.AnimationEnd, (function(_this) {
        return function() {
          if (!_this.halt) {
            return cInFadeOut.start();
          } else {
            return _this.logo.reset();
          }
        };
      })(this));
      cOutFadeIn.on(Events.AnimationEnd, (function(_this) {
        return function() {
          if (!_this.halt) {
            return cOutFadeOut.start();
          } else {
            return _this.logo.reset();
          }
        };
      })(this));
      cStarGrow.on(Events.AnimationEnd, (function(_this) {
        return function() {
          if (!_this.halt) {
            return cStarShrink.start();
          } else {
            return _this.logo.reset();
          }
        };
      })(this));
      return cOutFadeOut.on(Events.AnimationEnd, (function(_this) {
        return function() {
          if (!_this.halt) {
            _this.rotatePulse();
            return _this.breathePulseStart();
          } else {
            return _this.logo.reset();
          }
        };
      })(this));
    };

    AnimationBreathePulseRotateSync.prototype.breathePulseStart = function() {
      this.anims[0].start();
      this.anims[1].start();
      return this.anims[4].start();
    };

    AnimationBreathePulseRotateSync.prototype.rotatePulse = function() {
      var twoFifths;
      twoFifths = 144;
      this.logo.cIn.rotation = (this.logo.cIn.rotation + twoFifths) % 360;
      return this.logo.cOut.rotation = this.logo.cOut.rotation + twoFifths % 360;
    };

    return AnimationBreathePulseRotateSync;

  })(AnimationTween);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.AnimationDanger = (function(superClass) {
    extend(AnimationDanger, superClass);

    function AnimationDanger(logo) {
      AnimationDanger.__super__.constructor.call(this, logo);
    }

    AnimationDanger.prototype.startChoppy = function() {
      return this.weirdLoop();
    };

    AnimationDanger.prototype.startSmooth = function() {
      return this.animateCrazy();
    };

    AnimationDanger.prototype.start = function() {
      return this.startSmooth();
    };

    AnimationDanger.prototype.weirdLoop = function() {
      return Utils.delay(0.1, (function(_this) {
        return function() {
          if (!_this.halt) {
            return _this.makeCrazy();
          } else {
            return _this.logo.reset();
          }
        };
      })(this));
    };

    AnimationDanger.prototype.makeCrazy = function() {
      this.logo.cStar.rotation = Utils.randomNumber(0, 72);
      this.logo.cMid.rotation = Utils.randomNumber(-15, 15);
      this.logo.cIn.rotation = this.logo.cOut.rotation = Utils.randomNumber(-15, 15);
      this.logo.cPos.x = logoNudge.x + Utils.randomNumber(-10, 10);
      this.logo.cPos.y = logoNudge.y + Utils.randomNumber(-10, 10);
      return this.weirdLoop();
    };

    AnimationDanger.prototype.animateCrazy = function() {
      var cInRotation, rotateRayScalar, rotateScalar, rotationIn, rotationMid, rotationOut, rotationStar, shakeDur, shakeScalar, shakes, starScalar;
      shakeDur = 0.1;
      shakeScalar = 15;
      rotateScalar = 20;
      rotateRayScalar = 15;
      starScalar = 36;

      /*
      		scaleScalarStar = 0.1
      		scaleScalarC = 0.05
      		scaleValStar = Utils.randomNumber(( 1 - scaleScalarStar ), ( 1 + scaleScalarStar ))
      		scaleValC = Utils.randomNumber(( 1 - scaleScalarC ), ( 1 + scaleScalarC ))
       */
      rotationStar = new Animation({
        layer: this.logo.cStar,
        properties: {
          rotation: Utils.randomNumber(-starScalar, starScalar)
        },
        time: shakeDur,
        curve: "ease-in-out"
      });
      cInRotation = Utils.randomNumber(-rotateRayScalar, rotateRayScalar);
      rotationIn = new Animation({
        layer: this.logo.cIn,
        properties: {
          rotation: cInRotation
        },
        time: shakeDur,
        curve: "ease-in-out"
      });
      rotationOut = new Animation({
        layer: this.logo.cOut,
        properties: {
          rotation: cInRotation + Utils.randomNumber(-10, 10)
        },
        time: shakeDur,
        curve: "ease-in-out"
      });
      rotationMid = new Animation({
        layer: this.logo.cMid,
        properties: {
          rotation: Utils.randomNumber(-rotateScalar, rotateScalar)
        },
        time: shakeDur,
        curve: "ease-in-out"
      });
      shakes = new Animation({
        layer: this.logo.cPos,
        properties: {
          x: logoNudge.x + Utils.randomNumber(-shakeScalar, shakeScalar),
          y: logoNudge.y + Utils.randomNumber(-shakeScalar, shakeScalar)
        },
        time: shakeDur,
        curve: "ease-in-out"
      });
      this.anims = [rotationStar, rotationIn, rotationOut, rotationMid, shakes];

      /*
      		fakeLevel = Utils.randomNumber(0,3)
      		
      		@logo.cIn.visible = (fakeLevel > 1) #false if fakeLevel < 1 else @logo.cIn.visible = true 
      		@logo.cOut.visible = (fakeLevel > 2) #false if fakeLevel < 2 else @logo.cOut.visible = true
       */

      /*
      		
      		@yellowHsl.l = Utils.randomNumber(0.4,0.6)
      		newYellow = tinycolor(@yellowHsl).toHexString()
      		#@logo.backgroundColor = newYellow
      		
      		@shade = new Animation
      			layer: @logo
      			properties: 
      				backgroundColor: newYellow
      			time: shakeDur
       */

      /*
      		@logo.animate
      			properties: 
      				backgroundColor: "newYellow"
      			time:shakeDur
       */
      this.startAll();
      return rotationStar.on(Events.AnimationEnd, (function(_this) {
        return function() {
          if (!_this.halt) {
            return _this.animateCrazy();
          } else {
            return _this.logo.reset();
          }
        };
      })(this));
    };

    AnimationDanger.prototype.startAll = function() {
      this.anims[0].start();
      this.anims[1].start();
      this.anims[2].start();
      this.anims[3].start();
      return this.anims[4].start();
    };

    return AnimationDanger;

  })(AnimationTween);

}).call(this);

(function() {
  this.AnimationExpandBlur = (function() {
    function AnimationExpandBlur(logo) {
      this.logo = logo;
      this.makeAnimations();
    }

    AnimationExpandBlur.prototype.start = function() {
      return this.growblur.start();
    };

    AnimationExpandBlur.prototype.makeAnimations = function() {
      var blurDelay, blurring, dur, expansion;
      dur = 1;
      expansion = 2;
      blurring = 50;
      blurDelay = 2;
      this.logo.cPos.opacity = 0;
      this.logo.cPos.scaleX = this.logo.cPos.scaleY = expansion;
      this.logo.cPos.blur = blurring;
      this.growblur = new Animation({
        layer: this.logo.cPos,
        properties: {
          scaleX: 1,
          scaleY: 1,
          blur: 0,
          opacity: 1
        },
        curve: "ease-in",
        time: dur,
        delay: blurDelay
      });
      this.growblurReturn = new Animation({
        layer: this.logo.cPos,
        properties: {
          scaleX: expansion,
          scaleY: expansion,
          blur: blurring,
          opacity: 0
        },
        curve: "ease-out",
        time: dur,
        delay: blurDelay
      });
      this.growblur.on(Events.AnimationEnd, (function(_this) {
        return function() {
          return _this.growblurReturn.start();
        };
      })(this));
      return this.growblurReturn.on(Events.AnimationEnd, (function(_this) {
        return function() {
          return _this.growblur.start();
        };
      })(this));
    };

    return AnimationExpandBlur;

  })();

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.AnimationNodMusic = (function(superClass) {
    extend(AnimationNodMusic, superClass);

    function AnimationNodMusic(logo) {
      AnimationNodMusic.__super__.constructor.call(this, logo);
      this.makeAnimations();
    }

    AnimationNodMusic.prototype.start = function() {
      AnimationNodMusic.__super__.start.call(this);
      this.anims[0].start();
      return this.weirdLoop();
    };

    AnimationNodMusic.prototype.makeAnimations = function() {
      var cMidRotateDown, cMidRotateUp, rotateDown, rotateDownTime, rotateUp, rotateUpTime;
      rotateUp = -20;
      rotateDown = 20;
      rotateUpTime = 0.5;
      rotateDownTime = 0.5;
      cMidRotateUp = new Animation({
        layer: this.logo.cPos,
        properties: {
          rotation: rotateUp
        },
        time: rotateUpTime,
        curve: "ease-out"
      });
      cMidRotateDown = new Animation({
        layer: this.logo.cPos,
        properties: {
          rotation: rotateDown
        },
        time: rotateDownTime,
        curve: "cubic-bezier(.74,.24,.83,.67)"
      });
      this.anims = [cMidRotateUp, cMidRotateDown];
      cMidRotateUp.on(Events.AnimationEnd, (function(_this) {
        return function() {
          if (!_this.halt) {
            return cMidRotateDown.start();
          } else {
            return _this.logo.reset();
          }
        };
      })(this));
      return cMidRotateDown.on(Events.AnimationEnd, (function(_this) {
        return function() {
          if (!_this.halt) {
            return cMidRotateUp.start();
          } else {
            return _this.logo.reset();
          }
        };
      })(this));
    };

    AnimationNodMusic.prototype.weirdLoop = function() {
      return Utils.delay(0.1, (function(_this) {
        return function() {
          if (!_this.halt) {
            return _this.makeCrazy();
          } else {
            return _this.logo.reset();
          }
        };
      })(this));
    };

    AnimationNodMusic.prototype.makeCrazy = function() {
      var fakeLevel;
      fakeLevel = Utils.randomNumber(0, 3);
      this.logo.cIn.visible = fakeLevel > 1;
      this.logo.cOut.visible = fakeLevel > 2;
      return this.weirdLoop();
    };

    return AnimationNodMusic;

  })(AnimationTween);

}).call(this);

(function() {
  this.AnimationRays = (function() {
    function AnimationRays(logo) {
      this.logo = logo;
      this.makeAnimations();
      this.logo.cIn.opacity = 0;
      this.logo.cOut.opacity = 0;
    }

    AnimationRays.prototype.start = function() {
      this.cInFadeIn.start();
      return this.cOutFadeIn.start();
    };

    AnimationRays.prototype.makeAnimations = function() {
      var fadeCurve, fadeDelay, fadeInTime, fadeOutTime, in1, in2, in3, out1, out2, out3, out4, startDelay;
      in1 = this.logo.cIn.copy();
      in1.superLayer = this.logo.cIn;
      in1.rotation = 72;
      in2 = this.logo.cIn.copy();
      in2.superLayer = this.logo.cIn;
      in2.rotation = 72 * 2;
      in3 = this.logo.cIn.copy();
      in3.superLayer = this.logo.cIn;
      in3.rotation = 72 * 3;
      out4 = this.logo.cIn.copy();
      out4.superLayer = this.logo.cIn;
      out4.rotation = 72 * 4;
      out1 = this.logo.cOut.copy();
      out1.superLayer = this.logo.cOut;
      out1.rotation = 72;
      out2 = this.logo.cOut.copy();
      out2.superLayer = this.logo.cOut;
      out2.rotation = 72 * 2;
      out3 = this.logo.cOut.copy();
      out3.superLayer = this.logo.cOut;
      out3.rotation = 72 * 3;
      out4 = this.logo.cOut.copy();
      out4.superLayer = this.logo.cOut;
      out4.rotation = 72 * 4;
      fadeInTime = 0.3;
      fadeOutTime = 0.3;
      fadeDelay = 0.2;
      startDelay = 0.2;
      fadeCurve = "ease-in-out";
      this.cInFadeIn = new Animation({
        layer: this.logo.cIn,
        properties: {
          opacity: 1
        },
        curve: fadeCurve,
        time: fadeInTime,
        delay: startDelay
      });
      this.cOutFadeIn = new Animation({
        layer: this.logo.cOut,
        properties: {
          opacity: 1
        },
        curve: fadeCurve,
        time: fadeInTime,
        delay: fadeDelay + startDelay
      });
      this.cInFadeOut = new Animation({
        layer: this.logo.cIn,
        properties: {
          opacity: 0
        },
        curve: fadeCurve,
        time: fadeOutTime,
        delay: 0
      });
      this.cOutFadeOut = new Animation({
        layer: this.logo.cOut,
        properties: {
          opacity: 0
        },
        curve: fadeCurve,
        time: fadeOutTime,
        delay: 0
      });
      this.cInFadeIn.on(Events.AnimationEnd, (function(_this) {
        return function() {
          return _this.cInFadeOut.start();
        };
      })(this));
      this.cOutFadeIn.on(Events.AnimationEnd, (function(_this) {
        return function() {
          return _this.cOutFadeOut.start();
        };
      })(this));

      /*
      		#wait for cOut fade out
      		@cInFadeOut.on Events.AnimationEnd, =>
      			@cInFadeIn.start()
       */
      return this.cOutFadeOut.on(Events.AnimationEnd, (function(_this) {
        return function() {
          _this.rotatePulse();
          return _this.start();
        };
      })(this));
    };

    AnimationRays.prototype.rotatePulse = function() {
      var twoFifths;
      twoFifths = 144;
      this.logo.cIn.rotation = (this.logo.cIn.rotation + twoFifths) % 360;
      return this.logo.cOut.rotation = this.logo.cOut.rotation + twoFifths % 360;
    };

    return AnimationRays;

  })();

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.AnimationSpin = (function(superClass) {
    extend(AnimationSpin, superClass);

    function AnimationSpin(logo) {
      AnimationSpin.__super__.constructor.call(this, logo);
      this.makeAnimations();
    }

    AnimationSpin.prototype.start = function() {
      var anim, i, len, ref, results;
      AnimationSpin.__super__.start.call(this);
      ref = this.anims;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        anim = ref[i];
        results.push(anim.start());
      }
      return results;
    };

    AnimationSpin.prototype.makeAnimations = function() {
      var clockwise, counter, rotationCurve, rotationDelay, rotationTime, spinIn, spinMid, spinOut, spinStar, starCurve, starDelay, starTime;
      clockwise = -360;
      counter = 360;
      starDelay = 0;
      rotationDelay = 0.5;
      starTime = 3;
      rotationTime = 2.5;
      starCurve = "cubic-bezier(0,0,.58,1)";
      rotationCurve = "cubic-bezier(.42,0,.58,1)";
      spinStar = new Animation({
        layer: this.logo.cStar,
        properties: {
          rotation: counter * 3
        },
        curve: starCurve,
        time: starTime,
        delay: starDelay
      });
      spinIn = new Animation({
        layer: this.logo.cIn,
        properties: {
          rotation: counter * 2
        },
        curve: rotationCurve,
        time: rotationTime,
        delay: starDelay + rotationDelay
      });
      spinMid = new Animation({
        layer: this.logo.cMid,
        properties: {
          rotation: clockwise * 2
        },
        curve: rotationCurve,
        time: rotationTime,
        delay: starDelay + rotationDelay
      });
      spinOut = new Animation({
        layer: this.logo.cOut,
        properties: {
          rotation: counter * 2
        },
        curve: rotationCurve,
        time: rotationTime,
        delay: starDelay + rotationDelay
      });
      this.anims = [spinStar, spinIn, spinMid, spinOut];
      return spinStar.on(Events.AnimationEnd, (function(_this) {
        return function() {
          return Utils.delay(1.5, function() {
            if (!_this.halt) {
              _this.logo.cStar.rotation = 0;
              _this.logo.cIn.rotation = 0;
              _this.logo.cMid.rotation = 0;
              _this.logo.cOut.rotation = 0;
              spinStar.start();
              spinIn.start();
              spinMid.start();
              return spinOut.start();
            } else {
              return _this.logo.reset();
            }
          });
        };
      })(this));
    };

    return AnimationSpin;

  })(AnimationTween);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.AnimationSpring = (function(superClass) {
    extend(AnimationSpring, superClass);

    function AnimationSpring(logo) {
      AnimationSpring.__super__.constructor.call(this, logo);
      this.makeAnimations();
    }

    AnimationSpring.prototype.start = function() {
      AnimationSpring.__super__.start.call(this);
      this.anims[0].start();
      this.anims[1].start();
      this.anims[2].start();
      return this.anims[3].start();
    };

    AnimationSpring.prototype.makeAnimations = function() {
      var cInGrow, cInReset, cInShrink, cMidGrow, cMidReset, cMidShrink, cOutGrow, cOutReset, cOutShrink, cStarGrow, cStarReset, cStarShrink, growCurve, growDelay, growScale, growTime, myFrictionGrow, myFrictionShrink, myTensionGrow, myTensionShrink, myToleranceGrow, myToleranceShrink, myVelocityGrow, myVelocityShrink, resetCurve, resetDelay, resetTime, shrinkCurve, shrinkScale, shrinkTime, slinkyTime, starDelayExtra, starGrowExtra, starGrowTimeExtra;
      growScale = 1.2;
      starGrowExtra = 0.8;
      shrinkScale = 0;
      growDelay = 0;
      growTime = 0.2;
      starGrowTimeExtra = 0.1;
      shrinkTime = 0.25;
      resetTime = 0.2;
      resetDelay = 1.5;
      starDelayExtra = 0.28;
      slinkyTime = 0;
      myTensionGrow = 100;
      myFrictionGrow = 10;
      myVelocityGrow = 10;
      myToleranceGrow = 1;
      myTensionShrink = 150;
      myFrictionShrink = 50;
      myVelocityShrink = 10;
      myToleranceShrink = 1;
      growCurve = "cubic-bezier(0,0,.58,1)";
      shrinkCurve = growCurve;
      resetCurve = growCurve;
      cInGrow = new Animation({
        layer: this.logo.cIn,
        properties: {
          scaleX: growScale,
          scaleY: growScale
        },
        curve: growCurve,
        delay: growDelay + slinkyTime * 2,
        time: growTime
      });
      cMidGrow = new Animation({
        layer: this.logo.cMid,
        properties: {
          scaleX: growScale,
          scaleY: growScale
        },
        curve: growCurve,
        delay: growDelay + slinkyTime,
        time: growTime
      });
      cOutGrow = new Animation({
        layer: this.logo.cOut,
        properties: {
          scaleX: growScale,
          scaleY: growScale
        },
        curve: growCurve,
        delay: growDelay,
        time: growTime
      });
      cStarGrow = new Animation({
        layer: this.logo.cStar,
        properties: {
          scaleX: growScale + starGrowExtra,
          scaleY: growScale + starGrowExtra
        },
        curve: growCurve,
        delay: growDelay + starDelayExtra,
        time: growTime + starGrowTimeExtra
      });
      cInShrink = new Animation({
        layer: this.logo.cIn,
        properties: {
          scaleX: shrinkScale,
          scaleY: shrinkScale
        },
        curve: shrinkCurve,
        time: shrinkTime
      });
      cMidShrink = new Animation({
        layer: this.logo.cMid,
        properties: {
          scaleX: shrinkScale,
          scaleY: shrinkScale
        },
        curve: shrinkCurve,
        time: shrinkTime
      });
      cOutShrink = new Animation({
        layer: this.logo.cOut,
        properties: {
          scaleX: shrinkScale,
          scaleY: shrinkScale
        },
        curve: shrinkCurve,
        time: shrinkTime
      });
      cStarShrink = new Animation({
        layer: this.logo.cStar,
        properties: {
          scaleX: shrinkScale,
          scaleY: shrinkScale
        },
        curve: shrinkCurve,
        time: shrinkTime
      });
      cInReset = new Animation({
        layer: this.logo.cIn,
        properties: {
          scaleX: 1,
          scaleY: 1
        },
        curve: resetCurve,
        time: resetTime,
        delay: resetDelay - slinkyTime * 2
      });
      cMidReset = new Animation({
        layer: this.logo.cMid,
        properties: {
          scaleX: 1,
          scaleY: 1
        },
        curve: resetCurve,
        time: resetTime,
        delay: resetDelay - slinkyTime
      });
      cOutReset = new Animation({
        layer: this.logo.cOut,
        properties: {
          scaleX: 1,
          scaleY: 1
        },
        curve: resetCurve,
        time: resetTime,
        delay: resetDelay
      });
      cStarReset = new Animation({
        layer: this.logo.cStar,
        properties: {
          scaleX: 1,
          scaleY: 1
        },
        curve: resetCurve,
        time: resetTime,
        delay: resetDelay - starDelayExtra - starGrowTimeExtra
      });
      this.anims = [cInGrow, cMidGrow, cOutGrow, cStarGrow, cInShrink, cMidShrink, cOutShrink, cStarShrink, cInReset, cMidReset, cOutReset, cStarReset];
      cInGrow.on(Events.AnimationEnd, (function(_this) {
        return function() {
          if (!_this.halt) {
            return cInShrink.start();
          } else {
            return _this.logo.reset();
          }
        };
      })(this));
      cInShrink.on(Events.AnimationEnd, (function(_this) {
        return function() {
          if (!_this.halt) {
            return cInReset.start();
          } else {
            return _this.logo.reset();
          }
        };
      })(this));
      cMidGrow.on(Events.AnimationEnd, (function(_this) {
        return function() {
          if (!_this.halt) {
            return cMidShrink.start();
          } else {
            return _this.logo.reset();
          }
        };
      })(this));
      cMidShrink.on(Events.AnimationEnd, (function(_this) {
        return function() {
          if (!_this.halt) {
            return cMidReset.start();
          } else {
            return _this.logo.reset();
          }
        };
      })(this));
      cOutGrow.on(Events.AnimationEnd, (function(_this) {
        return function() {
          if (!_this.halt) {
            return cOutShrink.start();
          } else {
            return _this.logo.reset();
          }
        };
      })(this));
      cOutShrink.on(Events.AnimationEnd, (function(_this) {
        return function() {
          if (!_this.halt) {
            return cOutReset.start();
          } else {
            return _this.logo.reset();
          }
        };
      })(this));
      cStarGrow.on(Events.AnimationEnd, (function(_this) {
        return function() {
          if (!_this.halt) {
            return cStarShrink.start();
          } else {
            return _this.logo.reset();
          }
        };
      })(this));
      cStarShrink.on(Events.AnimationEnd, (function(_this) {
        return function() {
          if (!_this.halt) {
            return cStarReset.start();
          } else {
            return _this.logo.reset();
          }
        };
      })(this));
      return cStarReset.on(Events.AnimationEnd, (function(_this) {
        return function() {
          return Utils.delay(1.5, function() {
            if (!_this.halt) {
              cInGrow.start();
              cMidGrow.start();
              cOutGrow.start();
              return cStarGrow.start();
            } else {
              return _this.logo.reset();
            }
          });
        };
      })(this));
    };

    return AnimationSpring;

  })(AnimationTween);

}).call(this);

(function() {
  this.AnimationBlurSequence = (function() {
    function AnimationBlurSequence(logo) {
      this.logo = logo;
      this.makeAnimations();
    }

    AnimationBlurSequence.prototype.start = function() {
      this.blurStar.start();
      this.blurC.start();
      this.blurIn.start();
      return this.blurOut.start();
    };

    AnimationBlurSequence.prototype.makeAnimations = function() {
      this.blurStar = new AnimationShrinkBlurLayer(this.logo.cStar, 0);
      this.blurIn = new AnimationShrinkBlurLayer(this.logo.cIn, 0.4);
      this.blurC = new AnimationShrinkBlurLayer(this.logo.cMid, 0.8);
      return this.blurOut = new AnimationShrinkBlurLayer(this.logo.cOut, 1.2);
    };

    return AnimationBlurSequence;

  })();

}).call(this);

(function() {
  this.AnimationBreathePulseRotate = (function() {
    function AnimationBreathePulseRotate(logo) {
      this.logo = logo;
      this.breathe = new AnimationSimpleBreathe(this.logo);
      this.pulse = new AnimationPulseRotate(this.logo);
      this.rotate = new AnimationSimpleRotate(this.logo);
    }

    AnimationBreathePulseRotate.prototype.start = function() {
      this.breathe.start();
      this.pulse.start();
      return this.rotate.start();
    };

    return AnimationBreathePulseRotate;

  })();

}).call(this);

(function() {
  this.AnimationPulseCascade = (function() {
    function AnimationPulseCascade(logo) {
      this.logo1 = logo;
      this.logo2 = new LogoLayer;
      this.logo3 = new LogoLayer;
      this.logo4 = new LogoLayer;
      this.logo5 = new LogoLayer;
      this.spinDelay = .25;
      this.setupLayers();
      this.makeAnimations();
    }

    AnimationPulseCascade.prototype.setupLayers = function() {
      this.logo2.x = this.logo1.x;
      this.logo2.y = this.logo1.y;
      this.logo2.cStar.visible = false;
      this.logo2.cMid.visible = false;
      this.logo2.backgroundColor = "";
      this.logo3.x = this.logo1.x;
      this.logo3.y = this.logo1.y;
      this.logo3.cStar.visible = false;
      this.logo3.cMid.visible = false;
      this.logo3.backgroundColor = "";
      this.logo4.x = this.logo1.x;
      this.logo4.y = this.logo1.y;
      this.logo4.cStar.visible = false;
      this.logo4.cMid.visible = false;
      this.logo4.backgroundColor = "";
      this.logo5.x = this.logo1.x;
      this.logo5.y = this.logo1.y;
      this.logo5.cStar.visible = false;
      this.logo5.cMid.visible = false;
      this.logo5.backgroundColor = "";
      this.logo2.cPos.rotation = 72;
      this.logo3.cPos.rotation = 72 * 2;
      this.logo4.cPos.rotation = 72 * 3;
      return this.logo5.cPos.rotation = 72 * 4;
    };

    AnimationPulseCascade.prototype.makeAnimations = function() {
      this.pulse1 = new AnimationSimplePulse(this.logo1);
      this.pulse2 = new AnimationSimplePulse(this.logo2);
      this.pulse3 = new AnimationSimplePulse(this.logo3);
      this.pulse4 = new AnimationSimplePulse(this.logo4);
      return this.pulse5 = new AnimationSimplePulse(this.logo5);
    };

    AnimationPulseCascade.prototype.start = function() {
      this.pulse1.start();
      Utils.delay(this.spinDelay, (function(_this) {
        return function() {
          return _this.pulse2.start();
        };
      })(this));
      Utils.delay(this.spinDelay * 2, (function(_this) {
        return function() {
          return _this.pulse3.start();
        };
      })(this));
      Utils.delay(this.spinDelay * 3, (function(_this) {
        return function() {
          return _this.pulse4.start();
        };
      })(this));
      Utils.delay(this.spinDelay * 4, (function(_this) {
        return function() {
          return _this.pulse5.start();
        };
      })(this));
      return Utils.delay(this.spinDelay * 5, (function(_this) {
        return function() {
          return _this.start();
        };
      })(this));
    };

    AnimationPulseCascade.prototype.hideExtra = function(logoIn) {
      logoIn.cStar.visible = false;
      logoIn.cMid.visible = false;
      return logoIn.backgroundColor = "";
    };

    return AnimationPulseCascade;

  })();

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.AnimationPulseRotate = (function(superClass) {
    extend(AnimationPulseRotate, superClass);

    function AnimationPulseRotate(logo) {
      AnimationPulseRotate.__super__.constructor.call(this, logo);
      this.cOutFadeOut.on(Events.AnimationEnd, (function(_this) {
        return function() {
          _this.rotatePulse();
          return _this.start();
        };
      })(this));
    }

    AnimationPulseRotate.prototype.rotatePulse = function() {
      var twoFifths;
      twoFifths = 144;
      this.logo.cIn.rotation = (this.logo.cIn.rotation + twoFifths) % 360;
      return this.logo.cOut.rotation = this.logo.cOut.rotation + twoFifths % 360;
    };

    return AnimationPulseRotate;

  })(AnimationSimplePulse);

}).call(this);

(function() {
  var logo, logoMain, tall;

  logoMain = new LogoBg({
    x: 0,
    y: 0
  });

  logo = new LogoLayerClear;

  tall = false;

  logo.properties = {
    x: 0,
    y: 0
  };

  logo.anim = getAnimation6(logo);

  logo.start();

}).call(this);

(function() {


}).call(this);

