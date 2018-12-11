export const generateRandomColor = function () {
    return new Array(7)
        .fill(0)
        .map( (_, i) => i ? '0123456789abcdef' [Math.floor(Math.random() * 16)] : '#')
        .join('');
}