import { Fragment } from "react";
import { Disclosure, Menu, Tab, Transition } from "@headlessui/react";
// import { CodeBlock, dracula } from "react-code-blocks";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "INK Wizard", href: "#", current: true },
  { name: "ASK Wizard", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  //{
  // code,
  // language,
  // showLineNumbers,
  // startingLineNumber,
  //}
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="w-full bg-gray-200 fixed">
          {({ open }) => (
            <>
              <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-5">
                      <img
                        className="h-8"
                        src="https://polkadot.network/assets/img/logo-polkadot.svg?v=7c95a3c890"
                        alt="Your Company"
                      />
                    </div>
                    <h1 className="text-2xl font-bold">Contracts Wizard 🪄</h1>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-400 text-black"
                                : "text-gray-800 hover:bg-gray-700 hover:text-white",
                              "px-3 py-2 rounded-md text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">View notifications</span>
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user.imageUrl}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block px-3 py-2 rounded-md text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pt-4 pb-3">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <main>
          <aside
            id="sidebar"
            class="fixed flex flex-col hidden z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
            aria-label="Sidebar"
          >
            <div class="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
              <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div class="flex-1 flex flex-col px-3 bg-white">
                  <Tab.Group>
                    <Tab.List>
                      <Tab className="bg-gradient-to-r from-indigo-600 to-pink-500 hover:bg-fuchsia-500 text-white rounded-lg p-2 m-1 text-sm font-medium leading-5 text-black-700">
                        PSP22
                      </Tab>
                      <Tab className="bg-gradient-to-r from-indigo-600 to-pink-500 hover:bg-fuchsia-500 text-white rounded-lg p-2 m-1 text-sm font-medium leading-5 text-black-700">
                        PSP34
                      </Tab>
                    </Tab.List>
                    <Tab.Panels>
                      <Tab.Panel>
                        <fieldset className="mt-4">
                          <legend className="text-fuchsia-500">
                            EXTENSIONS:
                          </legend>

                          <div>
                            <input
                              className="h-4 w-4 mr-2 border-gray-300"
                              type="checkbox"
                              id="huey"
                              name="drone"
                              value="huey"
                              checked
                            />
                            <label for="huey">Mintable</label>
                          </div>

                          <div>
                            <input
                              className="h-4 w-4 mr-2  border-gray-300"
                              type="checkbox"
                              id="dewey"
                            />
                            <label for="dewey">Burnable</label>
                          </div>

                          <div>
                            <input
                              className="h-4 w-4 mr-2 border-gray-300"
                              type="checkbox"
                              id="louie"
                            />
                            <label for="louie">Cappel</label>
                          </div>
                          <div>
                            <input
                              className="h-4 w-4 mr-2 border-gray-300"
                              type="checkbox"
                              id="meta"
                            />
                            <label for="meta">Metadata</label>
                          </div>
                          <div>
                            <input
                              className="h-4 w-4 mr-2 border-gray-300"
                              type="checkbox"
                              id="wrapper"
                            />
                            <label for="wrapper">Wrapper</label>
                          </div>
                        </fieldset>
                        <fieldset className="mt-4">
                          <legend className="text-fuchsia-500">
                            ACCESS CONTROL
                          </legend>

                          <div>
                            <input
                              className="h-4 w-4 mr-2 border-gray-300"
                              type="checkbox"
                              id="scales"
                              name="scales"
                              checked
                            />
                            <label for="scales">Ownable</label>
                          </div>

                          <div>
                            <input
                              className="h-4 w-4 mr-2 border-gray-300"
                              type="checkbox"
                              id="horns"
                              name="horns"
                            />
                            <label for="horns">Roles</label>
                          </div>
                        </fieldset>
                      </Tab.Panel>
                      <Tab.Panel>
                        <fieldset className="mt-4">
                          <legend className="text-fuchsia-500">
                            ACCESS CONTROL
                          </legend>

                          <div>
                            <input
                              className="h-4 w-4 mr-2 border-gray-300"
                              type="checkbox"
                              id="scales"
                              name="scales"
                              checked
                            />
                            <label for="scales">Ownable</label>
                          </div>

                          <div>
                            <input
                              className="h-4 w-4 mr-2 border-gray-300"
                              type="checkbox"
                              id="horns"
                              name="horns"
                            />
                            <label for="horns">Roles</label>
                          </div>
                        </fieldset>
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>

                  <div class="mt-auto">
                    <a
                      href="#"
                      target="_blank"
                      class="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2"
                    >
                      <svg
                        class="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                        <path
                          fill-rule="evenodd"
                          d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span class="ml-3">Documentation</span>
                    </a>

                    <a
                      href="#"
                      target="_blank"
                      class="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2"
                    >
                      <svg
                        class="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                      </svg>
                      <span class="ml-3">Github</span>
                    </a>
                    <a
                      href="#"
                      target="_blank"
                      class="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2"
                    >
                      <svg
                        class="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span class="ml-3">Help</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          <div className="bg-gray-50 m-t-1 overflow-y-auto lg:ml-64">
            <div className="p-10 mt-10 w-auto">
              <div className="flex justify-end">
                <button
                  class="h-10 m-3 px-6 font-semibold rounded-full bg-violet-600 text-white"
                  type="submit"
                >
                  Copy to clipboard
                </button>
                <button
                  class="h-10 m-3 px-6 font-semibold rounded-full bg-violet-600 text-white"
                  type="submit"
                >
                  Deploy / Instance
                </button>
                <button
                  class="h-10 m-3 px-6 font-semibold rounded-full bg-violet-600 text-white"
                  type="submit"
                >
                  Download
                </button>
              </div>

              <div className="bg-dark text-white bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
                {/* <CodeBlock
                  text={code}
                  language={language}
                  showLineNumbers={showLineNumbers}
                  startingLineNumber={startingLineNumber}
                  theme={dracula}
                /> */}
                <code>
                  // Copyright (c) 2012-2022 Supercolony // // Permission is
                  hereby granted, free of charge, to any person obtaining // a
                  copy of this software and associated documentation files
                  (the"Software"), // to deal in the Software without
                  restriction, including // without limitation the rights to
                  use, copy, modify, merge, publish, // distribute, sublicense,
                  and/or sell copies of the Software, and to // permit persons
                  to whom the Software is furnished to do so, subject to // the
                  following conditions: // // The above copyright notice and
                  this permission notice shall be // included in all copies or
                  substantial portions of the Software. // // THE SOFTWARE IS
                  PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, // EXPRESS OR
                  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF //
                  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND //
                  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
                  HOLDERS BE // LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                  LIABILITY, WHETHER IN AN ACTION // OF CONTRACT, TORT OR
                  OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION // WITH THE
                  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. ///
                  Extension of [`PSP22`] that allows to set a limit on the total
                  funding use openbrush::traits::Balance; #[openbrush::wrapper]
                  pub type PSP22CappedRef = dyn PSP22Capped; // Copyright (c)
                  2012-2022 Supercolony // // Permission is hereby granted, free
                  of charge, to any person obtaining // a copy of this software
                  and associated documentation files (the"Software"), // to deal
                  in the Software without restriction, including // without
                  limitation the rights to use, copy, modify, merge, publish, //
                  distribute, sublicense, and/or sell copies of the Software,
                  and to // permit persons to whom the Software is furnished to
                  do so, subject to // the following conditions: // // The above
                  copyright notice and this permission notice shall be //
                  included in all copies or substantial portions of the
                  Software. // // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT
                  WARRANTY OF ANY KIND, // EXPRESS OR IMPLIED, INCLUDING BUT NOT
                  LIMITED TO THE WARRANTIES OF // MERCHANTABILITY, FITNESS FOR A
                  PARTICULAR PURPOSE AND // NONINFRINGEMENT. IN NO EVENT SHALL
                  THE AUTHORS OR COPYRIGHT HOLDERS BE // LIABLE FOR ANY CLAIM,
                  DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION // OF
                  CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
                  CONNECTION // WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
                  IN THE SOFTWARE. /// Extension of [`PSP22`] that allows to set
                  a limit on the total funding use openbrush::traits::Balance;
                  #[openbrush::wrapper] pub type PSP22CappedRef = dyn
                  PSP22Capped; // Copyright (c) 2012-2022 Supercolony // //
                  Permission is hereby granted, free of charge, to any person
                  obtaining // a copy of this software and associated
                  documentation files (the"Software"), // to deal in the
                  Software without restriction, including // without limitation
                  the rights to use, copy, modify, merge, publish, //
                  distribute, sublicense, and/or sell copies of the Software,
                  and to // permit persons to whom the Software is furnished to
                  do so, subject to // the following conditions: // // The above
                  copyright notice and this permission notice shall be //
                  included in all copies or substantial portions of the
                  Software. // // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT
                  WARRANTY OF ANY KIND, // EXPRESS OR IMPLIED, INCLUDING BUT NOT
                  LIMITED TO THE WARRANTIES OF // MERCHANTABILITY, FITNESS FOR A
                  PARTICULAR PURPOSE AND // NONINFRINGEMENT. IN NO EVENT SHALL
                  THE AUTHORS OR COPYRIGHT HOLDERS BE // LIABLE FOR ANY CLAIM,
                  DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION // OF
                  CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
                  CONNECTION // WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
                  IN THE SOFTWARE. /// Extension of [`PSP22`] that allows to set
                  a limit on the total funding use openbrush::traits::Balance;
                  #[openbrush::wrapper] pub type PSP22CappedRef = dyn
                  PSP22Capped; // Copyright (c) 2012-2022 Supercolony // //
                  Permission is hereby granted, free of charge, to any person
                  obtaining // a copy of this software and associated
                  documentation files (the"Software"), // to deal in the
                  Software without restriction, including // without limitation
                  the rights to use, copy, modify, merge, publish, //
                  distribute, sublicense, and/or sell copies of the Software,
                  and to // permit persons to whom the Software is furnished to
                  do so, subject to // the following conditions: // // The above
                  copyright notice and this permission notice shall be //
                  included in all copies or substantial portions of the
                  Software. // // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT
                  WARRANTY OF ANY KIND, // EXPRESS OR IMPLIED, INCLUDING BUT NOT
                  LIMITED TO THE WARRANTIES OF // MERCHANTABILITY, FITNESS FOR A
                  PARTICULAR PURPOSE AND // NONINFRINGEMENT. IN NO EVENT SHALL
                  THE AUTHORS OR COPYRIGHT HOLDERS BE // LIABLE FOR ANY CLAIM,
                  DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION // OF
                  CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
                  CONNECTION // WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
                  IN THE SOFTWARE. /// Extension of [`PSP22`] that allows to set
                  a limit on the total funding use openbrush::traits::Balance;
                  #[openbrush::wrapper] pub type PSP22CappedRef = dyn
                  PSP22Capped; // Copyright (c) 2012-2022 Supercolony // //
                  Permission is hereby granted, free of charge, to any person
                  obtaining // a copy of this software and associated
                  documentation files (the"Software"), // to deal in the
                  Software without restriction, including // without limitation
                  the rights to use, copy, modify, merge, publish, //
                  distribute, sublicense, and/or sell copies of the Software,
                  and to // permit persons to whom the Software is furnished to
                  do so, subject to // the following conditions: // // The above
                  copyright notice and this permission notice shall be //
                  included in all copies or substantial portions of the
                  Software. // // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT
                  WARRANTY OF ANY KIND, // EXPRESS OR IMPLIED, INCLUDING BUT NOT
                  LIMITED TO THE WARRANTIES OF // MERCHANTABILITY, FITNESS FOR A
                  PARTICULAR PURPOSE AND // NONINFRINGEMENT. IN NO EVENT SHALL
                  THE AUTHORS OR COPYRIGHT HOLDERS BE // LIABLE FOR ANY CLAIM,
                  DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION // OF
                  CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
                  CONNECTION // WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
                  IN THE SOFTWARE. /// Extension of [`PSP22`] that allows to set
                  a limit on the total funding use openbrush::traits::Balance;
                  #[openbrush::wrapper] pub type PSP22CappedRef = dyn
                  PSP22Capped;
                </code>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
