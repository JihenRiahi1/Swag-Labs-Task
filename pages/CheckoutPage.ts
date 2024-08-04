import { Locator, Page, expect } from "@playwright/test";
export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly totalPriceLabel: Locator;
  readonly finishButton: Locator;
  readonly orderConfirmationLabel: Locator; // Placeholder for verification

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator("#first-name");
    this.lastNameInput = page.locator("#last-name");
    this.postalCodeInput = page.locator("#postal-code");
    this.continueButton = page.locator("#continue");
    this.totalPriceLabel = page.locator(".summary_total_label");
    this.finishButton = page.locator("#finish");
    this.orderConfirmationLabel = page.locator(".complete-header");
  }
  /**
   * Challenge 5
   * Hmm... Hardcoded firstname , lastname and postal code?
   * Remember, data is king (and should be configurable!)
   */
  async fillCheckoutInformation(firstName:string, lastName: string,postalCode:string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }
  async verifyTotalPrice(totalPrice:string) {
    /**
     * Challenge 6
     * These 3 amazing products (you added them, right?) should add up to $103.65 with VAT.
     * Can you implement the verify total price method then ?
     */
    const finalPrice = await this.totalPriceLabel.textContent();
    expect(finalPrice.split("$")[1]).toBe(totalPrice)
  }
  async submitOrder() {
    await this.finishButton.click();
  }

  async verifyOrderConfirmation() {
    /**
     * Challenge 7
     * Can you write some code to verify the order confirmation message?
     *  (Think: assertions and waiting for elements)
     */
    expect(await this.orderConfirmationLabel.textContent()).toBe("Thank you for your order!")
  }
}
