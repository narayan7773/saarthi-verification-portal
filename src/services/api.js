const API_URL =
  "https://script.google.com/macros/s/AKfycbwWfeN_vzs4INnsqj_wijUin3Llr6TN1WvyuoKSgmoN_WlZnxhSeyeZr31gSbezeYG0Wg/exec";

export async function submitForm(data) {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    if (data[key] !== null && data[key] !== undefined) {
      formData.append(key, data[key]);
    }
  });

  const response = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  const text = await response.text();

  console.log("Status:", response.status);
  console.log("Response:", text);

  if (!response.ok) {
    throw new Error(text);
  }

  return text;
}