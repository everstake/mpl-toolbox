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
  mapSerializer,
} from '@lorisleiva/js-core';

// Accounts.
export type DeleteCandyGuardInstructionAccounts = {
  candyGuard: PublicKey;
  authority: Signer;
};

// Discriminator.
export type DeleteCandyGuardInstructionDiscriminator = Array<number>;
export function getDeleteCandyGuardInstructionDiscriminator(): DeleteCandyGuardInstructionDiscriminator {
  return [183, 18, 70, 156, 148, 109, 161, 34];
}

// Data.
type DeleteCandyGuardInstructionData = {
  discriminator: DeleteCandyGuardInstructionDiscriminator;
};
export function getDeleteCandyGuardInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<{}> {
  const s = context.serializer;
  const discriminator = getDeleteCandyGuardInstructionDiscriminator();
  const serializer: Serializer<DeleteCandyGuardInstructionData> =
    s.struct<DeleteCandyGuardInstructionData>(
      [['discriminator', s.array(s.u8, 8)]],
      'DeleteCandyGuardInstructionData'
    );
  return mapSerializer(serializer, () => ({ discriminator }));
}

// Instruction.
export function deleteCandyGuard(
  context: {
    serializer: Context['serializer'];
    eddsa: Context['eddsa'];
    programs?: Context['programs'];
  },
  input: DeleteCandyGuardInstructionAccounts
): WrappedInstruction {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId: PublicKey = getProgramAddressWithFallback(
    context,
    'mplCandyGuard',
    'Guard1JwRhJkVH6XZhzoYxeBVQe872VH6QggF4BWmS9g'
  );

  // Candy Guard.
  keys.push({ pubkey: input.candyGuard, isSigner: false, isWritable: false });

  // Authority.
  signers.push(input.authority);
  keys.push({
    pubkey: input.authority.publicKey,
    isSigner: true,
    isWritable: false,
  });

  // Data.
  const data = getDeleteCandyGuardInstructionDataSerializer(context).serialize(
    {}
  );

  return {
    instruction: { keys, programId, data },
    signers,
    bytesCreatedOnChain: 0,
  };
}
