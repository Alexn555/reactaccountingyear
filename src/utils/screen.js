// Screen resize utility helper

// Check screen and depending on width change columns count (to fit)
export function getScreenColumnsDivider(width = 0, defaultColumns = 3) {
    let columns = defaultColumns;
    if (width <= 776) {
        columns = 1;
    }
    if (width > 776 && width < 993) {
        columns = 2;
    }
    return columns;
}

