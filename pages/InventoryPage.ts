import { expect, Locator, Page } from "@playwright/test";
import { LegacyCharacterEncoding } from "crypto";

export class InventoryPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly shoppingCartButton: Locator;
  readonly addBackBackButton: Locator;
  readonly addTocart : Locator;
  readonly productSort : Locator;
  readonly activeSort : Locator;
  readonly itemName : Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator(".title");
    this.shoppingCartButton = page.locator(".shopping_cart_link");
    this.addBackBackButton = page.locator("#add-to-cart-sauce-labs-backpack");
    this.addTocart= page.locator("text=Add to cart");
    this.productSort = page.locator(".product_sort_container")
    this.activeSort = page.locator(".active_option")
    this.itemName = page.locator(".inventory_item_name")

  }

  async gotoShoppingCart() {
    await this.shoppingCartButton.click();
  }

  async addBackPack(itemNumber: number, sortBy: string) {
    // we can use this function for diferent numbers of item not only the 3 fist items, also we can choose to sort them by all possible options

    let itemsName :string[] =[];
    switch (sortBy){
      case "Price (high to low)":
        await this.productSort.selectOption({value:"hilo"});
        break;
      case "Price (low to high)":
        await this.productSort.selectOption({value:"lohi"});
        break;
      case "Name (A to Z)":
        await this.productSort.selectOption({value:"az"});
        break;
      case "Name (Z to A)":
        await this.productSort.selectOption({value:"za"});
        break;
      default:
        break
    }  
    await this.activeSort.waitFor({ state: 'visible' });
    expect(this.activeSort).toHaveText(sortBy);

    for (let i=0;i< itemNumber;i++){
    await this.addTocart.first().click();
    const itemName = await this.itemName.nth(i).textContent();
    itemsName = itemsName.concat(itemName);
    }
    
    return itemsName;
    

  }

  /**
   * Challenge 3
   * Seriously? adding just one product? This is a demo site, let's live a little!
   * Add the first 3 products in the page to the cart but
   * those 3 products should be the high-price prodcuts.
   * Challenge accepted? then you will get bonus points for reusability ;)
   */
}
