import {IDIDManagerCreateArgs, IIdentifier} from "@veramo/core";
import {IPEXInstanceOptions} from "@sphereon/ssi-sdk.siopv2-oid4vp-rp-auth/src/types/ISIOPv2RP";

export enum KMS {
    LOCAL = 'local',
}
export enum DIDMethods {
    DID_ETHR = 'ethr',
    DID_KEY = 'key',
    // DID_LTO = 'lto',
    DID_ION = 'ion',
    // DID_FACTOM = 'factom',
    DID_JWK = 'jwk',
    DID_WEB = 'web'
}


export interface IDIDOpts {
    did?: string
    did_vm?: string
    createArgs?: IDIDManagerCreateArgs
    importArgs?: IImportX509DIDArg
    privateKeyHex?: string
}

export interface IDIDResult extends IDIDOpts {
    identifier?: IIdentifier
}

export interface IImportX509DIDArg {
    domain: string
    privateKeyPEM: string
    certificatePEM: string
    certificateChainPEM: string
    certificateChainURL?: string
    kms?: string // The Key Management System to use. Will default to 'local' when not supplied.
    kid?: string // The requested KID. A default will be generated when not supplied
}

export type OID4VPInstanceOpts = Omit<IPEXInstanceOptions, 'definition'>