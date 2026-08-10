/**
 * Custom API fetch utility with safe response parsing and status code error mapping.
 */
export async function apiFetch(url, options = {}) {
  const token = localStorage.getItem("token");
  
  const defaultHeaders = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  let res;
  try {
    res = await fetch(url, config);
  } catch (netErr) {
    console.error("API Error: Network/Server Connection Failed", netErr);
    throw new Error("Server unavailable. Please check your internet connection.");
  }

  // Safe API response text extraction before JSON parsing
  const text = await res.text();
  let data = {};
  if (text) {
    try {
      data = JSON.parse(text);
    } catch (parseErr) {
      console.error("API Error: Invalid JSON response", parseErr, text);
    }
  }

  if (!res.ok) {
    // Determine status-code-based human readable error message
    let errorMessage = data.message;
    if (!errorMessage) {
      switch (res.status) {
        case 400:
          errorMessage = "Bad request. Please check your input.";
          break;
        case 401:
          errorMessage = "Session expired. Please log in again.";
          break;
        case 403:
          errorMessage = "Access denied. You do not have permission.";
          break;
        case 404:
          errorMessage = "Resource not found.";
          break;
        case 500:
        default:
          errorMessage = "Server unavailable. Please try again later.";
          break;
      }
    }

    console.error(`API Error [${res.status} ${url}]:`, {
      status: res.status,
      statusText: res.statusText,
      data,
    });

    const errorObj = new Error(errorMessage);
    errorObj.status = res.status;
    errorObj.data = data;
    throw errorObj;
  }

  return data;
}
