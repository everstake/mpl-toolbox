/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  ACCOUNT_HEADER_SIZE,
  Context,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import { findAssociatedTokenPda } from '../../hooked';
import { getTokenSize } from '../accounts';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  expectPublicKey,
  getAccountMetasAndSigners,
} from '../shared';

// Accounts.
export type CreateAssociatedTokenInstructionAccounts = {
  payer?: Signer;
  ata?: PublicKey | Pda;
  owner?: PublicKey | Pda;
  mint: PublicKey | Pda;
  systemProgram?: PublicKey | Pda;
  tokenProgram?: PublicKey | Pda;
};

// Instruction.
export function createAssociatedToken(
  context: Pick<Context, 'eddsa' | 'identity' | 'payer' | 'programs'>,
  input: CreateAssociatedTokenInstructionAccounts
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'splAssociatedToken',
    'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
  );

  // Accounts.
  const resolvedAccounts: ResolvedAccountsWithIndices = {
    payer: { index: 0, isWritable: true, value: input.payer ?? null },
    ata: { index: 1, isWritable: true, value: input.ata ?? null },
    owner: { index: 2, isWritable: false, value: input.owner ?? null },
    mint: { index: 3, isWritable: false, value: input.mint ?? null },
    systemProgram: {
      index: 4,
      isWritable: false,
      value: input.systemProgram ?? null,
    },
    tokenProgram: {
      index: 5,
      isWritable: false,
      value: input.tokenProgram ?? null,
    },
  };

  // Default values.
  if (!resolvedAccounts.payer.value) {
    resolvedAccounts.payer.value = context.payer;
  }
  if (!resolvedAccounts.owner.value) {
    resolvedAccounts.owner.value = context.identity.publicKey;
  }
  if (!resolvedAccounts.ata.value) {
    resolvedAccounts.ata.value = findAssociatedTokenPda(context, {
      owner: expectPublicKey(resolvedAccounts.owner.value),
      mint: expectPublicKey(resolvedAccounts.mint.value),
    });
  }
  if (!resolvedAccounts.systemProgram.value) {
    resolvedAccounts.systemProgram.value = context.programs.getPublicKey(
      'splSystem',
      '11111111111111111111111111111111'
    );
    resolvedAccounts.systemProgram.isWritable = false;
  }
  if (!resolvedAccounts.tokenProgram.value) {
    resolvedAccounts.tokenProgram.value = context.programs.getPublicKey(
      'splToken',
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
    );
    resolvedAccounts.tokenProgram.isWritable = false;
  }

  // Accounts in order.
  const orderedAccounts: ResolvedAccount[] = Object.values(
    resolvedAccounts
  ).sort((a, b) => a.index - b.index);

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(
    orderedAccounts,
    'programId',
    programId
  );

  // Data.
  const data = new Uint8Array();

  // Bytes Created On Chain.
  const bytesCreatedOnChain = getTokenSize() + ACCOUNT_HEADER_SIZE;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
