import { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator("#user-name");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("#login-button");

  }

  async navigateToWebsite(url: string) {
    await this.page.goto(url);
  }

  async login(email: string, password: string) {
    /**
     * Challenge 1
     * Our QA Engineers would rather be trapped in a Matrix with endless loops
     * than see hardcoded values. (Let's embrace best practices)
     */

    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();

    /**
     * Challenge 2
     * Did we login successfully? Here's your chance to add confirmation!
     */

    /* 
    ##################
    Challenge 2 is don in MediaElementAudioSourceNode.spec.ts
    The confirmation is not here so i can use this function in other test for exemple test login with wrong user
    ##################
    */


  }
}