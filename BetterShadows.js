//=============================================================================
// BetterShadows.js
// Version: 1.0.0
//=============================================================================
/*:
 * @plugindesc 1.0.0 Allows you to customize the default shadows.
 * @author Alexander Shepherd
 * @website www.alexandershepherd.xyz
 *
 * @param Red Value
 * @desc The red value of the shadows. Specify a floating point value between 0.0 and 1.0
 * @default 0.0
 *
 * @param Green Value
 * @desc The green value of the shadows. Specify a floating point value between 0.0 and 1.0
 * @default 0.0
 *
 * @param Blue Value
 * @desc The blue value of the shadows. Specify a floating point value between 0.0 and 1.0
 * @default 0.0
 *
 * @param Alpha Value
 * @desc The alpha of the shadows. Specify a floating point value between 0.0 and 1.0
 * @default 0.5
 *
 * @param Enable Shadows
 * @desc Specify 'true' to enable shadows or 'false' to disable them (in-game only).
 * @default true
 *
 * @help
 * Information
 * ==============================================================================
 * BetterShadows is a simple script that allows you to quickly change the color
 * and the alpha values of the default shadows in RPGMaker MV. Any changes that
 * you make will not be visible in the editor, and you must run the game in
 * playtest mode to preview your changes.
 */
(function() {
	var _defaultRValue = 0.0;
	var _defaultGValue = 0.0;
	var _defaultBValue = 0.0;
	var _defaultAValue = 0.5;

	var parameters = PluginManager.parameters('BetterShadows');
	var rValue = Number(parameters['Red Value']   || _defaultRValue);
	var gValue = Number(parameters['Blue Value']  || _defaultGValue);
	var bValue = Number(parameters['Green Value'] || _defaultBValue);
	var aValue = Number(parameters['Alpha Value'] || _defaultAValue);
	var enabled = parameters['Enable Shadows'].toLowerCase() === "false" ? false : true;
	
	// Check if user has entered a valid value between 0 and 1.
	rValue = (rValue < 0 || rValue > 1) ? _defaultRValue : rValue;
	gValue = (gValue < 0 || gValue > 1) ? _defaultGValue : gValue;
	bValue = (bValue < 0 || bValue > 1) ? _defaultBValue : bValue;
	aValue = (aValue < 0 || aValue > 1) ? _defaultAValue : aValue;
	
	if (!enabled) {
		var _ShaderTilemap__drawShadow = ShaderTilemap.prototype._drawShadow;
		ShaderTilemap.prototype._drawShadow = function() { };
	}
	
	var _ShaderTilemap__createLayers = ShaderTilemap.prototype._createLayers;
	ShaderTilemap.prototype._createLayers = function() {
		_ShaderTilemap__createLayers.call(this);
    if (this.lowerZLayer && this.lowerLayer) {
			// Modify the rgba color values for all of the shadows.
      this.lowerLayer.shadowColor = new Float32Array([rValue, gValue, bValue, aValue]);
    }
	};
})();