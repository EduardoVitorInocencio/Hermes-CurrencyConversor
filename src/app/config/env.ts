const defaultFrankfurterApiUrl = 'https://api.frankfurter.dev/v2'

const configuredFrankfurterApiUrl = import.meta.env.VITE_FRANKFURTER_API_URL?.trim()

export const appConfig = Object.freeze({
  frankfurterApiUrl:
    configuredFrankfurterApiUrl || defaultFrankfurterApiUrl,
})
