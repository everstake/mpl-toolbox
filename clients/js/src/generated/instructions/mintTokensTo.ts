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
  checkForIsWritableOverride as isWritable,
  mapSerializer,
} from '@lorisleiva/js-core';

// Accounts.
export type MintTokensToInstructionAccounts = {
  mint: PublicKey;
  token: PublicKey;
  mintAuthority?: Signer;
};

// Arguments.
export type MintTokensToInstructionData = {
  discriminator: number;
  amount: bigint;
};

export type MintTokensToInstructionArgs = { amount: number | bigint };

export function getMintTokensToInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<MintTokensToInstructionArgs, MintTokensToInstructionData> {
  const s = context.serializer;
  return mapSerializer<
    MintTokensToInstructionArgs,
    MintTokensToInstructionData,
    MintTokensToInstructionData
  >(
    s.struct<MintTokensToInstructionData>(
      [
        ['discriminator', s.u8],
        ['amount', s.u64],
      ],
      'MintTokensToInstructionArgs'
    ),
    (value) => ({ ...value, discriminator: 7 } as MintTokensToInstructionData)
  ) as Serializer<MintTokensToInstructionArgs, MintTokensToInstructionData>;
}

// Instruction.
export function mintTokensTo(
  context: Pick<Context, 'serializer' | 'programs' | 'identity'>,
  input: MintTokensToInstructionAccounts & MintTokensToInstructionArgs
): WrappedInstruction {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId: PublicKey = context.programs.get('splToken').publicKey;

  // Resolved accounts.
  const mintAccount = input.mint;
  const tokenAccount = input.token;
  const mintAuthorityAccount = input.mintAuthority ?? context.identity;

  // Mint.
  keys.push({
    pubkey: mintAccount,
    isSigner: false,
    isWritable: isWritable(mintAccount, true),
  });

  // Token.
  keys.push({
    pubkey: tokenAccount,
    isSigner: false,
    isWritable: isWritable(tokenAccount, true),
  });

  // Mint Authority.
  signers.push(mintAuthorityAccount);
  keys.push({
    pubkey: mintAuthorityAccount.publicKey,
    isSigner: true,
    isWritable: isWritable(mintAuthorityAccount, false),
  });

  // Data.
  const data =
    getMintTokensToInstructionDataSerializer(context).serialize(input);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return {
    instruction: { keys, programId, data },
    signers,
    bytesCreatedOnChain,
  };
}