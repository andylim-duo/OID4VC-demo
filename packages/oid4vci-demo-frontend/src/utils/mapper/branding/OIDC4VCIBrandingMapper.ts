import { CredentialsSupportedDisplay, CredentialSupported, EndpointMetadataResult } from '@sphereon/oid4vci-common'
import { IBasicCredentialLocaleBranding } from '@sphereon/ssi-sdk.data-store'

export const credentialLocaleBrandingFrom = async (credentialDisplay: CredentialsSupportedDisplay): Promise<IBasicCredentialLocaleBranding> => {
    console.log(JSON.stringify(credentialDisplay, null, 2))
    return {
        ...(credentialDisplay.name && {
            alias: credentialDisplay.name,
        }),
        ...(credentialDisplay.locale && {
            locale: credentialDisplay.locale,
        }),
        ...(credentialDisplay.logo && {
            logo: {
                ...(credentialDisplay.logo.url && {
                    uri: credentialDisplay.logo?.url,
                }),
                ...(credentialDisplay.logo.alt_text && {
                    alt: credentialDisplay.logo?.alt_text,
                }),
            },
        }),
        ...(credentialDisplay.description && {
            description: credentialDisplay.description,
        }),

        ...(credentialDisplay.text_color && {
            text: {
                color: credentialDisplay.text_color,
            },
        }),
        ...((credentialDisplay.background_image || credentialDisplay.background_color) && {
            background: {
                ...(credentialDisplay.background_image && {
                    image: {
                        ...(credentialDisplay.background_image.url && {
                            uri: credentialDisplay.background_image?.url,
                        }),
                        ...(credentialDisplay.background_image.alt_text && {
                            alt: credentialDisplay.background_image?.alt_text,
                        }),
                    },
                }),
                color: credentialDisplay.background_color,
            },
        }),
    };
}

export const getCredentialBrandings = async (metadata: EndpointMetadataResult): Promise<Map<string, Array<IBasicCredentialLocaleBranding>>> => {
    const credentialBranding = new Map<string, Array<IBasicCredentialLocaleBranding>>()
    Promise.all(
            (metadata!.credentialIssuerMetadata!.credentials_supported as CredentialSupported[]).map(async (metadata: CredentialSupported): Promise<void> => {
                const localeBranding: Array<IBasicCredentialLocaleBranding> = await Promise.all(
                        (metadata.display ?? []).map(
                                async (display: CredentialsSupportedDisplay): Promise<IBasicCredentialLocaleBranding> =>
                                        await credentialLocaleBrandingFrom(display)
                        ),
                );

                const credentialTypes: Array<string> =
                        metadata.types.length > 1
                                ? metadata.types.filter((type: string) => type !== 'VerifiableCredential')
                                : metadata.types.length === 0
                                        ? ['VerifiableCredential']
                                        : metadata.types

                credentialBranding.set(credentialTypes[0], localeBranding)
            }))
    return credentialBranding
}
