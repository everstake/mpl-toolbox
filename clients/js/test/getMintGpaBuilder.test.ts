import { generateSigner, some } from '@lorisleiva/js-test';
import test from 'ava';
import { getMintGpaBuilder } from '../src';
import { createMetaplex, createMint } from './_setup';

test('it can fetch mint accounts by mint authority', async (t) => {
  // Given two mint accounts such that
  // one of them has an explicit mint authority.
  const mx = await createMetaplex();
  const mintAuthority = generateSigner(mx).publicKey;
  const mint = await createMint(mx, { mintAuthority });
  await createMint(mx);

  // When we fetch all mint accounts using this mint authority.
  const mints = await getMintGpaBuilder(mx)
    .whereField('mintAuthority', some(mintAuthority))
    .getDeserialized();

  // Then we got the expected mint account.
  t.deepEqual(mints[0].publicKey, mint.publicKey);
});