import { ConnectButton, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClientProvider } from "@tanstack/react-query";
import classNames from "classnames";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { reactQueryClient } from "src/clients/reactQuery";
import { wagmiClient } from "src/clients/wagmi";
import { councilConfigs } from "src/config/council.config";
import { chains } from "src/provider";
import { makeVoterHref } from "src/routing/makeRoute";
import { Pages } from "src/routing/Pages";
import { CouncilClientProvider } from "src/ui/council/CouncilProvider";
import { useAccount, WagmiConfig } from "wagmi";

console.log(councilConfigs);

function App({ Component, pageProps }: AppProps): ReactElement {
  const { address } = useAccount();

  const { pathname } = useRouter();

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <QueryClientProvider client={reactQueryClient}>
          <CouncilClientProvider>
            <div className="daisy-navbar bg-base-100">
              <div className="daisy-navbar-start">
                <div className="daisy-dropdown">
                  <label
                    tabIndex={0}
                    className="daisy-btn-ghost daisy-btn lg:hidden"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16"
                      />
                    </svg>
                  </label>
                  <ul
                    tabIndex={0}
                    className="daisy-dropdown-content daisy-menu rounded-box daisy-menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
                  >
                    <li>
                      <Link
                        className={classNames({
                          "daisy-active": pathname.startsWith(Pages.PROPOSALS),
                        })}
                        href={Pages.PROPOSALS}
                      >
                        proposals
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={classNames({
                          "daisy-active": pathname.startsWith(Pages.VAULTS),
                        })}
                        href={Pages.VAULTS}
                      >
                        vaults
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={classNames({
                          "daisy-active": pathname.startsWith(Pages.VOTERS),
                        })}
                        href={Pages.VOTERS}
                      >
                        voters
                      </Link>
                    </li>
                    {address && (
                      <li>
                        <Link href={makeVoterHref(address)}>profile</Link>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="ml-2 whitespace-nowrap text-xl text-accent-content">
                  council-ui 🫡
                </div>
                {/* <Link href="/">
              <Image alt="Council" src={CouncilLogo} width={200} height={52} />
            </Link> */}
              </div>
              <div className="daisy-navbar-center hidden lg:flex">
                <ul className="daisy-menu daisy-menu-horizontal p-0">
                  <li>
                    <Link
                      className={classNames({
                        "daisy-active": pathname.startsWith(Pages.PROPOSALS),
                      })}
                      href={Pages.PROPOSALS}
                    >
                      proposals
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={classNames({
                        "daisy-active": pathname.startsWith(Pages.VAULTS),
                      })}
                      href={Pages.PROPOSALS}
                    >
                      vaults
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={classNames({
                        "daisy-active": pathname.startsWith(Pages.VOTERS),
                      })}
                      href={Pages.VOTERS}
                    >
                      voters
                    </Link>
                  </li>
                  {address && (
                    <li>
                      <Link href={makeVoterHref(address)}>profile</Link>
                    </li>
                  )}
                </ul>
              </div>
              <div className="daisy-navbar-end">
                <ConnectButton />
              </div>
            </div>
            <main>
              <Component {...pageProps} />
            </main>
          </CouncilClientProvider>
        </QueryClientProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
