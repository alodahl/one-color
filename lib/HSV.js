module.exports = function HSV(color) {
  color.installColorSpace('HSV', ['hue', 'saturation', 'value', 'alpha'], {
    rgb: function () {
      var hue = this._hue;
      var saturation = this._saturation;
      var value = this._value;
      var i = Math.min(5, Math.floor(hue * 6));
      var f = hue * 6 - i;
      var p = value * (1 - saturation);
      var q = value * (1 - f * saturation);
      var t = value * (1 - (1 - f) * saturation);
      var red;
      var green;
      var blue;
      switch (i) {
        case 0:
          red = value;
          green = t;
          blue = p;
          break;
        case 1:
          red = q;
          green = value;
          blue = p;
          break;
        case 2:
          red = p;
          green = value;
          blue = t;
          break;
        case 3:
          red = p;
          green = q;
          blue = value;
          break;
        case 4:
          red = t;
          green = p;
          blue = value;
          break;
        case 5:
          red = value;
          green = p;
          blue = q;
          break;
      }
      return new color.RGB(red, green, blue, this._alpha);
    },

    hsl: function () {
      var l = (2 - this._saturation) * this._value;
      var sv = this._saturation * this._value;
      var svDivisor = l <= 1 ? l : 2 - l;
      var saturation;

      // Avoid division by zero when lightness approaches zero:
      if (svDivisor < 1e-9) {
        saturation = 0;
      } else {
        saturation = sv / svDivisor;
      }
      return new color.HSL(this._hue, saturation, l / 2, this._alpha);
    },

    fromRgb: function () {
      // Becomes one.color.RGB.prototype.hsv
      var red = this._red;
      var green = this._green;
      var blue = this._blue;
      var max = Math.max(red, green, blue);
      var min = Math.min(red, green, blue);
      var delta = max - min;
      var hue;
      var saturation = max === 0 ? 0 : delta / max;
      var value = max;
      if (delta === 0) {
        hue = 0;
      } else {
        switch (max) {
          case red:
            hue = (green - blue) / delta / 6 + (green < blue ? 1 : 0);
            break;
          case green:
            hue = (blue - red) / delta / 6 + 1 / 3;
            break;
          case blue:
            hue = (red - green) / delta / 6 + 2 / 3;
            break;
        }
      }
      return new color.HSV(hue, saturation, value, this._alpha);
    },
  });
};
