export function eraseCookie(...name): any {
  name.forEach(e => {
    document.cookie = e + '=123;max-age=0;';
  });
}
export function getObjectCookie(cname): any {
  const cookie = getCookie(cname);
  return cookie ? JSON.parse(cookie) : undefined;
}
export function getCookie(cname): string {
  const name = cname + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

export const generateRandomColor = () => {
  return new Array(7)
    .fill(0)
    .map((_, i) => i ? '0123456789abcdef'[Math.floor(Math.random() * 16)] : '#')
    .join('');
};

export const sortByKey = (array, key) => {
  return array.sort(function (a, b) {
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
};
