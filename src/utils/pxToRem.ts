/**
 * Converts Pixels to Rem
 * @param pixels - The pixel value to convert
 * @returns The equivalent rem value as a string
 */

export function pxToRem(pixels: number): string {
    return `${pixels / 16}rem`
}