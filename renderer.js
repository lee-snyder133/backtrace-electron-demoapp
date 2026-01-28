console.log("Renderer script loaded.");

// Catch standard crashes
window.onerror = (message, source, lineno, colno, error) => {
  console.log("Global error caught:", message);
  window.backtraceApi.send(error || new Error(message));
};

// Catch broken Promises
window.addEventListener("unhandledrejection", (event) => {
  console.log("Unhandled Promise Rejection caught!");
  // event.reason is the actual Error object from the failed promise
  window.backtraceApi.send(
    event.reason || new Error("Unknown Promise Rejection"),
  );
});

// A. Send a Handled Error
document.getElementById("btn-handled")?.addEventListener("click", () => {
  try {
    const result = someUndefinedVariable / 10;
  } catch (err) {
    console.log("Sending handled error...");
    window.backtraceApi.send(err);
    alert("Handled error sent!");
  }
});

// B. Send a String Message
document.getElementById("btn-msg")?.addEventListener("click", () => {
  console.log("Sending message...");
  window.backtraceApi.send("User clicked the feedback button");
  alert("String report sent!");
});

// C. Trigger Unhandled Exception (Crash)
document.getElementById("btn-unhandled")?.addEventListener("click", () => {
  console.log("Triggering crash...");
  throw new Error("This is an UNHANDLED renderer exception!");
});

// D. Trigger Promise Rejection (Async Failure)
document.getElementById("btn-promise")?.addEventListener("click", () => {
  console.log("Starting bad promise...");
  // Simulate a delayed failure (like a database timeout)
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("API 500: Failed to fetch user data"));
    }, 100);
  });
});

// E. Trigger RangeError
document.getElementById("btn-range")?.addEventListener("click", () => {
  console.log("Triggering RangeError...");
  const arr = new Array(-1);
});
