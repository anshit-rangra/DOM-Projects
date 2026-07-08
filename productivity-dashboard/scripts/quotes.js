export function quotes() {
  const quoteText = document.getElementById("quote-text-home");
  const quoteAuthor = document.getElementById("quote-author-home");

  async function getQuote() {
    try {
      const response = await fetch(
        "https://api.api-ninjas.com/v2/quotes?categories=success,wisdom",
        {
          headers: {
            "X-Api-Key": "5csdraX9AABr9pdA09LzWu50SoCKIbNJ6Lab2mPN",
          },
        },
      );
      const data = await response.json();
      quoteText.innerHTML = `"${data[0].quote}"`;
      quoteAuthor.innerHTML = `— ${data[0].author}`;
    } catch {
      quoteText.innerHTML = '"Stay productive and keep moving forward."';
      quoteAuthor.innerHTML = "— Unknown";
    }
  }

  getQuote();
}
