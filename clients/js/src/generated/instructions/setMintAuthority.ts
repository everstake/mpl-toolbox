/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  AccountMeta,
  Context,
  PublicKey,
  Serializer,
  Signer,
  WrappedInstruction,
  getProgramAddressWithFallback,
} from '@lorisleiva/js-core';

// Accounts.
export type SetMintAuthorityInstructionAccounts = {
  candyMachine: PublicKey;
  authority: Signer;
  mintAuthority: Signer;
};

// Instruction.
export function setMintAuthority(
  context: {
    serializer: Context['serializer'];
    eddsa: Context['eddsa'];
    programs?: Context['programs'];
  },
  input: SetMintAuthorityInstructionAccounts
): WrappedInstruction {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId: PublicKey = getProgramAddressWithFallback(
    context,
    'mplCandyMachineCore',
    'CndyV3LdqHUfDLmE5naZjVN8rBZz4tqhdefbAnjHG3JR'
  );

  // Candy Machine.
  keys.push({ pubkey: input.candyMachine, isSigner: false, isWritable: false });

  // Authority.
  signers.push(input.authority);
  keys.push({
    pubkey: input.authority.publicKey,
    isSigner: true,
    isWritable: false,
  });

  // Mint Authority.
  signers.push(input.mintAuthority);
  keys.push({
    pubkey: input.mintAuthority.publicKey,
    isSigner: true,
    isWritable: false,
  });

  // Data.
  const data = new Uint8Array();

  return {
    instruction: { keys, programId, data },
    signers,
    bytesCreatedOnChain: 0,
  };
}