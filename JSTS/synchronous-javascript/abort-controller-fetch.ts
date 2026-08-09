// AbortController + fetch example in TypeScript

async function fetchWithTimeout(url: string, timeoutMs = 5000): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      console.warn(`Request to ${url} was aborted after ${timeoutMs} ms`);
    } else {
      console.error(`Fetch error for ${url}:`, error);
    }

    throw error;
  }
}

void (async () => {
  const url = "https://jsonplaceholder.typicode.com/todos/1";

  try {
    const response = await fetchWithTimeout(url, 2000);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log("Received data:", data);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Final handling:", error.message);
    }
  }
})();
