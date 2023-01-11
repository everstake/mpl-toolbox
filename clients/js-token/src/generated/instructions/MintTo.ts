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
export type MintToInstructionAccounts = {
  mint: PublicKey;
  account: PublicKey;
  owner: Signer;
};

// Arguments.
export type MintToInstructionData = { amount: bigint };

export type MintToInstructionArgs = { amount: number | bigint };

export function getMintToInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<MintToInstructionArgs, MintToInstructionData> {
  const s = context.serializer;
  return s.struct<MintToInstructionData>(
    [['amount', s.u64]],
    'mintToInstructionArgs'
  ) as Serializer<MintToInstructionArgs, MintToInstructionData>;
}

// Instruction.
export function mintTo(
  context: {
    serializer: Context['serializer'];
    eddsa: Context['eddsa'];
    programs?: Context['programs'];
  },
  input: MintToInstructionAccounts & MintToInstructionArgs
): WrappedInstruction {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId: PublicKey = getProgramAddressWithFallback(
    context,
    'splToken',
    'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
  );

  // Mint.
  keys.push({ pubkey: input.mint, isSigner: false, isWritable: false });

  // Account.
  keys.push({ pubkey: input.account, isSigner: false, isWritable: false });

  // Owner.
  signers.push(input.owner);
  keys.push({
    pubkey: input.owner.publicKey,
    isSigner: true,
    isWritable: false,
  });

  // Data.
  const data = getMintToInstructionDataSerializer(context).serialize(input);

  return {
    instruction: { keys, programId, data },
    signers,
    bytesCreatedOnChain: 0,
  };
}