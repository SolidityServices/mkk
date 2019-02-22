export default function (inner) {
  return new Promise((resolve, reject) => inner((err, res) => {
    if (err) {
      reject(err);
    }
    resolve(res);
  }));
}
