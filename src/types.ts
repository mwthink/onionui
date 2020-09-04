export type ParsedOnion = {
  /** Onion service hostname (encds in .onion) */
  hostname: string;
  /** B64 encoded public key */
  hs_ed25519_public_key: string;
  /** B64 encoded private key */
  hs_ed25519_secret_key: string;
  /** Time when generated */
  time: Date;
}
