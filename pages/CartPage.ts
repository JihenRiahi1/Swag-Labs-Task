import { Locator, Page, expect } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly itemName : Locator;
  readonly numberOfItemsInCart : Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator("#checkout");
    this.itemName = page.locator(".inventory_item_name");
    this.numberOfItemsInCart= page.locator(".shopping_cart_badge")
  }

  async verifyItemInCart(itemsName,itemNumber: number) {
    /**
     *  Challenge 4
     *  Now since you've become a master shopper and you added those 3 items
     *  Can you write some code to verify they're safely nestled in the cart?
     *  Remember your detective skills: assertions and selectors are your best friends!
     */
    expect(await this.numberOfItemsInCart.textContent()).toBe(String(itemNumber)) 
    for (let index=0;index< itemNumber;index++) {
      const itemInCart = await this.itemName.nth(index).textContent()
      expect(itemsName).toContain(itemInCart)
    }
  }

  async gotoCheckout() {
    await this.checkoutButton.click();
  }
}
