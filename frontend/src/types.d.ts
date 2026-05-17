export interface PublicKeyCredentialArgs {
  publicKey: {
    rp: PublicKeyCredentialRpEntity;
    authenticatorSelection: AuthenticatorSelectionCriteria;
    user: {
      id: string;
      name: string;
      displayName: string;
    };
    pubKeyCredParams: PublicKeyCredentialParameters[];
    attestation: AttestationConveyancePreference;
    extensions: AuthenticationExtensionsClientInputs;
    timeout: number;
    challenge: string;
    excludeCredentials: PublicKeyCredentialDescriptor[];
  }
}
