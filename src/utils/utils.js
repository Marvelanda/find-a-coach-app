export const validateForm = (data) => {
  let isValid = true;

  Object.keys(data).forEach((key) => {
    if (!isValid) {
      return;
    }

    if (Array.isArray(data[key])) {
      if (!data[key].length) {
        isValid = false;
      }
    } else if (!data[key]) {
      isValid = false;
    }
  });

  return isValid;
};
