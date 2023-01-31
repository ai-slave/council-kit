import { LockingVault, VestingVault, Voter } from "@council/sdk";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useCouncil } from "src/ui/council/useCouncil";
import { useChainId } from "src/ui/network/useChainId";
import { getAllVaultConfigs } from "src/vaults/vaults";
import { useAccount } from "wagmi";

/**
 * Get an object representing the connected wallet's delegates by vault address.
 */
export function useDelegatesByVault(): UseQueryResult<Record<string, Voter>> {
  const { address } = useAccount();
  const { coreVoting } = useCouncil();
  const chainId = useChainId();

  return useQuery({
    queryKey: [address, chainId],
    enabled: !!address,
    queryFn: !!address
      ? async () => {
          const delegatesByVault: Record<string, Voter> = {};
          const allConfigs = getAllVaultConfigs(chainId);

          for (const vault of coreVoting.vaults) {
            const config = allConfigs.find(
              ({ address }) => address === vault.address,
            );

            if (!config) {
              continue;
            }

            let typedDelegationVault: LockingVault | VestingVault | undefined =
              undefined;

            switch (config.type) {
              case "LockingVault":
                typedDelegationVault = vault as LockingVault;
                break;
              case "VestingVault":
                typedDelegationVault = vault as VestingVault;
                break;
            }

            if (typedDelegationVault) {
              const delegate = await typedDelegationVault.getDelegate(address);
              delegatesByVault[config.address] = delegate;
            }
          }

          return delegatesByVault;
        }
      : undefined,
  });
}
