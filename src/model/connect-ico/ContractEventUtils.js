// eslint-disable-next-line class-methods-use-this
export default function promosifyEventGet(myEvent) {
  // eslint-disable-next-line arrow-parens
  const promisify = (inner) =>
  // eslint-disable-next-line implicit-arrow-linebreak
    new Promise((resolve, reject) =>
    // eslint-disable-next-line implicit-arrow-linebreak
      inner((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }));
  return promisify(callBack => myEvent.get(callBack));
}
