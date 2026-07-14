const API_URL =
  "https://script.google.com/macros/s/AKfycbwWfeN_vzs4INnsqj_wijUin3Llr6TN1WvyuoKSgmoN_WlZnxhSeyeZr31gSbezeYG0Wg/exec";

export async function submitForm(data) {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  return true;
}