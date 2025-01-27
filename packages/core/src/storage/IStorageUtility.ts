/*
 * Copyright 2022 Inrupt Inc.
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

/**
 * @hidden
 * @packageDocumentation
 */

export default interface IStorageUtility {
  get(
    key: string,
    options?: { errorIfNull?: boolean; secure?: boolean }
  ): Promise<string | undefined>;
  set(
    key: string,
    value: string,
    options?: { secure?: boolean }
  ): Promise<void>;
  delete(key: string, options?: { secure?: boolean }): Promise<void>;
  getForUser(
    userId: string,
    key: string,
    options?: { errorIfNull?: boolean; secure?: boolean }
  ): Promise<string | undefined>;
  setForUser(
    userId: string,
    values: Record<string, string>,
    options?: { secure?: boolean }
  ): Promise<void>;
  deleteForUser(
    userId: string,
    key: string,
    options?: { secure?: boolean }
  ): Promise<void>;
  deleteAllUserData(
    userId: string,
    options?: { secure?: boolean }
  ): Promise<void>;
  /**
   * Register a new session for a given WebID against a given Resource Server.
   * @param webId
   * @param resourceServerIri
   * @param sessionExpires
   */
  storeResourceServerSessionInfo(
    webId: string,
    resourceServerIri: string,
    sessionExpires: number
  ): Promise<void>;
  /**
   * Removes session information for a given WebID and a given Resource Server.
   * Note that if the WebID has no associated session, nothing happens.
   * @param webId
   * @param resourceServerIri
   */
  clearResourceServerSessionInfo(resourceServerIri: string): Promise<void>;
}
