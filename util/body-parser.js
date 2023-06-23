const checkKeys = (obj) => {
  if (
    obj.age !== undefined &&
    obj.username !== undefined &&
    obj.hobbies !== undefined &&
    Object.keys(obj).length === 3
  ) {
    return true;
  } else {
    return false;
  }
};

module.exports = async (request) => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      request.on("data", (chunk) => {
        body += chunk;
      });
      request.on("end", () => {
        if (checkKeys(JSON.parse(body))) {
          resolve(JSON.parse(body));
        } else {
          resolve("");
        }
        resolve(JSON.parse(body));
      });
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};
