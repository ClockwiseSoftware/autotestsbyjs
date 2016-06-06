module.exports = {
    select: select
};


function select(target, targetForOption, type, typeOption) {
    var callback = arguments[arguments.length - 1];

    function getElementByXpath(path) {

        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }

    var select, options;

    switch (type) {
        case 'ById':
            console.log('select id');
            select = document.querySelectorAll('#' + target);
            break;
        case 'ByCss':
            console.log('select css');
            if (!(/^'./.test(target))) {
                target = '.' + target;
            }
            select = document.querySelectorAll(target);
            break;
        case 'ByXpath':
        case 'ByXpathSimple':
            console.log('select xpath');
            select = getElementByXpath(target);
            select = select ? [select] : null;
            break;
        case 'ByName':
            console.log('select name');
            select = document.querySelectorAll('select[name="' + target + '"]');
            break;
    }

    if (select && select.length > 0) {
        options = select[0].getElementsByTagName('option');
    } else {
        callback('Selector not found');
        return;
    }
    console.log(target, targetForOption, type, typeOption);

    if (!options) {
        callback('Option of select not found');
        return;
    }
    Object.keys(options).forEach(function(key, i) {
        var opt = options[key];
        switch (typeOption) {
            case 'label':
                console.log('option     label');

                if (/^regexp\:/.test(targetForOption)) {
                    console.log('option label with regex');
                    if (new RegExp(targetForOption.replace('regexp:', ''), 'ig').test(opt.label)) {
                        opt.selected = true;
                    }
                } else {
                    if (opt.label === targetForOption) {
                        opt.selected = true;
                    }
                }
                break;

            case 'value':
                console.log('option value');

                if (opt.value === targetForOption) {
                    opt.selected = true;
                }

                break;
            case 'id':
                console.log('option id');
                if (opt.id === targetForOption) {
                    opt.selected = true;
                }
                break;
            case 'index':
                console.log('option index');
                if (i === Number(targetForOption)) {
                    opt.selected = true;
                }
                break;
            default:
                if (/^regexp\:/.test(targetForOption)) {
                    console.log('option label with regex');
                    targetForOption = targetForOption.replace('regexp:', '');
                    if (new RegExp(targetForOption.replace('regexp:', ''), 'ig').test(opt.label)) {
                        opt.selected = true;
                    }
                } else {
                    if (opt.label === targetForOption) {
                        opt.selected = true;
                    }
                }
        }

    });
    callback();
}
