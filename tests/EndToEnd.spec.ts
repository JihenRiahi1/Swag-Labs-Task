import { expect, test, Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import * as data from "../tests_data/test_data.json"


let page: Page;
let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;

test.beforeEach(async ({ browser }) => {
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  cartPage = new CartPage(page);
  checkoutPage = new CheckoutPage(page);
});

test.describe("Swag Labs Tests ", () => {



  test("End to End scenario", async ({}) => {
    /**
     * Challenge 8
     * Can you break it down into smaller, more focused tests
     * Think "separation of concerns" and keeping things nice and tidy and
     * make any extra methods/verifications you think it will be helpfull
     */

    await loginPage.navigateToWebsite(data.baeUrl);
    await loginPage.login(data.validUser,data.password);
    expect(page.url()).toBe(data.homePageUrl);
    const itemsNames= await inventoryPage.addBackPack(data.numberOfItems,data.sortByPriceHighToLow);
    await inventoryPage.gotoShoppingCart();
    await cartPage.verifyItemInCart(itemsNames, data.numberOfItems); //You got it right ? :)
    await cartPage.gotoCheckout();
    await checkoutPage.fillCheckoutInformation(data.firstName,data.lastName,data.postalCode);
    await checkoutPage.verifyTotalPrice(data.totalPrice);
    await checkoutPage.submitOrder();
    await checkoutPage.verifyOrderConfirmation();

    /**
     * You Conquered the basics!  Explore further for bonus points:
     *  - More test cases (users, scenarios)
     *  - Framework improvements (refactoring, data-driven - reporting)
     *  - CI/CD integration (GitHub Actions)
     * Show us your test automation creativity!
     */
  });

  test("Blocked Out User", async ({}) => {
    await loginPage.loginLocketOutUser(data.baeUrl,data.blockedOutUser,data.password);
  });

  test("Problem User", async ({}) => {
    await loginPage.navigateToWebsite(data.baeUrl);
    await loginPage.login(data.problemUser,data.password);
    expect(page.url()).toBe(data.homePageUrl);
    await inventoryPage.problemSortItem(data.sortByPriceHighToLow)

  })

});
