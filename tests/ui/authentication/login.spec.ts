import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';
import { LoginPage } from '../../../src/pages/login.page';

// Root directory se .env load karne ke do standard tareeqay
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

test.describe('Optix Operator Portal - Login', () => {
  test('Happy Path: User should login with valid credentials from .env', async ({ page }) => {
    const loginPage = new LoginPage(page);

    const username = process.env.OPTIX_USERNAME;
    const password = process.env.OPTIX_PASSWORD;

    if (!username || !password) {
      throw new Error(
        `Credentials not found in .env! (Resolved path: ${path.resolve(process.cwd(), '.env')})`
      );
    }

    console.log(`Running login test for username: ${username}`);

    await loginPage.open();
    await loginPage.login(username, password);

    // Verify navigation away from login page
    await expect(page).not.toHaveURL(/Account\/Login/i, { timeout: 10000 });
  });
});