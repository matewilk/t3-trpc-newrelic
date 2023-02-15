const webdriver = require("selenium-webdriver");

const simulateVisits = async () => {
  // Create a new WebDriver instance
  const driver = new webdriver.Builder().forBrowser("chrome").build();

  // Define the URLs to visit and their weights
  const urls = [
    { url: "http://localhost:3000/", weight: 1 },
    { url: "http://localhost:3000/blog", weight: 3 },
    { url: "http://localhost:3000/posts", weight: 5 },
    { url: "http://localhost:3000/about", weight: 1 },
  ];

  // Visit URLs randomly, forever
  while (true) {
    const { url } = weightedRandom(urls);
    if (url.includes("/posts")) {
      const randomId = Math.floor(Math.random() * 100) + 1;
      await driver.get(`http://localhost:3000/posts/${randomId}`);
    } else {
      await driver.get(url);
      if (url.includes("/blog")) {
        const loadMoreButton = await driver.wait(
          webdriver.until.elementLocated(
            webdriver.By.xpath("//button[contains(text(),'Load more')]")
          )
        );
        await driver.wait(webdriver.until.elementIsVisible(loadMoreButton));
        await loadMoreButton.click();
      }
    }
    await driver.sleep(5000);
  }
};

function weightedRandom(items) {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  const random = Math.random() * totalWeight;
  let weightSum = 0;
  for (let i = 0; i < items.length; i++) {
    weightSum += items[i].weight;
    if (random < weightSum) {
      return items[i];
    }
  }
}

simulateVisits();
