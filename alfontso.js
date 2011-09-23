/* alfontso.js

  Assumptions:
    - device is not trumping font sizes
    - people actually want to change their base font size
      across multiple breakpoints in a responsive design
*/
var alfontso = (function() {

  var _body, _minSize, _maxSize, _baseFontSize, _baseViewportWidth, _fontMod, _curFontSize;        
  
  function update() {   
    // calc mod by finding percentage of new width relative to base
    _fontMod = ((100 / _baseViewportWidth) * getComputedStyle(_body, null).width.slice(0,-2)) / 100;
    
    // calc new font size
    _curFontSize = _baseFontSize * _fontMod;
    
    // reset curFontSize if it exceeds a min/max
    if (_curFontSize > _maxSize) {
      _curFontSize = _maxSize;
    } else if (_curFontSize < _minSize) {
      _curFontSize = _minSize;
    }
    
    _body.setAttribute('style','font-size:' + _curFontSize + 'px');
  }

  return {
    'init': function() {
      _body = document.getElementsByTagName('body')[0];
      _baseFontSize = getComputedStyle(_body, null).fontSize.slice(0,-2);
      _baseViewportWidth = getComputedStyle(_body, null).width.slice(0,-2);
      
      // hard-coded deviations to set max & min
      _minSize = _baseFontSize * 0.85;
      _maxSize = _baseFontSize * 1.15;

      window.addEventListener('resize', function() { update(); });
    } 
  };

})();

alfontso.init();