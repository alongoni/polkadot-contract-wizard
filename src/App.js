import { Fragment, useState } from 'react';
import { Disclosure, Menu, Tab, Transition } from '@headlessui/react';
import { CopyBlock, nord } from 'react-code-blocks';
import { EXTENSIONS } from './constants';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
const navigation = [
  { name: 'INK Wizard', href: '#', current: true },
  { name: 'ASK Wizard', href: '#', current: false },
];
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example({
  code,
  language,
  showLineNumbers,
  startingLineNumber,
}) {
  const [checked, setChecked] = useState({});
  const text = `// Copyright (c) 2012-2022 Supercolony
  //
  // Permission is hereby granted, free of charge, to any person obtaining
  // a copy of this software and associated documentation files (the"Software"),
  // to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to
  // permit persons to whom the Software is furnished to do so, subject to
  // the following conditions:
  //
  // The above copyright notice and this permission notice shall be
  // included in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  // EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  // NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
  // LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  // OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
  // WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. ${
    checked.mintable?.checked ? checked.mintable.code : ''
  }${checked.burnable?.checked ? checked.burnable.code : ''}${
    checked.cappel?.checked ? checked.cappel.code : ''
  }${checked.metadata?.checked ? checked.metadata.code : ''}${
    checked.wrapper?.checked ? checked.wrapper.code : ''
  }
  
  pub use crate::{
      psp22,
      psp22::Internal as _,
      traits::psp22::*,
  };
  pub use psp22::{
      Internal as _,
      Transfer as _,
  };
  
  use ink_env::{
      CallFlags,
      Error as EnvError,
  };
  use ink_prelude::vec::Vec;
  use openbrush::{
      storage::{
          Mapping,
          TypeGuard,
      },
      traits::{
          AccountId,
          AccountIdExt,
          Balance,
          Storage,
          String,
      },
  };
  
  pub const STORAGE_KEY: u32 = openbrush::storage_unique_key!(Data);
  
  #[derive(Default, Debug)]
  #[openbrush::upgradeable_storage(STORAGE_KEY)]
  pub struct Data {
      pub supply: Balance,
      pub balances: Mapping<AccountId, Balance>,
      pub allowances: Mapping<(AccountId, AccountId), Balance, AllowancesKey>,
      pub _reserved: Option<()>,
  }
  
  pub struct AllowancesKey;
  
  impl<'a> TypeGuard<'a> for AllowancesKey {
      type Type = &'a (&'a AccountId, &'a AccountId);
  }
  
  impl<T: Storage<Data>> PSP22 for T {
      default fn total_supply(&self) -> Balance {
          self.data().supply.clone()
      }
  
      default fn balance_of(&self, owner: AccountId) -> Balance {
          self._balance_of(&owner)
      }
  
      default fn allowance(&self, owner: AccountId, spender: AccountId) -> Balance {
          self._allowance(&owner, &spender)
      }
  
      default fn transfer(&mut self, to: AccountId, value: Balance, data: Vec<u8>) -> Result<(), PSP22Error> {
          let from = Self::env().caller();
          self._transfer_from_to(from, to, value, data)?;
          Ok(())
      }
  
      default fn transfer_from(
          &mut self,
          from: AccountId,
          to: AccountId,
          value: Balance,
          data: Vec<u8>,
      ) -> Result<(), PSP22Error> {
          let caller = Self::env().caller();
          let allowance = self._allowance(&from, &caller);
  
          if allowance < value {
              return Err(PSP22Error::InsufficientAllowance)
          }
  
          self._approve_from_to(from, caller, allowance - value)?;
          self._transfer_from_to(from, to, value, data)?;
          Ok(())
      }
  
      default fn approve(&mut self, spender: AccountId, value: Balance) -> Result<(), PSP22Error> {
          let owner = Self::env().caller();
          self._approve_from_to(owner, spender, value)?;
          Ok(())
      }
  
      default fn increase_allowance(&mut self, spender: AccountId, delta_value: Balance) -> Result<(), PSP22Error> {
          let owner = Self::env().caller();
          self._approve_from_to(owner, spender, self._allowance(&owner, &spender) + delta_value)
      }
  
      default fn decrease_allowance(&mut self, spender: AccountId, delta_value: Balance) -> Result<(), PSP22Error> {
          let owner = Self::env().caller();
          let allowance = self._allowance(&owner, &spender);
  
          if allowance < delta_value {
              return Err(PSP22Error::InsufficientAllowance)
          }
  
          self._approve_from_to(owner, spender, allowance - delta_value)
      }
  }
  
  pub trait Internal {
      /// User must override those methods in their contract.
      fn _emit_transfer_event(&self, _from: Option<AccountId>, _to: Option<AccountId>, _amount: Balance);
      fn _emit_approval_event(&self, _owner: AccountId, _spender: AccountId, _amount: Balance);
  
      fn _balance_of(&self, owner: &AccountId) -> Balance;
      fn _allowance(&self, owner: &AccountId, spender: &AccountId) -> Balance;
  
      fn _do_safe_transfer_check(
          &mut self,
          from: &AccountId,
          to: &AccountId,
          value: &Balance,
          data: &Vec<u8>,
      ) -> Result<(), PSP22Error>;
  
      fn _transfer_from_to(
          &mut self,
          from: AccountId,
          to: AccountId,
          amount: Balance,
          data: Vec<u8>,
      ) -> Result<(), PSP22Error>;
  
      fn _approve_from_to(&mut self, owner: AccountId, spender: AccountId, amount: Balance) -> Result<(), PSP22Error>;
  
      fn _mint_to(&mut self, account: AccountId, amount: Balance) -> Result<(), PSP22Error>;
  
      fn _burn_from(&mut self, account: AccountId, amount: Balance) -> Result<(), PSP22Error>;
  }
  
  impl<T: Storage<Data>> Internal for T {
      default fn _emit_transfer_event(&self, _from: Option<AccountId>, _to: Option<AccountId>, _amount: Balance) {}
      default fn _emit_approval_event(&self, _owner: AccountId, _spender: AccountId, _amount: Balance) {}
  
      default fn _balance_of(&self, owner: &AccountId) -> Balance {
          self.data().balances.get(owner).unwrap_or(0)
      }
  
      default fn _allowance(&self, owner: &AccountId, spender: &AccountId) -> Balance {
          self.data().allowances.get(&(owner, spender)).unwrap_or(0)
      }
  
      default fn _do_safe_transfer_check(
          &mut self,
          from: &AccountId,
          to: &AccountId,
          value: &Balance,
          data: &Vec<u8>,
      ) -> Result<(), PSP22Error> {
          self.flush();
          let builder = PSP22ReceiverRef::before_received_builder(
              to,
              Self::env().caller(),
              from.clone(),
              value.clone(),
              data.clone(),
          )
          .call_flags(CallFlags::default().set_allow_reentry(true));
          let result = match builder.fire() {
              Ok(result) => {
                  match result {
                      Ok(_) => Ok(()),
                      Err(e) => Err(e.into()),
                  }
              }
              Err(e) => {
                  match e {
                      // NotCallable means that the receiver is not a contract.
  
                      // CalleeTrapped means that the receiver has no method called before_received or it failed inside.
                      // First case is expected. Second - not. But we can't tell them apart so it is a positive case for now.
                      // https://github.com/paritytech/ink/issues/1002
                      EnvError::NotCallable | EnvError::CalleeTrapped => Ok(()),
                      _ => {
                          Err(PSP22Error::SafeTransferCheckFailed(String::from(
                              "Error during call to receiver",
                          )))
                      }
                  }
              }
          };
          self.load();
          result?;
          Ok(())
      }
  
      default fn _transfer_from_to(
          &mut self,
          from: AccountId,
          to: AccountId,
          amount: Balance,
          data: Vec<u8>,
      ) -> Result<(), PSP22Error> {
          if from.is_zero() {
              return Err(PSP22Error::ZeroSenderAddress)
          }
          if to.is_zero() {
              return Err(PSP22Error::ZeroRecipientAddress)
          }
  
          let from_balance = self._balance_of(&from);
  
          if from_balance < amount {
              return Err(PSP22Error::InsufficientBalance)
          }
  
          self._before_token_transfer(Some(&from), Some(&to), &amount)?;
  
          self.data().balances.insert(&from, &(from_balance - amount));
  
          self._do_safe_transfer_check(&from, &to, &amount, &data)?;
  
          let to_balance = self._balance_of(&to);
          self.data().balances.insert(&to, &(to_balance + amount));
  
          self._after_token_transfer(Some(&from), Some(&to), &amount)?;
          self._emit_transfer_event(Some(from), Some(to), amount);
  
          Ok(())
      }
  
      default fn _approve_from_to(
          &mut self,
          owner: AccountId,
          spender: AccountId,
          amount: Balance,
      ) -> Result<(), PSP22Error> {
          if owner.is_zero() {
              return Err(PSP22Error::ZeroSenderAddress)
          }
          if spender.is_zero() {
              return Err(PSP22Error::ZeroRecipientAddress)
          }
  
          self.data().allowances.insert(&(&owner, &spender), &amount);
          self._emit_approval_event(owner, spender, amount);
          Ok(())
      }
  
      default fn _mint_to(&mut self, account: AccountId, amount: Balance) -> Result<(), PSP22Error> {
          if account.is_zero() {
              return Err(PSP22Error::ZeroRecipientAddress)
          }
  
          self._before_token_transfer(None, Some(&account), &amount)?;
          let mut new_balance = self._balance_of(&account);
          new_balance += amount;
          self.data().balances.insert(&account, &new_balance);
          self.data().supply += amount;
          self._after_token_transfer(None, Some(&account), &amount)?;
          self._emit_transfer_event(None, Some(account), amount);
  
          Ok(())
      }
  
      default fn _burn_from(&mut self, account: AccountId, amount: Balance) -> Result<(), PSP22Error> {
          if account.is_zero() {
              return Err(PSP22Error::ZeroRecipientAddress)
          }
  
          let mut from_balance = self._balance_of(&account);
  
          if from_balance < amount {
              return Err(PSP22Error::InsufficientBalance)
          }
  
          self._before_token_transfer(Some(&account), None, &amount)?;
  
          from_balance -= amount;
          self.data().balances.insert(&account, &from_balance);
          self.data().supply -= amount;
          self._after_token_transfer(Some(&account), None, &amount)?;
          self._emit_transfer_event(Some(account), None, amount);
  
          Ok(())
      }
  }
  
  pub trait Transfer {
      fn _before_token_transfer(
          &mut self,
          _from: Option<&AccountId>,
          _to: Option<&AccountId>,
          _amount: &Balance,
      ) -> Result<(), PSP22Error>;
  
      fn _after_token_transfer(
          &mut self,
          _from: Option<&AccountId>,
          _to: Option<&AccountId>,
          _amount: &Balance,
      ) -> Result<(), PSP22Error>;
  }
  
  impl<T: Storage<Data>> Transfer for T {
      default fn _before_token_transfer(
          &mut self,
          _from: Option<&AccountId>,
          _to: Option<&AccountId>,
          _amount: &Balance,
      ) -> Result<(), PSP22Error> {
          Ok(())
      }
  
      default fn _after_token_transfer(
          &mut self,
          _from: Option<&AccountId>,
          _to: Option<&AccountId>,
          _amount: &Balance,
      ) -> Result<(), PSP22Error> {
          Ok(())
      }
  }`;

  const handleCheck = (e, { id, code }) => {
    const { checked } = e.target;
    setChecked((prevState) => ({ ...prevState, [id]: { checked, code } }));
  };
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="w-full bg-gray-200 fixed z-10">
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
                                ? 'bg-gray-400 text-black'
                                : 'text-gray-800 hover:bg-gray-700 hover:text-white',
                              'px-3 py-2 rounded-md text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
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
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
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
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
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
                          {EXTENSIONS.map((extension) => (
                            <div>
                              <input
                                className="h-4 w-4 mr-2 border-gray-300"
                                type="checkbox"
                                onChange={(e) => handleCheck(e, extension)}
                                id={extension.id}
                                name="drone"
                                value={extension.name}
                              />
                              <label for="huey">{extension.name}</label>
                            </div>
                          ))}
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
                      href="https://github.com/alongoni/polkadot-contract-wizard/issues/1"
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
                      <span class="ml-3">Roadmap</span>
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
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                        <path
                          fill-rule="evenodd"
                          d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span class="ml-3">Youtube</span>
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
                      <span class="ml-3">Telegram</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          <div className="bg-gray-50 m-t-1 overflow-y-auto lg:ml-64">
            <div className="p-10 mt-10 w-auto">
              <div className="flex justify-end">
                {/* <button
                  class="h-10 m-3 px-6 font-semibold rounded-full bg-violet-600 text-white"
                  type="submit"
                >
                  Copy to clipboard
                </button> */}
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
              <div className="relative">
                <CopyBlock
                  text={text}
                  theme={nord}
                  language={'rust'}
                  showLineNumbers={true}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
