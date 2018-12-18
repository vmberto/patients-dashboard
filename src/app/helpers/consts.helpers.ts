export const generateRandomColor = () => {
    return new Array(7)
        .fill(0)
        .map( (_, i) => i ? '0123456789abcdef' [Math.floor(Math.random() * 16)] : '#')
        .join('');
};

export const sortByKey = (array, key) => {
    return array.sort(function(a, b) {
        const x = a[key];
        const y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
};

export const isObjectEmpty = (obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }