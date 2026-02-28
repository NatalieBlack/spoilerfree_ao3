function addStylesheet() {
    
    
    const newStyleElement = document.createElement("style");

    document.head.appendChild(newStyleElement);

    return newStyleElement;
}

function hideIcons(styleElement) {

    let replaceWithGreyRule = `
        .blurb ul.required-tags li {
        background-color: #ddd;
        }
    `;
    let hideIconsRule = `
        .blurb ul.required-tags li span {
        display: none;
        }
    `;

    styleElement.insertRule(hideIconsRule, styleElement.cssRules.length);
    styleElement.insertRule(replaceWithGreyRule, styleElement.cssRules.length);
}


function hideCommas(stylesheet) {
    
    const selectors = [
        ".tags.commas li::after",
        ".tags .commas li::after",
    ];
    const rule = 'content: ""';
    selectors.forEach((selector) => {
        stylesheet.insertRule(
            `${selector}{${rule}}`,
            stylesheet.cssRules.length,
        );
    })
}

function hideEverything(styleElement) {
    let stylesheet = styleElement.sheet;

    const toHideSelectors = [
        ".tags.freeform .tag",
        ".tags.relationship .tag",
        ".tags.character .tag",
        ".category .tag",
        ".rating .tag",
        ".freeforms .tag",
        ".characters .tag",
        ".relationships .tag",
        "dd.comments a",
        "dd.kudos a",
        "dd.bookmarks a",
        "dl.stats dd.hits",
        ".warnings .tag",
        ".summary",
        // single fic page
        "dd.warning.tags a",
        "dl.stats dd.comments",
        "dl.stats dd.kudos",
        "dl.stats dd.bookmarks",
        "dl.stats dd.hits" ,
        ".summary .userstuff", 
        ".notes .userstuff",
    ];
    const rule = "display: none;\n"

    toHideSelectors.forEach((selector) => {
        stylesheet.insertRule(
            `${selector}{${rule}}`,
            stylesheet.cssRules.length,
        );
    })
    hideCommas(stylesheet);
    hideIcons(stylesheet);
}


function removeStyles(styleElement) {
    if (styleElement) {
        styleElement.remove();
    }
}
    
let styleElement = undefined;

async function main() {
    browser.storage.local.get('sfao3').then((result) => {
    const enabled = result.sfao3;
    if (enabled) {
        styleElement = addStylesheet();
        hideEverything(styleElement);
    }
});
    const storageAttr = 'sfao3';
    browser.storage.onChanged.addListener((changes, area) => {
        if (area === "local" && changes[storageAttr]) {
            const enabled = changes[storageAttr].newValue;
            if (enabled) {
                styleElement = addStylesheet();
                hideEverything(styleElement);
            } else {
                removeStyles(styleElement);
            }
        }
    });
}



main();