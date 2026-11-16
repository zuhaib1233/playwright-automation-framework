import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  // Sirf Login page ke specific locators
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    super(page); // BasePage constructor ko page pass kar diya

    this.usernameInput = page.locator('input[type="email"], input[name="username"], #username, #email').first();
    this.passwordInput = page.locator('input[type="password"], #password').first();
    this.signInButton = page.locator('button[type="submit"], input[type="submit"], button:has-text("Sign in")').first();
  }

  async open() {
    // BasePage ka navigateTo method use kiya
    await this.navigateTo('/Account/Login?ReturnUrl=%2F');
  }

  async login(username: string, pass: string) {
    // BasePage ke fillText aur clickElement use kiye
    await this.fillText(this.usernameInput, username);
    await this.fillText(this.passwordInput, pass);
    await this.clickElement(this.signInButton);
    
  }
}