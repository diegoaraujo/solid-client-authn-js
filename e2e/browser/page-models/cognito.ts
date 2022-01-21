/**
 * Copyright 2020 Inrupt Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
 * Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { t, ClientFunction, Selector } from "testcafe";
import { screen } from "@testing-library/testcafe";

export class CognitoPage {
  usernameInput;
  passwordInput;
  submitButton;

  constructor() {
    // The Cognito sign-in page contains the sign-in form twice (once for large screen sizes,
    // and once for small screen sizes) and this basically confuses TestCafe/testing-library. So
    // we explicitly tell TestCafe to make the window large so that we can reliably select
    // the large-screen versions of our required elements!
    this.usernameInput = screen.getByRole("textbox");
    this.passwordInput = Selector(".visible-lg input[type=password]");
    this.submitButton = Selector(".visible-lg input[type=submit]");
  }

  async login(username: string, password: string) {
    await onCognitoPage();

    console.log(username, password);

    await t
      // See the constructor for details of why we need to maximize the window!
      .resizeWindow(1600, 800)
      .typeText(this.usernameInput, username)
      .typeText(this.passwordInput, password)
      .click(this.submitButton);
  }
}

export async function onCognitoPage() {
  await t.expect(Selector("form[name=cognitoSignInForm]").exists).ok();
}
