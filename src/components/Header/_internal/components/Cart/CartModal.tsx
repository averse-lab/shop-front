"use client";
import { useEffect, useRef, useState } from "react";
import { Cart } from "@averse/lib/shopify/types";
import { Dialog, Transition } from "@headlessui/react";
import { createUrl } from "@averse/lib/utils";
import Image from "next/image";
import Price from "@averse/components/price";
import EditItemQuantityButton from "./edit-item-quantity-button";
import Link from "next/link";
import { CartHint } from "./_internal/components";

type MerchandiseSearchParams = {
  [key: string]: string;
};

interface IProps {
  dictionary: {
    addToBag: string;
    shippingConditions: string;
    card: string;
    proceedToCheckout: string;
  };
}

const CartModal = ({ cart }: { cart: Cart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart.totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    if (cart.totalQuantity !== quantityRef.current) {
      if (!isOpen) {
        setIsOpen(true);
      }

      quantityRef.current = cart.totalQuantity;
    }
  }, [isOpen, cart.totalQuantity, quantityRef, cart]);

  return (
    <div className='justify-self-end'>
      <CartHint quantity={cart.totalQuantity} onClick={openCart} />
      {cart && (
        <Transition show={isOpen}>
          <Dialog
            onClose={closeCart}
            className='absolute z-50 top-28 right-3 bg-white shadow-md w-1/3'
          >
            <div
              className={
                "h-16 flex justify-center items-center border-b-2 border-gray-200 "
              }
            >
              <h1
                className={
                  "text-1xl font-medium text-center text-gray-800 uppercase"
                }
              >
                Shopping card
              </h1>
            </div>

            <div className='overflow-y-auto h-96'>
              <div className='min-h-full'>
                <div className='flex justify-center items-center'>
                  {cart.totalQuantity < 1 ? (
                    <p className='text-2xl font-medium text-center text-gray-800 uppercase'>
                      Your cart is empty
                    </p>
                  ) : (
                    <>
                      <ul className='flex-grow overflow-auto mx-2'>
                        {cart.lines.map((item) => {
                          const merchandiseSearchParams =
                            {} as MerchandiseSearchParams;
                          const merchandiseUrl = createUrl(
                            `/shop/${item.merchandise.product.handle}`,
                            new URLSearchParams(merchandiseSearchParams),
                          );
                          return (
                            <li
                              key={item.id}
                              className='flex items-center justify-between mt-2'
                            >
                              <div className='flex items-center'>
                                <div className='flex-shrink-0 w-20 h-20'>
                                  <Link
                                    href={merchandiseUrl}
                                    onClick={closeCart}
                                  >
                                    <Image
                                      src={
                                        item.merchandise.product.featuredImage
                                          .url
                                      }
                                      alt={
                                        item.merchandise.product.featuredImage
                                          .altText
                                      }
                                      width={80}
                                      height={80}
                                    />
                                  </Link>
                                </div>
                                <div className='ml-4'>
                                  <Link
                                    href={merchandiseUrl}
                                    onClick={closeCart}
                                  >
                                    <p className='text-sm font-medium text-gray-800 underline'>
                                      {item.merchandise.product.title}
                                    </p>
                                  </Link>
                                  <p className='text-sm text-gray-500'>
                                    {item.merchandise.selectedOptions &&
                                      item.merchandise.selectedOptions[0] && (
                                        <span>
                                          Size{" "}
                                          {
                                            item.merchandise.selectedOptions[0]
                                              .value
                                          }
                                        </span>
                                      )}
                                  </p>
                                  <p className='text-sm text-gray-500'>
                                    <Price
                                      className='flex justify-end space-y-2 text-right text-sm'
                                      amount={item.cost.totalAmount.amount}
                                      currencyCode={
                                        item.cost.totalAmount.currencyCode
                                      }
                                    />
                                  </p>
                                </div>
                              </div>
                              <div className='ml-auto flex h-9 flex-row items-center border border-neutral-200 dark:border-neutral-700'>
                                <EditItemQuantityButton
                                  item={item}
                                  type='minus'
                                />
                                <p className='w-6 text-center '>
                                  <span className='w-full text-sm'>
                                    {item.quantity}
                                  </span>
                                </p>
                                <EditItemQuantityButton
                                  item={item}
                                  type='plus'
                                />
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className='py-4 text-sm text-neutral-500 mx-3'>
              <div className='mb-3 flex items-center justify-between border-b border-neutral-200 pb-1'>
                <p>Taxes</p>
                <Price
                  className='text-right text-base text-black'
                  amount={cart.cost.totalTaxAmount.amount}
                  currencyCode={cart.cost.totalTaxAmount.currencyCode}
                />
              </div>
              <div className='mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1'>
                <p>Shipping</p>
                <p className='text-right'>Calculated at checkout</p>
              </div>
              <div className='mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 '>
                <p>Total</p>
                <Price
                  className='text-right text-base text-black '
                  amount={cart.cost.totalAmount.amount}
                  currencyCode={cart.cost.totalAmount.currencyCode}
                />
              </div>
              <a
                href={cart.checkoutUrl}
                className='block w-full bg-black p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100'
              >
                Proceed to Checkout
              </a>
            </div>
          </Dialog>
        </Transition>
      )}
    </div>
  );
};

export default CartModal;
