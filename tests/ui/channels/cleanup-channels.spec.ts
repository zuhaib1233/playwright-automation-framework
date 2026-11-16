import { test, expect } from '../../../src/fixtures/testFixtures';
import { getSavedChannels, removeChannelFromJson } from '../../../src/utils/jsonHelper';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

test.describe('Optix IPTV - Targeted Cleanup from JSON', () => {
  test.setTimeout(60000);

  test.beforeEach(async ({ loggedInUser, channelsPage }) => {
    await channelsPage.navigateToChannels();
  });

  test('TC-CLN-001: Strictly delete channels tracked in JSON', async ({ channelsPage, page }) => {
    const trackedChannels = getSavedChannels();

    if (trackedChannels.length === 0) {
      console.log('No automation channels found in JSON to delete.');
      return;
    }

    console.log(`Found ${trackedChannels.length} test channel(s) in JSON to clean up.`);

    for (const channel of trackedChannels) {
      await test.step(`Deleting #${channel.number} - ${channel.name}`, async () => {
        const isDeleted = await channelsPage.deleteTestChannelStrictly(channel.number, channel.name);

        // Agar channel delete nahi hua toh test ko fail karein taake silent skip na ho
        expect(isDeleted, `Channel #${channel.number} delete hone se pehle hi fail ho gaya!`).toBeTruthy();

        // Verify karein ke table se remove ho chuka hai
        const remainingRow = page.locator('tr, [role="row"]')
          .filter({ hasText: channel.number })
          .filter({ hasText: channel.name });

        await expect(remainingRow).toHaveCount(0, { timeout: 7000 });

        // JSON file se remove karein
        removeChannelFromJson(channel.number, channel.name);
        console.log(`Cleaned #${channel.number} from test-channels.json.`);
      });
    }
  });
});