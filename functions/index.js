// The name of the cookie where the challenge result is stored.
const COOKIE_NAME = "penis";

// The secret key used to generate and verify the cookie value.
const SECRET_KEY = "infinitecodeiscool";

// The HTML page for the JavaScript challenge.
const CHALLENGE_PAGE = `
<html>
<head>
  <script>
    // A function that generates a random string of 32 characters.
    function generateRandomString() {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < 32; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    }

    // A function that computes the SHA-256 hash of a string.
    async function sha256(message) {
      const msgBuffer = new TextEncoder().encode(message);
      const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
      return hashHex;
    }

    // A function that sets a cookie with a given name and value.
    function setCookie(name, value) {
      document.cookie = name + "=" + value + "; path=/";
    }

    // Generate a random string and compute its hash with the secret key.
    const randomString = generateRandomString();
    const hash = await sha256(randomString + "${SECRET_KEY}");

    // Set the cookie with the hash value and reload the page.
    setCookie("${COOKIE_NAME}", hash);
    window.location.reload();
  </script>
</head>
<body>
  <p>Please wait while we verify your browser...</p>
</body>
</html>
`;

// A function that verifies if a cookie value is valid by comparing it with the secret key.
function verifyCookie(cookie) {
  // Split the cookie string by semicolons and find the one that starts with the cookie name.
  const value = cookie.split(";").find((part) => part.trim().startsWith(`${COOKIE_NAME}=`));

  // If the value exists, extract the hash from it and compare it with the secret key.
  if (value) {
    const hash = value.split("=")[1];
    return hash === SECRET_KEY;
  }

  // If the value does not exist, return false.
  return false;
}

// A function that handles requests to the main page and performs the cookie and JavaScript challenges.
async function handleRequest(request) {
  // Get the cookie value from the request headers.
  const cookie = request.headers.get("Cookie");

  // If the cookie exists and is valid, return the main page content.
  if (cookie && verifyCookie(cookie)) {
    return fetch(request);
  }

  // If the cookie does not exist or is invalid, return the JavaScript challenge page with a new cookie.
  return new Response(CHALLENGE_PAGE, {
    headers: {
      "Content-Type": "text/html",
      // Set the cookie with a random string as a placeholder for the challenge result.
      "Set-Cookie": `${COOKIE_NAME}=${Math.random().toString(36).substring(2)}; path=/`,
    },
  });
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
