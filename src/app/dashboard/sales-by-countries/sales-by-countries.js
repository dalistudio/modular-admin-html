$(function() {

    if (!$('#sales-map').length) {
        return false;
    }

    var color = config.colorPrimary.toHexString();
    var darkColor = tinycolor(config.colorPrimary.toString()).darken(40).toHexString();
    var selectedColor = tinycolor(config.colorPrimary.toString()).darken(10).toHexString();

    var sales_data = {
        us: 2000,
        ru: 2000, 
        gb: 10000,
        fr: 10000,
        de: 10000,
        cn: 10000,
        in: 10000,
        sa: 10000,
        ca: 10000,
        br: 5000,
        au: 5000
    };

    $('#sales-map').vectorMap({
        map: 'world_en',
        backgroundColor: 'transparent',
        color: '#E5E3E5',
        hoverOpacity: 0.7,
        selectedColor: selectedColor,
        enableZoom: true,
        showTooltip: true,
        values: sales_data,
        scaleColors: [ color, darkColor],
        normalizeFunction: 'linear'
    });
});