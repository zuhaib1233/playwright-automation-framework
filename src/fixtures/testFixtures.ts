import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ChannelsPage } from '../pages/channels.page';

type MyFixtures = {
  loginPage: LoginPage;
  channelsPage: ChannelsPage;
  loggedInUser: void;
};

export const test = baseTest.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  channelsPage: async ({ page }, use) => {
    await use(new ChannelsPage(page));
  },

  // Auto-login fixture: Ye channel test shuru hone se pehle login handle karega
  loggedInUser: async ({ loginPage }, use) => {
    const username = process.env.OPTIX_USERNAME!;
    const password = process.env.OPTIX_PASSWORD!;

    await loginPage.open();
    await loginPage.login(username, password);
    await use();
  },
});

export { expect } from '@playwright/test';