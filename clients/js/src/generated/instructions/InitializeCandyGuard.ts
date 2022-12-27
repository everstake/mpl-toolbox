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
export type InitializeCandyGuardInstructionAccounts = {
  candyGuard: PublicKey;
  base: Signer;
  authority: PublicKey;
  payer: Signer;
  systemProgram?: PublicKey;
};

// Arguments.
export type InitializeCandyGuardInstructionArgs = { data: Uint8Array };

// Discriminator.
export type InitializeCandyGuardInstructionDiscriminator = Array<number>;
export function getInitializeCandyGuardInstructionDiscriminator(): InitializeCandyGuardInstructionDiscriminator {
  return [175, 175, 109, 31, 13, 152, 155, 237];
}

// Data.
type InitializeCandyGuardInstructionData =
  InitializeCandyGuardInstructionArgs & {
    discriminator: InitializeCandyGuardInstructionDiscriminator;
  };
export function getInitializeCandyGuardInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<InitializeCandyGuardInstructionArgs> {
  const s = context.serializer;
  const discriminator = getInitializeCandyGuardInstructionDiscriminator();
  const serializer: Serializer<InitializeCandyGuardInstructionData> =
    s.struct<InitializeCandyGuardInstructionData>(
      [
        ['discriminator', s.array(s.u8, 8)],
        ['data', s.bytes],
      ],
      'InitializeCandyGuardInstructionData'
    );
  return mapSerializer(
    serializer,
    (value: InitializeCandyGuardInstructionArgs) => ({
      ...value,
      discriminator,
    })
  );
}

// Instruction.
export function initializeCandyGuard(
  context: {
    serializer: Context['serializer'];
    eddsa: Context['eddsa'];
    programs?: Context['programs'];
  },
  input: InitializeCandyGuardInstructionAccounts &
    InitializeCandyGuardInstructionArgs
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

  // Base.
  signers.push(input.base);
  keys.push({
    pubkey: input.base.publicKey,
    isSigner: true,
    isWritable: false,
  });

  // Authority.
  keys.push({ pubkey: input.authority, isSigner: false, isWritable: false });

  // Payer.
  signers.push(input.payer);
  keys.push({
    pubkey: input.payer.publicKey,
    isSigner: true,
    isWritable: false,
  });

  // System Program.
  keys.push({
    pubkey:
      input.systemProgram ??
      getProgramAddressWithFallback(
        context,
        'splSystem',
        '11111111111111111111111111111111'
      ),
    isSigner: false,
    isWritable: false,
  });

  // Data.
  const data =
    getInitializeCandyGuardInstructionDataSerializer(context).serialize(input);

  return {
    instruction: { keys, programId, data },
    signers,
    bytesCreatedOnChain: 0,
  };
}
