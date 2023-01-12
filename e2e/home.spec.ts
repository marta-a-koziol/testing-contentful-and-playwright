import { expect, test, webkit} from '@playwright/test';
// import test from './next-fixture';

test.beforeEach(async ({ page, baseURL }) => {
  await page.goto(baseURL || 'http://localhost:3000');
});

test.beforeAll(async ({ browserName }, workerInfo) => {
  console.log(`Running ${browserName} in worker #${workerInfo.workerIndex}`);
});

test.describe('Blog Homepage', () => {
  test('Should display correct h1 title', async ({page}) => {
    const h1 = await page.textContent('h1');
    expect(h1).toBe('Blog.');
  });

  test('should access Blog 1 by redirect', async ({ page }) => {
    await page.goto(`posts/learning-playwright-workflows`);
    const h1 = await page.textContent('h1');
    expect(h1).toBe('Learning Playwright Workflows');
  });

  test('should ', async ({page},...rest) => {

    await page.goto(`/posts`);
    const h1 = await page.textContent('h1');
    expect(h1).toBe('This is H1');
  });

  test('should  author', async ({page},...rest) => {

    await page.goto(`/posts/authors`);
    const h1 = await page.textContent('h2');
    expect(h1).toBe('This is H2 in Authors');
  });

});
