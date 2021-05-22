import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ReaderComponentsPage, ReaderDeleteDialog, ReaderUpdatePage } from './reader.page-object';

const expect = chai.expect;

describe('Reader e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let readerComponentsPage: ReaderComponentsPage;
  let readerUpdatePage: ReaderUpdatePage;
  let readerDeleteDialog: ReaderDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Readers', async () => {
    await navBarPage.goToEntity('reader');
    readerComponentsPage = new ReaderComponentsPage();
    await browser.wait(ec.visibilityOf(readerComponentsPage.title), 5000);
    expect(await readerComponentsPage.getTitle()).to.eq('Readers');
    await browser.wait(ec.or(ec.visibilityOf(readerComponentsPage.entities), ec.visibilityOf(readerComponentsPage.noResult)), 1000);
  });

  it('should load create Reader page', async () => {
    await readerComponentsPage.clickOnCreateButton();
    readerUpdatePage = new ReaderUpdatePage();
    expect(await readerUpdatePage.getPageTitle()).to.eq('Create or edit a Reader');
    await readerUpdatePage.cancel();
  });

  it('should create and save Readers', async () => {
    const nbButtonsBeforeCreate = await readerComponentsPage.countDeleteButtons();

    await readerComponentsPage.clickOnCreateButton();

    await promise.all([
      readerUpdatePage.setNameInput('name'),
      // readerUpdatePage.bookSelectLastOption(),
    ]);

    expect(await readerUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');

    await readerUpdatePage.save();
    expect(await readerUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await readerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Reader', async () => {
    const nbButtonsBeforeDelete = await readerComponentsPage.countDeleteButtons();
    await readerComponentsPage.clickOnLastDeleteButton();

    readerDeleteDialog = new ReaderDeleteDialog();
    expect(await readerDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Reader?');
    await readerDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(readerComponentsPage.title), 5000);

    expect(await readerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
