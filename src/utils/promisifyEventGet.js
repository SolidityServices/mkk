export default function (event) {
  const promisify = inner => new Promise((resolve, reject) => inner((err, res) => {
    if (err) {
      reject(err);
    }

    resolve(res);
  }));

  return promisify(callback => event.get(callback));
}
