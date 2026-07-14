const API_URL =
  "https://script.google.com/macros/s/AKfycbwWfeN_vzs4INnsqj_wijUin3Llr6TN1WvyuoKSgmoN_WlZnxhSeyeZr31gSbezeYG0Wg/exec";

// --------------------
// Submit Form
// --------------------

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

  if (!response.ok) {
    throw new Error(text);
  }

  return JSON.parse(text);
}

// --------------------
// Get Courses
// --------------------

export async function getCourses() {
  const response = await fetch(`${API_URL}?action=courses`);

  return await response.json();
}

// --------------------
// Get Batches
// --------------------

export async function getBatches() {
  const response = await fetch(`${API_URL}?action=batches`);

  return await response.json();
}

// --------------------
// Get Settings
// --------------------

export async function getSettings() {
  const response = await fetch(`${API_URL}?action=settings`);

  return await response.json();
}